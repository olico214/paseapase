"use client"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Chip } from "@nextui-org/react"
import PermisionNavigation from "./permisionNavigtion"

const roleColors = {
    admin: "primary",
    user: "default",
    editor: "success",
}

export default function TableUserComponent({ users, data }) {
    return (
        <Table
            aria-label="Tabla de usuarios"
            removeWrapper
            classNames={{
                th: "bg-transparent text-slate-500 font-medium text-xs uppercase tracking-wider",
                td: "text-sm py-3",
            }}
        >
            <TableHeader>
                <TableColumn>Nombre</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn>Rol</TableColumn>
                <TableColumn className="text-center">Acciones</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No hay usuarios registrados.">
                {users.map((item) => (
                    <TableRow key={item.idUser} className="hover:bg-slate-50 transition-colors">
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <span className="text-xs font-bold text-primary">
                                        {item.fullname?.charAt(0)?.toUpperCase() || "?"}
                                    </span>
                                </div>
                                <span className="font-medium text-slate-700">{item.fullname}</span>
                            </div>
                        </TableCell>
                        <TableCell className="text-slate-500">{item.email}</TableCell>
                        <TableCell>
                            <Chip
                                size="sm"
                                variant="flat"
                                color={roleColors[item.rol] || "default"}
                                className="font-medium capitalize"
                            >
                                {item.rol || "user"}
                            </Chip>
                        </TableCell>
                        <TableCell>
                            <PermisionNavigation user={item} data={data} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
