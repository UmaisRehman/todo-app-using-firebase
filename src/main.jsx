import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoutes from './components/ProtectedRoutes'
import Todo from './pages/Todo'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <ProtectedRoutes component={<Home />} />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "todo",
        element:  <ProtectedRoutes component={<Todo />} />
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)