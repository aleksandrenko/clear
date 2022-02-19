import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";

import App from "./pages/App/App";
import Apps from "./pages/Apps/Apps";
import Assets from "./pages/Assets/Assets";
import Data from "./pages/Data/Data";

function Router() {

  return (
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="apps">
            <Route path="" element={<Apps />} />

            <Route path=":pageId">
              <Route path="" element={<App />} />
              <Route path="assets" element={<Assets />} />
              <Route path="data" element={<Data />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default Router
