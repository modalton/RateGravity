import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import RQActions from "./RateQuoteActions.js";
import RateForm from "../../components/RateForm.jsx";
import ResponsiveTable from "../../components/ResponsiveTable.jsx";

const mapStateToProps = store => {
  return { ...store, row_data: store.quotes };
};

const mapDispatchToProps = dispatch => ({
  requestRateQuote: request_body => {
    dispatch({ type: RQActions.RQ_REQUEST, payload: request_body });
  }
});

class RateQuote extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Columns hoisted from const below b/c it's just not very readable inline
    const table = {
      columns: columns,
      row_data: this.props.row_data
    };

    return (
      <div className="RQ-container">
        <RateForm
          error={this.props.error}
          done={this.props.done}
          JSONSubmit={this.props.requestRateQuote}
        />
        <ResponsiveTable {...table} />
      </div>
    );
  }
}

const columns = [
  {
    title: "Lender",
    key: "lenderName",
    hideable: false
  },
  {
    title: "Product",
    key: "loanType",
    hideable: false
  },
  {
    title: "Rate",
    key: "interestRate",
    hideable: false
  },
  {
    title: "Closing Costs",
    key: "closingCosts",
    hideable: false
  },
  {
    title: "Monthly Payment",
    key: "monthlyPayment",
    hideable: true
  },
  {
    title: "APR",
    key: "apr",
    hideable: true
  }
];

export default connect(mapStateToProps, mapDispatchToProps)(RateQuote);
