"use client"
import React, { useState } from "react"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem } from "@nextui-org/react"
import { handleSave } from "./scripts"
import { FiUserPlus, FiUser, FiCalendar, FiPhone, FiAlertTriangle } from "react-icons/fi"

export default function FormularioAlumno({ boton, refreshData, data }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const [formData, setFormData] = useState({
        fullName: '',
        birthDate: '',
        registerDate: '',
        parent_Name: '',
        parent: 'Padre',
        parentEmergency: '',
        parentWhatsapp: '',
        id: 0
    })

    const openData = () => {
        if (data) {
            setFormData({
                fullName: data.fullName,
                birthDate: data.birthDate?.split('T')[0] || '',
                registerDate: data.alta_date?.split('T')[0] || '',
                parent_Name: data.parent_name || '',
                parent: data.parent || 'Padre',
                parentEmergency: data.parent_emergency || '',
                parentWhatsapp: data.parent_Whatsapp || '',
                id: data.id
            })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleGuardar = async () => {
        await handleSave(formData)
        await refreshData()
    }

    const inputClasses = {
        label: "text-xs font-medium text-slate-600 pb-1",
        inputWrapper: "border-slate-300 rounded-xl h-11",
    }

    return (
        <>
            <Button onPress={onOpen} onClick={openData} color="primary" startContent={<FiUserPlus />} className="font-medium rounded-xl shadow-lg shadow-primary/30">
                {boton}
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" className="rounded-2xl" backdrop="blur">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 pt-8 px-8">
                                <span className="text-xl font-bold">{data ? "Editar alumno" : "Nuevo alumno"}</span>
                                <span className="text-sm font-normal text-slate-500">
                                    {data ? "Modifica los datos del alumno" : "Completa el formulario para registrar un nuevo alumno"}
                                </span>
                            </ModalHeader>
                            <ModalBody className="px-8 py-2">
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                            <FiUser className="text-primary" />
                                            Datos personales
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div className="sm:col-span-2">
                                                <Input
                                                    type="text"
                                                    label="Nombre completo"
                                                    labelPlacement="outside"
                                                    placeholder="Nombre del alumno"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    classNames={inputClasses}
                                                />
                                            </div>
                                            <Input
                                                type="date"
                                                label="F. de nacimiento"
                                                labelPlacement="outside"
                                                name="birthDate"
                                                value={formData.birthDate}
                                                onChange={handleChange}
                                                classNames={inputClasses}
                                            />
                                            <Input
                                                type="date"
                                                label="F. de inscripción"
                                                labelPlacement="outside"
                                                name="registerDate"
                                                value={formData.registerDate}
                                                onChange={handleChange}
                                                classNames={inputClasses}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                            <FiAlertTriangle className="text-amber-500" />
                                            Contacto de emergencia
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <Input
                                                type="text"
                                                label="Nombre del contacto"
                                                labelPlacement="outside"
                                                placeholder="Nombre del tutor"
                                                name="parent_Name"
                                                value={formData.parent_Name}
                                                onChange={handleChange}
                                                classNames={inputClasses}
                                            />
                                            <Select
                                                label="Parentesco"
                                                labelPlacement="outside"
                                                name="parent"
                                                selectedKeys={[formData.parent]}
                                                onChange={handleChange}
                                                classNames={{
                                                    label: "text-xs font-medium text-slate-600 pb-1",
                                                    trigger: "border-slate-300 rounded-xl h-11",
                                                }}
                                            >
                                                <SelectItem key="Padre">Padre</SelectItem>
                                                <SelectItem key="Madre">Madre</SelectItem>
                                                <SelectItem key="Tutor">Tutor</SelectItem>
                                            </Select>
                                            <Input
                                                type="tel"
                                                label="Teléfono de emergencia"
                                                labelPlacement="outside"
                                                placeholder="10 dígitos"
                                                name="parentEmergency"
                                                value={formData.parentEmergency}
                                                onChange={handleChange}
                                                startContent={<FiPhone className="text-slate-400" />}
                                                classNames={inputClasses}
                                            />
                                            <Input
                                                type="tel"
                                                label="WhatsApp"
                                                labelPlacement="outside"
                                                placeholder="10 dígitos"
                                                name="parentWhatsapp"
                                                value={formData.parentWhatsapp}
                                                onChange={handleChange}
                                                startContent={<FiPhone className="text-slate-400" />}
                                                classNames={inputClasses}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter className="px-8 pb-8 gap-3">
                                <Button color="danger" variant="light" onPress={onClose} className="rounded-xl">
                                    Cancelar
                                </Button>
                                <Button color="primary" onPress={handleGuardar} className="rounded-xl font-medium shadow-lg shadow-primary/30">
                                    Guardar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
