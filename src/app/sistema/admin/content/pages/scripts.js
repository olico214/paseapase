/**
 * 
 * @param {*} data 
 * @returns 
 */
export const savePage = async (data) => {

    if (data.url && data.icon && data.des && data.name) {
        const response = await fetch('/api/admin/pages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await response.json()
    }
}

/**
 * 
 * @param {*} data 
 * @returns 
 */

export const handledelete = async (data) => {

    if (data) {
        const response = await fetch('/api/admin/pages', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await response.json()
    }
}



/**
 * 
 * @param {*} data 
 * @returns 
 */
export const fecthPages = async () => {

    const response = await fetch('/api/admin/pages')
    return await response.json()

}

