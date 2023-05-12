import { useContext, useEffect, useState } from 'react';
import AuthentificationContext from '../../Contexts/Authentication/authenticationContext';
import { IAuthentificationContext } from '../../Contexts/Authentication/authenticationContext.types';
import { ServiceContext, ServiceContextInstance } from '../../Core/serviceContext';
import { useFetch } from '../../Hooks/useFetch';
import { IFetchResult } from '../../Hooks/useFetch.types';
import { IUserProfileRead } from '../../Models/UserProfile/IUserProfileRead';
import { UserProfile } from '../UserProfile/userProfile';

export const UserProfileWrapper = (): JSX.Element => {
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);
    const userProfileData: IFetchResult<IUserProfileRead> = useFetch<IUserProfileRead>(() => services.UserProfilesService.GetByUserUid(authenticationContext.User.uid!));
    const [userProfile, setUserProfile] = useState<IUserProfileRead | undefined>(undefined);
    const [isUserProfileLoaded, setIsUserProfileLoaded] = useState(false);

    const logAuthContext = () => {
        if (authenticationContext.User.uid! === undefined) {
            logAuthContext();
        }
    };

    useEffect(() => {
        logAuthContext();
        if (userProfileData.isLoading) {
            return;
        }
        if (userProfileData.errors !== "" ||
            userProfileData.data?.Error !== undefined ||
            userProfileData.data == null ||
            userProfileData.data.Data === undefined) {
            return;
        }
        setUserProfile(userProfileData.data!.Data!);
        setIsUserProfileLoaded(true);
    }, [userProfileData, authenticationContext.User.uid])

    return <div>
        {isUserProfileLoaded && <UserProfile userProfile={userProfile} />}
    </div>
};