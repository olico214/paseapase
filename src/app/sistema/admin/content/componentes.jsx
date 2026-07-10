"use client"
import { useState, useEffect } from 'react'
import { Button, Tabs, Tab, Chip } from "@nextui-org/react"
import { FiUsers, FiFileText, FiPlus } from "react-icons/fi"
import TableUserComponent from "./navigation/tableuser"
import FormPagesComponent from './pages/form'
import TablePagesComponent from './pages/tablepages'
import { fecthPages } from './pages/scripts'

export default function ContenidoComponent({ users }) {
    const [data, setData] = useState()
    const [activeTab, setActiveTab] = useState("users")

    useEffect(() => {
        if (activeTab === "pages") asyncFecthData()
    }, [activeTab])

    const asyncFecthData = async () => {
        const info = await fecthPages()
        setData(info.data)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Panel de administración</h1>
                <p className="text-slate-500 mt-1">Gestiona usuarios y páginas del sistema</p>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex w-full overflow-x-auto border-b border-slate-200">
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === "users"
                            ? "border-primary text-primary"
                            : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                            }`}
                    >
                        <FiUsers className="text-base" />
                        Usuarios
                        <Chip size="sm" variant="flat" color="primary" className="ml-1">{users.length}</Chip>
                    </button>
                    <button
                        onClick={() => setActiveTab("pages")}
                        className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === "pages"
                            ? "border-primary text-primary"
                            : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                            }`}
                    >
                        <FiFileText className="text-base" />
                        Páginas
                        {data && <Chip size="sm" variant="flat" className="ml-1">{data.length}</Chip>}
                    </button>
                </div>

                <div className={activeTab === "users" ? "block" : "hidden"}>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="font-semibold text-slate-700">Lista de usuarios</h2>
                        </div>
                        <TableUserComponent users={users} data={data} />
                    </div>
                </div>

                <div className={activeTab === "pages" ? "block" : "hidden"}>
                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <h2 className="font-semibold text-slate-700 mb-5 flex items-center gap-2">
                                <FiPlus className="text-primary" />
                                Nueva página
                            </h2>
                            <FormPagesComponent asyncFecthData={asyncFecthData} />
                        </div>
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100">
                                <h2 className="font-semibold text-slate-700">Páginas existentes</h2>
                            </div>
                            <TablePagesComponent data={data} asyncFecthData={asyncFecthData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
