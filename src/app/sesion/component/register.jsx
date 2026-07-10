"use client"
import React, { useState } from "react"
import { Input, Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import Link from "next/link"
import { FiMail, FiLock, FiPhone, FiUser, FiCalendar, FiUserPlus } from "react-icons/fi"

export default function InputRegister() {
    const route = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    const [formData, setFormData] = useState({
        fullname: "",
        birthdate: "",
        phone: "",
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleRegister = async () => {
        if (!formData.email || !formData.password || !formData.phone || !formData.fullname || !formData.birthdate) {
            Swal.fire({ title: "Campos vacíos", text: "Completa todos los campos para registrarte", icon: "warning" })
            return
        }
        setIsLoading(true)
        const response = await fetch('/api/auth/register', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        const respuesta = await response.json()
        setIsLoading(false)
        if (respuesta.ok) {
            route.push('/sesion/validate')
        } else {
            Swal.fire({ title: "Error", text: "No se pudo registrar. Verifica tus datos.", icon: "error" })
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleRegister()
    }

    const inputClasses = {
        label: "text-sm font-medium text-default-700 pb-1",
        input: "text-sm",
        inputWrapper: "border-default-300 hover:border-primary focus-within:border-primary transition-colors h-12 rounded-xl",
    }

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="space-y-4">
                <Input
                    label="Nombre completo"
                    labelPlacement="outside"
                    placeholder="Tu nombre y apellidos"
                    variant="bordered"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    startContent={<FiUser className="text-default-400 flex-shrink-0" />}
                    classNames={inputClasses}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        type="date"
                        label="F. de nacimiento"
                        labelPlacement="outside"
                        variant="bordered"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        startContent={<FiCalendar className="text-default-400 flex-shrink-0" />}
                        classNames={inputClasses}
                    />
                    <Input
                        type="tel"
                        label="Teléfono"
                        labelPlacement="outside"
                        placeholder="10 dígitos"
                        variant="bordered"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        startContent={<FiPhone className="text-default-400 flex-shrink-0" />}
                        classNames={inputClasses}
                    />
                </div>

                <Input
                    type="email"
                    label="Correo electrónico"
                    labelPlacement="outside"
                    placeholder="tucorreo@ejemplo.com"
                    variant="bordered"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    startContent={<FiMail className="text-default-400 flex-shrink-0" />}
                    classNames={inputClasses}
                />

                <Input
                    type={isVisible ? "text" : "password"}
                    label="Contraseña"
                    labelPlacement="outside"
                    placeholder="Mínimo 6 caracteres"
                    variant="bordered"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    startContent={<FiLock className="text-default-400 flex-shrink-0" />}
                    classNames={inputClasses}
                />

                <Button
                    color="primary"
                    onPress={handleRegister}
                    isLoading={isLoading}
                    className="w-full h-12 font-semibold text-base rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
                    endContent={!isLoading && <FiUserPlus />}
                >
                    {isLoading ? "Registrando..." : "Crear cuenta"}
                </Button>

                <Button
                    as={Link}
                    href="/sesion/validate"
                    variant="bordered"
                    className="w-full h-11 rounded-xl border-default-300 text-default-600 hover:border-primary hover:text-primary transition-all"
                >
                    Ya tengo un código de validación
                </Button>
            </div>
        </div>
    )
}
