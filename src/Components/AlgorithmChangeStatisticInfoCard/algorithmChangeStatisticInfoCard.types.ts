import { IAlgorithmChangeCreate } from '../../Models/AlgorithmChange/IAlgorithmChangeCreate';
import { IAlgorithmChangeRead } from '../../Models/AlgorithmChange/IAlgorithmChangeRead';

export interface IAlgorithmChangeStatisticInfoCardProps {
    algorithmChanges: IAlgorithmChangeRead[] | IAlgorithmChangeCreate[];
};