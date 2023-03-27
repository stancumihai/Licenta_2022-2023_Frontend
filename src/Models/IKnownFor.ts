import { IMovie } from './IMovie';
import { IPerson } from './IPerson';

export interface IKnownFor {
    uid?: string;
    movie: IMovie;
    person: IPerson;
};