"use client"
import React, { useState } from "react";
import { Input, Button, Image, Switch, link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Router } from "next/router";
import Link from "next/link";


export default function InputRegister() {
    const route = useRouter()
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);


    const [formData, setFormData] = useState({
        email: "",
        password: "",
        phone: "",

        fullname: "",
        birthdate: ""


    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });


    }

    const handleRegister = async () => {

        if (!formData.email || !formData.password || !formData.phone || !formData.fullname || !formData.birthdate) {
            Swal.fire({
                title: "Error",
                text: "Verifique sus datos",
                icon: "error"
            });
            return
        }


        const response = await fetch('/api/auth/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const respuesta = await response.json()
        if (respuesta.ok) {
            route.push('/sesion/validate')
        } else {
            Swal.fire({
                title: "Error",
                text: "Verifique sus datos",
                icon: "error"
            });
        }


    }
    return (
        <div className="grid grid-cols-1 gap-5 lg:min-w-[800px] lg:min-h-[400px] text-black">
            <div className="col-span-1">
                <Input label="Nombre Completo" variant='bordered' name="fullname" value={formData.fullname} onChange={handleChange} />
            </div>
            <div className="flex gap-4">
                <Input type="date" label="Fecha de nacimiento" variant='bordered' name="birthdate" value={formData.birthdate} onChange={handleChange} />
                <Input type="number" label="Telefono" variant='bordered' name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div>
                <Input type="email" variant='bordered' label="Email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div >
                <Input label="Password" variant='bordered' name="password" type="password" value={formData.password} onChange={handleChange} />
            </div>
            <div >
                <Button color="primary" onPress={handleRegister} variant="flat">Registrate</Button>
            </div>
            <div >
                <Button as={Link} color="primary" href="/sesion/validate" variant="flat" >Validar codigo</Button>
            </div>

        </div>
    )
}