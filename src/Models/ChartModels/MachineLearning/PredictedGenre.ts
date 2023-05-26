export interface PredictedGenre {
    year: number;
    month: number;
    genreMonthlyCounts: GenreMonthlyCount[];
};


export interface GenreMonthlyCount {
    count: number;
    genre: string;
};