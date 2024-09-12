"use client"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import PermisionNavigation from "./permisionNavigtion";

export default function TableUserComponent({ users, data }) {

    return (
        <>
            <div className="grid gap-5 p-10 mt-10 overflow-auto shadow-md panel max-h-[720px]">
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>Nombre</TableColumn>
                        <TableColumn>Email</TableColumn>
                        <TableColumn>Rol</TableColumn>
                        <TableColumn>codigo de reinicio</TableColumn>
                        <TableColumn>Accion</TableColumn>

                    </TableHeader>
                    <TableBody>
                        {users.map((item) => (
                            <TableRow key={item.idUser}>
                                <TableCell>{item.fullname}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.rol}</TableCell>
                                <TableCell>{item.idUser}</TableCell>
                                <TableCell><PermisionNavigation user={item} data={data} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}