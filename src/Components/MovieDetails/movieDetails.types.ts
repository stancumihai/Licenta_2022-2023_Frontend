import { IMovieRating } from '../../Models/IMovieRating';
import { IPerson } from '../../Models/IPerson';

export interface IMovieDetailsProps {
    moviePersons: IPerson[];
    //movie: IMovie;
    movieRating: IMovieRating;
};

export const overviewExample: string = "Every year in the ruins of what was once North America, the nation of Panem forces each of its twelve districts to send a teenage boy and girl to compete in the Hunger Games. Part twisted entertainment, part government intimidation tactic, the Hunger Games are a nationally televised event in which “Tributes” must fight with one another until one survivor remains. Pitted against highly-trained Tributes who have prepared for these Games their entire lives, Katniss is forced to rely upon her sharp instincts as well as the mentorship of drunken former victor Haymitch Abernathy. If she’s ever to return home to District 12, Katniss must make impossible choices in the arena that weigh survival against humanity and life against love. The world will be watching."