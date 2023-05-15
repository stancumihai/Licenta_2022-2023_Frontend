import {
    DASHBOARD_PATH,
    MANAGE_USERS_PATH,
    MY_COLLECTION_PATH,
    MY_HISTORY_PATH,
    TRENDING_PATH,
    USER_PROFILE_PATH,
    WATCH_LATER_PATH
} from '../../Library/constants';

export interface ICountMapper {
    historyCount: number;
    watchLaterCount: number;
    collectionCount: number;
};

export const PAGES: string[] = [TRENDING_PATH, MY_COLLECTION_PATH, MY_HISTORY_PATH, WATCH_LATER_PATH, DASHBOARD_PATH, USER_PROFILE_PATH, MANAGE_USERS_PATH];