import React from "react";
import Button from "../../components/atoms/Button";
import Input from "../../components/atoms/Input";
import Select from "../atoms/Select";
import Text from "../atoms/Text";
import Swal from "sweetalert2";
import "@sweetalert2/theme-bulma"
function NewReport({ onClick, topicRef, statusTopic, options }) {

  const handleCreateReport = () => {
    if (!topicRef.current || !topicRef.current.value) {
        Swal.fire({
            title: "Agregar",
            text: "ingrese los datos",
            icon: "error"
        })
      return;
    }
    const isAccepted = statusTopic.current.value === "Aceptar";
    onClick(topicRef.current.value, isAccepted);
  };

  return (
    <div className="w-[90%] bg-gray-800 p-6 rounded-lg">
      <Text text="Crear nuevo reporte" className="!text-2xl !text-white mb-4" />
      <div className="mb-4">
        <Text text="Descripción" className="!text-base !text-gray-250" />
        <Input
          placeholder="Informe"
          className="ml-4 mt-2 p-3 w-15 h-[50%] rounded-md border border-gray-600 bg-slate-700 text-white focus:border-blue-500"
          ref={topicRef}
        />
        <Text text="Status" className="!text-base !text-gray-250" />
        <Select ref={statusTopic} options={options} className="!my-5 bg-lime-500"></Select>
      </div>
      <Button onClick={handleCreateReport} text="Crear" className="bg-green-600 text-white py-2 px-4 rounded" />
    </div>
  );
}

export default NewReport;

