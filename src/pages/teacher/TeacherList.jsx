import React, { useState, useEffect } from 'react';
import Header from '../../components/organisms/Header';
import { getId } from '../../data/userActual';
import '@sweetalert2/theme-bulma';
import TableList from '../../components/organisms/TableList';
import IconPDf from "../../components/atoms/IconPDF";
import Swal from 'sweetalert2';

function TeacherList() {
  const [data, setData] = useState([]);
  const [alumns, setAlumns] = useState([]);
  const [urls, setUrls] = useState([]);
  const [checkedCells, setCheckedCells] = useState(new Set());

  const headers = ["Num lista", "Nombre", "Apellidos", "Asistencia"];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/personal`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.ok ? response.json() : Promise.reject('La respuesta no es ok.'))
    .then(data => {
      console.log(data);
      const personalData = data.find(item => item.personal_id == getId());
      if (personalData) {
        setAlumns(personalData.alumns || []);
        const urlsArray = Array.isArray(personalData.url) ? personalData.url : [personalData.url];
        const extractedUrls = urlsArray.map(url => extractUrlFromString(url)).filter(url => url); 
        setUrls(extractedUrls);
        console.log(extractedUrls);
      }
    })
    .catch(error => console.log("Ha ocurrido un error: " + error));
  }, []);

  useEffect(() => {
    if (alumns.length > 0) {
      const newData = alumns.map(item => ({
        col1: item.alumn_id,
        col2: item.name,
        col3: item.lastName,
        col7: ''
      }));
      setData(newData);
    }
  }, [alumns]);

  const extractUrlFromString = (str) => {
    const match = str.match(/"([^"]+)"/);
    return match ? match[1] : null;
  };

  const extractFileName = (url) => {
    return url.substring(url.lastIndexOf('/') + 1);
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 overflow-x-hidden">
      <Header role="teacher" />
      <div className="w-full h-[80vh] flex justify-center items-center">
        <div className="h-4/5 w-4/6 lg:w-4/6 flex flex-col wrap items-center">
          <TableList
            title="Lista de asistencia"
            data={data}
            headers={headers}
            size={4}
            checkedCells={checkedCells}
            setCheckedCells={setCheckedCells}
          />
          <p className='mt-4 text-blue-600 text-xl hover:text-blue-800 cursor-pointer transition-colors duration-300'>
            Listas de asistencia
          </p>
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            {urls.length > 0 ? (
              <ul className="list-disc pl-6">
                {urls.map((url, index) => (
                  <li key={index} className="flex items-center mb-2 text-blue-600 hover:text-blue-800 transition-colors duration-300">
                    <IconPDf className="mr-2" /> 
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {extractFileName(url)}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-gray-600'>No hay listas de asistencia disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherList;

