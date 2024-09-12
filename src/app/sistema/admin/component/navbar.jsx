"use client"
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";


export default function NavGestion() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const path = usePathname()
    const menuItems = [

        {
            label: 'Equipos',
            url: '/sistema/admin'
        },

    ];
    return (



        <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-violet-100">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />

            </NavbarContent>
            <div className="justify-center hidden w-full gap-5 py-2 overflow-x-auto md:flex bg-violet-100">
                <div className="flex-shrink-0">
                    <Link
                        color={path == "/sistema/admin" ? "primary" : "foreground"}
                        href="/sistema/admin"
                        className="hover:text-violet-500 whitespace-nowrap"
                    >
                        Panel
                    </Link>
                </div>

            </div>
            <NavbarMenu className="mt-20">
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={path == item.url ? "primary" : "foreground"}
                            className="w-full"
                            href={item.url}
                            size="lg"
                        >
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar >

    );
}
