// Input.spec.js
import React from "react";
import jest from "jest-mock";
import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { matchers } from "jest-emotion";
import renderer from "react-test-renderer";
import Input from ".";

expect.extend(matchers);

describe("Input component", () => {
  it("should be defined", () => {
    expect(Input).toBeDefined();
  });

  it("shows Input text", () => {
    const input = renderer.create(<Input>Test Input</Input>);
    expect(input.toJSON()).toMatchSnapshot();
  });

  it("shows pill Input type", () => {
    const input = renderer.create(<Input variant="pill">Test Input</Input>);
    const tree = input.toJSON();
    expect(tree).toHaveStyleRule("border-radius", "50px");
  });

  it("shows rounded Input type", () => {
    const input = renderer.create(<Input variant="rounded">Test Input</Input>);
    const tree = input.toJSON();
    expect(tree).toHaveStyleRule("border-radius", "5px");
  });

  it("should call mock function when Input is changed", () => {
    enzyme.configure({ adapter: new Adapter() });
    const mockFn = jest.fn();
    const component = enzyme.mount(<Input onChange={mockFn} />);
    component.find("input").simulate("change");
    expect(mockFn).toBeCalled;
  });
});
