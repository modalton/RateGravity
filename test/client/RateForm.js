import React from "react";
import RateForm from "../../src/client/components/RateForm.jsx";
import { expect } from "chai";
import { mount } from "enzyme";
import { spy } from "sinon";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("<RateForm />", () => {
  it("renders a form", () => {
    const wrapper = mount(<RateForm JSONSubmit={() => {}} />);
    expect(wrapper.exists("form")).to.equal(true);
  });

  it("contains accurate amount of  labels, inputs, selects, and submit button", () => {
    const wrapper = mount(<RateForm JSONSubmit={() => {}} />);
    expect(wrapper.find(`input[type="number"]`)).to.have.length(2);
    expect(wrapper.find("select")).to.have.length(2);
    expect(wrapper.find("label")).to.have.length(4);
    expect(wrapper.find("button")).to.have.length(1);
  });

  it("doesn't submit if input fields aren't valid type", () => {
    const cb = spy();
    const wrapper = mount(<RateForm JSONSubmit={cb} />);
    wrapper.setState({
      loan_size: "A string!",
      credit_score: true,
      property_type: "SingleFamily",
      occupancy: "Primary"
    });

    wrapper.find("button").simulate("click");
    expect(cb).to.have.property("callCount", 0);
  });

  it("doesn't submit if numerical input fields aren't valid values", () => {
    const cb = spy();
    const wrapper = mount(<RateForm JSONSubmit={cb} />);
    wrapper.setState({
      loan_size: -1,
      credit_score: 0,
      property_type: "SingleFamily",
      occupancy: "Primary"
    });

    wrapper.find("button").simulate("click");
    expect(cb).to.have.property("callCount", 0);
  });

  it("on valid submit, calls 'JSONSubmit' prop with correct JSON object", () => {
    const cb = spy();
    const wrapper = mount(<RateForm JSONSubmit={cb} />);
    const fake_state = {
      loan_size: "10000",
      credit_score: "600",
      property_type: "SingleFamily",
      occupancy: "Primary"
    };
    wrapper.setState(fake_state);

    wrapper.find("button").simulate("submit");
    expect(cb.calledOnceWithExactly(fake_state)).to.equal(true);
  });
});
