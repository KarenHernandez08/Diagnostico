
import React, { useEffect, useRef } from 'react';
import { getChartLabels } from '../utils/helpers';
// This assumes Chart.js is loaded from a CDN
declare const Chart: any;

interface RadarChartProps {
    domains: string[];
    scores: number[];
}

export const RadarChart: React.FC<RadarChartProps> = ({ domains, scores }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<any>(null);

    useEffect(() => {
        if (!chartRef.current) return;
        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        // Destroy previous chart instance if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const chartLabels = getChartLabels(domains);

        chartInstance.current = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: 'Nivel de Madurez',
                    data: scores,
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: 'rgb(59, 130, 246)',
                    pointBackgroundColor: 'rgb(59, 130, 246)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(59, 130, 246)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (context: any) => ` Madurez: ${context.formattedValue}`
                        }
                    }
                },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
                        grid: { color: 'rgba(0, 0, 0, 0.1)' },
                        pointLabels: {
                            font: { size: 11, weight: 'bold' },
                            color: '#374151'
                        },
                        suggestedMin: 0,
                        suggestedMax: 5,
                        ticks: {
                            stepSize: 1,
                            backdropColor: 'rgba(255, 255, 255, 0.75)',
                            color: '#4b5563'
                        }
                    }
                }
            }
        });

        // Cleanup function
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [domains, scores]);

    return <canvas ref={chartRef}></canvas>;
};
