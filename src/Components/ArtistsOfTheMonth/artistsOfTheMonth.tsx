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
    contentContainerClassName
} from './artistsOfTheMonth.styles';
import { PersonDetailsCard } from '../PersonDetailsCard/personDetailsCard';
import UiContext from '../../Contexts/Ui/uiContext';
import { IUiContext } from '../../Contexts/Ui/uiContext.types';

export const ArtistsOfTheMonth = (): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const personsData: IFetchResult<IPerson[]> = useFetch<IPerson[]>(() => services.PersonsService.GetAristsOfTheMonth());
    const [persons, setPersons] = useState<IPerson[]>([]);
    const [arePersonsLoaded, setArePersonsLoaded] = useState<boolean>(false);
    const uiContext: IUiContext = useContext(UiContext);

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

    useEffect(() => {
        if (!arePersonsLoaded) {
            uiContext.setSpinnerState(true);
        }
    }, [arePersonsLoaded]);

    return < >
        {!arePersonsLoaded ?
            <>
            </> :
            <div className={containerClassName}>
                <div className={contentContainerClassName}>
                    {persons.map((p: IPerson, i: number) => <PersonDetailsCard key={i} person={p} />)}
                </div>
            </div>
        }
    </>
};