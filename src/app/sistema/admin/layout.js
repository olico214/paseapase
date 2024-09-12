import { Inter } from "next/font/google";

import NavGestion from "./component/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gestion de equipos y Calendario de equipos",
  description: "Lleva el control de tu liga",
};

export default async function LayoutEquipos({ children }) {

  return (
    <div>
      <NavGestion />
      <section>

        {children}
      </section>
    </div>
  );
}
