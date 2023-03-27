import {
    containerClassName,
    mainLogoClassName,
    mainLogoDivClassName,
    mainTextClassName
} from './homePage.styles';
import { Navbar } from '../Navbar/navbar';
import { SideBar } from '../SideBar/sideBar';
import { Logo } from '../Logo/logo';
import { MovieCardsContainer } from '../MovieCardsContainer/movieCardsContainer';
import { Paginator } from '../Paginator/paginator';

export const HomePage = (): JSX.Element => {

    return (
        <div className={containerClassName}>
            <div className={mainLogoDivClassName}>
                <Logo mainLogoClassName={mainLogoClassName}
                    mainTextClassName={mainTextClassName} />
            </div>
            <Navbar />
            <SideBar />
            <MovieCardsContainer />
            <Paginator />
        </div>)
};