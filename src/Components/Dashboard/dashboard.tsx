import { buttonContainerClassName, calendarClassName, calendarContainerClassName, containerClassName, contentContainerClassName, selectedDateInfoClassName } from './dashboard.styles';
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
} from '../../Models/ChartModels/IMonthlyAppUsage';
import { ITopGenreModel } from '../../Models/ChartModels/ITopGenreModel';
import {
    getMonthlyMoviesCount,
    getMonthlyRuntime,
    getFormattedChartModels
} from '../../Helpers/ChartHelper/chartDataLogic';
import { ButtonCard } from '../ButtonCard/buttonCard';
import { GraphTypes } from '../../Enums/graphTypes';
import { IChartData } from '../Chart/chart.types';
import { Chart } from '../Chart/chart';
import AuthentificationContext from '../../Contexts/Authentication/authenticationContext';
import { IAuthentificationContext } from '../../Contexts/Authentication/authenticationContext.types';
import { UserType } from '../../Enums/UserType';
import { ISeenMovieRead } from '../../Models/SeenMovie/ISeenMovieRead';
import { IAgeViewershipModel } from '../../Models/ChartModels/IAgeViewershipModel';
import { chartTitleClassName } from '../Chart/charts.styles';
import { PredictedGenre } from '../../Models/ChartModels/MachineLearning/PredictedGenre';
import { PredictedMovieCount } from '../../Models/ChartModels/MachineLearning/PredictedMovieCount';
import { PredictedMovieRuntime } from '../../Models/ChartModels/MachineLearning/PredictedMovieRuntime';
import {
    DateRangeType,
    defaultCalendarStrings
} from '@fluentui/react';
import { Calendar } from 'office-ui-fabric-react';
import { IResponse } from '../../Models/IResponse';

