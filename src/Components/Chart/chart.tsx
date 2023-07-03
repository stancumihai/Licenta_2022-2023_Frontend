import { useContext, useEffect, useState } from 'react';
import {
    IChartDashboardProps,
    IChartData,
    mapChart
} from './chart.types';
import { containerClassName } from './charts.styles';
import AuthentificationContext from '../../Contexts/Authentication/authenticationContext';
import { IAuthentificationContext } from '../../Contexts/Authentication/authenticationContext.types';
import UserContext from '../../Contexts/User/userContext';
import { IUserContext } from '../../Contexts/User/userContext.types';
import { UserType } from '../../Enums/UserType';
import { IUserProfileRead } from '../../Models/UserProfile/IUserProfileRead';

export const Chart = (props: IChartDashboardProps): JSX.Element => {
    const [charts, setCharts] = useState<JSX.Element[] | null>([]);
    const userContext: IUserContext = useContext(UserContext);
    const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);

    const waitForChartData = () => {
        if (props.chartData === undefined) {
            setTimeout(() => {
                waitForChartData();
                return;
            }, 200);
        }
    };

    useEffect(() => {
        if (!currentUserHasProfile()) {
            return;
        }
        waitForChartData();
        setCharts(null);
        const chartArray: JSX.Element[] = [];
        props.chartData.forEach((chartData: IChartData, i: number) => {
            chartArray.push(mapChart(chartData, i));
        });
        setCharts(chartArray);
    }, [props.chartChangeIsMadeFlag]);

    const currentUserHasProfile = (): boolean => {
        return userContext.users.filter((u: IUserProfileRead) => u.userUid === authenticationContext.User.uid!)[0] != null || isAdmin();;
    };

    const isAdmin = (): boolean => {
        return authenticationContext.User.role === UserType.Administrator;
    };

    return <div id='charts' className={containerClassName}>
        {charts !== null && charts}
    </div>
};