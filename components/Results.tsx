import React, { useMemo, useState } from 'react';
import type { ResultsData } from '../types';
import { RadarChart } from './RadarChart';
import { getAIAnalysis } from '../services/geminiService';

interface ResultsProps {
    results: ResultsData;
    onReset: () => void;
}

const AILoadingSkeleton: React.FC = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mt-4"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
    </div>
);

const AIAnalysisDisplay: React.FC<{ text: string }> = ({ text }) => {
    const formattedText = text
        .split('\n')
        .map((line, index) => {
            if (line.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-bold text-gray-700 mt-6 mb-2">{line.substring(4)}</h3>;
            }
            if (line.startsWith('- ')) {
                 return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
            }
            return <p key={index} className="text-gray-600 mb-2">{line}</p>;
        });

    return <div className="prose max-w-none">{formattedText}</div>;
};

export const Results: React.FC<ResultsProps> = ({ results, onReset }) => {
    const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
    const [isLoadingAI, setIsLoadingAI] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);

    const { averageScore, domains, scores } = useMemo(() => {
        const domains = Object.keys(results);
        // Fix: Explicitly type `scores` as `number[]` to correct the type inference from `Object.values`.
        const scores: number[] = Object.values(results);
        const total = scores.reduce((sum, score) => sum + score, 0);
        const average = total / scores.length;
        return { averageScore: average, domains, scores };
    }, [results]);

    const handleGetAIAnalysis = async () => {
        setIsLoadingAI(true);
        setAiError(null);
        try {
            const analysis = await getAIAnalysis(results);
            setAiAnalysis(analysis);
        } catch (error) {
            setAiError("No se pudo obtener el análisis. Verifica tu clave de API e inténtalo de nuevo.");
        } finally {
            setIsLoadingAI(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score <= 2) return 'text-red-600';
        if (score === 3) return 'text-yellow-600';
        return 'text-green-600';
    };

    return (
        <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-3">Resultados del Diagnóstico</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 className="text-lg font-medium text-gray-800">Puntuación de Madurez Promedio</h3>
                    <p className="text-5xl font-extrabold text-blue-600">{averageScore.toFixed(2)}</p>
                </div>
                <div className="p-4 border rounded-lg bg-gray-50 shadow-inner">
                    <h3 className="text-lg font-bold text-gray-700 mb-2">Resumen por Dominio</h3>
                    <div id="summary-list" className="space-y-1">
                        {domains.map(domain => (
                            <div key={domain} className="flex justify-between items-center p-2 rounded-md hover:bg-gray-100">
                                <span className="text-sm font-medium text-gray-700">{domain}</span>
                                <span className={`text-lg font-bold ${getScoreColor(results[domain])}`}>{results[domain]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-700 mb-2">Visualización del Diagnóstico</h3>
                <p className="text-gray-600 mb-6">El gráfico de radar muestra la madurez en cada dominio. Un área más grande indica un nivel más alto (cercano a 5: Optimizado).</p>
                <div className="w-full max-w-2xl mx-auto border rounded-lg p-4 shadow-xl bg-white">
                    <RadarChart domains={domains} scores={scores} />
                </div>
            </div>

             <div className="pt-8 mt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-700 mb-2">Análisis con IA de Gemini</h3>
                <p className="text-gray-600 mb-6">Obtén recomendaciones personalizadas basadas en tus resultados para mejorar tu postura de ciberseguridad.</p>
                
                {!aiAnalysis && !isLoadingAI && (
                    <button onClick={handleGetAIAnalysis} className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50">
                        Generar Recomendaciones con IA
                    </button>
                )}

                {isLoadingAI && <div className="p-6 border rounded-lg bg-gray-50"><AILoadingSkeleton /></div>}
                {aiError && <p className="text-red-500">{aiError}</p>}
                {aiAnalysis && (
                    <div className="p-6 border rounded-lg bg-gray-50 shadow-inner">
                       <AIAnalysisDisplay text={aiAnalysis} />
                    </div>
                )}
            </div>

            <button onClick={onReset} className="mt-12 w-full px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition duration-150">
                Reiniciar Cuestionario
            </button>
        </section>
    );
};
