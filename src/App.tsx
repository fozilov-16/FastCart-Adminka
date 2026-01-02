import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LayoutPage from "./Layout/LayoutPage"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Orders from "./pages/Orders"
import Products from "./pages/Products"
import Others from "./pages/Others"
import Categories from "./pages/other/Categories"
import Brands from "./pages/other/Brands"
import Banners from "./pages/other/Banners"

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
        path: "others",
        element: <Others />,
        children: [
          {
            path: 'Categories',
            element: <Categories/>
          },
          {
            path: 'Brands',
            element: <Brands/>
          },
          {
            path: 'Banners',
            element: <Banners/>
          },
        ]
      }
    ]
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
