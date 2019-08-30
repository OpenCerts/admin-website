// Button.spec.js
import React from "react";
import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { matchers } from "jest-emotion";
import renderer from "react-test-renderer";
import { Alert, RedAlert } from ".";
import { invalidBackground, invalidColor } from "../../../styles/variables";

expect.extend(matchers);

describe("Alert component", () => {
  enzyme.configure({ adapter: new Adapter() });
  it("should be defined", () => {
    expect(Alert).toBeDefined();
  });

  it("shows alert text", () => {
    const alert = renderer.create(<Alert>Test Alert</Alert>);
    expect(alert.toJSON()).toMatchSnapshot();
  });

  it("shows red alert", () => {
    const alert = renderer.create(<RedAlert>Test Alert</RedAlert>);
    const tree = alert.toJSON();
    expect(tree).toHaveStyleRule("background", invalidBackground);
    expect(tree).toHaveStyleRule("color", invalidColor);
  });
});
