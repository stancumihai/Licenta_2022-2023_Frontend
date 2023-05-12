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

export const Dashboard = (): JSX.Element => {
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

    const isDataLoaded = (): boolean => {
        return areMonthlySeenMoviesLoadedd &&
            areTopSeenGenresLoaded;
    };

    const handleGenreClick = () => {
        setIsButtonClicked((prev) => !prev);
        const chartData: IChartData[] = [
            {
                graphType: GraphTypes.PIE_CHART, data: topSeenGenres!
            },
            {
                graphType: GraphTypes.BAR_CHART, data: getMonthlySeenMoviesChartModels(getMonthlyRuntime(monthlySeenMovies))
            }
        ];
        setChartData(chartData);
    };

    const handleHoursClick = () => {
        setIsButtonClicked((prev) => !prev);

        const chartData: IChartData[] = [
            {
                graphType: GraphTypes.BAR_CHART,
                data: getMonthlySeenMoviesChartModels(getMonthlyRuntime(monthlySeenMovies))
            }
        ];
        setChartData(chartData);
    };

    const handleMoviesClick = () => {
        setIsButtonClicked((prev) => !prev);
        const chartData: IChartData[] = [
            {
                graphType: GraphTypes.BAR_CHART,
                data: getMonthlySeenMoviesChartModels(getMonthlyMoviesCount(monthlySeenMovies))
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
                data: getMonthlySeenMoviesChartModels(getMonthlyRuntime(monthlySeenMovies))
            },
            {
                graphType: GraphTypes.BAR_CHART,
                data: getMonthlySeenMoviesChartModels(getMonthlyMoviesCount(monthlySeenMovies))
            }
        ];
        setChartData(chartData);
    };

    const getButtons = (): JSX.Element => {
        return <div className={buttonContainerClassName}>
            <ButtonCard text='Genres' onClick={handleGenreClick} count={100} iconName={'Library'} />
            <ButtonCard text='Runtime' onClick={handleHoursClick} count={100} iconName={'Timer'} />
            <ButtonCard text='Movies' onClick={handleMoviesClick} count={100} iconName={'MyMoviesTV'} />
            <ButtonCard text='All' onClick={handleAllClick} count={100} iconName={'DonutChart'} />
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