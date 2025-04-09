import React from "react";
import Play from "./pages/play.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./layout/mainLayout";

// import NotFoundPage from "./pages/NotFoundPage"; // create if needed

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
        <Route path="/" element={<Play />} />
      
      {/* Add more routes if needed */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Route>
  )
);

const App = () => <RouterProvider router={router} />;

export default App;
