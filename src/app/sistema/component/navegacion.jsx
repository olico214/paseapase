"use client"
import React, { useEffect } from "react"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Avatar } from "@nextui-org/react"
import { deleteCookie } from "@/app/libs/cookie"
import { usePathname } from "next/navigation"
import { redirectSistema } from "@/app/libs/admin"
import { FiHome, FiLogOut } from "react-icons/fi"

export default function NavUSuario({ sesion, paginas, userName }) {
    const path = usePathname()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    useEffect(() => {
        if (paginas && paginas.length > 0) {
            const isValid = path === "/sistema" || paginas.some(p => path.includes(p.url))
            if (!isValid) redirectSistema()
        }
    }, [paginas, path])

    const initials = userName ? userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "??"

    return (
        <Navbar
            onMenuOpenChange={setIsMenuOpen}
            maxWidth="full"
            className="bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm sticky top-0 z-50"
            height="4rem"
        >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                    className="sm:hidden"
                />
                <NavbarBrand className="gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{initials}</span>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-bold text-slate-800 text-base leading-tight">{sesion}</p>
                        <p className="text-xs text-slate-500 leading-tight">{userName}</p>
                    </div>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-1" justify="center">
                <NavbarItem isActive={path === "/sistema"}>
                    <Link
                        href="/sistema"
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${path === "/sistema"
                            ? "bg-primary/10 text-primary"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                            }`}
                    >
                        <span className="flex items-center gap-2">
                            <FiHome className="text-base" />
                            Inicio
                        </span>
                    </Link>
                </NavbarItem>
                {paginas && paginas.slice(0, 5).map((item, i) => (
                    <NavbarItem key={i} isActive={path.includes(item.url)}>
                        <Link
                            href={item.url}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${path.includes(item.url)
                                ? "bg-primary/10 text-primary"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                }`}
                        >
                            {item.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <Button
                        onPress={() => deleteCookie()}
                        variant="light"
                        color="danger"
                        size="sm"
                        className="font-medium"
                        startContent={<FiLogOut />}
                    >
                        Salir
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu className="pt-6 bg-white">
                <NavbarMenuItem>
                    <Link href="/sistema" size="lg" className={`w-full ${path === "/sistema" ? "text-primary font-semibold" : "text-slate-700"}`}>
                        Inicio
                    </Link>
                </NavbarMenuItem>
                {paginas && paginas.map((item, i) => (
                    <NavbarMenuItem key={i}>
                        <Link href={item.url} size="lg" className={`w-full ${path.includes(item.url) ? "text-primary font-semibold" : "text-slate-700"}`}>
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}
