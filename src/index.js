import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Collection from './components/Collection/Collection';
import Aboutus from './pages/aboutus';
import Author from './pages/author';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

<script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><App /></div>,
  },
  {
    path: "collection",
    element: <Collection />
  },
  {
    path: "aboutus",
    element: <Aboutus />
  },
  {
    path: "profile",
    element: <Author />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
