
import { redirect } from 'next/navigation'
import { getNameSession } from "@/app/libs/cookie";
import NavUSuario from "./component/navegacion";
import { middleware } from '../../../middleware';
const sesion = process.env.SISTEMNAME

export const metadata = {
  title: "Alumnos y Expedientes",
  description: "Pagina de alumnos y expediente",
};

export default async function Layout({ children }) {
  const name = await getNameSession()

  if (!name) {
    return redirect('/')
  }

  const paginas = await middleware()
  return (
    <section>
      <NavUSuario sesion={sesion} paginas={paginas} />
      {children}
    </section>
  );
}
