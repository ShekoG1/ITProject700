import './App.css';
import {  createBrowserRouter,
  RouterProvider,} from "react-router-dom";
// Import Layout 
import Layout from './components/Layout';
// Import Pages
import Login from "./views/auth/Login";
import Academics from "./views/Academics"
import Dashboard from "./views/Dashboard";
import Finances from "./views/Finances";
import StudentInfo from './views/StudentInfo';


function App() {

    // initialize a browser router and define paths
    const router = createBrowserRouter([
      {
        element: <Layout />,
        children: 
        [
          {
            path: "/",
            element: <Login />,
          },
          {
            path: "/Dashboard",
            element: <Dashboard />,
          },
          {
            path: "/Finances",
            element: <Finances />,
          },
          {
            path: "/Academics",
            element: <Academics />,
          },
          {
            path: "/StudentInfo",
            element: <StudentInfo />,
          },
        ]
      }
    ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
