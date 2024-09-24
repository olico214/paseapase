"use client"
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Accordion, AccordionItem, Button } from '@nextui-org/react';

export default function ChartComponent({ data }) {
    const [periodo, setPeriodo] = useState("")
    const [formData, setFormData] = useState({
        labels: [],
        futbolisticos: [],
        bgColor: []
    });

    const [personalesData, setPersonalesData] = useState({
        labels: [],
        personales: [],
        bgColor: []
    });

    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);

    function getRandomColors(num) {
        const colors = [];
        const letters = '0123456789ABCDEF';
        for (let i = 0; i < num; i++) {
            let color = '#';
            for (let j = 0; j < 6; j++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            colors.push(color);
        }
        return colors;
    }

    const handleAccordionClick = (item) => {
        const bgColor = getRandomColors(1);
        setFormData({
            labels: ['Trabajo en equipo', 'Esfuerzo', 'Energía', 'Compañerismo', 'Actitud'],
            futbolisticos: [item.trabajo_en_equipo, item.esfuerzo, item.energia, item.companerismo, item.actitud],
            bgColor: bgColor
        });

        setPersonalesData({
            labels: ['Conducción', 'Recepción', 'Pase', 'Desplazamiento', 'Tiro'],
            personales: [item.conduccion, item.recepcion, item.pase, item.desplazamiento, item.tiro],
            bgColor: bgColor
        });


        setPeriodo(item.periodo)
    };

    useEffect(() => {
        const ctx1 = document.getElementById('grafico1').getContext('2d');

        // Destruir el gráfico existente antes de crear uno nuevo
        if (chartRef1.current) {
            chartRef1.current.destroy();
        }

        // Crear un nuevo gráfico
        chartRef1.current = new Chart(ctx1, {
            type: 'radar',
            data: {
                labels: formData.labels,
                datasets: [{
                    data: formData.futbolisticos,
                    label: "Conceptos futbolísticos",
                    borderColor: 'rgba(255, 99, 132, 0.4)',
                    backgroundColor: 'rgba(255, 99, 132, 0.4)',
                    fill: true,
                }]
            },
            options: {
                scale: {
                    ticks: {
                        beginAtZero: true,
                        min: 0
                    }
                },
                elements: {
                    line: {
                        borderWidth: 3
                    }
                }
            }
        });

        return () => {
            if (chartRef1.current) {
                chartRef1.current.destroy();
            }
        };
    }, [formData]);

    useEffect(() => {
        const ctx2 = document.getElementById('grafico2').getContext('2d');

        // Destruir el gráfico existente antes de crear uno nuevo
        if (chartRef2.current) {
            chartRef2.current.destroy();
        }

        // Crear un nuevo gráfico
        chartRef2.current = new Chart(ctx2, {
            type: 'radar',
            data: {
                labels: personalesData.labels,
                datasets: [{
                    data: personalesData.personales,
                    label: "Conceptos personales",
                    borderColor: 'rgba(0, 0, 255, 0.4)',
                    backgroundColor: 'rgba(0, 0, 255, 0.4)',
                    fill: true,
                }]
            },
            options: {
                scale: {
                    ticks: {
                        beginAtZero: true,
                        min: 0
                    }
                },
                elements: {
                    line: {
                        borderWidth: 3
                    }
                }
            }
        });

        return () => {
            if (chartRef2.current) {
                chartRef2.current.destroy();
            }
        };
    }, [personalesData]);

    return (
        <div>
            <div className='grid grid-cols-1 gap-5 mb-5 lg:grid-cols-5 md:grid-cols-1'>
                {data.map((item, index) => (
                    <Button color='primary' key={index} onPress={() => handleAccordionClick(item)}>
                        {item.periodo}
                    </Button>
                ))}
            </div>
            <div className='grid grid-cols-1 gap-5 lg:grid-cols-2 md:grid-cols-1'>

                <div className='flex content-center justify-center w-full max-w-2xl col-span-1 p-6 bg-white rounded-lg shadow-lg'>
                    <h4>{periodo}</h4>
                </div>
                <div>
                    <canvas id='grafico1'></canvas>
                </div>
                <div>
                    <canvas id='grafico2'></canvas>
                </div>
            </div>


        </div>
    );
}
