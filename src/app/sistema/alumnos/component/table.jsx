"use client"
import React, { useEffect, useState } from "react"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input, Link, Chip } from "@nextui-org/react"
import { handleDelete } from "./scripts"
import { FiSearch, FiTrash2, FiFileText, FiKey, FiUserPlus, FiEdit } from "react-icons/fi"
import FormularioAlumno from "./form"

export default function TableAlumno({ data, refreshData }) {
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('')

    useEffect(() => {
        if (data) {
            setLoading(false)
            if (filter) {
                setFilteredData(data.filter(item =>
                    item.fullName.toLowerCase().includes(filter.toLowerCase()) ||
                    (item.parent_name && item.parent_name.toLowerCase().includes(filter.toLowerCase()))
                ))
            } else {
                setFilteredData(data)
            }
        }
    }, [filter, data])

    const handleNewPassword = async (id) => {
        await fetch('/api/password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        })
        refreshData()
    }

    return (
        <div>
            <div className="px-6 py-3">
                <Input
                    variant="bordered"
                    placeholder="Buscar por nombre del alumno o tutor..."
                    startContent={<FiSearch className="text-slate-400" />}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    classNames={{
                        inputWrapper: "border-slate-300 rounded-xl h-10 bg-slate-50 max-w-md",
                    }}
                />
            </div>
            <Table
                aria-label="Lista de alumnos"
                removeWrapper
                classNames={{
                    th: "bg-transparent text-slate-500 font-medium text-xs uppercase tracking-wider",
                    td: "text-sm py-3",
                }}
            >
                <TableHeader>
                    <TableColumn>Alumno</TableColumn>
                    <TableColumn>Contraseña</TableColumn>
                    <TableColumn className="text-center">Acciones</TableColumn>
                </TableHeader>
                {!loading ? (
                    filteredData && filteredData.length > 0 ? (
                        <TableBody>
                            {filteredData.map((item) => (
                                <TableRow key={item.id} className="hover:bg-slate-50 transition-colors">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <span className="text-xs font-bold text-primary">
                                                    {item.fullName?.charAt(0)?.toUpperCase() || "?"}
                                                </span>
                                            </div>
                                            <span className="font-medium text-slate-700">{item.fullName}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <code className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                                            {item.password ? item.password : "—"}
                                        </code>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1 justify-center">
                                            <Button
                                                as={Link}
                                                href={"/sistema/alumnos/" + item.id}
                                                size="sm"
                                                variant="flat"
                                                color="secondary"
                                                startContent={<FiFileText />}
                                                className="font-medium rounded-xl"
                                            >
                                                Expediente
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="flat"
                                                color="warning"
                                                onPress={() => handleNewPassword(item.id)}
                                                startContent={<FiKey />}
                                                className="font-medium rounded-xl"
                                            >
                                                Contraseña
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="flat"
                                                color="danger"
                                                onPress={async () => {
                                                    await handleDelete(item.id)
                                                    await refreshData()
                                                }}
                                                startContent={<FiTrash2 />}
                                                className="font-medium rounded-xl"
                                            >
                                                Eliminar
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    ) : (
                        <TableBody emptyContent={
                            <div className="py-8 text-slate-400">
                                <FiUserPlus className="text-3xl mx-auto mb-2" />
                                <p>No hay alumnos registrados</p>
                            </div>
                        } />
                    )
                ) : (
                    <TableBody emptyContent="Cargando..." />
                )}
            </Table>
        </div>
    )
}
