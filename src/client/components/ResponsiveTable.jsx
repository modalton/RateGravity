import React from "react";
import PropTypes from "prop-types";

const validColumn = col => {
  return col.hasOwnProperty("hideable") && col.hasOwnProperty("title");
};

let ResponsiveTable = props => {
  return (
    <table>
      {props.hasOwnProperty("columns") &&
        props.hasOwnProperty("row_data") && (
          <tbody>
            <tr>
              {/* Loop over columns and render if valid */}
              {props.columns.map((col, idx) => {
                if (validColumn(col))
                  return (
                    <th key={idx} className={col.hideable ? "hideable" : ""}>
                      {col.title}
                    </th>
                  );
              })}
            </tr>
            {/* Loop over row data and for each valid column pull out it's 'key' from
                 said row data object
              */}
            {props.row_data.map((row, idx) => {
              return (
                <tr key={idx}>
                  {props.columns.map((col, idx) => {
                    if (validColumn(col))
                      return (
                        <td
                          key={idx}
                          className={col.hideable ? "hideable" : ""}
                        >
                          {!isNaN(row[col.key])
                            ? Number.parseFloat(row[col.key]).toFixed(3)
                            : row[col.key]}
                        </td>
                      );
                  })}
                </tr>
              );
            })}
          </tbody>
        )}
    </table>
  );
};

// Proptypes here are use-case specific for the sake of terseness
ResponsiveTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      hideable: PropTypes.bool.isRequired
    })
  ).isRequired,
  row_data: PropTypes.arrayOf(
    PropTypes.shape({
      lenderName: PropTypes.string,
      loanType: PropTypes.string,
      interestRate: PropTypes.number,
      closingCosts: PropTypes.number,
      monthlyPayment: PropTypes.number,
      apr: PropTypes.number
    })
  )
};

export default ResponsiveTable;
