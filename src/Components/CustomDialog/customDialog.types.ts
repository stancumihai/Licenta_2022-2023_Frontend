export interface ICustomDialogProps {
    handleCloseDialog: (accepted?: boolean) => void;
    isHidden: boolean;
    acceptedText: string;
    cancelText: string;
    mainText: string;
};