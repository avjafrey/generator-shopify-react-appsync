import { AppProvider } from "@shopify/polaris";
import * as React from "react";
import * as TestRenderer from "react-test-renderer";
import { Login } from "../Login";

const enptyFn = () => { return; };

test("Renders correctly with no error or shop", () => {
  const login = (
    <AppProvider>
      <Login
        disableInstall={false}
        handleStoreChanged={enptyFn}
        handleSubmit={enptyFn}
        errorMessage={undefined}
        installMessage="Install"
        shop={""}
      />
    </AppProvider>
  );

  const component = TestRenderer.create(login);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Renders correctly with shop", () => {
  const login = (
    <AppProvider>
      <Login
        disableInstall={false}
        handleStoreChanged={enptyFn}
        handleSubmit={enptyFn}
        errorMessage={undefined}
        installMessage="Install"
        shop={"example.myshopify.com"}
      />
    </AppProvider>
  );

  const component = TestRenderer.create(login);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Renders correctly with shop and disabled install", () => {
  const login = (
    <AppProvider>
      <Login
        disableInstall={true}
        handleStoreChanged={enptyFn}
        handleSubmit={enptyFn}
        errorMessage={undefined}
        installMessage="Install"
        shop={"example.myshopify.com"}
      />
    </AppProvider>
  );

  const component = TestRenderer.create(login);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test("Renders correctly with error", () => {
  const login = (
    <AppProvider>
      <Login
        disableInstall={false}
        handleStoreChanged={enptyFn}
        handleSubmit={enptyFn}
        errorMessage={"Store domain name is wrong"}
        installMessage="Install"
        shop={"example.myshopify.comx"}
      />
    </AppProvider>
  );

  const component = TestRenderer.create(login);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
