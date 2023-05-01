import {
    useContext,
    useEffect,
    useState
} from 'react';
import {
    ServiceContext,
    ServiceContextInstance
} from '../../Core/serviceContext';
import { useFetch } from '../../Hooks/useFetch';
import { IFetchResult } from '../../Hooks/useFetch.types';
import { IPerson } from '../../Models/IPerson';
import {
    containerClassName,
    contentContainerClassName,
    goBackIconStyles,
    homePageTextClassName,
    loadingSpinnerStyle
} from './artistsOfTheMonth.styles';
import { PersonDetailsCard } from '../PersonDetailsCard/personDetailsCard';
import { IconButton, Spinner } from '@fluentui/react';
import {
    NavigateFunction,
    useNavigate
} from 'react-router';
import {
    HOME_PATH,
    SPINNER_LOADING_DATA_MESSAGE
} from '../../Library/constants';

export const ArtistsOfTheMonth = (): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const personsData: IFetchResult<IPerson[]> = useFetch<IPerson[]>(() => services.PersonsService.GetAristsOfTheMonth());
    const [persons, setPersons] = useState<IPerson[]>([]);
    const [arePersonsLoaded, setArePersonsLoaded] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        if (personsData.isLoading) {
            return;
        }
        if (personsData.errors !== "" ||
            personsData.data?.Error !== undefined ||
            personsData.data == null ||
            personsData.data.Data === undefined) {
            return;
        }
        setPersons(personsData.data!.Data!);
        setTimeout(() => {
            setArePersonsLoaded(true);
        }, 2000)
    }, [personsData]);

    return <div className={containerClassName}>
        {!arePersonsLoaded ?
            <div>
                <Spinner styles={loadingSpinnerStyle}
                    label={SPINNER_LOADING_DATA_MESSAGE}
                    ariaLive="assertive"
                    labelPosition="top" />
            </div> :
            <div>
                <div style={{ cursor: 'pointer' }} onClick={() => navigate(HOME_PATH)}>
                    <IconButton iconProps={{ iconName: "Back" }}
                        styles={goBackIconStyles} />
                    <p className={homePageTextClassName}>Home Page</p>
                </div>
                <div className={contentContainerClassName}>
                    {persons.map((p: IPerson, i: number) => <PersonDetailsCard key={i} person={p} />)}
                </div>
            </div>
        }
    </div>
};