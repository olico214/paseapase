"use client"
import React, { useState } from "react"
import { Button } from "@nextui-org/react"
import InputLogin from "./component/login.jsx"
import InputRegister from "./component/register.jsx"
import { FiLogIn, FiUserPlus } from "react-icons/fi"

export default function UserHome() {
    const [tab, setTab] = useState("login")

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />

            <div className="relative w-full max-w-lg">
                <div className="flex justify-center mb-8">
                    <div className="flex bg-slate-800/80 backdrop-blur-sm rounded-2xl p-1 border border-slate-700/50">
                        <Button
                            onPress={() => setTab("login")}
                            className={`h-11 px-8 font-semibold text-sm rounded-xl transition-all ${tab === "login"
                                ? "bg-primary text-white shadow-lg shadow-primary/40"
                                : "bg-transparent text-slate-400 hover:text-white"
                                }`}
                            startContent={<FiLogIn />}
                        >
                            Iniciar sesión
                        </Button>
                        <Button
                            onPress={() => setTab("register")}
                            className={`h-11 px-8 font-semibold text-sm rounded-xl transition-all ${tab === "register"
                                ? "bg-primary text-white shadow-lg shadow-primary/40"
                                : "bg-transparent text-slate-400 hover:text-white"
                                }`}
                            startContent={<FiUserPlus />}
                        >
                            Registrarse
                        </Button>
                    </div>
                </div>

                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/20 p-8 sm:p-10 border border-slate-200/50">
                    <div className="w-full">
                        {tab === "login" ? <InputLogin /> : <InputRegister />}
                    </div>
                </div>

                <p className="text-center text-slate-500 text-xs mt-6">
                    &copy; {new Date().getFullYear()} PaseaPase &mdash; Todos los derechos reservados
                </p>
            </div>
        </div>
    )
}
