"use client"
import { useEffect, useState } from "react"
import { Button } from "@nextui-org/react"
import { FiUsers, FiCalendar, FiBell, FiPlus } from "react-icons/fi"
import FormularioAlumno from "./component/form"
import TableAlumno from "./component/table"
import { fetchAllalumnos } from "./component/scripts"
import FormularioPeriodo from "./component/formPeriodo"
import RecordatorioPage from "./component/recordatorio"

export default function BoletaPage() {
    const [data, setData] = useState([])

    useEffect(() => {
        asycnfetchData()
    }, [])

    const asycnfetchData = async () => {
        const response = await fetchAllalumnos()
        setData(response)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Alumnos</h1>
                    <p className="text-slate-500 mt-1">Gestiona alumnos, periodos y recordatorios</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <FormularioAlumno boton={"Nuevo alumno"} refreshData={asycnfetchData} />
                    <FormularioPeriodo />
                    <RecordatorioPage />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                    { icon: FiUsers, label: "Total alumnos", value: data.length, color: "bg-primary/10 text-primary" },
                    { icon: FiCalendar, label: "Periodos activos", value: "—", color: "bg-emerald-100 text-emerald-600" },
                    { icon: FiBell, label: "Recordatorios", value: "—", color: "bg-amber-100 text-amber-600" },
                ].map((card, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${card.color}`}>
                            <card.icon className="text-xl" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{card.label}</p>
                            <p className="text-2xl font-bold text-slate-800">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="font-semibold text-slate-700">Lista de alumnos</h2>
                </div>
                <TableAlumno data={data} refreshData={asycnfetchData} />
            </div>
        </div>
    )
}
