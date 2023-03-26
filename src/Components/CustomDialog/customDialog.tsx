import {
    DefaultButton,
    Dialog,
    DialogFooter,
    DialogType,
} from '@fluentui/react'
import { DialogContent } from 'office-ui-fabric-react';
import {
    acceptedButtonStyles,
    containerClassName,
    dialogContentStyles,
    dialogStyles
} from './customDialog.styles';
import { ICustomDialogProps } from './customDialog.types';

export const CustomDialog = (props: ICustomDialogProps): JSX.Element => {

    const dialogContentProps = {
        type: DialogType.normal,
        title: 'Are you sure you want to logout?',
        closeButtonAriaLabel: 'Close',
        styles: dialogContentStyles
    };

    return <div className={containerClassName}>
        <DialogContent />
        <Dialog hidden={props.isHidden}
            onDismiss={() => props.handleCloseDialog()}
            dialogContentProps={dialogContentProps}
            isBlocking={true}
            isDarkOverlay={false}
            styles={dialogStyles}>
            <DialogFooter>
                <div style={{ marginRight: '2.5vw' }}>
                    <DefaultButton styles={acceptedButtonStyles}
                        onClick={() => props.handleCloseDialog(true)}
                        text={props.acceptedText} />
                    <DefaultButton style={{ marginLeft: '10px', marginTop: '3.5vh' }}
                        onClick={() => props.handleCloseDialog()}
                        text={props.cancelText} />
                </div>
            </DialogFooter>
        </Dialog>
    </div>
}