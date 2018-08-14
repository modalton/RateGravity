import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import style from "../styles.css";

// I prefer to keep simple local form state out of redux
// https://github.com/reduxjs/redux/issues/1287#issuecomment-175351978
export default class RateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loanSize: "",
      creditScore: "",
      propertyType: "SingleFamily",
      occupancy: "Primary"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const state_copy = this.state;
    state_copy.creditScore = parseInt(state_copy.creditScore);
    state_copy.loanSize = parseFloat(state_copy.loanSize);
    this.props.JSONSubmit(state_copy);
  }

  render() {
    return (
      <form className="rate-form-form" onSubmit={this.handleSubmit}>
        <div className="form-box">
          <div className="form-bar">
            <label>Loan Size: </label>
            <input
              name="loanSize"
              type="number"
              onChange={this.handleChange}
              value={this.state.loanSize}
              min="1"
              required
            />
          </div>

          <div className="form-bar">
            <label> Credit Score: </label>
            <input
              name="creditScore"
              type="number"
              onChange={this.handleChange}
              value={this.state.creditScore}
              min="300"
              max="850"
              required
            />
          </div>
        </div>

        <div className="form-box">
          <div className="form-bar">
            <label>Property Type: </label>
            <select
              name="propertyType"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <option value="SingleFamily">Single Family</option>
              <option value="Condo">Condominium</option>
              <option value="Townhouse">Townhouse</option>
              <option value="MultiFamily">Multi-Family</option>
            </select>
          </div>

          <div className="form-bar">
            <label> Occupancy: </label>
            <select
              name="occupancy"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
              <option value="Investment">Investment</option>
            </select>
          </div>
        </div>

        <br />
        {!this.props.done && (
          <div className="loader-container">
            <div className="loader" />
          </div>
        )}
        {this.props.error && <div className="error">Request Error</div>}
        <button type="submit" className="submit-button">
          Quote Rates
        </button>
      </form>
    );
  }
}

RateForm.propTypes = {
  JSONSubmit: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired
};
