
import { GoogleGenAI } from "@google/genai";
import type { ResultsData } from '../types';

export const getAIAnalysis = async (results: ResultsData): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const model = 'gemini-2.5-flash';

        const scoresText = Object.entries(results)
            .map(([domain, score]) => `- ${domain}: ${score}`)
            .join('\n');

        const prompt = `
            Eres un consultor experto en ciberseguridad. Una organización acaba de completar una autoevaluación de madurez.
            Aquí están sus puntuaciones (en una escala de 1 a 5, donde 1 es 'Inicial/Ad-hoc' y 5 es 'Optimizado'):
            ${scoresText}

            Basándote en estas puntuaciones, proporciona un análisis experto y conciso en español. Tu respuesta debe ser útil, clara y accionable.
            Estructura tu respuesta de la siguiente manera, usando Markdown:

            ### Resumen General
            Un breve párrafo resumiendo su postura general de ciberseguridad.

            ### Fortalezas Clave
            Identifica 2-3 dominios donde son más fuertes y explica brevemente por qué estos niveles son positivos.

            ### Prioridades de Mejora
            Identifica los 2-3 dominios más débiles. Para cada uno, proporciona recomendaciones específicas y accionables para ayudarles a mejorar su nivel de madurez. Sé práctico en tus sugerencias.

            ### Recomendación Estratégica
            Un párrafo de conclusión sobre su camino estratégico general a seguir para mejorar su madurez en ciberseguridad.
        `;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Hubo un error al generar el análisis de IA. Por favor, inténtalo de nuevo más tarde.";
    }
};
