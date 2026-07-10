"use client"
import { useState, useEffect } from 'react'
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react"
import { handledelete } from './scripts'
import { FiTrash2 } from "react-icons/fi"

export default function TablePagesComponent({ data, asyncFecthData }) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (data) setLoading(false)
    }, [data])

    const handleDelete = async (id) => {
        await handledelete({ id })
        asyncFecthData()
    }

    return (
        <Table
            aria-label="Tabla de páginas"
            removeWrapper
            classNames={{
                th: "bg-transparent text-slate-500 font-medium text-xs uppercase tracking-wider",
                td: "text-sm py-3",
            }}
        >
            <TableHeader>
                <TableColumn>Página</TableColumn>
                <TableColumn>URL</TableColumn>
                <TableColumn>Ícono</TableColumn>
                <TableColumn className="text-center">Acción</TableColumn>
            </TableHeader>
            {!loading ? (
                data && data.length > 0 ? (
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id} className="hover:bg-slate-50 transition-colors">
                                <TableCell>
                                    <div>
                                        <p className="font-medium text-slate-700">{item.name}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{item.description}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <code className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{item.url}</code>
                                </TableCell>
                                <TableCell>
                                    <Chip size="sm" variant="flat" color="secondary">
                                        {item.icon}
                                    </Chip>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="light"
                                        color="danger"
                                        onPress={() => handleDelete(item.id)}
                                        className="rounded-lg"
                                    >
                                        <FiTrash2 className="text-base" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                ) : (
                    <TableBody emptyContent="No hay páginas registradas." />
                )
            ) : (
                <TableBody emptyContent="Cargando..." />
            )}
        </Table>
    )
}
