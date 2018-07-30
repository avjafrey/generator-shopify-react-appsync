import { AppProvider } from "@shopify/polaris";
import * as React from "react";
import * as TestRenderer from "react-test-renderer";
import { Spinner } from "../Spinner";

test("Renders correctly", () => {
  const login = (
    <AppProvider>
      <Spinner />
    </AppProvider>
  );

  const component = TestRenderer.create(login);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
