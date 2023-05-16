import { MonthlyAppUsageModel, MonthlyAppUsageModelChartModel } from '../../Models/IMonthlyAppUsage';
import { ISeenMovieRead } from '../../Models/SeenMovie/ISeenMovieRead';
import { MonthlyMovieRuntime, MonthlyMovieCount } from './chartDataModels';

export const getMonthlyRuntime = (monthlySeenMovies: MonthlyAppUsageModel[]): MonthlyMovieRuntime[] => {
    let monthlyRuntime: MonthlyMovieRuntime[] = [];
    for (let i = 0; i < monthlySeenMovies.length; i++) {
        const currentMonthlySeenMovie: MonthlyAppUsageModel = monthlySeenMovies[i];
        const singleMonthRuntime: number = currentMonthlySeenMovie
            .seenMovies
            .reduce((acc: number, obj: ISeenMovieRead) => acc + obj.movie.runtime, 0);

        monthlyRuntime.push({
            month: currentMonthlySeenMovie.month,
            year: currentMonthlySeenMovie.year,
            runTime: singleMonthRuntime
        });
    }
    return monthlyRuntime;
};

export const getFormattedChartModels = (data: any) => {
    return data!.map((chartData: any) => {
        const month: number = chartData[Object.keys(chartData)[0]];
        const year: number = chartData[Object.keys(chartData)[1]];
        const date: string = year + "\\" + month;
        const dataCount: number = chartData[Object.keys(chartData)[2]];
        const monthlyUsageChartModel: MonthlyAppUsageModelChartModel = {
            date,
            dataCount: dataCount
        };
        return monthlyUsageChartModel;
    });
};

export const getMonthlyMoviesCount = (monthlySeenMovies: MonthlyAppUsageModel[]): MonthlyMovieCount[] => {
    let monthlyMovieCount: MonthlyMovieCount[] = [];
    for (let i = 0; i < monthlySeenMovies.length; i++) {
        const currentMonthlySeenMovie: MonthlyAppUsageModel = monthlySeenMovies[i];
        monthlyMovieCount.push({
            month: currentMonthlySeenMovie.month,
            year: currentMonthlySeenMovie.year,
            movieCount: currentMonthlySeenMovie.seenMovies.length
        });
    }
    return monthlyMovieCount;
};