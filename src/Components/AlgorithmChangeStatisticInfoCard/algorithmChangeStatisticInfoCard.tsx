import { IAlgorithmChangeStatisticInfoCardProps } from './algorithmChangeStatisticInfoCard.types';
import { Callout } from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import { useState } from 'react';
import { DirectionalHint } from 'office-ui-fabric-react';
import {
    calloutStyles,
    dataTypeTextClassName,
    informationCardContainerClassName,
    listItemCalloutClassName,
    listItemClassName
    , listItemContainerClassName
} from './algorithmChangeStatisticInfoCard.styles';
import { IAlgorithmChangeRead } from '../../Models/AlgorithmChange/IAlgorithmChangeRead';
import { IAlgorithmChangeCreate } from '../../Models/AlgorithmChange/IAlgorithmChangeCreate';
import { getShortDateAsString } from '../../Library/dateUtils';

export const AlgorithmChangeStatisticInfoCard = (props: IAlgorithmChangeStatisticInfoCardProps): JSX.Element => {
    const [isCalloutVisible, setIsCalloutVisible] = useState<boolean>(false);
    const labelId = useId('callout-label');
    const calloutId = useId('callout-id');

    return <div className={informationCardContainerClassName} >
        <div >
            <p id={calloutId}
                className={dataTypeTextClassName}
                onClick={() => { setIsCalloutVisible(prev => !prev); }}>{'Changes History'}
            </p>
            <ul>
                {props.algorithmChanges.slice(0, 3).map((d, i) => {
                    return <div key={i}
                        className={listItemContainerClassName}>
                        <li className={listItemClassName} >{d.algorithmName} {" -> "} {getShortDateAsString(new Date(d.startDate))}</li>
                        <hr />
                        {isCalloutVisible && <Callout className={calloutStyles.callout}
                            ariaLabelledBy={labelId}
                            directionalHint={DirectionalHint.rightCenter}
                            target={`#${calloutId}`}
                            role="dialog"
                            gapSpace={10}
                            setInitialFocus>
                            <ul>
                                {props.algorithmChanges.map((algorithmChange: IAlgorithmChangeRead | IAlgorithmChangeCreate, i: number) =>
                                    <li key={i} className={listItemCalloutClassName}>{algorithmChange.algorithmName}
                                        {" -> "}
                                        {getShortDateAsString(new Date(algorithmChange.startDate))}</li>)}
                            </ul>
                        </Callout>}
                    </div>
                })}
            </ul>
        </div>
    </div>
};