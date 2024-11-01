"use client"
import { useEffect, useState } from "react";
import FormUserComponent from "./component/formUser";
import ImageUserComponent from "./component/imagecomponent";
import ResultComponent from "./component/results";
import ComentaryComponent from "./component/comentary";
import SiguientesResultadosComponent from "./component/nextResults";
import ChartComponent from "./component/charts";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";


export default function BoletaPage({ params }) {
    const [alumno, setAlumno] = useState([])
    const [results, setResults] = useState([])
    const [periodo, setPeriodo] = useState([])

    useEffect(() => {
        asycnfetchData();
    }, []);

    const asycnfetchData = async () => {
        const response = await fetch('/api/padres/' + params.id)
        const data = await response.json()
        setAlumno(data.data.alumno)
        setResults(data.data.evaluacion)
        setPeriodo(data.data.next_periodo)
    }

    return (
        <div className="grid justify-center gap-5 p-5 mx-auto">

            <Breadcrumbs>
                <BreadcrumbItem href="/alumnos">Inicio</BreadcrumbItem>
                <BreadcrumbItem>Calificaciones</BreadcrumbItem>
            </Breadcrumbs>

            <div className="gap-10 lg:flex md:grid ">
                <div>
                    <ImageUserComponent data={alumno} />
                </div>
                <div>
                    <FormUserComponent data={alumno} />
                </div>
            </div>
            <div className="gap-10 max-h-[300px] md:grid w-full">
                <ComentaryComponent data={alumno} />
            </div>


            <div className="w-full gap-10 md:grid">
                <div>
                    <ChartComponent data={results} />
                </div>
            </div>
            {/* <div className="gap-10 max-h-[300px] md:grid w-full max-w-[720px] mx-auto">
                <SiguientesResultadosComponent data={periodo} />
            </div> */}

        </div>
    )
}