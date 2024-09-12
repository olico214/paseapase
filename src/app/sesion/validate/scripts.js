export const saveValidation = async (formData) => {
    const response = await fetch('/api/auth/validateRegister', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    return response
} 