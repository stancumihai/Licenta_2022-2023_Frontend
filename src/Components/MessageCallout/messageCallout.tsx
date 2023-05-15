import { Callout } from 'office-ui-fabric-react';
import { calloutStyles } from './messageCallout.styles';
import { IMessageCalloutProps } from './messageCallout.types';

export const MessageCallout = (props: IMessageCalloutProps): JSX.Element => {

    return <Callout styles={{ calloutMain: { borderRadius: '10px' } }}
        className={calloutStyles.callout}
        role="dialog"
        onDismiss={() => props.setIsCalloutVisible(false)}
        setInitialFocus>
        <h1 className={calloutStyles.title}>
            {props.notificationTitle}
        </h1>
        <h3 className={calloutStyles.message} >{props.notificationMessage}</h3>
    </Callout>
};