import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getRole } from './data/userActual.js';
import ProtectedTeacher from "./components/organisms/protected/ProtectedTeacher.jsx";
import ProtectedManagement from "./components/organisms/protected/ProtectedManagement.jsx";
import ProtectedEscolarControl from "./components/organisms/protected/ProtectedEscolarControl.jsx";

import App from './App.jsx'

import ManagementHome from './pages/management/ManagementHome.jsx'
import ManagementReports from './pages/management/ManagementReports.jsx'

import TeacherHome from './pages/teacher/TeacherHome.jsx'
import TeacherReports from './pages/teacher/TeacherReports.jsx'
import TeacherQualifications from './pages/teacher/TeacherQualifications.jsx'
import TeacherBallots from './pages/teacher/TeacherBallots.jsx'

import EscolarControlHome from './pages/escolarControl/EscolarControlHome.jsx'
import EscolarControlBallots from './pages/escolarControl/EscolarControlBallots.jsx'
import EscolarControlQualifications from './pages/escolarControl/EscolarControlQualifications.jsx'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/management/home",
    element: <ProtectedManagement><ManagementHome /></ProtectedManagement>,
  },
  {
    path: "/management/reports",
    element: <ProtectedManagement><ManagementReports /></ProtectedManagement>,
  },
  {
    path: "/teacher/home",
    element: <ProtectedTeacher><TeacherHome /></ProtectedTeacher>,
  },
  {
    path: "/teacher/ballots",
    element: <ProtectedTeacher><TeacherBallots /></ProtectedTeacher>,
  },
  {
    path: "/teacher/reports",
    element: <ProtectedTeacher><TeacherReports /></ProtectedTeacher>,
  },
  {
    path: "/teacher/qualifications",
    element: <ProtectedTeacher><TeacherQualifications /></ProtectedTeacher>,
  },
  {
    path: "/escolarControl/home",
    element: <ProtectedEscolarControl><EscolarControlHome /></ProtectedEscolarControl>,
  },
  {
    path: "/escolarControl/ballots",
    element: <ProtectedEscolarControl><EscolarControlBallots /></ProtectedEscolarControl>,
  },
  {
    path: "/escolarControl/qualifications",
    element: <ProtectedEscolarControl><EscolarControlQualifications /></ProtectedEscolarControl>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)