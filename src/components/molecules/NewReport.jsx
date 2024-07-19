import React from "react";
import Button from "../../components/atoms/Button";
import Input from "../../components/atoms/Input";
import Text from "../atoms/Text";
import Swal from "sweetalert2";
import "@sweetalert2/theme-bulma";

function NewReport({ onClick, topicRef }) {

  const handleCreateReport = () => {

    if (!topicRef.current || !topicRef.current.value) {
        Swal.fire({
            title: "Agregar",
            text: "ingrese los datos",
            icon: "error"
        })
      return;
    }else {
      onClick(topicRef.current.value);
    }

  };

  return (
    <div className="w-full md:w-[85%] min-h-80 bg-gray-800 rounded-lg pt-5 mb-10">
      <Text text="Crear nuevo reporte" className="!text-2xl !text-white !mt-0 mb-4 underline decoration-lime-500" />
      <div className="w-[90%] mx-5">
        <Text text="Descripción" className="!text-base !text-gray-250 my-1 mx-0" />
        <Input
          placeholder="Informe"
          className="!mx-0 ml-4 mt-0 p-3 w-full h-24 rounded-md border border-gray-600 bg-slate-700 text-white focus:border-blue-500"
          ref={topicRef}
        />
      </div>
      <Button onClick={handleCreateReport} text="Crear" className="bg-lime-600 text-white py-2 px-4 rounded" />
    </div>
  );
}

export default NewReport;

