import { userFecth } from "@/app/libs/admin";
import ContenidoComponent from "./content/componentes";

export const dynamic = 'force-dynamic'

export default async function AdminPanel() {
    const users = await userFecth()

    return (
        <>
            <ContenidoComponent users={users} />
        </>
    )
}