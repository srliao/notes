import React from "react";

//rows is string[][]
export default function A1FilterTable({ data }: { data: string[][] }) {
  const [re, setRE] = React.useState<string>("");
  const [bm, setBM] = React.useState<string>("");
  const [cp, setCP] = React.useState<string>("");

  const rows = data
    .filter((e) => {
      if (re !== "" && e[0].toLowerCase().includes(re.toLowerCase())) {
        return false;
      }
      if (bm !== "" && e[1].toLowerCase().includes(bm.toLowerCase())) {
        return false;
      }
      if (cp !== "" && e[2].toLowerCase().includes(cp.toLowerCase())) {
        return false;
      }
      return true;
    })
    .map((e, i) => {
      return (
        <tr key={i}>
          <td>{e[0]}</td>
          <td>{e[1]}</td>
          <td>{e[2]}</td>
          <td>{e[3]}</td>
          <td>{e[4]}</td>
          <td>{e[5]}</td>
        </tr>
      );
    });

  //first 3 ele of rows are filterable
  return (
    <div>
      <div style={{paddingBottom: "2px"}}>
        <label>Town exit:</label>
        <input type="text" onChange={(e) => setRE(e.target.value)} />
      </div>
      <div style={{paddingBottom: "2px"}}>
        <label>Blood Moor exit:</label>
        <input type="text" onChange={(e) => setBM(e.target.value)} />
      </div>
      <div style={{paddingBottom: "2px"}}>
        <label>Cold Plain exit:</label>
        <input type="text" onChange={(e) => setCP(e.target.value)} />
      </div>
      <table>
        <thead>
          <tr>
            <td>Town Exit</td>
            <td>{"BM->CP"}</td>
            <td>{"CP->SF"}</td>
            <td>{"DW->BM"}</td>
            <td>{"BM->TH"}</td>
            <td>{"OC->B"}</td>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
