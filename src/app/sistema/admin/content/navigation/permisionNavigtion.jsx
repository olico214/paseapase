"use client"
import react, { useState, useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, CheckboxGroup, Checkbox } from "@nextui-org/react";
import { handlePages, handleSavePage } from './scripts';


export default function PermisionNavigation({ user, data }) {
    const [selected, setSelected] = useState([]);


    const asyncFecthData = async () => {
        const data = {
            id: user.idUser
        }
        const info = await handlePages(data)
        const ids = info.map((item) => item.id);

        setSelected(ids)


    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} onClick={asyncFecthData}>Gestionar Permisos</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl" backdrop="blur">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Permisos: {user.fullname}</ModalHeader>
                            <ModalBody>
                                <div>
                                    <CheckboxGroup
                                        label="Seleccionar páginas"
                                        orientation="horizontal"
                                        color="primary"
                                        value={selected}
                                        onValueChange={setSelected}
                                        classNames={{
                                            base: "w-full flex flex-wrap gap-4 p-4 border border-gray-300 rounded-lg bg-gray-50"
                                        }}
                                    >
                                        {data.map((item) => (
                                            <Checkbox
                                                key={item.id}
                                                value={item.id}
                                                classNames={{
                                                    base: "flex items-center gap-2"
                                                }}
                                            >
                                                {item.name}
                                            </Checkbox>
                                        ))}
                                    </CheckboxGroup>

                                    <div className='mt-5'>
                                        <Button
                                            color='primary'
                                            className="px-4 py-2 text-white transition bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
                                            onPress={async () => {
                                                const data = {
                                                    id: user.idUser,
                                                    selected: selected
                                                }
                                                await handleSavePage(data);
                                            }}
                                        >
                                            Guardar
                                        </Button>
                                    </div>

                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
