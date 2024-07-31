import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from './context/userContext.js';
import { useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import PDFformat from './components/atoms/PDFformat';
import React from 'react';

import ProtectedTeacher from "./components/organisms/protected/ProtectedTeacher.jsx";
import ProtectedEscolarControl from "./components/organisms/protected/ProtectedEscolarControl.jsx";

import Login from './pages/Login.jsx'

import TeacherHome from './pages/teacher/TeacherHome.jsx'
import TeacherList from './pages/teacher/TeacherList.jsx'

import EscolarControlHome from './pages/escolarControl/EscolarControlHome.jsx'
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
            path= "/teacher/list"
            element= {<ProtectedTeacher><TeacherList /></ProtectedTeacher>}
          />
          <Route 
            path="/escolarControl/home"
            element = {<EscolarControlHome />} 
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
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
}


export default App;