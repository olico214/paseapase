export const handlePeriodo = async () => {
    const response = await fetch('/api/periodo')
    const data = await response.json()
    return data.data
}

