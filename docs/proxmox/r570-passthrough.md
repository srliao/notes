# R570 GPU passthrough to Windows VM

Original reference [here](https://forum.proxmox.com/threads/ml360-and-radeon-rx-570-vga-passthrough.79385/) and [here](https://www.reddit.com/r/homelab/comments/b5xpua/the_ultimate_beginners_guide_to_gpu_passthrough/)

Not all the steps from the Reddit post were needed.

1. Identify GPU using either `lspci` or `lscpi -v` (if can't tell without verbose):

```
...
09:00.0 VGA compatible controller: Advanced Micro Devices, Inc. [AMD/ATI] Ellesmere [Radeon RX 470/480/570/570X/580/580X/590] (rev ef)
09:00.1 Audio device: Advanced Micro Devices, Inc. [AMD/ATI] Ellesmere HDMI Audio [Radeon RX 470/480 / 570/580/590]
...
```

2. Get the Vendor ID with `lspci -n -s 09:00`, replacing `09:00` accordingly. Note down the Vendor ID

```
09:00.0 0300: 1002:67df (rev ef)
09:00.1 0403: 1002:aaf0
```

3. Edit `/etc/default/grub`

```
GRUB_CMDLINE_LINUX_DEFAULT="quiet amd_iommu=on vfio_iommu_type1.allow_unsafe_interrupts=1"
```

Left out the `pcie_acs_override` and it seems to work fine still. Reddit calls for adding `allow_unsafe_interrupts` but adding it to GRUB seems to work just the same.

**Potentially required**: Something to do with BAR but might need to add `initcall_blacklist=sysfb_init` to the above based on [this](https://forum.proxmox.com/threads/problem-with-gpu-passthrough.55918/post-478351). Also might need to disable 4G decoding in BIOs (currently I don't have it disabled and it's working still)

4. Update grup with `update-grub`

5. Isolate card `echo "options vfio-pci ids=1002:67df,1002:aaf0" > /etc/modprobe.d/vfio.conf`, replace ids accordingly

6. Run `update-initramfs -u`

7. Add following to `/etc/modules`

```
vfio
vfio_iommu_type1
vfio_pci
vfio_virqfd
```

8. Add passthrough to the vm's config:

```
hostpci0: 0000:09:00.0,pcie=1,x-vga=1
```

**Disable default display**: I had to add the `x-vga=1` to disable proxmox disable or else driver was giving error. Apparently this is not needed and is bad for AMD performance? Need to test in future.

9. Restart proxmox

10. Restart VM and install drivers accordingly


## Other notes

I didn't blacklist drivers since Proxmox uses `amdgpu` not `radeon` apparently. This seems to have worked fine