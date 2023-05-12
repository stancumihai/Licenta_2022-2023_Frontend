import {
    useContext,
    useEffect,
    useState
} from 'react';
import {
    containerClassName,
    contentContainerClassName,
    loadingSpinnerStyle
} from './topGenres.styles';
import {
    ServiceContext,
    ServiceContextInstance
} from '../../Core/serviceContext';
import { useFetch } from '../../Hooks/useFetch';
import { IFetchResult } from '../../Hooks/useFetch.types';
import { Spinner } from '@fluentui/react';
import {
    SPINNER_LOADING_DATA_MESSAGE
} from '../../Library/constants';
import { TopGenresCard } from '../TopGenresCard/topGenresCard';

export const TopGenres = (): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const genresData: IFetchResult<string[]> = useFetch<string[]>(() => services.MovieService.GetTopLikedGenres());
    const [genres, setGenres] = useState<string[]>();
    const [areGenresLoaded, setAreGenresLoaded] = useState<boolean>(false);

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

    return < >
        {!areGenresLoaded ?
            <>
                <Spinner styles={loadingSpinnerStyle}
                    label={SPINNER_LOADING_DATA_MESSAGE}
                    ariaLive="assertive"
                    labelPosition="top" />
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