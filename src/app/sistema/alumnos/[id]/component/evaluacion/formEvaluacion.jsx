"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { handlePeriodo, saveCalificacion } from "./scripts";

export default function FormEvaluation({ id, data, asynFetchData }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [periodo, setPeriodo] = useState([])
    const [formData, setFormData] = useState({
        trabajo_en_equipo: '',
        esfuerzo: '',
        energia: '',
        companerismo: '',
        actitud: '',
        conduccion: '',
        recepcion: '',
        pase: '',
        desplazamiento: '',
        tiro: '',
        periodo: '',
        id: 0
    });

    const checkData = async () => {
        if (data) {

        }
        const response = await handlePeriodo()
        setPeriodo(response)
    }




    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    return (
        <>
            <Button onPress={onOpen} onClick={checkData}>Agregar Notas</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Areas</ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-3">
                                        <Select
                                            label="Selecciona un periodo"
                                            className="max-w-xs"
                                            name="periodo"
                                            selectedKeys={[formData.periodo]}
                                            onChange={handleChange}
                                        >
                                            {periodo.map((item) => (
                                                <SelectItem key={item.nombre}>
                                                    {item.nombre}
                                                </SelectItem>
                                            ))}

                                        </Select>
                                    </div>
                                    <div className="col-span-3">
                                        <h4>conceptos futbolísticos</h4>
                                    </div>
                                    <div>
                                        <Input type="number" label="Trabajo en Equipo" name="trabajo_en_equipo" value={formData.trabajo_en_equipo} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <Input type="number" label="Esfuerzo" name="esfuerzo" value={formData.esfuerzo} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <Input type="number" label="Energía" name="energia" value={formData.energia} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Input type="number" label="Compañerismo" name="companerismo" value={formData.companerismo} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <Input type="number" label="Actitud" name="actitud" value={formData.actitud} onChange={handleChange} />
                                    </div>
                                </div>







                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-3">
                                        <h4>conceptos personales</h4>
                                    </div>
                                    <div>
                                        <Input type="number" label="Conducción" name="conduccion" value={formData.conduccion} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <Input type="number" label="Recepción" name="recepcion" value={formData.recepcion} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <Input type="number" label="Pase" name="pase" value={formData.pase} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Input type="number" label="Desplazamiento" name="desplazamiento" value={formData.desplazamiento} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <Input type="number" label="Tiro" name="tiro" value={formData.tiro} onChange={handleChange} />
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={(async () => {
                                    const response = await fetch('/api/expediente/' + id, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify(formData),
                                    });
                                    await asynFetchData()
                                })}>
                                    Guardar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}