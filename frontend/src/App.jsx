import React from "react";
import Play from "./pages/play.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import NotFoundPage from "./layout/NotFound.jsx";
import Layout from "./layout/mainLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Play />} />

      {/* Add more routes if needed */}
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const App = () => <RouterProvider router={router} />;

export default App;
