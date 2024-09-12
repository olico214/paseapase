"use client"
import react, { useState, useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import FormPagesComponent from './form';
import TablePagesComponent from './tablepages';

export default function ModalComponent({ data, asyncFecthData }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen}>Paginas</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='5xl'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-1 md:grid-cols-1 ">
                                    <FormPagesComponent asyncFecthData={asyncFecthData} />
                                    <div>
                                        <TablePagesComponent data={data} asyncFecthData={asyncFecthData} />
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
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