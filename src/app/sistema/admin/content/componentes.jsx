"use client"
import react, { useState, useEffect } from 'react'
import TableUserComponent from "./navigation/tableuser";
import ModalComponent from "./pages/modal";
import { fecthPages } from './pages/scripts';

export default function ContenidoComponent({ users }) {
    const [data, setData] = useState()
    useEffect(() => {
        asyncFecthData()
    }, []);


    const asyncFecthData = async () => {
        const info = await fecthPages()
        setData(info.data)

    }
    return (
        <>
            <div className="grid justify-center gap-5 p-10 mx-auto mt-10 panel">
                <div className="">
                    <ModalComponent data={data} asyncFecthData={asyncFecthData} />
                </div>
                <TableUserComponent users={users} data={data} />
            </div>
        </>
    )
}