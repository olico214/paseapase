"use client"
import { Button, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { deleteurl, SaveImage, saveUrlImage } from "./scripts";


export default function ImageComponent({ id, data }) {
    const [image, setImage] = useState('https://images.paseapase.com/assets/66f44322e2cfe.png')

    // Función para manejar la carga de la imagen
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                alert("Formato no permitido. Por favor, sube una imagen en formato png, jpg o jpeg.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };



    useEffect(() => {
        if (data.url) {

            setImage(data.url);
        }
    }, [data]);



    return (
        <div className="grid">
            <div>
                <Image
                    width={300}
                    height={200}
                    alt="NextUI hero Image with delay"
                    src={image}
                />
            </div>
            <div className="grid gap-2 mt-1">
                <div>
                    <div className="flex justify-center">
                        <Button color="primary" variant="flat" >
                            <label htmlFor="file-upload" className="cursor-pointer">
                                Cargar imagen
                                <input id="file-upload" type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageUpload} style={{ display: 'none' }} />
                            </label>
                        </Button>
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    <div>
                        <Button color="success" variant="flat" onPress={(async () => {
                            const response = await SaveImage(image)
                            if (response.fileName) {
                                const url = 'https://images.paseapase.com/assets/' + response.fileName
                                setImage(url)
                                await saveUrlImage(id, url)
                            }
                        })}>Guardar</Button>
                    </div>
                    <div>
                        <Button color="danger" variant="flat" onClick={(async () => {
                            await deleteurl(id)
                            setImage('https://images.paseapase.com/assets/66f44322e2cfe.png')
                        })}>Eliminar</Button>
                    </div>
                </div>
            </div>
        </div >
    )
}
