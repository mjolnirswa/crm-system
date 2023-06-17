import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import Clients from './components/Clients/Clients.jsx';
import Orders from './components/Orders/Orders.jsx';
import Document from './components/Document/Document.jsx';
import Auth from './components/Auth/Auth.jsx';
import ErrorPage from './components/UI/ErrorPage.jsx';
import './firebase.js';
import User from './components/User/User.jsx';
import ClientPage from './components/Clients/ClientPage/ClientPage.jsx';
import OrdersPage from './components/Orders/OrdersPage/OrdersPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "clients",
        element: <Clients />,
      },
      {
        path: "clients/:clientId",
        element: <ClientPage/>
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "orders/:orderId",
        element: <OrdersPage/>
      },
      {
        path: "document",
        element: <Document />,
      },
      {
        path: "user",
        element: <User />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
