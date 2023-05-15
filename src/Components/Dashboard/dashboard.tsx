import { buttonContainerClassName, containerClassName } from './dashboard.styles';
import {
    useContext,
    useState,
    useEffect
} from 'react';
import {
    ServiceContext,
    ServiceContextInstance
} from '../../Core/serviceContext';
import { useFetch } from '../../Hooks/useFetch';
import { IFetchResult } from '../../Hooks/useFetch.types';
import {
    MonthlyAppUsageModel,
} from '../../Models/IMonthlyAppUsage';
import { ITopGenreModel } from '../../Models/ITopGenreModel';
import {
    getMonthlyMoviesCount,
    getMonthlyRuntime,
    getMonthlySeenMoviesChartModels
} from '../../Helpers/ChartHelper/chartDataLogic';
import { ButtonCard } from '../ButtonCard/buttonCard';
import { GraphTypes } from '../../Enums/graphTypes';
import { IChartData } from '../Chart/chart.types';
import { Chart } from '../Chart/chart';
import AuthentificationContext from '../../Contexts/Authentication/authenticationContext';
import { IAuthentificationContext } from '../../Contexts/Authentication/authenticationContext.types';
import { UserType } from '../../Enums/UserType';
import { ISeenMovieRead } from '../../Models/SeenMovie/ISeenMovieRead';

