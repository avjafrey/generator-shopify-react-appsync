import { AppProvider } from "@shopify/polaris";
import * as React from "react";
import * as TestRenderer from "react-test-renderer";
import { Callback } from "../Callback";

test("Renders correctly with no error", () => {
  const login = (
    <AppProvider>
      <Callback errorMessage={null} loginUrl="/" />
    </AppProvider>
  );

  const component = TestRenderer.create(login);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Renders correctly with error", () => {
  const login = (
    <AppProvider>
      <Callback errorMessage={"Something went wrong"} loginUrl="/" />
    </AppProvider>
  );

  const component = TestRenderer.create(login);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
