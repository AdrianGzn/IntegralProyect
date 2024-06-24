import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import TeacherHome from './pages/teacher/TeacherHome.jsx'
import TeacherBallots from './pages/teacher/TeacherBallots.jsx'
import EscolarControlBallots from './pages/escolarControl/EscolarControlBallots.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/management/home",
    element: <p>hola management</p>,
  },
  {
    path: "/teacher/home",
    element: <TeacherHome />,
  },
  {
    path: "/teacher/ballots",
    element: <TeacherBallots />,
  },
  {
    path: "/escolarControl/home",
    element: <p>Hola escolarControl</p>,
  },
  {
    path: "/escolarControl/ballots",
    element: <EscolarControlBallots />,
  },
  {
    path: "/resourses/home",
    element: <p>hola resourses</p>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
