import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";

import App from "./pages/App/App";
import Apps from "./pages/Apps/Apps";
import Assets from "./pages/Assets/Assets";
import Data from "./pages/Data/Data";
import Home from "./pages/Home/Home";
import Pages from "./pages/Pages/Pages";

export const ROUTES = {
    HOME: '/',
    APPS: 'apps',
    ASSETS: 'assets',
    DATA: 'data'
};

function Router() {

  return (
      <BrowserRouter basename="/">
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.APPS}>
            <Route path="" element={<Apps />} />

            <Route path=":pageId" element={<App />}>
              <Route path="" element={<Pages />} />
              <Route path={ROUTES.ASSETS} element={<Assets />} />
              <Route path={ROUTES.DATA} element={<Data />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default Router
