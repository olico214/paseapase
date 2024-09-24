"use client"
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { handleSave } from "./scripts";
import { usePathname } from "next/navigation";

export default function FormularioAlumno({ boton, refreshData, data }) {
  const path = usePathname()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    registerDate: '',
    parent_Name: '',
    parent: '',
    parentEmergency: '',
    parentWhatsapp: '',
    id: 0
  });


  const openData = () => {
    if (data) {
      const fecha1 = data.birthDate
      const fecha2 = data.alta_date

      setFormData(prevState => ({
        ...prevState,
        fullName: data.fullName,
        birthDate: fecha1.split('T')[0],
        registerDate: fecha2.split('T')[0],
        parent_Name: data.parent_name,
        parent: data.parent,
        parentEmergency: data.parent_emergency,
        parentWhatsapp: data.parent_Whatsapp,
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
      <Button onPress={onOpen} color="primary" variant={boton == "Editar" ? "flat" : "solid"} onClick={openData}>{boton}</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Alumno</ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-4">
                    <span><h4>Datos Personales</h4></span>
                  </div>
                  <div className="col-span-2">
                    <Input type="text" label="Nombre  Alumno" name="fullName" value={formData.fullName} onChange={handleChange} ></Input>
                  </div>
                  <div >
                    <Input type="date" label="Fecha de nacimiento" name="birthDate" value={formData.birthDate} onChange={handleChange}></Input>
                  </div>
                  <div>
                    <Input type="date" label="Fecha de inscripcion" name="registerDate" value={formData.registerDate} onChange={handleChange}></Input>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-4">
                    <span><h4>Contacto de Emergencia</h4></span>
                  </div>
                  <div className="col-span-2">
                    <Input type="text" label="Nombre" name="parent_Name" value={formData.parent_Name} onChange={handleChange}></Input>
                  </div>
                  <div className="col-span-2">
                    <Select
                      label="Parentesco"
                      name="parent"
                      selectedKeys={[formData.parent]}
                      onChange={handleChange}
                    >
                      <SelectItem key='Padre'>
                        Padre
                      </SelectItem>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Input type="number" label="Telefono de Emergencia" name="parentWhatsapp" value={formData.parentWhatsapp} onChange={handleChange}></Input>
                  </div>
                  <div className="col-span-2">
                    <Input type="number" label="Whatsapp" name="parentEmergency" value={formData.parentEmergency} onChange={handleChange}></Input>
                  </div>

                </div>


              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={(async () => {
                  await handleSave(formData)
                  await refreshData()
                })}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal >
    </>
  );
}
