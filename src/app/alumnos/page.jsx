"use client"

import { BreadcrumbItem, Breadcrumbs, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaBookOpen, FaFootballBall, FaPersonBooth, FaStore } from "react-icons/fa";
import { useUser } from "./UserContext";


export default function AlumnosPage() {
    const user = useUser();

    return (
        <>

            <div className="py-20 font-montserrat">
                <div className="container px-4 mx-auto text-center">
                    <Breadcrumbs>
                        <BreadcrumbItem href="/alumnos">Inicio</BreadcrumbItem>
                    </Breadcrumbs>
                    <h2 className="mb-10 text-4xl font-bold letra">Menú</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-2">
                        <div className="p-6 transition-transform transform rounded-lg shadow-lg fondo hover:scale-105">
                            <FaStore className="mx-auto mb-4 text-6xl letra" />
                            <h3 className="mb-2 text-2xl font-bold letra">paseapase.com</h3>
                            <p className="text-gray-700">
                                Realiza tus pagos desde un solo lugar
                            </p>
                            <Link href='https://paseapase.com' className="text-blue-500 hover:underline" rel="noopener noreferrer" target="_blank">
                                Ver más
                            </Link>
                        </div>
                        <div className="p-6 transition-transform transform rounded-lg shadow-lg fondo hover:scale-105">
                            <FaBookOpen className="mx-auto mb-4 text-6xl letra" />
                            <h3 className="mb-2 text-2xl font-bold letra">Calificaciones</h3>
                            <p className="text-gray-700">
                                Historial de Calificaciones del alumno
                            </p>
                            <Link href={'/alumnos/' + user} className="text-blue-500 hover:underline" rel="noopener noreferrer" >
                                Ver más
                            </Link>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}