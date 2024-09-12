import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";

export default function TableAlumno() {
    return (
        <Table aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>Nombre Alumno</TableColumn>
                <TableColumn>Trabajo En equipo</TableColumn>
                <TableColumn>Resistencia</TableColumn>
                <TableColumn>Goles</TableColumn>
                <TableColumn>Comportamiento</TableColumn>
                <TableColumn>Expediente</TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow key="1">
                    <TableCell>Tony Reichert</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>7</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell><Button color="primary">Expediente</Button></TableCell>
                </TableRow>
                <TableRow key="2">
                    <TableCell>Zoey Lang</TableCell>
                    <TableCell>6</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell><Button color="primary">Expediente</Button></TableCell>
                </TableRow>
                <TableRow key="3">
                    <TableCell>Jane Fisher</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>7</TableCell>
                    <TableCell>9</TableCell>
                    <TableCell><Button color="primary">Expediente</Button></TableCell>
                </TableRow>

            </TableBody>
        </Table>
    );
}
