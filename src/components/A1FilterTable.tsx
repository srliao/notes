import React from "react";

const data = [
  ["TR","TR","TL","TR","TL","TL"],
  ["TR","TL","TL","TL","TL","TL"],
  ["TR","TL","BL","TL","TL","TR"],
  ["TR","TL","TR","TL","TR","TR \| BR \| TL"],
  ["TR","TR","TR","TR","TR","TR \| BR \| TL"],
  ["TL","TL","TL","TL","TL","TL"],
  ["TL","TL","BL","TL","TL","TR"],
  ["TL","BL","BL","BL","TL","TR"],
  ["TL","BL","BR","TR","BR","TR"],
  ["TL","TR","BR","TR","BR","TR"],
  ["TL","TR","TL","TR","TL","TL"],
  ["TL","TL","TR","TL","TR","TR \| BR \| TL"],
  ["TL","TR","TR","TR","TR","TR \| BR \| TL"],
  ["BR","TR","BR","TR","BR","TR"],
  ["BR","TR","TL","TR","TL","TL"],
  ["BR","BL","BL","BL","TL","TR"],
  ["BR","BL","BR","TR","BR","TR"],
  ["BR","BL","TL","BL","TL","TL"],
  ["BR","BR","BR","BR","BR","TR \| TL"],
  ["BR","BR","BL","TR \| BL","TL","TR"],
  ["BR","BR","TR","BR","TR","TR \| BR \| TL"],
  ["BR","TR","TR","TR","TR","TR \| BR \| TL"],
  ["BL","BL","BL","BL","TL","TR"],
  ["BL","BL","BR","TR","BR","TR"],
  ["BL","BL","TL","BL","TL","TL"],
  ["BL","TL","TL","TL","TL","TL"],
  ["BL","TL","BL","TL","TL","TR"],
  ["BL","TL","TR","TL","TR","TR \| BR \| TL"],
]

//rows is string[][]
export default function A1FilterTable() {
  const [re, setRE] = React.useState<string>("");
  const [bm, setBM] = React.useState<string>("");
  const [cp, setCP] = React.useState<string>("");

  const rows = data
    .filter((e) => {
      if (re !== "" && !e[0].toLowerCase().includes(re.toLowerCase())) {
        return false;
      }
      if (bm !== "" && !e[1].toLowerCase().includes(bm.toLowerCase())) {
        return false;
      }
      if (cp !== "" && !e[2].toLowerCase().includes(cp.toLowerCase())) {
        return false;
      }
      return true;
    })
    .map((e, i) => {
      return (
        <tr key={i}>
          <td className="a1start">{e[0]}</td>
          <td className="a1start">{e[1]}</td>
          <td className="a1start">{e[2]}</td>
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
        <label>Town exit:{"  "}</label>
        <input type="text" onChange={(e) => setRE(e.target.value)} />
      </div>
      <div style={{paddingBottom: "2px"}}>
        <label>Blood Moor exit:{"  "}</label>
        <input type="text" onChange={(e) => setBM(e.target.value)} />
      </div>
      <div style={{paddingBottom: "2px"}}>
        <label>Cold Plain exit:{"  "}</label>
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
