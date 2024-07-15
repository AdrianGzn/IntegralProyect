import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'

import ManagementHome from './pages/management/ManagementHome.jsx'
import ManagementReports from './pages/management/ManagementReports.jsx'

import TeacherHome from './pages/teacher/TeacherHome.jsx'
import TeacherReports from './pages/teacher/TeacherReports.jsx'
import TeacherQualifications from './pages/teacher/TeacherQualifications.jsx'
import TeacherAsistance from './pages/teacher/TeacherAsistance.jsx'
import TeacherBallots from './pages/teacher/TeacherBallots.jsx'

import EscolarControlHome from './pages/escolarControl/EscolarControlHome.jsx'
import EscolarControlBallots from './pages/escolarControl/EscolarControlBallots.jsx'
import EscolarControlQualifications from './pages/escolarControl/EscolarControlQualifications.jsx'

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
    element: <ManagementHome />,
  },
  {
    path: "/management/reports",
    element: <ManagementReports />,
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
    path: "/teacher/asistance",
    element: <TeacherAsistance />,
  },
  {
    path: "/teacher/reports",
    element: <TeacherReports />,
  },
  {
    path: "/teacher/qualifications",
    element: <TeacherQualifications />,
  },
  {
    path: "/escolarControl/home",
    element: <EscolarControlHome />,
  },
  {
    path: "/escolarControl/ballots",
    element: <EscolarControlBallots />,
  },
  {
    path: "/escolarControl/qualifications",
    element: <EscolarControlQualifications />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
