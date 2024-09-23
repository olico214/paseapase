import { Accordion, AccordionItem } from "@nextui-org/react";

export default function ResultComponent({ data }) {
    console.log(data)
    if (!data) {
        return (
            <div className="flex items-center justify-center p-4">
                <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
                    Cargando Datos
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full">
                {Array.isArray(data) && data.length > 0 ? (
                    <Accordion variant="shadow">
                        {data.map((item, index) => (
                            <AccordionItem key={index} aria-label={item.periodo} title={item.periodo}>
                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-5 md:grid-cols-1">
                                    <div className="lg:col-span-5" >
                                        Conceptos futbolisticos
                                    </div>
                                    <div>
                                        Trabajo en equipo: {item.trabajo_en_equipo}
                                    </div>
                                    <div>
                                        Esfuerzo: {item.esfuerzo}
                                    </div>
                                    <div>
                                        Energia: {item.energia}
                                    </div>
                                    <div>
                                        Compañerismo: {item.companerismo}
                                    </div>
                                    <div>
                                        Actitud: {item.actitud}
                                    </div>
                                    <div className="lg:col-span-5" >
                                        conceptos personales
                                    </div>
                                    <div>
                                        Conducción: {item.conduccion}
                                    </div>
                                    <div>
                                        recepción: {item.recepcion}
                                    </div>
                                    <div>
                                        Pase: {item.pase}
                                    </div>
                                    <div>
                                        Desplazamiento: {item.desplazamiento}
                                    </div>
                                    <div>
                                        tiro: {item.tiro}
                                    </div>
                                </div>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <div className="p-4">
                        <div className="w-full p-6 bg-white rounded-lg shadow-lg">
                            No hay Datos
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
