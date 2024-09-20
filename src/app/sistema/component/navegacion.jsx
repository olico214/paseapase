"use client"
import React, { useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { deleteCookie } from "@/app/libs/cookie";
import { usePathname } from "next/navigation";
import { redirectSistema } from "@/app/libs/admin";


export default function NavUSuario({ sesion, paginas }) {
    const path = usePathname();


    useEffect(() => {
        if (paginas) {
            let isValidUrl = false;
            for (const url of paginas) {

                if (url.url === path || path === "/sistema" || path.includes(url.url)) {
                    isValidUrl = true;
                    break;
                }
            }
            if (!isValidUrl) {
                redirectSistema()
            }
        }
    }, [paginas, path]);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        "Inicio",

    ];
    const handleDeleteSession = () => {
        deleteCookie()
    }
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-violet-200">
            <NavbarContent>
                {/* <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                /> */}
                <NavbarBrand>
                    <p className="font-bold text-inherit">{sesion}</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden gap-4 sm:flex" justify="center">
                <NavbarItem isActive>
                    <Link aria-current="page" href="/sistema">
                        Inicio
                    </Link>
                </NavbarItem>

            </NavbarContent>
            <NavbarContent justify="center" className="gap-4 lg:hidden sm:flex">

                <NavbarItem>
                    <Link
                        className="w-full"
                        href="/sistema"
                        size="lg"
                    >
                        Inicio
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">

                <NavbarItem>
                    <Button onPress={handleDeleteSession} color="primary" href="#" variant="flat">
                        Cerrar Sesion
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="/sistema"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
