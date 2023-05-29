import { defaultCalendarStrings } from '@fluentui/react';
import {
    IDropdownOption,
    Dropdown,
    Calendar,
    DateRangeType
} from 'office-ui-fabric-react';
import {
    useState,
    useContext,
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
import { IAccuracyPeriodModel } from '../../../Models/ChartModels/IAccuracyPeriodModel';
import { getFormattedChartModels } from '../../../Helpers/ChartHelper/chartDataLogic';
import { IMonthlyRecommendationStatusModel } from '../../../Models/ChartModels/IMonthlyRecommendationStatusModel';
import { IResponse } from '../../../Models/IResponse';

export const StatisticsChartView = (): JSX.Element => {
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const [selectedDate, setSelectedDate] = useState<Date>();
    const algorithmDropdownOptions: IDropdownOption[] = [
        { key: 'decision_tree', text: 'Decision Tree Classifier' },
        { key: 'kneighbours', text: 'K Neighbors Classifier' },
        { key: 'random_forest', text: 'Random Forest Classifier' },
    ];
    const [selectedAlgorithmDropdownOption, setSelectedAlgorithmDropdownOption] = useState<IDropdownOption>();
    const [isChartButtonClicked, setIsChartButtonClicked] = useState<boolean>(false);
    const [selectedDateChartData, setSelectedDateChartData] = useState<IChartData[] | undefined>(undefined);
    const [algorithmData, setAlgorithmData] = useState<IChartData[] | undefined>(undefined);

    const handleAlgorithmSelection = (event: React.FormEvent<HTMLDivElement>, newAlgorithm?: IDropdownOption): void => {
        setSelectedDateChartData(undefined);
        const algorithm = newAlgorithm?.text.split('Classifier')[0].trim();
        services.RecommendationService.GetAccuracyPerMonthsByAlgorithm(algorithm!).then((data: IResponse<IAccuracyPeriodModel[]>) => {
            setSelectedAlgorithmDropdownOption(newAlgorithm!);
            setIsChartButtonClicked((prev) => !prev);
            setAlgorithmData([{
                graphType: GraphTypes.BAR_CHART,
                data: getFormattedChartModels(data.Data),
                maxY: 1,
                title: 'Accuracy Per Months'
            }]);
        });
    };

    const onSelectedDateChange = (date: Date, selectedDateRangeArray?: Date[] | undefined): void => {
        setSelectedDate(date);
        const algorithm = selectedAlgorithmDropdownOption!.text.split('Classifier')[0].trim();
        services.RecommendationService.GetMonthlyRecommendationStatuses(date!.getFullYear(), date!.getMonth() + 1, algorithm)
            .then((data: IResponse<IMonthlyRecommendationStatusModel[]>) => {
                setSelectedDateChartData([{
                    graphType: GraphTypes.PIE_CHART,
                    data: data.Data!,
                    title: 'Movie Seen Ration This Month'
                }]);
                setIsChartButtonClicked((prev) => !prev);
            });
    };

    const handleDropDownMouseEnter = (event: any): void => {
        $(event.target).css('color', 'white');
        $(event.target).css('border-color', COLOR2);
        $(event.target).css('border', `2px solid ${COLOR2}`);
        $(event.currentTarget)
            .find('i[data-icon-name="ChevronDown"]')
            .css('color', COLOR2);
    };

    return <div className={containerClassName}>
        {
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
                                    onSelectDate={onSelectedDateChange}
                                    value={selectedDate}
                                    strings={defaultCalendarStrings} />
                            </>
                        }
                    </div>
                </div>
                <div className={chartsContainerClassName}>
                    {selectedAlgorithmDropdownOption !== undefined && algorithmData !== undefined &&
                        <Chart chartData={selectedDateChartData === undefined ?
                            algorithmData! :
                            selectedDateChartData}
                            chartChangeIsMadeFlag={isChartButtonClicked} />}
                </div>
            </>
        }
    </div>
};  