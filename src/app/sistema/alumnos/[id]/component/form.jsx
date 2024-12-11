"use client"
import React, { useEffect, useState } from "react";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { handleSave } from "./scripts";

export default function FormularioExpedienteComponent({ id, data }) {



    const [formData, setFormData] = useState({
        fullName: '',
        birthDate: '',
        registerDate: '',
        parent_Name: '',
        parent: '',
        parentEmergency: '',
        parentWhatsapp: '',
        comentary: '',
        id: id
    });




    useEffect(() => {
        // console.log(data.length)
        if (data.birthDate) {
            // console.log(data)
            const fecha1 = data.birthDate
            const fecha2 = data.alta_date

            setFormData(prevState => ({
                ...prevState,
                fullName: data.fullName,
                birthDate: fecha1.split('T')[0],
                registerDate: fecha2.split('T')[0],
                parent_Name: data.parent_name,
                parent: data.parent,
                parentEmergency: data.parent_emergency,
                parentWhatsapp: data.parent_Whatsapp,
                comentary: data.comentary,
                id: id
            }));
        }
    }, [data]);





    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    return (
        <div className="p-5 mt-5 mb-5 bg-white shadow-md panel">

            <div className="grid grid-cols-4 gap-4 ">
                <div className="col-span-4">
                    <span><h4>Contacto de Emergencia</h4></span>
                </div>
                <div className="col-span-2">
                    <Input type="text" label="Nombre  Alumno" variant="bordered" name="fullName" value={formData.fullName} onChange={handleChange} ></Input>
                </div>
                <div >
                    <Input type="date" label="Fecha de nacimiento" variant="bordered" name="birthDate" value={formData.birthDate} onChange={handleChange}></Input>
                </div>
                <div>
                    <Input type="date" label="Fecha de inscripcion" variant="bordered" name="registerDate" value={formData.registerDate} onChange={handleChange}></Input>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 ">
                <div className="col-span-4">
                    <span><h4>Datos Personales</h4></span>
                </div>
                <div className="col-span-2">
                    <Input type="text" label="Nombre" variant="bordered" name="parent_Name" value={formData.parent_Name} onChange={handleChange}></Input>
                </div>
                <div className="col-span-2">
                    <Select
                        label="Parentesco"
                        name="parent"
                        selectedKeys={[formData.parent]}
                        onChange={handleChange}
                        variant="bordered"
                    >
                        <SelectItem key='Padre'>
                            Padre
                        </SelectItem>
                    </Select>
                </div>
                <div className="col-span-2">
                    <Input type="number" label="Telefono de Emergencia" variant="bordered" name="parentWhatsapp" value={formData.parentWhatsapp} onChange={handleChange}></Input>
                </div>
                <div className="col-span-2">
                    <Input type="number" label="Whatsapp" name="parentEmergency" variant="bordered" value={formData.parentEmergency} onChange={handleChange}></Input>
                </div>
                <div className="col-span-4">
                    <Textarea label="Fortalezas" variant="bordered" name="comentary" value={formData.comentary} onChange={handleChange}></Textarea>
                </div>
            </div>

            <Button color="primary" className="mt-5 max-w-7" onPress={(async () => {
                await handleSave(formData)

            })}>
                Guardar
            </Button>

        </div>


    );
}
