"use client"
import { Image } from "@nextui-org/react";

export default function ImageUserComponent() {

    return (
        <div className="flex content-center justify-center mx-auto">
            <Image
                width={300}
                height={200}
                src="https://via.placeholder.com/300x200"
                fallbackSrc="https://via.placeholder.com/300x200"
                alt="NextUI Image with fallback"
            />
        </div>
    )
}