"use client"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import FormEvaluation from "./formEvaluacion";
import { useEffect, useState } from "react";

export default function ExpedientePage({ id }) {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        asynFetchData()
    }, []);

    const asynFetchData = async () => {
        const response = await fetch('/api/expediente/' + id)
        const data = await response.json()
        setData(data.data)
        setLoading(false)
    }


    const handleDelete = async (id) => {
        const data = {
            id: id
        }
        const response = await fetch('/api/expediente/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        await asynFetchData()
    }
    return (
        <div className="grid gap-4">
            <div>
                <FormEvaluation id={id} asynFetchData={asynFetchData} />
            </div>
            <div className="max-h-[320px] overflow-auto">
                <Table aria-label="Example static collection table" isStriped>
                    <TableHeader>
                        <TableColumn>Trabajo en Equipo</TableColumn>
                        <TableColumn>Esfuerzo</TableColumn>
                        <TableColumn>Energía</TableColumn>
                        <TableColumn>Compañerismo</TableColumn>
                        <TableColumn>Actitud</TableColumn>
                        <TableColumn>Conducción</TableColumn>
                        <TableColumn>Recepción</TableColumn>
                        <TableColumn>Pase</TableColumn>
                        <TableColumn>Desplazamiento</TableColumn>
                        <TableColumn>Tiro</TableColumn>
                        <TableColumn>Periodo</TableColumn>
                        <TableColumn>Accion</TableColumn>
                    </TableHeader>
                    {!loading ? (
                        data && data.length > 0 ? (
                            <TableBody>
                                {data.map((item) => (
                                    <TableRow key={item.id}>

                                        <TableCell>{item.trabajo_en_equipo}</TableCell>
                                        <TableCell>{item.esfuerzo}</TableCell>
                                        <TableCell>{item.energia}</TableCell>
                                        <TableCell>{item.companerismo}</TableCell>
                                        <TableCell>{item.actitud}</TableCell>
                                        <TableCell>{item.conduccion}</TableCell>
                                        <TableCell>{item.recepcion}</TableCell>
                                        <TableCell>{item.pase}</TableCell>
                                        <TableCell>{item.desplazamiento}</TableCell>
                                        <TableCell>{item.tiro}</TableCell>
                                        <TableCell>{item.periodo}</TableCell>
                                        <TableCell><Button color='danger' variant="flat" onPress={(async () => {
                                            await handleDelete(item.id)
                                        })}>Eliminar</Button></TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        ) : (
                            <TableBody emptyContent="No hay calificaciones para mostrar." />
                        )
                    ) : (
                        <TableBody emptyContent="Cargando calificaciones..." />
                    )}
                </Table>
            </div>
        </div>
    )
}