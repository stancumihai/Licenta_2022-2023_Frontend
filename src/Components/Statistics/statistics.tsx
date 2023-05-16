import {
    useContext,
    useEffect,
    useState
} from 'react';
import { ButtonCard } from '../ButtonCard/buttonCard';
import {
    buttonContainerClassName,
    containerClassName,
    mainTextClassName
} from './statistics.styles';
import { StatisticsChartView } from './ChartView/statisticsChartView';
import { StatisticsSummaryView } from './SummaryView/statisticsSummaryView';
import { ServiceContext, ServiceContextInstance } from '../../Core/serviceContext';
import { useFetch } from '../../Hooks/useFetch';
import { IFetchResult } from '../../Hooks/useFetch.types';
import { IRecommendationRead } from '../../Models/Recommendation/IRecommendationRead';
import { IRecommendationUpdate } from '../../Models/Recommendation/IRecommendationUpdate';


export const Statistics = (): JSX.Element => {
    const [firstButtonClicked, setFirstButtonClicked] = useState<boolean>(false);
    const [showSummary, setShowSummary] = useState<boolean>(false);
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const [recommendations, setRecommendations] = useState<IRecommendationRead[] | IRecommendationUpdate[]>([]);
    const [areRecommendationsLoaded, setAreRecommendationsLoaded] = useState<boolean>(false);
    const recommendationsData: IFetchResult<IRecommendationRead[] | IRecommendationUpdate[]> =
        useFetch<IRecommendationRead[] | IRecommendationUpdate[]>(() => services.RecommendationService.GetAll());
    useEffect(() => {
        if (recommendationsData.isLoading) {
            return;
        }
        if (recommendationsData.errors !== "" ||
            recommendationsData.data?.Error !== undefined ||
            recommendationsData.data == null ||
            recommendationsData.data.Data === undefined) {
            return;
        }
        setRecommendations(recommendationsData.data.Data);
        setAreRecommendationsLoaded(true);
    }, [recommendationsData]);

    useEffect(() => {
        if (!firstButtonClicked) {
            setFirstButtonActive();
        }
    }, [firstButtonClicked]);

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

    const handleSummaryClick = () => {
        setShowSummary(true);
    };

    const handleChartsClick = () => {
        setShowSummary(false);
    };

    const getButtons = (): JSX.Element => {
        return <div id='buttonsChartContainer'
            className={buttonContainerClassName}>
            <ButtonCard id={'Summary'}
                text='Summary'
                mainTextClassName={mainTextClassName}
                onClick={handleSummaryClick}
                iconName={'Library'} />
            <ButtonCard id={'Charts'}
                leftMargin={true}
                mainTextClassName={mainTextClassName}
                text='Charts'
                onClick={handleChartsClick}
                iconName={'BarChartVertical'} />  /</div>
    };

    return <div className={containerClassName}>
        {getButtons()}
        {showSummary ?
            <StatisticsSummaryView /> :
            <StatisticsChartView />
        }
    </div>
};


