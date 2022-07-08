import React from "react";
import { render, screen } from "@testing-library/react";
import HomePageHeader from "./views/homePage/components/homePageHeader";
import { Provider } from "react-redux";
import { createStore } from "./store";
import NewReleases from "./views/homePage/components/newReleases";
import LibraryHeader from "./views/library/components/libraryHeader";
import { Login } from "./views/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATH_NAMES } from "./utilities/constants";
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

test("My library Button renders", (): void => {
  render(
    <Provider store={createStore()}>
      <BrowserRouter>
        <HomePageHeader />
      </BrowserRouter>
        
    </Provider>
  );
  const divElement = screen.getByTestId("library");
  expect(divElement).toHaveTextContent("My library");
});

test("New releases renders", (): void => {
  render(
    <Provider store={createStore()}>
      <NewReleases />
    </Provider>
  );
  const divElement = screen.getByTestId("new-releases");
  expect(divElement).toHaveTextContent("New Releases");
});

test("My library Text renders", (): void => {
  render(
    <Provider store={createStore()}>
      <BrowserRouter>
        <LibraryHeader />
      </BrowserRouter>
    </Provider>
  );
  const divElement = screen.getByTestId("library-text");
  expect(divElement).toHaveTextContent("My Library");
});

test("Search Button renders", (): void => {
  render(
    <Provider store={createStore()}>
      <BrowserRouter>
        <LibraryHeader />
      </BrowserRouter>
        
    </Provider>
  );
  const divElement = screen.getByTestId("search");
  expect(divElement).toHaveTextContent("Search");
});

test("Login Button renders", (): void => {
  render(
    <Provider store={createStore()}>
      <Login />
    </Provider>
  );
  const divElement = screen.getByTestId("login");
  expect(divElement).toHaveTextContent("LOG IN");
});
