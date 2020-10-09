import React from "react";
import { prettyPrintStat } from "../../util";

import "./styles.css";

function Table({ countries }) {
  return (
    <div className="table">
      <tbody>
        {countries.map(({ country, cases }) => (
          <tr>
            <td>{country}</td>
            <td>
              <strong>{prettyPrintStat(cases)}</strong>
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  )
}

export default Table
