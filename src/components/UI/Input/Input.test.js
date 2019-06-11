// Input.spec.js
import React from "react";
import jest from "jest-mock";
import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import Input from ".";

describe("Input component", () => {
  it("should be defined", () => {
    expect(Input).toBeDefined();
  });

  it("shows Input text", () => {
    const input = renderer.create(<Input>Test Input</Input>);
    expect(input.toJSON()).toMatchSnapshot();
  });

  it("shows pill Input type", () => {
    const input = renderer.create(<Input type="pill">Test Input</Input>);
    const tree = input.toJSON();
    expect(tree.props.type).toContain("pill");
  });

  it("should call mock function when Input is changed", () => {
    enzyme.configure({ adapter: new Adapter() });
    const mockFn = jest.fn();
    const tree = enzyme.shallow(<Input onChange={mockFn}>Test Input</Input>);
    tree.simulate("change");
    expect(mockFn).toHaveBeenCalled();
  });
});
