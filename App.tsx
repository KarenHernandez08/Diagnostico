
import React, { useState, useEffect } from 'react';
import { Questionnaire } from './components/Questionnaire';
import { Results } from './components/Results';
import { Header } from './components/Header';
import { Notification } from './components/Notification';
import { questionnaireData } from './constants';
import type { ResultsData } from './types';

const App: React.FC = () => {
    const [results, setResults] = useState<ResultsData | null>(null);
    const [notification, setNotification] = useState<{ message: string; type: 'error' | 'info' } | null>(null);
    const [showComponent, setShowComponent] = useState<'quiz' | 'results'>('quiz');

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleQuizSubmit = (answers: { [key: string]: number }) => {
        const totalQuestions = questionnaireData.length;
        if (Object.keys(answers).length < totalQuestions) {
            setNotification({ message: 'Por favor, responde todas las preguntas antes de continuar.', type: 'error' });
            return;
        }

        const formattedResults: ResultsData = {};
        questionnaireData.forEach(item => {
            formattedResults[item.domain] = answers[item.id];
        });

        setResults(formattedResults);
        setShowComponent('results');
        
        // Scroll to top for smooth transition view
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleReset = () => {
        setResults(null);
        setShowComponent('quiz');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen p-4 sm:p-8 bg-gray-50 text-gray-800">
            <div className="max-w-4xl mx-auto">
                {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
                <Header />
                <main>
                    {showComponent === 'quiz' && (
                        <Questionnaire onSubmit={handleQuizSubmit} />
                    )}
                    {showComponent === 'results' && results && (
                        <Results results={results} onReset={handleReset} />
                    )}
                </main>
            </div>
        </div>
    );
};

export default App;
