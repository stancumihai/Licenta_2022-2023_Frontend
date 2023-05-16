export interface IButtonCardProps {
    text: string;
    onClick: () => void;
    count?: number;
    iconName?: string;
    leftMargin?: boolean;
    mainTextClassName?: string;
    id: string;
};