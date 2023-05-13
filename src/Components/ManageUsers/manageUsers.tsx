import {
    MouseEventHandler,
    useContext,
    useEffect,
    useState
} from 'react';

import {
    DefaultButton,
    DetailsList,
    IButtonStyles,
    IColumn,
    IIconProps,
    IObjectWithKey,
    MarqueeSelection,
    Selection
} from '@fluentui/react';
import {
    ServiceContext,
    ServiceContextInstance
} from '../../Core/serviceContext';
import { useFetch } from '../../Hooks/useFetch';
import { IFetchResult } from '../../Hooks/useFetch.types';
import {
    DATE_OF_BIRTH_COLUMN_KEY,
    DATE_OF_BIRTH_COLUMN_NAME,
    COUNTRY_COLUMN_KEY,
    COUNTRY_COLUMN_NAME,
    CITY_COLUMN_KEY,
    CITY_COLUMN_NAME,
    FULL_NAME_COLUMN_NAME,
    FULL_NAME_COLUMN_KEY,
    MAX_MOVIES_PER_PAGE
} from '../../Library/constants';
import {
    buttonContainerClassName,
    containerClassName,
    manageUsersListStyles,
    titleClassName
} from './manageUsers.styles';
import { IUserProfileRead } from '../../Models/UserProfile/IUserProfileRead';
import { getShortDateAsString } from '../../Library/dateUtils';
import { Paginator } from '../Paginator/paginator';

export const ManageUsers = (): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const [users, setUsers] = useState<IUserProfileRead[]>([]);
    const [areUsersLoaded, setAreUsersLoaded] = useState<boolean>(false);
    const usersData: IFetchResult<IUserProfileRead[]> = useFetch<IUserProfileRead[]>(() => services.UserProfilesService.GetAllUserProfiles());
    const [usersToDisplayInPage, setUsersToDisplayInPage] = useState<IUserProfileRead[] | undefined>(undefined);
    const [selection] = useState<Selection<IObjectWithKey>>(() => new Selection({
        onSelectionChanged: () => {
        }
    }));

    useEffect(() => {
        if (usersData.isLoading) {
            return;
        }
        if (usersData.errors !== '' ||
            usersData.data === null ||
            usersData.data?.Error !== undefined ||
            usersData.data?.Data === undefined) {
            return;
        }
        setUsers(getDummyData(usersData.data.Data));
        setAreUsersLoaded(true);
        onPageChange(1);
    }, [usersData]);

    useEffect(() => {
        onPageChange(1);
    }, [users]);

    const getDummyData = (usersData: IUserProfileRead[]): IUserProfileRead[] => {
        const user1: IUserProfileRead = usersData[0];
        const userProfiles1: IUserProfileRead[] = Array(10).fill(user1);
        const user2: IUserProfileRead = usersData[0];
        user2.fullName = "Stancu 2";
        const userProfiles2: IUserProfileRead[] = Array(10).fill(user2);
        return userProfiles1.concat(userProfiles2);
    };

    const columns = [
        { key: FULL_NAME_COLUMN_KEY, name: FULL_NAME_COLUMN_NAME, fieldName: FULL_NAME_COLUMN_KEY, minWidth: 100, maxWidth: 250, isResizable: true },
        { key: DATE_OF_BIRTH_COLUMN_KEY, name: DATE_OF_BIRTH_COLUMN_NAME, fieldName: DATE_OF_BIRTH_COLUMN_KEY, minWidth: 100, maxWidth: 200, isResizable: true },
        { key: COUNTRY_COLUMN_KEY, name: COUNTRY_COLUMN_NAME, fieldName: COUNTRY_COLUMN_KEY, minWidth: 100, maxWidth: 200, isResizable: true },
        { key: CITY_COLUMN_KEY, name: CITY_COLUMN_NAME, fieldName: CITY_COLUMN_KEY, minWidth: 100, maxWidth: 200, isResizable: true },
    ];

    const onRenderItemColumn = (item: IUserProfileRead, index?: number, column?: IColumn): any => {
        switch (column!.key) {
            case DATE_OF_BIRTH_COLUMN_KEY: {
                return getShortDateAsString(new Date(item.dateOfBirth))
            }
            default:
                return item[column!.key as keyof IUserProfileRead];
        };
    };

    const onPageChange = (selectedPageIndex: number): void => {
        setUsersToDisplayInPage(users.slice((selectedPageIndex - 1) * MAX_MOVIES_PER_PAGE,
            selectedPageIndex * MAX_MOVIES_PER_PAGE));
    };;

    const getButton = (buttonStyles: IButtonStyles | undefined,
        iconProps: IIconProps,
        onClickFunction: MouseEventHandler<HTMLButtonElement>,
        text: string,
        isDisabled?: boolean): React.ReactNode => {
        return <DefaultButton styles={buttonStyles}
            iconProps={iconProps}
            onClick={onClickFunction}
            disabled={isDisabled}>
            {text}
        </DefaultButton>;
    };
    return <div className={containerClassName}>
        <h1 className={titleClassName}>{'Users'}</h1>
        <hr />
        <div className={buttonContainerClassName} >

        </div>
        {areUsersLoaded && usersToDisplayInPage !== undefined && <div >
            <MarqueeSelection selection={selection}>
                <DetailsList setKey={'users'}
                    getKey={item => item.uid}
                    styles={manageUsersListStyles}
                    items={usersToDisplayInPage}
                    columns={columns}
                    onRenderItemColumn={onRenderItemColumn}
                    selectionPreservedOnEmptyClick={true}
                    selection={selection}
                    selectionMode={1} />
            </MarqueeSelection>
            <Paginator itemsPerPage={MAX_MOVIES_PER_PAGE}
                totalItemsCount={users.length}
                onPageChange={onPageChange}
            />
        </div>}
    </div>
};