export const Dashboard = (): JSX.Element => {
    const getDateRanges = (date: Date) => {
        const startDate: Date = new Date(date);
        const endDate: Date = new Date(date);
        endDate.setMonth(startDate.getMonth() + 4);
        return [startDate, endDate];
    };

    const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);
    const [chartData, setChartData] = useState<IChartData[]>([]);
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const [areMonthlySeenMoviesLoadedd, setAreMonthlySeenMoviesLoaded] = useState<boolean>(false);
    const monthlySeenMoviesData: IFetchResult<MonthlyAppUsageModel[]> = useFetch<MonthlyAppUsageModel[]>(() => services.SeenMoviesService.GetMonthlySeenMovies());
    const [monthlySeenMovies, setMonthlySeenMovies] = useState<MonthlyAppUsageModel[]>([]);

    const [arePredictedMoviesCountByUserLoaded, setArePredictedMoviesCountByUserLoaded] = useState<boolean>(false);
    const predictedMoviesCountByUserData: IFetchResult<PredictedMovieCount[]> = useFetch<PredictedMovieCount[]>(() => services.PredictedMoviesCountService.GetEachMonthByUser(authenticationContext.User.uid!), [authenticationContext.User.uid!]);
    const [predictedMoviesCountByUser, setPredictedMoviesCountByUser] = useState<PredictedMovieCount[]>();

    const [arePredictedMoviesRuntimeByUserLoaded, setArePredictedMovieRuntimeByUserLoaded] = useState<boolean>(false);
    const predictedMoviesRuntimeByUserData: IFetchResult<PredictedMovieRuntime[]> = useFetch<PredictedMovieRuntime[]>(() => services.PredictedMoviesRuntimeService.GetEachMonthByUser(authenticationContext.User.uid!), [authenticationContext.User.uid!]);
    const [predictedMoviesRuntimeByUser, setPredictedMoviesRuntimeByUser] = useState<PredictedMovieRuntime[]>();

    const [arePredictedMoviesCountLoaded, setArePredictedMoviesCountLoaded] = useState<boolean>(false);
    const predictedMoviesCountData: IFetchResult<PredictedMovieCount[]> = useFetch<PredictedMovieCount[]>(() => services.PredictedMoviesCountService.GetEachMonth());
    const [predictedMoviesCount, setPredictedMoviesCount] = useState<PredictedMovieCount[]>();

    const [arePredictedMoviesRuntimeLoaded, setArePredictedMoviesRuntimeLoaded] = useState<boolean>(false);
    const predictedMoviesRuntimeData: IFetchResult<PredictedMovieRuntime[]> = useFetch<PredictedMovieRuntime[]>(() => services.PredictedMoviesRuntimeService.GetEachMonth());
    const [predictedMoviesRuntime, setPredictedMoviesRuntime] = useState<PredictedMovieRuntime[]>();

    const [areTopSeenGenresLoaded, setAreTopSeenGenresLoaded] = useState<boolean>(false);
    const topSeenGenresData: IFetchResult<ITopGenreModel[]> = useFetch<ITopGenreModel[]>(() => services.SeenMoviesService.GetTopSeenGenres());
    const [topSeenGenres, setTopSeenGenres] = useState<ITopGenreModel[]>();

    const [arePredictedGenresByUserLoaded, setArePredictedGenresByUserLoaded] = useState<boolean>(false);
    const predictedGenresByUserData: IFetchResult<PredictedGenre[]> = useFetch<PredictedGenre[]>(() => services.PredictedGenresService.GetEachMonthByUser(authenticationContext.User.uid!), [authenticationContext.User.uid!]);
    const [predictedGenresByUser, setPredictedGenresByUser] = useState<PredictedGenre[]>();

    const [arePredictedGenresLoaded, setArePredictedGenresLoaded] = useState<boolean>(false);
    const predictedGenresData: IFetchResult<PredictedGenre[]> = useFetch<PredictedGenre[]>(() => services.PredictedGenresService.GetEachMonth());
    const [predictedGenres, setPredictedGenres] = useState<PredictedGenre[]>();

    const [dataTitle, setDataTitle] = useState<string>("");
    const [chartChangeIsMadeFlag, setChartChangeIsMade] = useState<boolean>(false);
    const [firstButtonClicked, setFirstButtonClicked] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [shouldDisplayCalendar, setShouldDisplayCalendar] = useState<boolean>(false);
    const [needsDateRange, setNeedsDateRange] = useState(false);

    const [areTopPredictedAgeViewershipsLoaded, setAreTopPredictedAgeViewershipsLoaded] = useState<boolean>(false);
    const topPredictedAgeViewershipsData: IFetchResult<IAgeViewershipModel[]> = useFetch<IAgeViewershipModel[]>(() => services.PredictedAgesViewershipService.GetByMonth(new Date(selectedDate).getFullYear(), new Date(selectedDate).getMonth() + 1));
    const [topPredictedAgeViewerships, setTopPredictedAgeViewerships] = useState<IAgeViewershipModel[]>();

    const [areTopAgeViewershipsLoaded, setAreTopAgeViewershipsLoaded] = useState<boolean>(false);
    const topAgeViewershipsData: IFetchResult<IAgeViewershipModel[]> = useFetch<IAgeViewershipModel[]>(() => services.SeenMoviesService.GetAgeViewershipByMonth(new Date(selectedDate).getFullYear(), new Date(selectedDate).getMonth() + 1));
    const [topAgeViewerships, setTopAgeViewerships] = useState<IAgeViewershipModel[]>();
    const [currentChartContext, setCurrentChartContext] = useState<string>("genres");

    const [currentPredictedGenres, setCurrentPredictedGenres] = useState<PredictedGenre[]>([]);
    const [currentPredictedGenresByUser, setCurrentPredictedGenresByUser] = useState<PredictedGenre[]>([]);


    const filterCurrentMonthlySeenMovies = (data: Array<any>, startDate: Date) => {
        const dates: Date[] = getDateRanges(startDate);
        const startYear: number = startDate.getFullYear();
        const startMonth: number = startDate.getMonth() + 1;
        const endYear: number = dates[1].getFullYear();
        const endMonth: number = dates[1].getMonth() + 1;
        const filteredData = data.filter(m => m.year >= startYear && m.year <= endYear && m.month >= startMonth && m.month <= endMonth);
        return filteredData;
    };

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

    useEffect(() => {
        if (topAgeViewershipsData.isLoading) {
            return;
        }
        if (topAgeViewershipsData.errors !== "" ||
            topAgeViewershipsData.data?.Error !== undefined ||
            topAgeViewershipsData.data == null ||
            topAgeViewershipsData.data.Data === undefined) {
            return;
        }
        setTopAgeViewerships(topAgeViewershipsData.data!.Data!);
        setAreTopAgeViewershipsLoaded(true);
    }, [topAgeViewershipsData]);

    useEffect(() => {
        if (predictedGenresByUserData.isLoading) {
            return;
        }
        if (predictedGenresByUserData.errors !== "" ||
            predictedGenresByUserData.data?.Error !== undefined ||
            predictedGenresByUserData.data == null ||
            predictedGenresByUserData.data.Data === undefined) {
            return;
        }
        setPredictedGenresByUser(predictedGenresByUserData.data!.Data!);
        setArePredictedGenresByUserLoaded(true);
        setCurrentPredictedGenresByUser(predictedGenresByUserData.data.Data!.filter(p => p.year === new Date().getFullYear() && p.month === new Date().getMonth() + 1));
    }, [predictedGenresByUserData]);

    useEffect(() => {
        if (predictedMoviesCountByUserData.isLoading) {
            return;
        }
        if (predictedMoviesCountByUserData.errors !== "" ||
            predictedMoviesCountByUserData.data?.Error !== undefined ||
            predictedMoviesCountByUserData.data == null ||
            predictedMoviesCountByUserData.data.Data === undefined) {
            return;
        }
        setPredictedMoviesCountByUser(predictedMoviesCountByUserData.data!.Data!);
        setArePredictedMoviesCountByUserLoaded(true);
    }, [predictedMoviesCountByUserData]);

    useEffect(() => {
        if (predictedMoviesRuntimeByUserData.isLoading) {
            return;
        }
        if (predictedMoviesRuntimeByUserData.errors !== "" ||
            predictedMoviesRuntimeByUserData.data?.Error !== undefined ||
            predictedMoviesRuntimeByUserData.data == null ||
            predictedMoviesRuntimeByUserData.data.Data === undefined) {
            return;
        }
        setPredictedMoviesRuntimeByUser(predictedMoviesRuntimeByUserData.data!.Data!);
        setArePredictedMovieRuntimeByUserLoaded(true);
    }, [predictedMoviesRuntimeByUserData]);

    useEffect(() => {
        if (predictedGenresData.isLoading) {
            return;
        }
        if (predictedGenresData.errors !== "" ||
            predictedGenresData.data?.Error !== undefined ||
            predictedGenresData.data == null ||
            predictedGenresData.data.Data === undefined) {
            return;
        }
        setPredictedGenres(predictedGenresData.data!.Data!);
        setCurrentPredictedGenres(predictedGenresData.data.Data!.filter(p => p.year === new Date().getFullYear() && p.month === new Date().getMonth() + 1));
        setArePredictedGenresLoaded(true);
    }, [predictedGenresData]);

    useEffect(() => {
        if (predictedMoviesCountData.isLoading) {
            return;
        }
        if (predictedMoviesCountData.errors !== "" ||
            predictedMoviesCountData.data?.Error !== undefined ||
            predictedMoviesCountData.data == null ||
            predictedMoviesCountData.data.Data === undefined) {
            return;
        }
        setPredictedMoviesCount(predictedMoviesCountData.data!.Data!);
        setArePredictedMoviesCountLoaded(true);
    }, [predictedMoviesCountData]);

    useEffect(() => {
        if (predictedMoviesRuntimeData.isLoading) {
            return;
        }
        if (predictedMoviesRuntimeData.errors !== "" ||
            predictedMoviesRuntimeData.data?.Error !== undefined ||
            predictedMoviesRuntimeData.data == null ||
            predictedMoviesRuntimeData.data.Data === undefined) {
            return;
        }
        setPredictedMoviesRuntime(predictedMoviesRuntimeData.data!.Data!);
        setArePredictedMoviesRuntimeLoaded(true);
    }, [predictedMoviesRuntimeData]);


    useEffect(() => {
        if (topPredictedAgeViewershipsData.isLoading) {
            return;
        }
        if (topPredictedAgeViewershipsData.errors !== "" ||
            topPredictedAgeViewershipsData.data?.Error !== undefined ||
            topPredictedAgeViewershipsData.data == null ||
            topPredictedAgeViewershipsData.data.Data === undefined) {
            return;
        }
        setTopPredictedAgeViewerships(topPredictedAgeViewershipsData.data!.Data!);
        setAreTopPredictedAgeViewershipsLoaded(true);
    }, [topPredictedAgeViewershipsData]);

    useEffect(() => {
        if (!firstButtonClicked) {
            setFirstButtonActive();
        }
    }, [firstButtonClicked]);

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

    const filterMonthySeenMoviesByUser = (data: MonthlyAppUsageModel[]): MonthlyAppUsageModel[] => {
        let filteredMonthlySeenMovies: MonthlyAppUsageModel[] = [];
        for (let i = 0; i < data.length; i++) {
            const filteredData: ISeenMovieRead[] = data[i].seenMovies.filter(s => s.userUid === authenticationContext.User.uid);
            if (filteredData.length !== 0) {
                filteredMonthlySeenMovies.push({
                    month: data[i].month,
                    year: data[i].year,
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
            areTopSeenGenresLoaded &&
            areTopAgeViewershipsLoaded &&
            arePredictedGenresByUserLoaded &&
            arePredictedMoviesCountByUserLoaded &&
            arePredictedMoviesRuntimeByUserLoaded &&
            arePredictedGenresLoaded &&
            arePredictedMoviesCountLoaded &&
            arePredictedMoviesRuntimeLoaded &&
            areTopPredictedAgeViewershipsLoaded;
    };

    const handleGenreClick = () => {
        onSelectedDateChange(new Date());
        setCurrentChartContext('Genres');
        setShouldDisplayCalendar(true);
        setNeedsDateRange(false);
        setDataTitle('Top Seen Genres')
        setChartChangeIsMade((prev) => !prev);

        const chartData: IChartData[] = [
            {
                graphType: GraphTypes.PIE_CHART,
                data: isAdmin() ? topSeenGenres! : filterTopSeenGenresDataByUser()
            },
            {
                title: "Predicted Genres",
                graphType: GraphTypes.SCATTER_CHART,
                data: isAdmin() ?
                    getFormattedChartModels(currentPredictedGenres) :
                    getFormattedChartModels(currentPredictedGenresByUser)
            }
        ];
        setChartData(chartData);
    };

    const handleHoursClick = () => {
        setSelectedDate(new Date());
        setCurrentChartContext('Hours');
        setShouldDisplayCalendar(true);
        setNeedsDateRange(true);
        setDataTitle('Most Seen Movie Runtimes');
        setChartChangeIsMade((prev) => !prev);
        filterCurrentMonthlySeenMovies(monthlySeenMoviesData.data!.Data!, new Date())
        const chartData: IChartData[] = [
            {
                graphType: GraphTypes.BAR_CHART,
                data: isAdmin() ?
                    getFormattedChartModels(getMonthlyRuntime(filterCurrentMonthlySeenMovies(monthlySeenMovies, new Date()))) :
                    getFormattedChartModels(getMonthlyRuntime(filterMonthySeenMoviesByUser(filterCurrentMonthlySeenMovies(monthlySeenMovies, new Date()))))
            },
            {
                title: "Predicted Hours",
                graphType: GraphTypes.SIMPLE_LINE_CHART,
                data: isAdmin() ?
                    getFormattedChartModels(predictedMoviesRuntime) :
                    getFormattedChartModels(predictedMoviesRuntimeByUser!)
            }
        ];
        setChartData(chartData);
    };

    const handleMoviesClick = () => {
        setSelectedDate(new Date());
        setCurrentChartContext('Movies');
        setShouldDisplayCalendar(true);
        setNeedsDateRange(true);
        setDataTitle('Most Movies')
        setChartChangeIsMade((prev) => !prev);
        const chartData: IChartData[] = [
            {
                graphType: GraphTypes.BAR_CHART,
                data: isAdmin() ?
                    getFormattedChartModels(getMonthlyMoviesCount(filterCurrentMonthlySeenMovies(monthlySeenMovies, new Date()))) :
                    getFormattedChartModels(getMonthlyMoviesCount(filterMonthySeenMoviesByUser(filterCurrentMonthlySeenMovies(monthlySeenMovies, new Date()))))
            },
            {
                title: "Predicted Movie Count",
                graphType: GraphTypes.SIMPLE_LINE_CHART,
                data: isAdmin() ?
                    getFormattedChartModels(predictedMoviesCount) :
                    getFormattedChartModels(predictedMoviesCountByUser!)
            }
        ];
        setChartData(chartData);
    };

    const handlePeopleClick = () => {
        setSelectedDate(new Date());
        setCurrentChartContext('Age');
        setShouldDisplayCalendar(true);
        setDataTitle('Watched Movies By Age')
        setChartChangeIsMade((prev) => !prev);
        setNeedsDateRange(false);
        const chartData: IChartData[] = [
            {
                title: "Actual",
                graphType: GraphTypes.SIMPLE_LINE_CHART,
                data: topAgeViewerships!
            },
            {
                title: "Predicted",
                graphType: GraphTypes.SIMPLE_LINE_CHART,
                data: topPredictedAgeViewerships!
            }
        ];
        setChartData(chartData);
    };

    const handleAllClick = () => {
        setSelectedDate(new Date());
        setCurrentChartContext('All');
        setShouldDisplayCalendar(true);
        setNeedsDateRange(true);
        setDataTitle('General')
        setChartChangeIsMade((prev) => !prev);
        const chartData: IChartData[] = [
            {
                graphType: GraphTypes.BAR_CHART,
                title: 'Best Runtimes',
                data: isAdmin() ?
                    getFormattedChartModels(getMonthlyRuntime(filterCurrentMonthlySeenMovies(monthlySeenMovies, new Date()))) :
                    getFormattedChartModels(getMonthlyRuntime(filterMonthySeenMoviesByUser(filterCurrentMonthlySeenMovies(monthlySeenMovies, new Date()))))
            },
            {
                graphType: GraphTypes.BAR_CHART,
                title: 'Most Movies',
                data: isAdmin() ?
                    getFormattedChartModels(getMonthlyMoviesCount(filterCurrentMonthlySeenMovies(monthlySeenMovies, new Date()))) :
                    getFormattedChartModels(getMonthlyMoviesCount(filterMonthySeenMoviesByUser(filterCurrentMonthlySeenMovies(monthlySeenMovies, new Date()))))
            },
            {
                graphType: GraphTypes.PIE_CHART,
                title: 'Top Genres',
                data: isAdmin() ?
                    topSeenGenres! :
                    filterTopSeenGenresDataByUser()
            },
        ];
        if (isAdmin()) {
            chartData.push({
                graphType: GraphTypes.SIMPLE_LINE_CHART,
                title: 'Top Ages',
                data: topAgeViewerships!
            });
        }
        setChartData(chartData);
    };

    const setFirstButtonActive = (): void => {
        if (!firstButtonClicked) {
            const firstButton = $('#buttonsChartContainer');
            if (firstButton.length === 0) {
                setTimeout(() => {
                    setFirstButtonActive();
                    return;
                }, 500);
            }
            firstButton.children().first().click();
            setFirstButtonClicked(true);
        }
    };

    const getButtons = (): JSX.Element => {
        if (isAdmin()) {
            return <div id='buttonsChartContainer'
                className={buttonContainerClassName}>
                <ButtonCard
                    id='Genres'
                    text='Genres'
                    onClick={handleGenreClick}
                    count={120}
                    iconName={'Library'} />
                <ButtonCard id='Runtime'
                    text='Runtime'
                    onClick={handleHoursClick}
                    count={115}
                    iconName={'Timer'} />
                <ButtonCard id='People'
                    text='People'
                    onClick={handlePeopleClick}
                    count={123}
                    iconName={'Contact'} />
                <ButtonCard id='All'
                    text='All'
                    onClick={handleAllClick}
                    count={114}
                    iconName={'DonutChart'} />
            </div>
        }
        return <div id='buttonsChartContainer'
            className={buttonContainerClassName}>
            <ButtonCard id='Genres'
                text='Genres'
                onClick={handleGenreClick}
                count={121}
                iconName={'Library'} />
            <ButtonCard id='Runtime'
                text='Runtime'
                onClick={handleHoursClick}
                count={223}
                iconName={'Timer'} />
            <ButtonCard id='Movies'
                text='Movies'
                onClick={handleMoviesClick}
                count={321}
                iconName={'MyMoviesTV'} />
            <ButtonCard id='All'
                text='All'
                onClick={handleAllClick}
                count={254}
                iconName={'DonutChart'} />
        </div>
    };

    const handleMovieRuntimeContextChartData = (startDate: Date): void => {
        const filteredData = filterCurrentMonthlySeenMovies(monthlySeenMovies, startDate);
        setChartChangeIsMade((prev) => !prev);
        if (isAdmin()) {
            chartData[0].data = getFormattedChartModels(getMonthlyRuntime(filteredData))
            return;
        }
        chartData[0].data = getFormattedChartModels(getMonthlyRuntime(filterMonthySeenMoviesByUser(filteredData)));
    };

    const handleMovieCountContextChartData = (startDate: Date): void => {
        const filteredData = filterCurrentMonthlySeenMovies(monthlySeenMovies, startDate);
        setChartChangeIsMade((prev) => !prev);
        if (isAdmin()) {
            chartData[0].data = getFormattedChartModels(getMonthlyMoviesCount(filteredData))
            return;
        }
        chartData[0].data = getFormattedChartModels(getMonthlyMoviesCount(filterMonthySeenMoviesByUser(filteredData)));
    };

    const handleAllContextChartData = (startDate: Date): void => {
        const filteredData = filterCurrentMonthlySeenMovies(monthlySeenMovies, startDate);
        setChartChangeIsMade((prev) => !prev);
        if (isAdmin()) {
            chartData[0].data = getFormattedChartModels(getMonthlyRuntime(filteredData))
            chartData[1].data = getFormattedChartModels(getMonthlyMoviesCount(filteredData))
            services.SeenMoviesService.GetAgeViewershipByMonth(startDate.getFullYear(), startDate.getMonth() + 1).then(data => {
                setTopAgeViewerships(data.Data!);
                chartData[3].data = data.Data!;
            });
            return;
        }
        chartData[0].data = getFormattedChartModels(getMonthlyRuntime(filterMonthySeenMoviesByUser(filteredData)));
        chartData[1].data = getFormattedChartModels(getMonthlyMoviesCount(filterMonthySeenMoviesByUser(filteredData)));
    };


    const handleContextBasedActions = (date: Date) => {
        if (needsDateRange) {
            const startDate: Date = new Date(date);
            const endDate: Date = new Date(date);
            endDate.setMonth(startDate.getMonth() + 4);
            switch (currentChartContext) {
                case "Hours": {
                    handleMovieRuntimeContextChartData(startDate);
                    return;
                }
                case "Movies": {
                    handleMovieCountContextChartData(startDate);
                    return;
                }
                case "All": {
                    handleAllContextChartData(startDate);
                    return;
                }
            }
            return;
        }
        switch (currentChartContext) {
            case "Age": {
                const year: number = date.getFullYear();
                const month: number = date.getMonth() + 1;
                services.PredictedAgesViewershipService.GetByMonth(year, month).then((data: IResponse<IAgeViewershipModel[]>) => {
                    setTopPredictedAgeViewerships(data.Data);
                    const predictedChartData = chartData.filter(c => c.title === "Predicted")[0];
                    predictedChartData.data = data.Data!;
                });
                services.SeenMoviesService.GetAgeViewershipByMonth(year, month).then((data: IResponse<IAgeViewershipModel[]>) => {
                    setTopAgeViewerships(data.Data);
                    const predictedChartData = chartData.filter(c => c.title === "Actual")[0];
                    predictedChartData.data = data.Data!;
                    setChartChangeIsMade((prev) => !prev);
                });
                return;
            }
            case "Genres": {
                setChartChangeIsMade((prev) => !prev);
                if (isAdmin()) {
                    const filteredData = predictedGenres!.filter(p => p.year === date.getFullYear() && p.month === date.getMonth() + 1);
                    chartData[1].data = getFormattedChartModels(filteredData);
                    return;
                }
                const filteredData = predictedGenresByUser!.filter(p => p.year === date.getFullYear() && p.month === date.getMonth() + 1);
                chartData[1].data = getFormattedChartModels(filteredData);
                return;
            }
        }
    };

    const onSelectedDateChange = (date: Date, selectedDateRangeArray?: Date[] | undefined): void => {
        setSelectedDate(date);
        handleContextBasedActions(date);
    };

    useEffect(() => {
        $('.ms-DatePicker-goToday').on('click', () => {
            debugger;
            handleContextBasedActions(new Date());
        });
    }, []);

    return <div className={containerClassName}>
        {isDataLoaded() &&
            <>
                {getButtons()}
                <div className={contentContainerClassName}>
                    <>{shouldDisplayCalendar &&
                        <div className={calendarContainerClassName}>
                            <p className={selectedDateInfoClassName}>Selected date: {selectedDate?.toLocaleString() || 'Not set'}</p>
                            <Calendar className={calendarClassName}
                                dateRangeType={DateRangeType.Month}
                                showGoToToday
                                autoNavigateOnSelection
                                highlightSelectedMonth
                                isDayPickerVisible={false}
                                onSelectDate={onSelectedDateChange}
                                value={selectedDate}
                                strings={defaultCalendarStrings} />
                        </div>}
                    </>
                    <h2 className={chartTitleClassName}>{dataTitle}</h2>
                    {chartData.length !== 0 && <Chart chartData={chartData}
                        chartChangeIsMadeFlag={chartChangeIsMadeFlag} />}
                </div>
            </>
        }
    </div>
};