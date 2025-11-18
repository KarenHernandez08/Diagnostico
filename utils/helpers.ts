
export const getChartLabels = (domains: string[]): string[][] => {
    return domains.map(label => {
        if (label.includes('Normativa de Seguridad')) return ['Políticas /', 'Normativa'];
        if (label.includes('Respaldos de Información')) return ['Respaldos de', 'Información'];
        if (label.includes('Gestión de Riesgos')) return ['Gestión de', 'Riesgos'];
        if (label.includes('Desarrollo Seguro')) return ['Desarrollo', 'Seguro'];
        if (label.includes('Accesos e Identidades')) return ['Accesos e', 'Identidades'];
        if (label.includes('Respuesta a Incidentes')) return ['Respuesta a', 'Incidentes'];
        if (label.includes('Gestión de Vulnerabilidades')) return ['Gestión de', 'Vulnerabilidades'];
        if (label.includes('Segregación de Redes')) return ['Segregación', 'de Redes'];
        if (label.includes('Continuidad y Recuperación')) return ['BCP / DRP', '(Continuidad)'];
        return [label];
    });
};
