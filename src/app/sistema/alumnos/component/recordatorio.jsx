"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react"
import { useState } from "react"
import { handlefetchRecordatorio, handleSaveRecordatorio } from "./scripts"
import { FiBell, FiSave, FiX, FiTrash2, FiPlus } from "react-icons/fi"

function formatoFecha(fecha) {
    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ]
    const fechaObj = new Date(fecha)
    const dia = fechaObj.getDate().toString().padStart(2, '0')
    const mes = meses[fechaObj.getMonth()]
    const anio = fechaObj.getFullYear()
    return `${dia} de ${mes} del ${anio}`
}

export default function RecordatorioPage() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [fecha, setFecha] = useState('')
    const [comentario, setComentario] = useState('')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const loadData = () => {
        onOpen()
        fetchasyncData()
    }

    const fetchasyncData = async () => {
        const response = await handlefetchRecordatorio()
        setData(response)
        setLoading(false)
    }

    const handleGuardar = async () => {
        const response = await handleSaveRecordatorio(fecha, comentario)
        if (response) {
            setComentario("")
            setFecha("")
            await fetchasyncData()
        }
    }

    const handleDelete = async (id) => {
        await fetch('/api/recordatorio', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        })
        await fetchasyncData()
    }

    const inputClasses = {
        label: "text-xs font-medium text-slate-600 pb-1",
        inputWrapper: "border-slate-300 rounded-xl h-11",
    }

    return (
        <>
            <Button
                onPress={loadData}
                variant="flat"
                color="warning"
                startContent={<FiBell />}
                className="font-medium rounded-xl"
            >
                Recordatorios
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" className="rounded-2xl" backdrop="blur">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 pt-8 px-8">
                                <span className="text-xl font-bold">Recordatorios</span>
                                <span className="text-sm font-normal text-slate-500">
                                    Programa recordatorios para eventos importantes
                                </span>
                            </ModalHeader>
                            <ModalBody className="px-8 py-2">
                                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-4">
                                    <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                        <FiPlus className="text-amber-500" />
                                        Nuevo recordatorio
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                                        <Input
                                            type="date"
                                            label="Fecha"
                                            labelPlacement="outside"
                                            name="fecha"
                                            value={fecha}
                                            onChange={(e) => setFecha(e.target.value)}
                                            classNames={inputClasses}
                                        />
                                        <div className="sm:col-span-2 flex gap-2 items-end">
                                            <div className="flex-grow">
                                                <Textarea
                                                    label="Descripción"
                                                    labelPlacement="outside"
                                                    placeholder="Escribe el recordatorio..."
                                                    name="comentario"
                                                    value={comentario}
                                                    onChange={(e) => setComentario(e.target.value)}
                                                    classNames={{
                                                        label: "text-xs font-medium text-slate-600 pb-1",
                                                        inputWrapper: "border-slate-300 rounded-xl",
                                                    }}
                                                    minRows={1}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <Button
                                                color="primary"
                                                onPress={handleGuardar}
                                                startContent={<FiSave />}
                                                className="rounded-xl font-medium shadow-lg shadow-primary/30"
                                            >
                                                Guardar recordatorio
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <Table
                                    aria-label="Tabla de recordatorios"
                                    removeWrapper
                                    classNames={{
                                        th: "bg-transparent text-slate-500 font-medium text-xs uppercase tracking-wider",
                                        td: "text-sm py-3",
                                    }}
                                >
                                    <TableHeader>
                                        <TableColumn>Fecha</TableColumn>
                                        <TableColumn>Descripción</TableColumn>
                                        <TableColumn>Estado</TableColumn>
                                        <TableColumn className="text-center">Acción</TableColumn>
                                    </TableHeader>
                                    {!loading ? (
                                        data && data.length > 0 ? (
                                            <TableBody>
                                                {data.map((item) => (
                                                    <TableRow key={item.id} className="hover:bg-slate-50 transition-colors">
                                                        <TableCell className="font-medium text-slate-700">
                                                            {formatoFecha(item.fecha?.split('T')[0])}
                                                        </TableCell>
                                                        <TableCell className="text-slate-600">
                                                            {item.comentario}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Chip
                                                                size="sm"
                                                                variant="flat"
                                                                color={item.status == 0 ? "default" : "success"}
                                                                className="font-medium"
                                                                startContent={item.status == 0 ? <FiX /> : undefined}
                                                            >
                                                                {item.status == 0 ? "Cerrado" : "Abierto"}
                                                            </Chip>
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.status != 0 && (
                                                                <Button
                                                                    size="sm"
                                                                    variant="flat"
                                                                    color="danger"
                                                                    isIconOnly
                                                                    className="rounded-lg"
                                                                    onPress={() => handleDelete(item.id)}
                                                                >
                                                                    <FiTrash2 />
                                                                </Button>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        ) : (
                                            <TableBody emptyContent={
                                                <div className="py-8 text-slate-400">
                                                    <FiBell className="text-3xl mx-auto mb-2" />
                                                    <p>No hay recordatorios programados</p>
                                                </div>
                                            } />
                                        )
                                    ) : (
                                        <TableBody emptyContent="Cargando..." />
                                    )}
                                </Table>
                            </ModalBody>
                            <ModalFooter className="px-8 pb-8">
                                <Button color="danger" variant="light" onPress={onClose} className="rounded-xl">
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
