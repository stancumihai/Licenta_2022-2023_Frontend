import { defaultCalendarStrings } from '@fluentui/react';
import {
    IDropdownOption,
    Dropdown,
    Calendar,
    DateRangeType
} from 'office-ui-fabric-react';
import {
    useState,
    useCallback,
    useContext,
    useEffect
} from 'react';
import {
    calendarClassName,
    chartsContainerClassName,
    containerClassName,
    dropdownStyles,
    inputsContainerClassName,
    selectedDateInfoClassName
} from './statisticsChartView.styles';
import { COLOR2 } from '../../../Library/constants';
import { GraphTypes } from '../../../Enums/graphTypes';
import { IChartData } from '../../Chart/chart.types';
import { Chart } from '../../Chart/chart';
import {
    ServiceContext,
    ServiceContextInstance
} from '../../../Core/serviceContext';
import { IFetchResult } from '../../../Hooks/useFetch.types';
import { useFetch } from '../../../Hooks/useFetch';
import { IAccuracyPeriodModel } from '../../../Models/IAccuracyPeriodModel';
import { getFormattedChartModels } from '../../../Helpers/ChartHelper/chartDataLogic';

export const StatisticsChartView = (): JSX.Element => {
    const services = useContext<ServiceContext>(ServiceContextInstance);

    const [recommendationsPerMonth, setRecommendationsPerMonth] = useState<IAccuracyPeriodModel[]>([]);
    const [areRecommendationsPerMonthLoaded, setAreRecommendationsPerMonthLoaded] = useState<boolean>(false);
    const recommendationsPerMonthData: IFetchResult<IAccuracyPeriodModel[]> =
        useFetch<IAccuracyPeriodModel[]>(() => services.RecommendationService.GetAccuracyPerMonths());

    const [selectedDate, setSelectedDate] = useState<Date>();
    const algorithmDropdownOptions: IDropdownOption[] = [
        { key: 'algorithm1', text: 'Algorithm 1' },
        { key: 'algorithm2', text: 'Algorithm 2' },
    ];
    const [selectedAlgorithmDropdownOption, setSelectedAlgorithmDropdownOption] = useState<IDropdownOption>();
    const [isChartButtonClicked, setIsChartButtonClicked] = useState<boolean>(false);


    useEffect(() => {
        if (recommendationsPerMonthData.isLoading) {
            return;
        }
        if (recommendationsPerMonthData.errors !== "" ||
            recommendationsPerMonthData.data?.Error !== undefined ||
            recommendationsPerMonthData.data == null ||
            recommendationsPerMonthData.data.Data === undefined) {
            return;
        }
        console.log(recommendationsPerMonthData.data.Data);
        setRecommendationsPerMonth(recommendationsPerMonthData.data.Data!)
        setAreRecommendationsPerMonthLoaded(true);
    }, [recommendationsPerMonthData]);

    const handleAlgorithmSelection = (event: React.FormEvent<HTMLDivElement>, newAlgorithm?: IDropdownOption): void => {
        setSelectedAlgorithmDropdownOption(newAlgorithm!);
    };

    const onSelectDate = useCallback((date: Date): void => {
        setIsChartButtonClicked((prev) => !prev);
        setSelectedDate(date);
    }, []);

    const handleDropDownMouseEnter = (event: any): void => {
        $(event.target).css('color', 'white');
        $(event.target).css('border-color', COLOR2);
        $(event.target).css('border', `2px solid ${COLOR2}`);
        $(event.currentTarget)
            .find('i[data-icon-name="ChevronDown"]')
            .css('color', COLOR2);
    };

    const chartData: IChartData[] = [
        {
            graphType: GraphTypes.BAR_CHART,
            data: getFormattedChartModels(recommendationsPerMonth)
        }
    ];

    return <div className={containerClassName}>
        {areRecommendationsPerMonthLoaded &&
            <>
                <div className={inputsContainerClassName}>
                    <Dropdown selectedKey={selectedAlgorithmDropdownOption ? selectedAlgorithmDropdownOption.key : undefined}
                        onMouseEnter={handleDropDownMouseEnter}
                        label={'Please choose algorithm'}
                        onChange={handleAlgorithmSelection}
                        options={algorithmDropdownOptions}
                        styles={dropdownStyles} />
                    <div>
                        {selectedAlgorithmDropdownOption !== undefined &&
                            <>
                                <p className={selectedDateInfoClassName}>Selected date: {selectedDate?.toLocaleString() || 'Not set'}</p>
                                <Calendar className={calendarClassName}
                                    dateRangeType={DateRangeType.Month}
                                    showGoToToday
                                    highlightSelectedMonth
                                    isDayPickerVisible={false}
                                    onSelectDate={onSelectDate}
                                    value={selectedDate}
                                    strings={defaultCalendarStrings} />
                            </>
                        }
                    </div>
                </div>
                <div className={chartsContainerClassName}>
                    {chartData.length !== 0 && <Chart chartData={chartData}
                        isButtonClicked={isChartButtonClicked} />}
                </div>
            </>
        }
    </div>
};  