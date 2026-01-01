import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LayoutPage from "./Layout/LayoutPage"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Orders from "./pages/Orders"
import Products from "./pages/Products"
import AddProduct from "./pages/AddProduct"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "orders",
        element: <Orders />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "products/add",
        element: <AddProduct />
      }
    ]
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
