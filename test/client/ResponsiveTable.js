import React from "react";
import ResponsiveTable from "../../src/client/components/ResponsiveTable.jsx";
import { expect } from "chai";
import { mount } from "enzyme";
import { spy } from "sinon";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("<ResponsiveTable />", () => {
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

  const entry = {
    lenderName: "TFB Federal Credit Union",
    loanType: "30YR Fixed",
    interestRate: 4.12567889,
    closingCosts: 10000,
    monthlyPayment: 1000,
    apr: 4.25
  };

  it("renders a table ", () => {
    const fake_table = { columns, row_data: [] };
    const wrapper = mount(<ResponsiveTable {...fake_table} />);
    expect(wrapper.exists("table")).to.equal(true);
  });

  it("renders columns even with no row data", () => {
    const fake_table = {
      columns,
      row_data: []
    };
    const wrapper = mount(<ResponsiveTable {...fake_table} />);
    expect(wrapper.find("th")).to.have.length(6);
  });

  it("renders accuratly supplied columns and row data", () => {
    const fake_table = {
      columns,
      row_data: Array.from(new Array(10).fill(entry))
    };
    const wrapper = mount(<ResponsiveTable {...fake_table} />);
    expect(wrapper.find("th")).to.have.length(6);
    expect(wrapper.find("td")).to.have.length(60);
  });

  it("limits the length of floats at 3 decimal places", () => {
    const fake_table = {
      columns,
      row_data: Array.from(new Array(10).fill(entry))
    };
    const wrapper = mount(<ResponsiveTable {...fake_table} />);
    expect(
      wrapper
        .find("td")
        .at(2)
        .text()
    ).to.have.length(5);
  });
});
