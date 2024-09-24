"use client"

import { usePathname } from "next/navigation"
export default function ControllerNavbar({ name, sesion, pages }) {
    const path = usePathname();
    if (path === "/sesion" || path === "/alumnos") {
        return null;
    }


    if (name) {
        <></>
    } else {
        // return <NavInicio sesion={sesion} />;
    }
}