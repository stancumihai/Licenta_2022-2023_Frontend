import { IButtonStyles } from '@fluentui/react';
import { IDialogStyles } from 'office-ui-fabric-react';

export interface ICustomDialogProps {
    handleCloseDialog: (accepted?: boolean) => void;
    isHidden: boolean;
    acceptedText: string;
    cancelText: string;
    mainText: string;
    dialogStyles?: Partial<IDialogStyles>;
    acceptedButtonStyles?: Partial<IButtonStyles>;
};