import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Panel de administracion",
  description: "Lleva el control de tu liga",
};

export default async function LayoutEquipos({ children }) {

  return (
    <div>

      <section>

        {children}
      </section>
    </div>
  );
}
