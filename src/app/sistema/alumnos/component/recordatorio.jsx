import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useState } from "react";
import { handlefetchRecordatorio, handleSaveRecordatorio } from "./scripts";

export default function RecordatorioPage() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [fecha, setFecha] = useState('')
    const [comentario, setComentario] = useState('')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const loadData = () => {
        onOpen()
        fetchasyncData()
    }

    const fetchasyncData = async () => {

        const response = await handlefetchRecordatorio()
        setData(response)
        setLoading(false)
    }


    function formatoFecha(fecha) {
        const meses = [
          "enero", "febrero", "marzo", "abril", "mayo", "junio",
          "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];
      
        const fechaObj = new Date(fecha);
        const dia = fechaObj.getDate().toString().padStart(2, '0'); // Asegura que el día tenga dos dígitos
        const mes = meses[fechaObj.getMonth()];
        const anio = fechaObj.getFullYear();
      
        return `${dia} de ${mes} del ${anio}`;
      }
    return (
        <>
            <Button onPress={loadData}>Recordatorios</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Recordatorios</ModalHeader>
                            <ModalBody>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="flex justify-center content-center items-center">
                                        <Input type="date" label="fecha" name="fecha" value={fecha} onChange={((e) => {
                                            setFecha(e.target.value)
                                        })} />

                                    </div>
                                    <div className="col-span-2">
                                        <Textarea label="Nombre" name="comentario" value={comentario} onChange={((e) => {
                                            setComentario(e.target.value)
                                        })} />
                                    </div>
                                    <div className="col-span-3">
                                        <Button onPress={(async () => {
                                            const response = await handleSaveRecordatorio(fecha, comentario)
                                            if (response) {
                                                setComentario("")
                                                setFecha("")
                                                await fetchasyncData()
                                            }
                                        })}>Guardar</Button>
                                    </div>
                                    <div className="col-span-3">
                                        <Table aria-label="Example static collection table">
                                            <TableHeader>
                                                <TableColumn>Fecha</TableColumn>
                                                <TableColumn>Nombre</TableColumn>
                                                <TableColumn>status</TableColumn>
                                                <TableColumn>Acciones</TableColumn>
                                            </TableHeader>

                                            {!loading ? (
                                                data && data.length > 0 ? (
                                                    <TableBody>
                                                        {data.map((item) => (
                                                            <TableRow key={item.id} className={item.status == 0 ? "bg-gray-50" : ""}>
                                                                <TableCell>{formatoFecha(item.fecha.split('T')[0])}</TableCell>
                                                                <TableCell>{item.comentario}</TableCell>
                                                                <TableCell >{item.status == 0 ? "Cerrado" : "Abierto"}</TableCell>
                                                                <TableCell>
                                                                    {item.status == 0 ? "" :
                                                                        <Button color="danger" variant="ghost" onPress={(async () => {
                                                                            const formData={
                                                                                id:item.id
                                                                            }
                                                                            const response = await fetch('/api/recordatorio', {
                                                                                method: 'DELETE',
                                                                                headers: {
                                                                                    'Content-Type': 'application/json',
                                                                                },
                                                                                body: JSON.stringify(formData),
                                                                            });
                                                                            await fetchasyncData()
                                                                        })}>
                                                                            Eliminar
                                                                        </Button>}

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
    );
}