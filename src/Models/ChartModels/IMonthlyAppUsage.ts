import { ISeenMovieRead } from '../SeenMovie/ISeenMovieRead';

export interface MonthlyAppUsageModel {
    month: number;
    year: number;
    seenMovies: ISeenMovieRead[];
};

export interface MonthlyAppUsageModelChartModel {
    date: string;
    dataCount: number;
};
