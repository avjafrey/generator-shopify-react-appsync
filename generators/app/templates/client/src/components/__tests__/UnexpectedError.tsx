import { AppProvider } from "@shopify/polaris";
import * as React from "react";
import * as TestRenderer from "react-test-renderer";
import { UnexpectedError } from "../UnexpectedError";

test("Renders correctly", () => {
  const login = (
    <AppProvider>
      <UnexpectedError />
    </AppProvider>
  );

  const component = TestRenderer.create(login);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
