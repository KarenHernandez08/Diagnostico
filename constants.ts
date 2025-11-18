
import type { QuestionnaireItem } from './types';

export const questionnaireData: QuestionnaireItem[] = [
    {
        domain: "Concientización",
        question: "¿Con qué frecuencia se imparten programas de concientización en ciberseguridad al personal?",
        levels: [
            "No se realizan actividades formales.",
            "Solo se dan charlas esporádicas.",
            "Existe un programa definido con calendario anual.",
            "Se mide la eficacia (evaluaciones o simulaciones de phishing).",
            "El programa se optimiza según métricas de comportamiento."
        ],
        id: "awareness"
    },
    {
        domain: "Normativa de Seguridad (Políticas)",
        question: "¿Qué nivel de formalización tienen las políticas de seguridad de la información?",
        levels: [
            "No existen políticas documentadas.",
            "Existen pero no están actualizadas ni comunicadas.",
            "Se encuentran actualizadas y comunicadas.",
            "Se audita su cumplimiento y aplicabilidad.",
            "Se revisan y mejoran continuamente con base en métricas."
        ],
        id: "policies"
    },
    {
        domain: "Respaldos de Información",
        question: "¿Cómo se gestionan los respaldos críticos de información?",
        levels: [
            "No hay políticas ni control formal.",
            "Se realizan copias manuales sin prueba de restauración.",
            "Se ejecutan respaldos automáticos según política.",
            "Se validan regularmente mediante pruebas de recuperación.",
            "El proceso está automatizado, monitoreado y optimizado."
        ],
        id: "backups"
    },
    {
        domain: "Gestión de Riesgos de Seguridad",
        question: "¿Cómo se realiza la gestión de riesgos de seguridad?",
        levels: [
            "No se realiza formalmente.",
            "Se hace de manera reactiva ante incidentes.",
            "Se aplica un proceso estandarizado de identificación y evaluación.",
            "Se revisa y actualiza periódicamente con métricas de eficacia.",
            "El proceso se integra en la estrategia general y se optimiza."
        ],
        id: "risk-management"
    },
    {
        domain: "Prácticas de Desarrollo Seguro",
        question: "¿Qué nivel de integración tiene la seguridad en el ciclo de desarrollo?",
        levels: [
            "No se considera la seguridad.",
            "Se aplican controles básicos o revisiones ocasionales.",
            "Existen prácticas definidas de desarrollo seguro.",
            "Se aplican pruebas automatizadas y revisiones de código seguras.",
            "El proceso se mejora continuamente con métricas de defectos y vulnerabilidades."
        ],
        id: "secure-dev"
    },
    {
        domain: "Gestión de Accesos e Identidades",
        question: "¿Cómo se administra el control de accesos e identidades?",
        levels: [
            "Sin controles formales ni centralizados.",
            "Control básico manual sin revisiones periódicas.",
            "Políticas y procedimientos definidos (principio de menor privilegio).",
            "Revisión y monitoreo automatizado del acceso.",
            "Sistema IAM integrado y optimizado con análisis de comportamiento."
        ],
        id: "access-management"
    },
    {
        domain: "Respuesta a Incidentes",
        question: "¿Cuál es el nivel de madurez de los procesos de respuesta a incidentes?",
        levels: [
            "Reactivo, sin proceso definido.",
            "Procedimientos básicos documentados.",
            "Equipo y plan formal de respuesta establecido.",
            "Se realizan simulacros y revisiones post-incidente.",
            "El proceso se optimiza mediante análisis de tendencias y lecciones aprendidas."
        ],
        id: "incident-response"
    },
    {
        domain: "Gestión de Vulnerabilidades",
        question: "¿Cómo se identifican y gestionan las vulnerabilidades?",
        levels: [
            "Solo cuando se detectan incidentes.",
            "Escaneos ocasionales sin seguimiento.",
            "Programa periódico de evaluación y remediación.",
            "Priorización automatizada y seguimiento con métricas.",
            "Integración total con gestión de parches y análisis de riesgos."
        ],
        id: "vulnerability-management"
    },
    {
        domain: "Segregación de Redes",
        question: "¿En qué nivel se encuentra la segmentación y segregación de redes?",
        levels: [
            "Sin segmentación ni controles definidos.",
            "Segmentación básica entre redes internas y externas.",
            "Políticas y diseño formal de segmentación por funciones.",
            "Monitoreo continuo de tráfico entre segmentos.",
            "Segmentación dinámica basada en riesgos y comportamiento."
        ],
        id: "network-segregation"
    },
    {
        domain: "Plan de Continuidad y Recuperación",
        question: "¿Qué nivel de preparación existe ante interrupciones o desastres?",
        levels: [
            "No hay plan formal.",
            "Plan inicial sin pruebas reales.",
            "BCP/DRP documentado y probado anualmente.",
            "Se ajusta tras pruebas o eventos reales con métricas.",
            "Totalmente integrado con procesos de resiliencia y continuidad digital."
        ],
        id: "bcp-drp"
    }
];
