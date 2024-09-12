export const handleSavePage = async (data) => {
    console.log(data)

    const response = await fetch('/api/admin/savePages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return await response.json()

}


/**
 * 
 * @returns object
 * 
 */


export const handlePages = async (data) => {
    const response = await fetch('/api/admin/navigation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const respuesta = await response.json()
    return respuesta.data
}