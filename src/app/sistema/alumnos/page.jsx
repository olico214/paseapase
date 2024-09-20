"use client"

import { useEffect, useState } from "react";
import FormularioAlumno from "./component/form"
import TableAlumno from "./component/table"
import { fetchData } from "./component/scripts";
import FormularioPeriodo from "./component/formPeriodo";

export default function BoletaPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        asycnfetchData();
    }, []);

    const asycnfetchData = async () => {
        const response = await fetchData()
        setData(response)
    }

    return (
        <>
            <div className="grid max-w-[1400px] items-center content-center mx-auto gap-5 mt-5">
                <div className="flex gap-5">
                    <FormularioAlumno boton={"Nuevo Registro"} refreshData={asycnfetchData} />
                    <FormularioPeriodo />
                </div>
                <div>
                    <TableAlumno data={data} refreshData={asycnfetchData} />
                </div>
            </div>
        </>
    )
}