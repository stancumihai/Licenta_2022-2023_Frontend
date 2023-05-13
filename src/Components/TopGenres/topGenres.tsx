import {
    useContext,
    useEffect,
    useState
} from 'react';
import {
    containerClassName,
    contentContainerClassName,
} from './topGenres.styles';
import {
    ServiceContext,
    ServiceContextInstance
} from '../../Core/serviceContext';
import { useFetch } from '../../Hooks/useFetch';
import { IFetchResult } from '../../Hooks/useFetch.types';
import { TopGenresCard } from '../TopGenresCard/topGenresCard';
import UiContext from '../../Contexts/Ui/uiContext';
import { IUiContext } from '../../Contexts/Ui/uiContext.types';

export const TopGenres = (): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const genresData: IFetchResult<string[]> = useFetch<string[]>(() => services.MovieService.GetTopLikedGenres());
    const [genres, setGenres] = useState<string[]>();
    const [areGenresLoaded, setAreGenresLoaded] = useState<boolean>(false);
    const uiContext: IUiContext = useContext(UiContext);

    useEffect(() => {
        if (genresData.isLoading) {
            return;
        }
        if (genresData.errors !== "" ||
            genresData.data?.Error !== undefined ||
            genresData.data == null ||
            genresData.data.Data === undefined) {
            return;
        }
        setGenres(genresData.data!.Data!);
        setAreGenresLoaded(true);
    }, [genresData]);

    useEffect(() => {
        if (!areGenresLoaded) {
            uiContext.setSpinnerState(true);
        }
    }, [areGenresLoaded]);

    return <>
        {!areGenresLoaded ?
            <>
            </> :
            <div className={containerClassName}>
                <div className={contentContainerClassName}>
                    {genres!.map((g: string, i: number) => <TopGenresCard
                        key={i}
                        genre={g} />)}
                </div>
            </div>
        }
    </>
};