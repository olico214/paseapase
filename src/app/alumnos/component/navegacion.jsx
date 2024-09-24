"use client"
import React, { useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { deleteCookie } from "@/app/libs/cookie";
import { usePathname, useRouter } from "next/navigation";


export default function NavUSuario({ sesion, user }) {
    const path = usePathname()
    const router = useRouter()
    // console.log(user)
    if (!path.includes(user) || path === 'alumnos') {
        try {

            router.push('/alumnos')
        } catch {

        }
    }
    const handleDeleteSession = () => {
        deleteCookie()
    }
    return (
        <Navbar className="fondo letra">
            <NavbarContent>
                <NavbarBrand>
                    <p className="font-bold text-inherit">{sesion}</p>
                </NavbarBrand>
            </NavbarContent>



            <NavbarContent justify="end">

                <NavbarItem>
                    <Button onPress={handleDeleteSession} color="danger" href="#" >
                        Cerrar Sesion
                    </Button>
                </NavbarItem>
            </NavbarContent>

        </Navbar >
    );
}
