import { redirect } from 'next/navigation'
import { getNameSession } from "@/app/libs/cookie"
import { getNavigation } from "@/app/libs/admin"
import NavUSuario from "./component/navegacion"

export const dynamic = 'force-dynamic'

const sesion = process.env.SISTEMNAME

export const metadata = {
  title: "Panel de control",
  description: "Sistema de gestión deportiva",
}

export default async function Layout({ children }) {
  const name = await getNameSession()

  if (!name) {
    return redirect('/')
  }

  const paginas = await getNavigation()
  return (
    <section className="min-h-screen bg-slate-50">
      <NavUSuario sesion={sesion} paginas={paginas} userName={name} />
      <main>{children}</main>
    </section>
  )
}
