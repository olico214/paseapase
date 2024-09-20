import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input, link, Link } from "@nextui-org/react";
import FormularioAlumno from "./form";
import { handleDelete } from "./scripts";


export default function TableAlumno({ data, refreshData }) {
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        if (Array.isArray(data)) {
            console.log(filter)
            if (filter) {
                const filtered = data.filter(item =>
                    item.fullName.toLowerCase().includes(filter.toLowerCase()) ||
                    item.parent_name.toLowerCase().includes(filter.toLowerCase())
                );
                setFilteredData(filtered);
            } else {
                setFilteredData(data);
            }
        }
    }, [filter, data]);


    useEffect(() => {
        if (data) {
            setLoading(false)
            setFilteredData(data);
        }
    }, [filter, data]);
    return (
        <div className="grid">
            <div className="flex">
                {/* <Input
                    color="primary"
                    label="Filtrar"
                    className="w-72"  // Ajusté el ancho a 72 unidades, puedes modificar esto según tu diseño
                    value={filter}
                    onChange={((e) => {
                        setFilter(e.value);
                    })}
                /> */}
            </div>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>Nombre Alumno</TableColumn>
                    <TableColumn>conceptos futbolísticos</TableColumn>
                    <TableColumn>conceptos personales</TableColumn>
                    <TableColumn>Contraseña</TableColumn>
                    <TableColumn>Expediente</TableColumn>
                </TableHeader>

                {!loading ? (
                    filteredData && filteredData.length > 0 ? (
                        <TableBody>
                            {filteredData.map((item) => (
                                <TableRow key={item.id}>

                                    <TableCell>{item.fullName}</TableCell>
                                    <TableCell>0</TableCell>
                                    <TableCell>0</TableCell>
                                    <TableCell>{item.password}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">

                                            {/* <FormularioAlumno boton={"Editar"} refreshData={refreshData} data={item} /> */}

                                            <Button as={Link} href={"/sistema/alumnos/" + item.id} color="secondary" variant="flat">Expediente</Button>
                                            <Button color="danger" variant="flat" onPress={(async () => {
                                                await handleDelete(item.id)
                                                await refreshData()
                                            })}>Eliminar</Button>
                                            <Button color="warning" onPress={(async () => {
                                                const data = {
                                                    id: item.id
                                                }
                                                const response = await fetch('/api/password', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify(data),
                                                });
                                                await refreshData()
                                            })}>Nueva Contraseña</Button>

                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    ) : (
                        <TableBody emptyContent="No hay Alumnos para mostrar." />
                    )
                ) : (
                    <TableBody emptyContent="Cargando Alumnos..." />
                )}
            </Table>
        </div >
    );
}
