import React from 'react';
import { Link } from 'react-router-dom';
import Ligh_brown from '../../images/Light-brown.png'


const Header = () => {

    return (
        <div className='w-full md:flex relative'>
                <nav class="
                    relative
                    w-5/6
                    mx-auto
                    flex flex-wrap
                    items-center
                    justify-between
                    py-4
                    bg-white
                    text-[#BF7506]
                    focus:text-gray-700
                    navbar navbar-expand-lg navbar-light
                    ">
                <div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
                <button class="
                    navbar-toggler
                    text-[#BF7506]
                    border-0
                    hover:shadow-none hover:no-underline
                    py-2
                    px-2.5
                    bg-transparent
                    focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
                " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars"
                class="w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor"
                    d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z">
                </path>
                </svg>
                </button>
                <div class="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent">
                <Link class="text-xl text-[#BF7506] font-bold" to={'/'}>Portfolio</Link>
                {/* <!-- Left links --> */}
                <ul class="navbar-nav flex flex-col pl-0 list-style-none ml-auto ">
                    <li class="nav-item px-2 hover:text-gray-500 ">
                        <Link class="nav-link" aria-current="page" to={'/protfolio'}>Portfolio</Link>
                    </li>
                    <li class="nav-item px-2 hover:text-gray-500">
                        <Link class="nav-link" aria-current="page" to={'/aboutme'}>About Me</Link>
                    </li>
                    <li class="nav-item px-2 hover:text-gray-500">
                        <Link class="nav-link" aria-current="page" to={'/contact'}>Contact</Link>
                    </li>
                
                </ul>
                {/* <!-- Left links --> */}
                </div>
                {/* <!-- Collapsible wrapper --> */}
                </div>
                </nav>
        </div>
    );
};

export default Header;