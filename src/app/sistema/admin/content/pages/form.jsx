"use client"
import { useState } from 'react'
import { Button, Input, Textarea, Select, SelectItem } from "@nextui-org/react"
import { savePage } from './scripts'
import { FiSave } from "react-icons/fi"

export default function FormPagesComponent({ asyncFecthData }) {
    const [formData, setformData] = useState({
        url: "",
        name: "",
        icon: "",
        des: "",
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setformData({ ...formData, [name]: value })
    }

    const handleSave = async () => {
        if (!formData.url || !formData.name || !formData.icon || !formData.des) return
        const response = await savePage(formData)
        if (response.ok) {
            setformData({ url: "", name: "", icon: "", des: "" })
            asyncFecthData()
        }
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    label="Nombre de la página"
                    labelPlacement="outside"
                    placeholder="Ej: Alumnos"
                    variant="bordered"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    classNames={{
                        label: "text-xs font-medium text-slate-600 pb-1",
                        inputWrapper: "border-slate-300 rounded-xl",
                    }}
                />
                <Input
                    label="URL"
                    labelPlacement="outside"
                    placeholder="/sistema/alumnos"
                    variant="bordered"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    classNames={{
                        label: "text-xs font-medium text-slate-600 pb-1",
                        inputWrapper: "border-slate-300 rounded-xl",
                    }}
                />
            </div>
            <Input
                label="Ícono"
                labelPlacement="outside"
                placeholder="FaFutbol, FaKey, FaStore"
                variant="bordered"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                classNames={{
                    label: "text-xs font-medium text-slate-600 pb-1",
                    inputWrapper: "border-slate-300 rounded-xl",
                }}
            />
            <Textarea
                label="Descripción"
                labelPlacement="outside"
                placeholder="Describe el propósito de esta página..."
                variant="bordered"
                name="des"
                value={formData.des}
                onChange={handleInputChange}
                classNames={{
                    label: "text-xs font-medium text-slate-600 pb-1",
                    inputWrapper: "border-slate-300 rounded-xl",
                }}
            />
            <Button
                color="primary"
                onPress={handleSave}
                startContent={<FiSave />}
                className="w-full sm:w-auto rounded-xl font-medium"
            >
                Guardar página
            </Button>
        </div>
    )
}
