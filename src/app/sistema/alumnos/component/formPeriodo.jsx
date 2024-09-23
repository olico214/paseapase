"use client"
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { fetchDataPeriodo, handleDeletePeriodo, handleSave, handleSavePeriodo } from "./scripts";

export default function FormularioPeriodo({ }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState()
  const [estado, setEstado] = useState(true)

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    startDate: '',
    endDate: '',
    proximamente: '',
    id: 0
  });




  const asyncfetchData = async () => {
    const response = await fetchDataPeriodo()
    setData(response)
    setLoading(false)
    setFormData(prevState => ({
      ...prevState,
      nombre: "",
      startDate: "",
      endDate: "",
      proximamente: "",
      id: 0
    }));
  }


  const openData = (data) => {
    if (data) {
      const fecha1 = data.startDate
      const fecha2 = data.endDate

      setFormData(prevState => ({
        ...prevState,
        nombre: data.nombre,
        startDate: fecha1.split("T")[0],
        endDate: fecha2.split("T")[0],
        // proximamente: data.proximamente,
        id: data.id
      }));
    }
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
      <Button onPress={onOpen} color="primary" variant='flat' onClick={asyncfetchData}>Nuevo Periodo</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Periodo</ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-4">
                    <span><h4>{estado ? "Nuevo Registro" : "Editar"}</h4></span>
                  </div>
                  <div className="col-span-2">
                    <Input type="text" label="Nombre Periodo" name="nombre" value={formData.nombre} onChange={handleChange} ></Input>
                  </div>
                  <div >
                    <Input type="date" label="Fecha Inicio" name="startDate" value={formData.startDate} onChange={handleChange}></Input>
                  </div>
                  <div>
                    <Input type="date" label="Fecha Fin" name="endDate" value={formData.endDate} onChange={handleChange}></Input>
                  </div>
                  {/* <div className="col-span-2">
                    <Select
                      label="Proximamente"
                      name="proximamente"
                      selectedKeys={[formData.proximamente]}
                      onChange={handleChange}
                    >
                      <SelectItem key='1'>
                        SI
                      </SelectItem>
                    </Select>
                  </div> */}
                  <div>
                    <Button color="primary" onPress={(async () => {
                      await handleSavePeriodo(formData)
                      await asyncfetchData()

                      setFormData(prevState => ({
                        ...prevState,
                        nombre: '',
                        startDate: "",
                        endDate: "",
                        proximamente: '',
                        id: 0
                      }));
                    })}>
                      Guardar
                    </Button>
                  </div>
                  <div className="col-span-4">
                    <Table aria-label="Example static collection table">
                      <TableHeader>
                        <TableColumn>Nombre Periodo</TableColumn>
                        <TableColumn>Fecha de inicio</TableColumn>
                        <TableColumn>Fecha de Fin</TableColumn>
                        {/* <TableColumn>Proximamente</TableColumn> */}
                        <TableColumn>Accion</TableColumn>
                      </TableHeader>

                      {!loading ? (
                        data && data.length > 0 ? (
                          <TableBody>
                            {data.map((item) => (
                              <TableRow key={item.id}>

                                <TableCell>{item.nombre}</TableCell>
                                <TableCell>{item.startDate.split("T")[0]}</TableCell>
                                <TableCell>{item.endDate.split("T")[0]}</TableCell>
                                {/* <TableCell>{item.proximamente}</TableCell> */}
                                <TableCell>
                                  <Button color="primary" onPress={(() => {
                                    openData(item)
                                  })}>Editar</Button>
                                  <Button color="danger" onPress={(async () => {
                                    await handleDeletePeriodo(item.id)
                                    await asyncfetchData()
                                  })}>Eliminar</Button></TableCell>


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
      </Modal >
    </>
  );
}
