import { Callout } from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import { IUserDetailCardProps } from '../UserDetails/userDetailTypes';
import {
    calloutStyles,
    countTextClassName,
    dataTypeTextClassName,
    doubleGridItemClassName,
    informationCardContainerClassName,
    listItemCalloutClassName,
    listItemClassName,
    listItemContainerClassName,
    singleGridItemClassName
} from './userInformationCard.styles';
import { useState } from 'react';
import { IMovie } from '../../Models/IMovie';
import { DirectionalHint } from 'office-ui-fabric-react';

export const UserInformationCard = (props: IUserDetailCardProps): JSX.Element => {
    const [isCalloutVisible, setIsCalloutVisible] = useState<boolean>(false);
    const labelId = useId('callout-label');
    const calloutId = useId('callout-id');

    return <div className={informationCardContainerClassName} >
        <div className={singleGridItemClassName}>
            <h2 className={countTextClassName}>{props.movies.length}</h2>
        </div>
        <div className={doubleGridItemClassName}>
            <p id={calloutId} className={dataTypeTextClassName} onClick={() => { setIsCalloutVisible(prev => !prev); }}>{props.text}</p>
            <ul>
                {props.movies.slice(0, 3).map(d => {
                    return <div className={listItemContainerClassName}>
                        <li className={listItemClassName} >{d.title}</li>
                        <hr />
                        {isCalloutVisible && <Callout
                            className={calloutStyles.callout}
                            ariaLabelledBy={labelId}
                            directionalHint={DirectionalHint.rightCenter}
                            target={`#${calloutId}`}
                            role="dialog"
                            gapSpace={10}
                            setInitialFocus>
                            <ul>
                                {props.movies.map((movie: IMovie) => <li className={listItemCalloutClassName}>{movie.title}</li>)}
                            </ul>
                        </Callout>}
                    </div>
                })}
            </ul>
        </div>
    </div>
};