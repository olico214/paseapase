export const recoveryCode = async (formData) => {
    const response = await fetch('/api/auth/recovery', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    return await response.json()
}


export const validateCode = async (formData) => {
    const response = await fetch('/api/auth/recovery', {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    return await response.json()
} 