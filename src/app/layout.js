import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "paseapase",
  description: "Sistema de gestión deportiva",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-white min-h-screen flex flex-col`}>
        <div className="flex flex-col flex-grow">
          <main className="flex-grow">
            {children}
          </main>
          <footer className="border-t border-slate-200 bg-slate-50 py-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-sm text-slate-500">
                &copy; {new Date().getFullYear()} PaseaPase &mdash; Todos los derechos reservados
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
