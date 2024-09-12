import { FaRobot, FaList, FaStore, FaFutbol, FaBook, FaPersonBooth, FaKey } from 'react-icons/fa';
import React from 'react';
import Link from 'next/link';
import { getallPages } from '@/app/libs/admin';
export const metadata = {
    title: 'Menú',
    description: 'Toda',
};

export default async function PageIA() {
    const pages = await getallPages();
    const icons = {
        FaFutbol: FaFutbol,
        FaKey: FaKey
    }

    if (pages) {
        return (
            <div className="py-20 bg-gray-100 font-montserrat">
                <div className="container px-4 mx-auto text-center">
                    <h2 className="mb-10 text-4xl font-bold text-primary">Menú</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {pages.map((item, index) => {
                            const IconComponent = icons[item.icon] || FaKey;
                            return (
                                <div key={index} className="p-6 transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105">
                                    <IconComponent className="mx-auto mb-4 text-6xl text-secondary" />
                                    <h3 className="mb-2 text-2xl font-bold text-primary">{item.name}</h3>
                                    <p className="text-gray-700">
                                        {item.description}
                                    </p>
                                    <Link href={item.url} className="text-blue-500 hover:underline">
                                        Ver más
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <></>
        )
    }


}
