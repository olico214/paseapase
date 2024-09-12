"use client"

import { usePathname } from "next/navigation"
import NavInicio from "./inicio"
import NavUSuario from "../../sistema/component/navegacion"


export default function ControllerNavbar({ name, sesion, pages }) {
    const path = usePathname();
    if (path === "/sesion") {
        return null;
    }


    if (name) {
        <></>
    } else {
        // return <NavInicio sesion={sesion} />;
    }
}