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