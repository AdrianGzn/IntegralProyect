import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from './context/userContext.js';
import { useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import PDFformat from './components/atoms/PDFformat';
import React from 'react';

import ProtectedTeacher from "./components/organisms/protected/ProtectedTeacher.jsx";
import ProtectedManagement from "./components/organisms/protected/ProtectedManagement.jsx";
import ProtectedEscolarControl from "./components/organisms/protected/ProtectedEscolarControl.jsx";

import Login from './pages/Login.jsx'

import ManagementHome from './pages/management/ManagementHome.jsx'
import ManagementReports from './pages/management/ManagementReports.jsx'

import TeacherHome from './pages/teacher/TeacherHome.jsx'
import TeacherReports from './pages/teacher/TeacherReports.jsx'
import TeacherQualifications from './pages/teacher/TeacherQualifications.jsx'
import TeacherBallots from './pages/teacher/TeacherBallots.jsx'

import EscolarControlHome from './pages/escolarControl/EscolarControlHome.jsx'
import EscolarControlBallots from './pages/escolarControl/EscolarControlBallots.jsx'
import EscolarControlQualifications from './pages/escolarControl/EscolarControlQualifications.jsx'
import EscolarControlAlumns from './pages/escolarControl/EscolarControlAlumns.jsx'
import EscolarControlTeachers from './pages/escolarControl/EscolarControlTeachers.jsx'
import EscolarControlClass from "./pages/escolarControl/EscolarControlClass.jsx"

function App() {
  const [user, setUser] = useState({});

  return (
    /*
    Código para renderizar el PDF
    <div className="w-full h-screen">
      <PDFViewer className="w-full h-full">
        <PDFformat />
      </PDFViewer>
    </div>*/

    <BrowserRouter>
      <UserContext.Provider value={{user, setUser}} >
        <Routes>
          <Route
            index
            path="/"
            element = {<Login />} 
          />
          <Route 
            path="/teacher/home"
            element = {<ProtectedTeacher><TeacherHome /></ProtectedTeacher>} 
          />
          <Route
            path= "/teacher/ballots"
            element= {<ProtectedTeacher><TeacherBallots /></ProtectedTeacher>}
          />
          <Route
            path= "/teacher/reports"
            element= {<ProtectedTeacher><TeacherReports /></ProtectedTeacher>}
          />
          <Route 
            path= "/teacher/qualifications"
            element= {<ProtectedTeacher><TeacherQualifications /></ProtectedTeacher>}
          />
          <Route 
            path="/escolarControl/home"
            element = {<EscolarControlHome />} 
          />
          <Route
            path= "/escolarControl/ballots"
            element= {<ProtectedEscolarControl><EscolarControlBallots /></ProtectedEscolarControl>}
          />
          <Route
            path= "/escolarControl/qualifications"
            element= {<ProtectedEscolarControl><EscolarControlQualifications /></ProtectedEscolarControl>}
          />
          <Route
            path= "/escolarControl/alumns"
            element= {<ProtectedEscolarControl><EscolarControlAlumns /></ProtectedEscolarControl>}
          />
          <Route
            path= "/escolarControl/teachers"
            element= {<ProtectedEscolarControl><EscolarControlTeachers /></ProtectedEscolarControl>}
          />
          <Route
            path= "/escolarControl/class"
            element= {<ProtectedEscolarControl><EscolarControlClass /></ProtectedEscolarControl>}
          />
          <Route 
            path="/management/home"
            element = {<ProtectedManagement><ManagementHome /></ProtectedManagement>} 
          />
          <Route
            path= "/management/reports"
            element= {<ProtectedManagement><ManagementReports /></ProtectedManagement>}
          />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
}


export default App;