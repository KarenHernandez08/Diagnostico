
export interface QuestionnaireItem {
    domain: string;
    question: string;
    levels: string[];
    id: string;
}

export interface ResultsData {
    [domain: string]: number;
}
