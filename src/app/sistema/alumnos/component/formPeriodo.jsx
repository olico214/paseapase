"use client"
import React, { useState } from "react"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react"
import { fetchDataPeriodo, handleDeletePeriodo, handleSavePeriodo } from "./scripts"
import { FiCalendar, FiSave, FiTrash2, FiEdit, FiPlus } from "react-icons/fi"

export default function FormularioPeriodo() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    const [formData, setFormData] = useState({
        nombre: '',
        startDate: '',
        endDate: '',
        id: 0
    })

    const asyncfetchData = async () => {
        const response = await fetchDataPeriodo()
        setData(response)
        setLoading(false)
        resetForm()
    }

    const resetForm = () => {
        setFormData({ nombre: '', startDate: '', endDate: '', id: 0 })
    }

    const openData = (item) => {
        if (item) {
            setFormData({
                nombre: item.nombre,
                startDate: item.startDate?.split("T")[0] || '',
                endDate: item.endDate?.split("T")[0] || '',
                id: item.id
            })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleGuardar = async () => {
        await handleSavePeriodo(formData)
        await asyncfetchData()
    }

    const inputClasses = {
        label: "text-xs font-medium text-slate-600 pb-1",
        inputWrapper: "border-slate-300 rounded-xl h-11",
    }

    return (
        <>
            <Button
                onPress={() => { onOpen(); asyncfetchData() }}
                variant="flat"
                color="secondary"
                startContent={<FiCalendar />}
                className="font-medium rounded-xl"
            >
                Periodos
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" className="rounded-2xl" backdrop="blur">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 pt-8 px-8">
                                <span className="text-xl font-bold">Periodos</span>
                                <span className="text-sm font-normal text-slate-500">
                                    Gestiona los periodos del sistema
                                </span>
                            </ModalHeader>
                            <ModalBody className="px-8 py-2">
                                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-4">
                                    <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                        {formData.id ? <FiEdit className="text-amber-500" /> : <FiPlus className="text-emerald-500" />}
                                        {formData.id ? "Editar periodo" : "Nuevo periodo"}
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                                        <div className="sm:col-span-2">
                                            <Input
                                                type="text"
                                                label="Nombre del periodo"
                                                labelPlacement="outside"
                                                placeholder="Ej: Primavera 2025"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                classNames={inputClasses}
                                            />
                                        </div>
                                        <Input
                                            type="date"
                                            label="Fecha inicio"
                                            labelPlacement="outside"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            classNames={inputClasses}
                                        />
                                        <Input
                                            type="date"
                                            label="Fecha fin"
                                            labelPlacement="outside"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleChange}
                                            classNames={inputClasses}
                                        />
                                        <div className="sm:col-span-4">
                                            <Button
                                                color="primary"
                                                onPress={handleGuardar}
                                                startContent={<FiSave />}
                                                className="rounded-xl font-medium shadow-lg shadow-primary/30"
                                            >
                                                {formData.id ? "Actualizar" : "Guardar periodo"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <Table
                                    aria-label="Tabla de periodos"
                                    removeWrapper
                                    classNames={{
                                        th: "bg-transparent text-slate-500 font-medium text-xs uppercase tracking-wider",
                                        td: "text-sm py-3",
                                    }}
                                >
                                    <TableHeader>
                                        <TableColumn>Periodo</TableColumn>
                                        <TableColumn>Inicio</TableColumn>
                                        <TableColumn>Fin</TableColumn>
                                        <TableColumn className="text-center">Acciones</TableColumn>
                                    </TableHeader>
                                    {!loading ? (
                                        data && data.length > 0 ? (
                                            <TableBody>
                                                {data.map((item) => (
                                                    <TableRow key={item.id} className="hover:bg-slate-50 transition-colors">
                                                        <TableCell>
                                                            <span className="font-medium text-slate-700">{item.nombre}</span>
                                                        </TableCell>
                                                        <TableCell className="text-slate-500">
                                                            {item.startDate?.split("T")[0]}
                                                        </TableCell>
                                                        <TableCell className="text-slate-500">
                                                            {item.endDate?.split("T")[0]}
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex gap-1 justify-center">
                                                                <Button
                                                                    size="sm"
                                                                    variant="flat"
                                                                    color="warning"
                                                                    onPress={() => openData(item)}
                                                                    isIconOnly
                                                                    className="rounded-lg"
                                                                >
                                                                    <FiEdit />
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    variant="flat"
                                                                    color="danger"
                                                                    isIconOnly
                                                                    className="rounded-lg"
                                                                    onPress={async () => {
                                                                        await handleDeletePeriodo(item.id)
                                                                        await asyncfetchData()
                                                                    }}
                                                                >
                                                                    <FiTrash2 />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        ) : (
                                            <TableBody emptyContent="No hay periodos registrados." />
                                        )
                                    ) : (
                                        <TableBody emptyContent="Cargando..." />
                                    )}
                                </Table>
                            </ModalBody>
                            <ModalFooter className="px-8 pb-8">
                                <Button color="danger" variant="light" onPress={onClose} className="rounded-xl">
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
