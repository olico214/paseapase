import React from 'react';

export default function FormUserComponent({ data }) {
    const formDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center p-4 text-lg font-semibold text-gray-600">
                Cargando Datos...
            </div>
        );
    } else {
        return (
            <div className="flex items-center justify-center p-4">
                <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
                    <div className="grid gap-6">
                        <div className="grid items-center grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="text-lg font-semibold text-gray-700">Nombre: <span className="font-medium text-gray-900">{data.fullName}</span></div>
                            <div className="text-lg font-semibold text-gray-700">Fecha de nacimiento: <span className="font-medium text-gray-900">{formDate(data.birthDate)}</span></div>
                            <div className="text-lg font-semibold text-gray-700">Fecha de ingreso a la academia: <span className="font-medium text-gray-900">{formDate(data.alta_date)}</span></div>
                        </div>
                        <div className="grid items-center grid-cols-1 gap-4 md:grid-cols-4">
                            <div className="text-lg font-semibold text-gray-700">Nombre tutor o Responsable: <span className="font-medium text-gray-900">{data.parent_name}</span></div>
                            <div className="text-lg font-semibold text-gray-700">Parentesco: <span className="font-medium text-gray-900">{data.parent}</span></div>
                            <div className="text-lg font-semibold text-gray-700">Teléfono de emergencia: <span className="font-medium text-gray-900">{data.parent_emergency}</span></div>
                            <div className="text-lg font-semibold text-gray-700">Whatsapp: <span className="font-medium text-gray-900">{data.parent_Whatsapp}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
