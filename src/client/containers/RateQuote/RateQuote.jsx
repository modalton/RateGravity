import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import RQActions from "./RateQuoteActions.js";
import RateForm from "../../components/RateForm.jsx";
import ResponsiveTable from "../../components/ResponsiveTable.jsx";

const mapStateToProps = store => {
  return { ...store };
};

const mapDispatchToProps = dispatch => ({
  fetchRateQuote: () => {
    dispatch({ type: RQActions.FETCH_REQUEST });
  }
});

class RateQuote extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchRateQuote();
  }

  render() {
    return (
      <div>
        {JSON.stringify(this.props.hello)}
        <RateForm />
        <ResponsiveTable />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RateQuote);
