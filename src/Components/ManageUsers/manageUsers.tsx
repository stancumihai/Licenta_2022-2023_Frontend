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
    IconButton,
    MarqueeSelection,
    Selection,
    SelectionMode
} from '@fluentui/react';
import {
    DATE_OF_BIRTH_COLUMN_KEY,
    DATE_OF_BIRTH_COLUMN_NAME,
    COUNTRY_COLUMN_KEY,
    COUNTRY_COLUMN_NAME,
    CITY_COLUMN_KEY,
    CITY_COLUMN_NAME,
    FULL_NAME_COLUMN_NAME,
    FULL_NAME_COLUMN_KEY,
    MAX_MOVIES_PER_PAGE,
    VIEW_BUTTON_COLUMN_KEY,
    USER_DETAILS_PATH
} from '../../Library/constants';
import {
    buttonContainerClassName,
    containerClassName,
    iconStyle,
    manageUsersListStyles,
    titleClassName
} from './manageUsers.styles';
import { IUserProfileRead } from '../../Models/UserProfile/IUserProfileRead';
import { getShortDateAsString } from '../../Library/dateUtils';
import { Paginator } from '../Paginator/paginator';
import UserContext from '../../Contexts/User/userContext';
import { IUserContext } from '../../Contexts/User/userContext.types';
import {
    NavigateFunction,
    NavigateOptions,
    useNavigate
} from 'react-router';

export const ManageUsers = (): JSX.Element => {
    const userContext: IUserContext = useContext(UserContext);
    const [usersToDisplayInPage, setUsersToDisplayInPage] = useState<IUserProfileRead[] | undefined>(undefined);
    const [selection] = useState<Selection<IObjectWithKey>>(() => new Selection({

    }));
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        onPageChange(1);
    }, [userContext.currentUsedUsers]);

    const columns = [
        { key: FULL_NAME_COLUMN_KEY, name: FULL_NAME_COLUMN_NAME, fieldName: FULL_NAME_COLUMN_KEY, minWidth: 100, maxWidth: 300, isResizable: true },
        { key: DATE_OF_BIRTH_COLUMN_KEY, name: DATE_OF_BIRTH_COLUMN_NAME, fieldName: DATE_OF_BIRTH_COLUMN_KEY, minWidth: 100, maxWidth: 200, isResizable: true },
        { key: COUNTRY_COLUMN_KEY, name: COUNTRY_COLUMN_NAME, fieldName: COUNTRY_COLUMN_KEY, minWidth: 100, maxWidth: 200, isResizable: true },
        { key: CITY_COLUMN_KEY, name: CITY_COLUMN_NAME, fieldName: CITY_COLUMN_KEY, minWidth: 100, maxWidth: 200, isResizable: true },
        { key: VIEW_BUTTON_COLUMN_KEY, name: '', fieldName: '', minWidth: 200, maxWidth: 300, isResizable: true }
    ];

    const onRenderItemColumn = (item: IUserProfileRead, index?: number, column?: IColumn): any => {
        switch (column!.key) {
            case DATE_OF_BIRTH_COLUMN_KEY: {
                return getShortDateAsString(new Date(item.dateOfBirth))
            }
            case VIEW_BUTTON_COLUMN_KEY:
                return (
                    <IconButton
                        id={item.uid}
                        iconProps={{ iconName: 'RedEye' }}
                        styles={iconStyle}
                        onClick={handleSelectedUserClick}
                    />);
            default:
                return item[column!.key as keyof IUserProfileRead];
        };
    };

    const handleSelectedUserClick = (): void => {
        const selectedUser: IUserProfileRead = selection.getSelection()[0] as IUserProfileRead;
        const navigateOptions: NavigateOptions = {
            state: {
                selectedUser: selectedUser,
            }
        };
        navigate(USER_DETAILS_PATH, navigateOptions);
    };

    const onPageChange = (selectedPageIndex: number): void => {
        if (usersToDisplayInPage === undefined) {
            userContext.setCurrentUsers(userContext.users);
            setUsersToDisplayInPage(userContext.users.slice((selectedPageIndex - 1) * MAX_MOVIES_PER_PAGE,
                selectedPageIndex * MAX_MOVIES_PER_PAGE));
            return;
        }
        setUsersToDisplayInPage(userContext.currentUsedUsers.slice((selectedPageIndex - 1) * MAX_MOVIES_PER_PAGE,
            selectedPageIndex * MAX_MOVIES_PER_PAGE));
    };;

    return <div className={containerClassName}>
        <h1 className={titleClassName}>{'Users'}</h1>
        <hr />
        {usersToDisplayInPage !== undefined && <div >
            <MarqueeSelection selection={selection}>
                <DetailsList setKey={'users'}
                    getKey={item => item.uid}
                    styles={manageUsersListStyles}
                    items={usersToDisplayInPage}
                    columns={columns}
                    onRenderItemColumn={onRenderItemColumn}
                    selectionPreservedOnEmptyClick={true}
                    selection={selection}
                    selectionMode={SelectionMode.single} />
            </MarqueeSelection>
            <Paginator itemsPerPage={MAX_MOVIES_PER_PAGE}
                totalItemsCount={userContext.currentUsedUsers.length}
                onPageChange={onPageChange}
            />
        </div>}
    </div>
};