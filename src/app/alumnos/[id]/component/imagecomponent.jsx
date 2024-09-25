"use client"
import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function ImageUserComponent({ data }) {
    const [image, setImage] = useState("https://images.paseapase.com/assets/66f44322e2cfe.png")
    const [nombre, setNombre] = useState("IMAGEN VACIA")

    useEffect(() => {
        if (data.url) {
            setImage(data.url)
            setNombre(data.fullName)

        }
    }, [data]);

    return (
        <div className="flex content-center justify-center mx-auto">
            <Image
                width={400}
                height={300}
                src={image}
                alt={nombre}
            />
        </div>
    )
}