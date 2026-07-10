import { FaStore, FaFutbol, FaKey } from 'react-icons/fa'
import React from 'react'
import Link from 'next/link'
import { getallPages } from '@/app/libs/admin'

export const dynamic = 'force-dynamic'

export const metadata = {
    title: 'Menú',
    description: 'Panel de control',
}

const colorMap = [
    { bg: "from-blue-500 to-blue-600", shadow: "shadow-blue-200", text: "text-blue-50" },
    { bg: "from-emerald-500 to-emerald-600", shadow: "shadow-emerald-200", text: "text-emerald-50" },
    { bg: "from-violet-500 to-violet-600", shadow: "shadow-violet-200", text: "text-violet-50" },
    { bg: "from-amber-500 to-amber-600", shadow: "shadow-amber-200", text: "text-amber-50" },
    { bg: "from-rose-500 to-rose-600", shadow: "shadow-rose-200", text: "text-rose-50" },
    { bg: "from-cyan-500 to-cyan-600", shadow: "shadow-cyan-200", text: "text-cyan-50" },
]

const staticCard = {
    icon: FaStore,
    title: "paseapase.com",
    desc: "Realiza tus pagos desde un solo lugar",
    link: "https://paseapase.com",
    external: true,
}

export default async function PageIA() {
    const pages = await getallPages()
    const icons = { FaFutbol, FaKey, FaStore }

    if (!pages) return null

    const allCards = [staticCard, ...pages.map(p => ({
        icon: icons[p.icon] || FaKey,
        title: p.name,
        desc: p.description,
        link: p.url,
        external: false,
    }))]

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-800">Panel de control</h1>
                <p className="text-slate-500 mt-1">Selecciona un módulo para comenzar</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allCards.map((card, i) => {
                    const Icon = card.icon
                    const color = colorMap[i % colorMap.length]
                    return (
                        <Link
                            key={i}
                            href={card.link}
                            target={card.external ? "_blank" : undefined}
                            rel={card.external ? "noopener noreferrer" : undefined}
                            className="group relative"
                        >
                            <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-6 hover:border-transparent hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${color.bg} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-300`} />
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color.bg} flex items-center justify-center mb-5 shadow-lg ${color.shadow} group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="text-2xl text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-primary transition-colors">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed flex-grow">
                                    {card.desc}
                                </p>
                                <div className={`mt-4 flex items-center gap-1 text-sm font-medium bg-gradient-to-r ${color.bg} bg-clip-text text-transparent`}>
                                    Acceder
                                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

            {allCards.length === 0 && (
                <div className="text-center py-20">
                    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                        <FaKey className="text-3xl text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-600">Sin módulos disponibles</h3>
                    <p className="text-slate-400 text-sm mt-1">Contacta al administrador para obtener acceso.</p>
                </div>
            )}
        </div>
    )
}
