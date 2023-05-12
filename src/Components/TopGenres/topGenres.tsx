import {
    useContext,
    useEffect,
    useState
} from 'react';
import {
    containerClassName,
    contentContainerClassName,
    goBackIconStyles,
    homePageTextClassName,
    loadingSpinnerStyle
} from './topGenres.styles';
import {
    NavigateFunction,
    useNavigate
} from 'react-router-dom';
import {
    ServiceContext,
    ServiceContextInstance
} from '../../Core/serviceContext';
import { useFetch } from '../../Hooks/useFetch';
import { IFetchResult } from '../../Hooks/useFetch.types';
import {
    IconButton,
    Spinner
} from '@fluentui/react';
import {
    HOME_PATH,
    SPINNER_LOADING_DATA_MESSAGE
} from '../../Library/constants';
import { TopGenresCard } from '../TopGenresCard/topGenresCard';

export const TopGenres = (): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const genresData: IFetchResult<string[]> = useFetch<string[]>(() => services.MovieService.GetTopLikedGenres());
    const [genres, setGenres] = useState<string[]>();
    const [areGenresLoaded, setAreGenresLoaded] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();

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
        setTimeout(() => {
            setAreGenresLoaded(true);
        }, 2000)
    }, [genresData]);

    return <div className={containerClassName}>
        {!areGenresLoaded ?
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
                    {genres!.map((g: string, i: number) => <TopGenresCard key={i} genre={g} />)}
                </div>
            </div>
        }
    </div>
};