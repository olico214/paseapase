import Swal from "sweetalert2";


/**
 * 
 * @returns {object}
 */
export const fetchData = async (id) => {
    const response = await fetch('/api/alumnos/' + id)
    const data = await response.json()
    return data.data
}



export const fetchAllalumnos = async () => {
    const response = await fetch('/api/alumnos')
    const data = await response.json()
    return data.data
}

/**
 * @param {id}
 */
export const handleDelete = async (id) => {
    const data = {
        id: id
    }


    const response = await fetch('/api/alumnos', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

/**
 * 
 * @param {*} formData 
 */

export const handleSave = async (formData) => {


    if (formData.fullName && formData.birthDate && formData.registerDate && formData.parent_Name && formData.parent && formData.parentEmergency && formData.parentWhatsapp) {

        const response = await fetch('/api/alumnos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            Swal.fire({
                title: "Exito",
                text: "Datos guardados Con exito",
                icon: "success"
            });
        }
    } else {
        const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            padding: '2em',
            customClass: 'sweet-alerts',
        });
        toast.fire({
            icon: 'error',
            title: 'Debe llenar todos los campos',
            padding: '2em',
            customClass: 'sweet-alerts',
        });
    }
}















export const fetchDataPeriodo = async () => {
    const response = await fetch('/api/periodo')
    const data = await response.json()
    return data.data
}

export const handleSavePeriodo = async (formData) => {


    if (formData.nombre && formData.startDate && formData.endDate) {

        const response = await fetch('/api/periodo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                padding: '2em',
                customClass: 'sweet-alerts',
            });
            toast.fire({
                icon: 'success',
                title: 'Periodo Creado Con exito',
                padding: '2em',
                customClass: 'sweet-alerts',
            });
        }
    } else {
        const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            padding: '2em',
            customClass: 'sweet-alerts',
        });
        toast.fire({
            icon: 'error',
            title: 'Debe llenar todos los campos',
            padding: '2em',
            customClass: 'sweet-alerts',
        });
    }

}



export const handleDeletePeriodo = async (id) => {
    const data = {
        id: id
    }

    Swal.fire({
        title: "¿Estas Seguro de eliminar el periodo?",
        text: "Este proceso no se puede revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
    }).then((result) => {
        if (result.isConfirmed) {
            const response = fetch('/api/periodo', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                padding: '2em',
                customClass: 'sweet-alerts',
            });
            toast.fire({
                icon: 'success',
                title: 'Periodo eliminado con exito',
                padding: '2em',
                customClass: 'sweet-alerts',
            });
        }
    });


}







export const handleSaveRecordatorio = async (fecha, comentario) => {


    if (fecha && comentario) {
        const formData = {
            fecha: fecha,
            comentario: comentario
        }
        const response = await fetch('/api/recordatorio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                padding: '2em',
                customClass: 'sweet-alerts',
            });
            toast.fire({
                icon: 'success',
                title: 'Exito al guardar los datos',
                padding: '2em',
                customClass: 'sweet-alerts',
            });
            return true
        }
    } else {
        const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            padding: '2em',
            customClass: 'sweet-alerts',
        });
        toast.fire({
            icon: 'error',
            title: 'Debe llenar todos los campos',
            padding: '2em',
            customClass: 'sweet-alerts',
        });
        return false
    }
}







export const handlefetchRecordatorio = async () => {



    const response = await fetch('/api/recordatorio');
    const data = await response.json()
    return data.data
}
