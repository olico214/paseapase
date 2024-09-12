"use client"
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { recoveryCode, validateCode } from "./scripts";
import { redirectLogin } from "@/app/libs/cookie";
import Swal from "sweetalert2";

export default function ValidateSesion() {
    const [email, setEmail] = useState()
    const [clave, setClave] = useState()
    const [hidden, setHidden] = useState(false)



    const handleRecovery = async () => {
        const data = {
            email: email
        }

        if (email) {
            const response = await recoveryCode(data)
            if (response.ok) {
                setHidden(true)
            } else {
                Swal.fire({
                    title: "Correo no valido",
                    text: "Error",
                    icon: "question"
                });
            }
        }
    }


    const handleValidateClave = async () => {
        const data = {
            email: email,
            clave: clave
        }
        if (email && clave) {
            const respuesta = await validateCode(data)
            if (respuesta.ok) {
                redirectLogin()
            }
        }
    }


    return (
        <>
            <div
                className="relative flex items-center justify-center w-full h-screen bg-no-repeat bg-cover"
                style={{
                    backgroundImage: "url('/back.png')",
                }}
            >

                <div className="relative px-16 py-10 bg-gray-100 shadow-lg rounded-xl backdrop-blur-md max-sm:px-8 ">
                    <div className="text-white">
                        <div className="grid items-center gap-4 mb-8 text-black" >
                            <h1 className="mb-2 text-2xl text-black">Validar Sesion</h1>
                            <Input label="Correo" type="email" name="email" variant="bordered" color="primary" onChange={((e) => {
                                const inputValue = e.target.value
                                setEmail(inputValue)

                            })} />

                            <Input label="Clave" className={hidden ? "block" : 'hidden'} type="text" name="clave" variant="bordered" color="primary" onChange={((e) => {
                                const inputValue = e.target.value
                                setClave(inputValue)

                            })} />
                            <Button color="primary" className={hidden ? "hidden" : 'block'} onClick={handleRecovery}>Obtener codigo de recuperacion</Button>
                            <Button color="primary" className={hidden ? "block" : 'hidden'} onClick={handleValidateClave}>Recuperar Contraseña</Button>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}