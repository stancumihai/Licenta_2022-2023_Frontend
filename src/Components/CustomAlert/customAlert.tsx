import { IconButton, Modal } from '@fluentui/react';

import {
    cancelIcon,
    contentStyles,
    customAlertLeftStyles,
    customAlertStyles,
    iconButtonStyles
} from './customAlert.styles';
import { ICustomAlertProps } from './customAlert.types';

export const CustomAlert = (props: ICustomAlertProps): JSX.Element => {

    return <Modal isOpen={props.isOpen}
        onDismiss={props.handleCloseDialog}
        isBlocking={false}
        isModeless={true}
        styles={props.left === true ?
            customAlertLeftStyles :
            customAlertStyles}>
        <div className={contentStyles.header}>
            <IconButton
                styles={iconButtonStyles}
                iconProps={cancelIcon}
                ariaLabel="Close popup modal"
                onClick={props.handleCloseDialog} />
        </div>
        <div className={contentStyles.body}>
            {props.messages.map((message: string, i: number) => {
                return <li key={i}>{message}</li>
            })}
        </div>
    </Modal>
};