export interface ISurveyProps {
    onChange: (value: any) => void;
};

export enum SurveyCategory {
    Movie = 0,
    Actor = 1,
    Director = 2,
    None = 3
};