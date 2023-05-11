/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react';
import './sideBarTest.css'

export const NavbarTest = (): JSX.Element => {
    const doSth = () => {
        const menuToggle = document.querySelector('.toggle');
        const navigation = document.querySelector('.navigation');

        if (menuToggle && navigation instanceof HTMLElement) {
            (menuToggle as HTMLElement).onclick = function () {
                menuToggle.classList.toggle('active');
                navigation.classList.toggle('active');
            }
        }
        const list: NodeListOf<Element> = document.querySelectorAll('.list');
        for (let i: number = 0; i < list.length; i++) {
            if (list[i] instanceof HTMLElement) {
                const element: HTMLElement = list[i] as HTMLElement;
                element.onclick = function () {
                    let j: number = 0;
                    while (j < list.length) {
                        list[j++].className = 'list';
                    }
                    element.className = 'list active';
                }
            }
        }
    };

    useEffect(() => {
        doSth();
    });

    return <div className='container' >
        <div className='navigation'>
            <ul>
                <li className='list active'>
                    {/* <b></b>
                    <b></b> */}
                    <a href='#'>
                        <span className='icon'>ICON</span>
                        <span className='title'> Home</span>
                    </a>
                </li>
                <li className='list'>
                    {/* <b></b>
                    <b></b> */}
                    <a href="#">
                        <span className='icon'>ICON</span>
                        <span className='title'>  Profile</span>
                    </a>
                </li>
                <li className='list'>
                    {/* <b></b>
                    <b></b> */}
                    <a href="#">
                        <span className='icon'>ICON</span>
                        <span className='title'>  Messages</span>
                    </a>
                </li>
                <li className='list'>
                    {/* <b></b>
                    <b></b> */}
                    <a href="#">
                        <span className='icon'>ICON</span>
                        <span className='title'> Setting</span>
                    </a>
                </li>
            </ul>
        </div>
        <div className='toggle'></div>
    </div>
};