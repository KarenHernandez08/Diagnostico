
import React, { useState } from 'react';
import { questionnaireData } from '../constants';

interface QuestionnaireProps {
    onSubmit: (answers: { [key: string]: number }) => void;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({ onSubmit }) => {
    const [answers, setAnswers] = useState<{ [key: string]: number }>({});

    const handleAnswerChange = (questionId: string, value: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(answers);
    };

    return (
        <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-3">Cuestionario</h2>
            <form onSubmit={handleSubmit}>
                {questionnaireData.map((item, index) => (
                    <div key={item.id} className="mb-8 p-4 border border-gray-200 rounded-lg bg-gray-50/70">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                            {index + 1}. {item.domain}
                        </h3>
                        <p className="text-base text-gray-600 mb-4">{item.question}</p>
                        <fieldset className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
                            <legend className="sr-only">Niveles para {item.domain}</legend>
                            {item.levels.map((levelText, levelIndex) => {
                                const value = levelIndex + 1;
                                return (
                                    <div key={value}>
                                        <input
                                            type="radio"
                                            id={`${item.id}-${value}`}
                                            name={item.id}
                                            value={value}
                                            className="hidden peer"
                                            required
                                            onChange={() => handleAnswerChange(item.id, value)}
                                        />
                                        <label
                                            htmlFor={`${item.id}-${value}`}
                                            className="flex flex-col h-full text-center cursor-pointer p-3 rounded-lg border-2 border-gray-300 transition-all duration-200 peer-hover:border-blue-500 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-700 peer-checked:shadow-lg"
                                        >
                                            <span className="font-bold text-lg">{value}</span>
                                            <span className="text-xs sm:text-sm mt-1">{levelText}</span>
                                        </label>
                                    </div>
                                );
                            })}
                        </fieldset>
                    </div>
                ))}
                <button type="submit" className="mt-8 w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200 transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50">
                    Generar Diagnóstico
                </button>
            </form>
        </section>
    );
};
