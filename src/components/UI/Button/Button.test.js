// Button.spec.js
import React from "react";
import jest from "jest-mock";
import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { matchers } from "jest-emotion";
import renderer from "react-test-renderer";
import { Button, OrangeButton, BlueButton } from ".";
import { brandOrange, brandBlue } from "../../../styles/variables";

expect.extend(matchers);

describe("Button component", () => {
  enzyme.configure({ adapter: new Adapter() });
  it("should be defined", () => {
    expect(Button).toBeDefined();
  });

  it("shows button text", () => {
    const button = renderer.create(<Button>Test Button</Button>);
    expect(button.toJSON()).toMatchSnapshot();
  });

  it("shows pill button variant", () => {
    const button = renderer.create(<Button variant="pill">Test Button</Button>);
    const tree = button.toJSON();
    expect(tree).toHaveStyleRule("border-radius", "50px");
  });

  it("shows rounded button variant", () => {
    const button = renderer.create(
      <Button variant="rounded">Test Button</Button>
    );
    const tree = button.toJSON();
    expect(tree).toHaveStyleRule("border-radius", "5px");
  });

  it("shows orange button", () => {
    const button = renderer.create(<OrangeButton>Test Button</OrangeButton>);
    const tree = button.toJSON();
    expect(tree).toHaveStyleRule("background", brandOrange);
  });

  it("shows blue button", () => {
    const button = renderer.create(<BlueButton>Test Button</BlueButton>);
    const tree = button.toJSON();
    expect(tree).toHaveStyleRule("background", brandBlue);
  });

  it("should call mock function when button is clicked", () => {
    const mockFn = jest.fn();
    const tree = enzyme.shallow(<Button onClick={mockFn}>Test Button</Button>);
    tree.simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });
});
