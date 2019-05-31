// Button.spec.js
import React from "react";
import jest from "jest-mock";
import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import Button from ".";

describe("Button component", () => {
  it("should be defined", () => {
    expect(Button).toBeDefined();
  });

  it("shows button text", () => {
    const button = renderer.create(<Button>Test Button</Button>);
    expect(button.toJSON()).toMatchSnapshot();
  });

  it("shows rounded button", () => {
    const button = renderer.create(<Button rounded>Test Button</Button>);
    const tree = button.toJSON();
    expect(tree.props.className).toContain("rounded");
  });

  it("should call mock function when button is clicked", () => {
    enzyme.configure({ adapter: new Adapter() });
    const mockFn = jest.fn();
    const tree = enzyme.shallow(<Button onClick={mockFn}>Test Button</Button>);
    tree.simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });
});
