"use client"

import FormularioAlumno from "./component/form"
import TableAlumno from "./component/table"

export default function BoletaPage() {

    return (
        <>
            <div className="grid max-w-[1400px] items-center content-center mx-auto gap-5 mt-5">
                <div>
                    <FormularioAlumno />
                </div>
                <div>
                    <TableAlumno />
                </div>
            </div>
        </>
    )
}