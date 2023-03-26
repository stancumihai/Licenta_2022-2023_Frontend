export interface ICustomAlertProps {
    messages: string[];
    handleCloseDialog: () => void,
    isOpen: boolean,
    left?: boolean
};