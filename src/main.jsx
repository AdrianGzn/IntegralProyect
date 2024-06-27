import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'

import ManagementHome from './pages/management/ManagementHome.jsx'
import ManagementReports from './pages/management/ManagementReports.jsx'
import ManagementResourses from './pages/management/ManagementResourses.jsx'

import TeacherHome from './pages/teacher/TeacherHome.jsx'
import TeacherReports from './pages/teacher/TeacherReports.jsx'
import TeacherQualifications from './pages/teacher/TeacherQualifications.jsx'
import TeacherAsistance from './pages/teacher/TeacherAsistance.jsx'
import TeacherSchedules from './pages/teacher/TeacherSchedules.jsx'
import TeacherBallots from './pages/teacher/TeacherBallots.jsx'
import TeacherMeetings from './pages/teacher/TeacherMeetings.jsx'

import EscolarControlHome from './pages/escolarControl/EscolarControlHome.jsx'
import EscolarControlMeetings from './pages/escolarControl/EscolarControlMeetings.jsx'
import EscolarControlSchedules from './pages/escolarControl/EscolarControlSchedules.jsx'
import EscolarControlBallots from './pages/escolarControl/EscolarControlBallots.jsx'

import ResoursesHome from './pages/resourses/ResoursesHome.jsx'
import ResoursesAdministration from './pages/resourses/ResoursesAdministration.jsx'

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
    path: "/management/resourses",
    element: <ManagementResourses />,
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
    path: "/teacher/schedules",
    element: <TeacherSchedules />,
  },
  {
    path: "/teacher/meetings",
    element: <TeacherMeetings />,
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
    path: "/escolarControl/schedules",
    element: <EscolarControlSchedules />,
  },
  {
    path: "/escolarControl/meetings",
    element: <EscolarControlMeetings />,
  },  
  {
    path: "/resourses/home",
    element: <ResoursesHome />,
  },
  {
    path: "/resourses/administration",
    element: <ResoursesAdministration />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
