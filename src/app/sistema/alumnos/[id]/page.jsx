"use client"
import FormularioExpedienteComponent from "./component/form";
import ExpedientePage from "./component/evaluacion/tableEvaluacion";
import ImageComponent from "./component/evaluacion/imageComponent";
import { useEffect, useState } from "react";
import { fetchData } from "../component/scripts";

export default function AlumnoExpediente({ params }) {
    const [data, setData] = useState([])


    useEffect(() => {
        asyncFetchData()
    }, []);


    const asyncFetchData = async () => {
        const reponse = await fetchData(params.id)
        // console.log(reponse)
        // const data = await reponse.json()
        setData(reponse[0])
    }
    return (
        <div className="grid gap-10 p-20 mx-auto">
            <div className="gap-5 lg:flex md:grid">
                <div className="grid content-center justify-center">
                    <ImageComponent id={params.id} data={data} />
                </div>
                <div className="w-full">
                    <FormularioExpedienteComponent id={params.id} data={data} />
                </div>
            </div>

            <div>
                <ExpedientePage id={params.id} />
            </div>
        </div>
    )
}