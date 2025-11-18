
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center mb-8 p-6 bg-white rounded-xl shadow-lg">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                Diagnóstico de Madurez en Ciberseguridad
            </h1>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
                Evalúe el grado de madurez (Nivel 1 a 5) en cada dominio de seguridad de la información.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-red-100 text-red-800 text-xs sm:text-sm font-medium rounded-full">1: Inicial / Ad-hoc</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs sm:text-sm font-medium rounded-full">3: Definido</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs sm:text-sm font-medium rounded-full">5: Optimizado</span>
            </div>
        </header>
    );
};
