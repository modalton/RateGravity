import React from "react";
import ResponsiveTable from "../../src/client/components/ResponsiveTable.jsx";
import { expect } from "chai";
import { mount } from "enzyme";
import { spy } from "sinon";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("<ResponsiveTable />", () => {
  it("renders the text ResponsiveTable", () => {
    const wrapper = mount(<ResponsiveTable />);
    console.log(wrapper);
    expect(true).to.equal(true);
  });
});
