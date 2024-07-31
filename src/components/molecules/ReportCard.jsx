import Text from "../atoms/Text";
import React from "react";
function ReportCard({ id, status, description }) {
    return (
        <div className="p-4 bg-slate-700 w-64 my-5 rounded-lg  min-h-40 shadow-sm">
            <div className="mb-3">
                <div className="flex items-center mb-2">
                    <Text text="Id:" className="!m-0 !text-base font-semibold text-gray-300" />
                    <Text text={id} className="!mx-2 !text-base text-gray-100" />
                </div>
                <div className="flex items-center mb-2">
                    <Text text="Estatus:" className="!m-0 !text-base font-semibold text-gray-300" />
                    <Text text={status} className={`!mx-2 !text-base ${status ? "text-green-500" : "text-red-500"}`} />
                </div>
                <div className="flex items-center mb-2">
                    <Text text="Descripción:" className="!m-0 !text-base font-semibold text-gray-300" />
                    <Text text={description} className="!m-0 !text-sm text-gray-100 mt-1" />
                </div>
            </div>

        </div>
    );
}

export default ReportCard;