export const Dashboard = (): JSX.Element => {
    const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);
    const [chartData, setChartData] = useState<IChartData[]>([]);
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const [areMonthlySeenMoviesLoadedd, setAreMonthlySeenMoviesLoaded] = useState<boolean>(false);
    const monthlySeenMoviesData: IFetchResult<MonthlyAppUsageModel[]> = useFetch<MonthlyAppUsageModel[]>(() => services.SeenMoviesService.GetMonthlySeenMovies());
    const [monthlySeenMovies, setMonthlySeenMovies] = useState<MonthlyAppUsageModel[]>([]);
    const [areTopSeenGenresLoaded, setAreTopSeenGenresLoaded] = useState<boolean>(false);
    const topSeenGenresData: IFetchResult<ITopGenreModel[]> = useFetch<ITopGenreModel[]>(() => services.SeenMoviesService.GetTopSeenGenres());
    const [topSeenGenres, setTopSeenGenres] = useState<ITopGenreModel[]>();
    const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);

    useEffect(() => {
        if (monthlySeenMoviesData.isLoading) {
            return;
        }
        if (monthlySeenMoviesData.errors !== "" ||
            monthlySeenMoviesData.data?.Error !== undefined ||
            monthlySeenMoviesData.data == null ||
            monthlySeenMoviesData.data.Data === undefined) {
            return;
        }
        setMonthlySeenMovies(monthlySeenMoviesData.data!.Data!);
        setAreMonthlySeenMoviesLoaded(true);

    }, [monthlySeenMoviesData]);

    useEffect(() => {
        if (topSeenGenresData.isLoading) {
            return;
        }
        if (topSeenGenresData.errors !== "" ||
            topSeenGenresData.data?.Error !== undefined ||
            topSeenGenresData.data == null ||
            topSeenGenresData.data.Data === undefined) {
            return;
        }
        setTopSeenGenres(topSeenGenresData.data!.Data!);
        setAreTopSeenGenresLoaded(true);
    }, [topSeenGenresData]);

    const filterTopSeenGenresDataByUser = (): ITopGenreModel[] => {
        let filterTopSeenGenres: ITopGenreModel[] = [];
        for (let i = 0; i < topSeenGenres!.length; i++) {
            const filteredData: ISeenMovieRead[] = topSeenGenres![i].seenMovies.filter(s => s.userUid === authenticationContext.User.uid);
            if (filteredData.length !== 0) {
                filterTopSeenGenres.push({
                    genre: topSeenGenres![i].genre,
                    seenMovies: filteredData
                });
            }
        }
        return filterTopSeenGenres;
    };

    const filterMonthySeenMovisByUser = (): MonthlyAppUsageModel[] => {
        let filteredMonthlySeenMovies: MonthlyAppUsageModel[] = [];
        for (let i = 0; i < monthlySeenMovies!.length; i++) {
            const filteredData: ISeenMovieRead[] = monthlySeenMovies![i].seenMovies.filter(s => s.userUid === authenticationContext.User.uid);
            if (filteredData.length !== 0) {
                filteredMonthlySeenMovies.push({
                    month: monthlySeenMovies[i].month,
                    year: monthlySeenMovies[i].year,
                    seenMovies: filteredData
                });
            }
        }
        return filteredMonthlySeenMovies;
    };

    const isAdmin = (): boolean => {
        return authenticationContext.User.role === UserType.Administrator;
    };

    const isDataLoaded = (): boolean => {
        return areMonthlySeenMoviesLoadedd &&
            areTopSeenGenresLoaded;
    };

    const handleGenreClick = () => {
        setIsButtonClicked((prev) => !prev);
        const chartData: IChartData[] = [
            {
                graphType: GraphTypes.PIE_CHART,
                data: isAdmin() ? topSeenGenres! : filterTopSeenGenresDataByUser()
            }
        ];
        setChartData(chartData);
    };

    const handleHoursClick = () => {
        setIsButtonClicked((prev) => !prev);
        const chartData: IChartData[] = [
            {
                graphType: GraphTypes.BAR_CHART,
                data: isAdmin() ?
                    getMonthlySeenMoviesChartModels(getMonthlyRuntime(monthlySeenMovies)) :
                    getMonthlySeenMoviesChartModels(getMonthlyRuntime(filterMonthySeenMovisByUser()))
            }
        ];
        setChartData(chartData);
    };

    const handleMoviesClick = () => {
        setIsButtonClicked((prev) => !prev);
        const chartData: IChartData[] = [
            {
                graphType: GraphTypes.BAR_CHART,
                data: isAdmin() ?
                    getMonthlySeenMoviesChartModels(getMonthlyMoviesCount(monthlySeenMovies)) :
                    getMonthlySeenMoviesChartModels(getMonthlyMoviesCount(filterMonthySeenMovisByUser()))
            }
        ];
        setChartData(chartData);
    };

    const handlePeopleClick = () => {
        setIsButtonClicked((prev) => !prev);
        const chartData: IChartData[] = [
            {
                graphType: GraphTypes.BAR_CHART,
                data: isAdmin() ?
                    getMonthlySeenMoviesChartModels(getMonthlyMoviesCount(monthlySeenMovies)) :
                    getMonthlySeenMoviesChartModels(getMonthlyMoviesCount(filterMonthySeenMovisByUser()))
            }
        ];
        setChartData(chartData);
    };

    const handleAllClick = () => {
        setIsButtonClicked((prev) => !prev);
        const chartData: IChartData[] = [
            {
                graphType: GraphTypes.PIE_CHART, data: topSeenGenres!
            },
            {
                graphType: GraphTypes.BAR_CHART,
                data: isAdmin() ?
                    getMonthlySeenMoviesChartModels(getMonthlyRuntime(monthlySeenMovies)) :
                    getMonthlySeenMoviesChartModels(getMonthlyRuntime(filterMonthySeenMovisByUser()))
            },
            {
                graphType: GraphTypes.BAR_CHART,
                data: isAdmin() ?
                    getMonthlySeenMoviesChartModels(getMonthlyMoviesCount(monthlySeenMovies)) :
                    getMonthlySeenMoviesChartModels(getMonthlyMoviesCount(filterMonthySeenMovisByUser()))
            }
        ];
        setChartData(chartData);
    };

    const getButtons = (): JSX.Element => {
        if (isAdmin()) {
            return <div className={buttonContainerClassName}>
                <ButtonCard text='Genres'
                    onClick={handleGenreClick}
                    count={100}
                    iconName={'Library'} />
                <ButtonCard text='Runtime'
                    onClick={handleHoursClick}
                    count={100}
                    iconName={'Timer'} />
                <ButtonCard text='People'
                    onClick={handlePeopleClick}
                    count={100}
                    iconName={'Contact'} />
                <ButtonCard text='All'
                    onClick={handleAllClick}
                    count={100}
                    iconName={'DonutChart'} />
            </div>
        }
        return <div className={buttonContainerClassName}>
            <ButtonCard text='Genres'
                onClick={handleGenreClick}
                count={100}
                iconName={'Library'} />
            <ButtonCard text='Runtime'
                onClick={handleHoursClick}
                count={100}
                iconName={'Timer'} />
            <ButtonCard text='Movies'
                onClick={handleMoviesClick}
                count={100}
                iconName={'MyMoviesTV'} />
            <ButtonCard text='All'
                onClick={handleAllClick}
                count={100}
                iconName={'DonutChart'} />
        </div>
    };

    return <div className={containerClassName}>
        {isDataLoaded() &&
            <>
                {getButtons()}
                {chartData.length !== 0 && <Chart chartData={chartData}
                    isButtonClicked={isButtonClicked} />}
            </>
        }
    </div>
};