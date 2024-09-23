"use client"
import React, { useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { deleteCookie } from "@/app/libs/cookie";
import { usePathname, useRouter } from "next/navigation";

import { redirectLoginPadre } from "@/app/libs/cookieAlumos";



export default function NavUSuario({ sesion, user }) {
    const path = usePathname()
    const router = useRouter()

    if (!path.includes(user)) {
        try {

            router.push('/alumnos/' + user)
        } catch {

        }
    }
    const handleDeleteSession = () => {
        deleteCookie()
    }
    return (
        <Navbar className="bg-violet-200">
            <NavbarContent>
                <NavbarBrand>
                    <p className="font-bold text-inherit">{sesion}</p>
                </NavbarBrand>
            </NavbarContent>



            <NavbarContent justify="end">

                <NavbarItem>
                    <Button onPress={handleDeleteSession} color="primary" href="#" variant="flat">
                        Cerrar Sesion
                    </Button>
                </NavbarItem>
            </NavbarContent>

        </Navbar>
    );
}
