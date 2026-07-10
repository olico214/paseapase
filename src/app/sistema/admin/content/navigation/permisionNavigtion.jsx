"use client"
import { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, CheckboxGroup, Checkbox, Chip } from "@nextui-org/react"
import { handlePages, handleSavePage } from './scripts'
import { FiSettings, FiCheck } from "react-icons/fi"

export default function PermisionNavigation({ user, data }) {
    const [selected, setSelected] = useState([])
    const [saved, setSaved] = useState(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const asyncFecthData = async () => {
        const info = await handlePages({ id: user.idUser })
        setSelected(info.map(item => item.id))
        setSaved(false)
    }

    const handleOpen = () => {
        asyncFecthData()
        onOpen()
    }

    const handleSave = async () => {
        await handleSavePage({ id: user.idUser, selected })
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    return (
        <>
            <Button
                onPress={handleOpen}
                size="sm"
                variant="flat"
                color="primary"
                startContent={<FiSettings />}
                className="font-medium rounded-xl"
            >
                Gestionar permisos
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" backdrop="blur" className="rounded-2xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 pt-8 px-8">
                                <span className="text-xl font-bold">Permisos de {user.fullname}</span>
                                <span className="text-sm font-normal text-slate-500">
                                    Selecciona las páginas a las que {user.fullname} tendrá acceso
                                </span>
                            </ModalHeader>
                            <ModalBody className="px-8 py-4">
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                                    {data && data.length > 0 ? (
                                        <CheckboxGroup
                                            label={
                                                <span className="text-sm font-semibold text-slate-700">
                                                    Páginas disponibles ({selected.length} seleccionadas)
                                                </span>
                                            }
                                            orientation="horizontal"
                                            color="primary"
                                            value={selected}
                                            onValueChange={setSelected}
                                            classNames={{
                                                base: "w-full",
                                                wrapper: "flex flex-wrap gap-3 mt-3",
                                            }}
                                        >
                                            {data.map((item) => (
                                                <Checkbox
                                                    key={item.id}
                                                    value={item.id}
                                                    classNames={{
                                                        base: "bg-white hover:bg-primary/5 border border-slate-200 rounded-xl px-4 py-3 transition-all min-w-[200px] flex-1",
                                                        label: "text-sm font-medium text-slate-700",
                                                    }}
                                                >
                                                    <div className="flex flex-col gap-0.5">
                                                        <span>{item.name}</span>
                                                        <span className="text-xs text-slate-400 font-normal">{item.description}</span>
                                                    </div>
                                                </Checkbox>
                                            ))}
                                        </CheckboxGroup>
                                    ) : (
                                        <p className="text-slate-400 text-sm text-center py-8">No hay páginas disponibles. Crea páginas primero.</p>
                                    )}
                                </div>
                            </ModalBody>
                            <ModalFooter className="px-8 pb-8 gap-3">
                                {saved && (
                                    <Chip color="success" variant="flat" startContent={<FiCheck />}>
                                        Guardado correctamente
                                    </Chip>
                                )}
                                <Button color="danger" variant="light" onPress={onClose} className="rounded-xl">
                                    Cerrar
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={handleSave}
                                    startContent={<FiCheck />}
                                    className="rounded-xl font-medium shadow-lg shadow-primary/30"
                                    isDisabled={!data || data.length === 0}
                                >
                                    Guardar cambios
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
