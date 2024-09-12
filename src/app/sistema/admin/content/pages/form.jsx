"use client"
import react, { useState, useEffect } from 'react'
import { Button, Input, Textarea, } from "@nextui-org/react";
import { savePage } from './scripts';


export default function FormPagesComponent({ asyncFecthData }) {


    const [formData, setformData] = useState({
        url: "",
        name: "",
        icon: "",
        des: "",

    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({
            ...formData,
            [name]: value,
        });
    };




    return (
        <>
            <div className='grid grid-cols-1 gap-5 lg:grid-cols-3 md:grid-cols-1'>

                <div>
                    <Input label="url" name="url" onChange={handleInputChange} value={formData.url} />
                </div>
                <div>
                    <Input label="Nombre pagina" name="name" onChange={handleInputChange} value={formData.name} />
                </div>
                <div>
                    <Input label="Icono" name="icon" onChange={handleInputChange} value={formData.icon} />
                </div>
                <div className='col-span-3'>
                    <Textarea label="Descripcion" name="des" onChange={handleInputChange} value={formData.des} />
                </div>
            </div>
            <div >
                <Button color="primary" onPress={(async () => {
                    const response = await savePage(formData)

                    if (response.ok) {
                        setformData({
                            ...formData,
                            url: "",
                            name: "",
                            icon: "",
                            des: "",
                        });
                        asyncFecthData()
                    }

                })}>
                    Guardar
                </Button>
            </div>
        </>
    );
}
