"use client"
import react, { useState, useEffect } from 'react'
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { handledelete } from './scripts';

export default function TablePagesComponent({ data, asyncFecthData }) {
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (data) {
            setLoading(false)
        }
    }, [data]);


    return (
        <>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>Nombre pagina</TableColumn>
                    <TableColumn>url</TableColumn>
                    <TableColumn>Icono</TableColumn>
                    <TableColumn>Descripcion</TableColumn>
                    <TableColumn>Accion</TableColumn>

                </TableHeader>
                {!loading ? (
                    data && data.length > 0 ? (
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.url}</TableCell>
                                    <TableCell>{item.icon}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell><Button color='danger' variant='flat' onPress={(async () => {
                                        const data = {
                                            id: item.id
                                        }
                                        await handledelete(data)
                                        asyncFecthData()
                                    })}>
                                        Eliminar</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    ) : (
                        <TableBody emptyContent="No hay Clientes para mostrar." />
                    )
                ) : (
                    <TableBody emptyContent="Cargando Clientes..." />
                )}
            </Table>
        </>
    );
}
