import Swal from "sweetalert2"

export const handlePeriodo = async () => {
    const response = await fetch('/api/periodo')
    const data = await response.json()
    return data.data
}


export const SaveImage = async (image) => {
    const response = await fetch('https://images.paseapase.com/api.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: image }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const result = await response.json();
    // console.log(result)
    return result;
}


export const saveUrlImage = async (id, url) => {
    const data = {
        id: id,
        url: url
    }
    const response = await fetch('/api/alumnos/image/' + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    Swal.fire({
        title: "Exito",
        text: "Imagen Guardada con exito",
        icon: "success"
    });
}




export const deleteurl = async (id) => {

    const response = await fetch('/api/alumnos/image/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    Swal.fire({
        title: "Exito",
        text: "Imagen Eliminada con exito",
        icon: "success"
    });
}
