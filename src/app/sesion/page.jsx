"use client"
import React, { useState } from "react";
import { Switch } from "@nextui-org/react";
import InputLogin from "./component/login.jsx";
import InputRegister from "./component/register.jsx";
import { MoonIcon } from "./component/Moonicon.jsx";
import { SunIcon } from "./component/Sunicoon.jsx";

export default function UserHome() {
    const [isSelected, setIsSelected] = useState(true);
    return (
        <>
            <div
                className="relative flex items-center justify-center w-full h-screen bg-no-repeat bg-cover"
                style={{
                    backgroundImage: "url('/back.png')",
                }}
            >

                <div className="relative px-16 py-10 bg-gray-100 shadow-lg rounded-xl backdrop-blur-md max-sm:px-8 ">
                    <div className="text-white">
                        <div className="grid items-center mb-8">
                            <h1 className="mb-2 text-2xl text-black">Menu</h1>
                            <div className={isSelected ? 'block' : 'hidden'}>
                                <InputLogin />
                            </div>
                            <div className={isSelected ? 'hidden' : 'block'}>
                                <InputRegister />
                            </div>
                        </div>
                        <div className="flex items-center content-center justify-center mx-auto">
                            <Switch
                                defaultSelected
                                size="lg"
                                color="success"
                                startContent={<SunIcon />}
                                endContent={<MoonIcon />}
                                isSelected={isSelected}
                                onValueChange={setIsSelected}
                            />
                            <p className="text-small text-default-500">
                                {isSelected ? "Iniciar Sesion" : "Registrarse"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}