"use client"
import React, { useState } from "react";
import { Input, Button, Image, Switch, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { redirectLogin } from "@/app/libs/cookie";
import Swal from "sweetalert2";

export default function InputLogin() {

    const route = useRouter()
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);


    const [formData, setFormData] = useState({
        email: "",
        password: "",

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });


    }

    const handleValidateUser = async () => {


        const response = await fetch('/api/auth/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const respuesta = await response.json()
        console.log(respuesta)
        if (respuesta.ok) {

            redirectLogin()
        } else {
            Swal.fire({
                title: "Oopss",
                text: "Credenciales Incorrectas",
                icon: "error"
            });
        }


    }
    return (

        <div className="grid grid-cols-2 gap-2 p-5 text-black">
            <div className="grid items-center content-center justify-center gap-4 mx-auto">
                <div>
                    <Input type="email" variant='bordered' label="Email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div >
                    <Input type="password" label="Password" variant='bordered' name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div className="justify-end mx-auto">
                    <Button color="primary" onPress={handleValidateUser} variant="flat">Iniciar sesion</Button>
                </div>
                <div className="justify-end mx-auto" >
                    <Link showAnchorIcon href="/sesion/recovery" color="primary">
                        Recuperar Contraseña
                    </Link>
                </div>
            </div>
            <div>
                <Image
                    isBlurred
                    width={400}
                    src="/logo.png"
                    alt="NextUI Album Cover"

                />
            </div>
        </div>
    )
}