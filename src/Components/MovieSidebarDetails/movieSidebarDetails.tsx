import { Rating, RatingSize } from '@fluentui/react';
import { IconContext } from 'react-icons/lib';
import {
    additionalInfoClassName,
    detailSpanTitleClassName,
    detailsSidebarClassName,
    iconClassName,
    imageClassName,
    listClassName,
    listItemClassName,
    movieDetailsContainerClassName
} from './movieSidebarDetails.styles';
import { FcDvdLogo } from "react-icons/fc";
import { BiDisc } from "react-icons/bi";
import { IMovieSidebarDetailsProps } from './movieSidebarDetails.types';
import { ratingStyles } from '../MovieWrapper/movieWrapper.styles';
import {
    NavigateFunction,
    useNavigate
} from 'react-router';
import { HOME_PATH } from '../../Library/constants';

export const MovieSidebarDetails = (props: IMovieSidebarDetailsProps): JSX.Element => {
    const navigate: NavigateFunction = useNavigate();

    const getNormalizedRating = (): number => {
        return props.movieRating / 10 * 5;
    };

    return <div className={detailsSidebarClassName}>
        <img onClick={() => { navigate(HOME_PATH); }} className={imageClassName} src={props.imageSource} alt='Loading'></img>
        <div className={movieDetailsContainerClassName}>
            <ul className={listClassName}>
                <IconContext.Provider
                    value={{ style: { marginBottom: '10px' }, color: '#888', size: '25px', }}>
                    <li className={listItemClassName}>
                        <span className={detailSpanTitleClassName}>Media</span>
                        <FcDvdLogo />
                        <BiDisc className={iconClassName} />
                    </li>
                    <li className={listItemClassName}>
                        <span className={detailSpanTitleClassName}>Subtitles</span>
                        <div className={additionalInfoClassName}>
                            <span>Bulgarian, German, French, Hungarian</span>
                        </div>
                    </li>
                    <li className={listItemClassName}>
                        <span className={detailSpanTitleClassName}>Languge</span>
                        <div className={additionalInfoClassName}>
                            <span >English</span>
                        </div>
                    </li>
                    <li className={listItemClassName}>
                        <span className={detailSpanTitleClassName}>Average Rating</span>
                        <div className={additionalInfoClassName}>
                            <Rating max={5}
                                readOnly={true}
                                styles={ratingStyles}
                                size={RatingSize.Large}
                                rating={getNormalizedRating()}
                                ariaLabel="Large stars"
                                ariaLabelFormat="{0} of {1} stars"
                                allowZeroStars
                            />
                        </div>
                    </li>
                    <li className={listItemClassName}>
                        <span className={detailSpanTitleClassName}>Votes Count</span>
                        <div className={additionalInfoClassName}>
                            <span >{props.votesNumber}</span>
                        </div>
                    </li>
                </IconContext.Provider>
            </ul>
        </div>
    </div>
};