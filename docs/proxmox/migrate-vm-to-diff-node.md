# Migrate VM to different node

Using local storage won't allow migrate on UI because the local storage does not exist on destination node. Need to use CLI:

```
qm migrate <vm id> <target node name> --with-local-disks --targetstorage <storage-name>
```

If migration fails with error `Host key verification failed.` then need to add alias to ssh config first as follows:

```
ssh -o 'HostKeyAlias=<target node name>' root@<target node ip>
```