"use client"
import React, { useState } from "react"
import { Input, Button, Image, Link } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { redirectLogin } from "@/app/libs/cookie"
import { redirectLoginPadre } from "@/app/libs/cookieAlumos"
import Swal from "sweetalert2"
import { FiMail, FiLock, FiLogIn, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi"

export default function InputLogin() {
    const route = useRouter()
    const [isVisible, setIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [focused, setFocused] = useState({ email: false, password: false })

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleValidateUser = async () => {
        if (!formData.email || !formData.password) {
            Swal.fire({ title: "Campos vacíos", text: "Completa todos los campos", icon: "warning" })
            return
        }
        setIsLoading(true)
        const response = await fetch('/api/auth/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        const respuesta = await response.json()
        setIsLoading(false)
        if (respuesta.ok) {
            if (respuesta.sesion == "padre") {
                redirectLoginPadre()
            } else {
                redirectLogin()
            }
        } else {
            Swal.fire({ title: "Oops", text: "Credenciales incorrectas", icon: "error" })
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleValidateUser()
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="flex justify-center mb-8">
                <Image
                    width={180}
                    src="/logo.png"
                    alt="PaseaPase"
                    className="drop-shadow-xl"
                />
            </div>

            <div className="space-y-5">
                <Input
                    type="email"
                    variant="bordered"
                    label="Correo electrónico"
                    labelPlacement="outside"
                    placeholder="tucorreo@ejemplo.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    startContent={<FiMail className="text-default-400 flex-shrink-0" />}
                    classNames={{
                        label: "text-sm font-medium text-default-700 pb-1",
                        input: "text-sm",
                        inputWrapper: "border-default-300 hover:border-primary focus-within:border-primary transition-colors h-12 rounded-xl",
                    }}
                />

                <Input
                    type={isVisible ? "text" : "password"}
                    variant="bordered"
                    label="Contraseña"
                    labelPlacement="outside"
                    placeholder="Tu contraseña"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    startContent={<FiLock className="text-default-400 flex-shrink-0" />}
                    endContent={
                        <button
                            className="focus:outline-none text-default-400 hover:text-default-600 transition-colors"
                            type="button"
                            onClick={() => setIsVisible(!isVisible)}
                        >
                            {isVisible ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                        </button>
                    }
                    classNames={{
                        label: "text-sm font-medium text-default-700 pb-1",
                        input: "text-sm",
                        inputWrapper: "border-default-300 hover:border-primary focus-within:border-primary transition-colors h-12 rounded-xl",
                    }}
                />

                <Button
                    color="primary"
                    onPress={handleValidateUser}
                    isLoading={isLoading}
                    className="w-full h-12 font-semibold text-base rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
                    endContent={!isLoading && <FiArrowRight />}
                >
                    {isLoading ? "Iniciando..." : "Iniciar sesión"}
                </Button>

                <div className="flex justify-center pt-2">
                    <Link
                        href="/sesion/recovery"
                        className="text-sm text-default-500 hover:text-primary transition-colors"
                        underline="hover"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
            </div>
        </div>
    )
}
