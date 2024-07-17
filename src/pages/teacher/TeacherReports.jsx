import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/organisms/Header";
import NewReport from "../../components/molecules/NewReport";
import ReportsSection from "../../components/organisms/ReportsSection";
import Swal from "sweetalert2";
import '@sweetalert2/theme-bulma';

function TeacherReports() {
  const [reports, setReports] = useState([]);
  const topicRef = useRef(null);
  const statusTopicRef = useRef(null);
  const options = ["Aceptar", "Denegar"];

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = () => {
    fetch(`${import.meta.env.VITE_URL}/report`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch reports');
      })
      .then(data => {
        setReports(data);
      })
      .catch(error => {
        console.error('Error fetching reports:', error);
        Swal.fire('Error', 'Failed to fetch reports', 'error');
      });
  };

  const addReport = (topic, isAccepted) => {

    fetch(`${import.meta.env.VITE_URL}/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personal_id: 1,
        topic: topic,
        created_by: "teacher",
        updated_by: "teacher",
        deleted: isAccepted
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add report');
        }
        return response.json();
      })
      .then(data => {
        setReports(prevReports => [...prevReports, data]);
        Swal.fire({
          title: "Agregar reporte",
          text: "El reporte se agregó correctamente",
          icon: "success"
        });
      })
      .catch(error => {
        console.error('Error adding report:', error);
        Swal.fire('Error', 'Failed to add report', 'error');
      });
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col">
      <Header role="teacher" />
      <div className="flex-grow flex justify-center items-start">
        <div className="min-h-[80%] w-4/6 p-4 rounded-s">
          <NewReport topicRef={topicRef} statusTopic={statusTopicRef} options={options} onClick={addReport} />
          <ReportsSection reports={reports}></ReportsSection>
        </div>
      </div>
    </div>
  );
}

export default TeacherReports;
