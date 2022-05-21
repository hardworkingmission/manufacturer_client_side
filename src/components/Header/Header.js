import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignIn } from '@fortawesome/free-solid-svg-icons'
import CustomLink from '../CustomLink/CustomLink';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import logo from '../../images/laptop_inventory.png'



const Header = () => {
    const [user, loading, error] = useAuthState(auth);
    return (
     
        <nav className="
            relative
            w-5/6
            mx-auto
            flex flex-wrap
            items-center
            justify-between
            py-4
            bg-white
            text-gray-500
            hover:text-gray-700
            focus:text-gray-700
            navbar navbar-expand-lg navbar-light
            ">
                <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
                    <button className="
                        navbar-toggler
                        text-gray-500
                        border-0
                        hover:shadow-none hover:no-underline
                        py-2
                        px-2.5
                        bg-transparent
                        focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
                    " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars"
                    className="w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor"
                        d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z">
                    </path>
                    </svg>
                    </button>
                    <div className="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent">
                        <Link className="" to={'/'}>
                            <img src={logo} alt="" className='h-[80px]'/>
                        </Link>
                        {/* <!-- Left links --> */}
                        {
                            user?.uid&&(
                            <ul className="navbar-nav flex flex-col justify-center pl-0 list-style-none mx-auto text-pink-600">
                                <li className="nav-item px-2  my-3 md:m-0">
                                    <CustomLink className="nav-link active" to={'/manageitems'}>
                                        Manage items
                                    </CustomLink>
                                </li>
                                <li className="nav-item px-2 mb-3 md:m-0">
                                    <CustomLink className="nav-link active" aria-current="page" to={'/additem'}>Add Item</CustomLink>
                                </li>
                                <li className="nav-item px-2 mb-3 md:m-0">
                                    <CustomLink className="nav-link active" aria-current="page" to={'/myitems'}>My Items</CustomLink>
                                </li>
                                <li className="nav-item px-2 mb-3 md:m-0">
                                    <CustomLink className="nav-link active" aria-current="page" to={'/mynotes'}>My Notes</CustomLink>
                                </li>
                            </ul>
                            )
                        }
                        {/* <!-- Left links --> */}
                        {/* Right links */}
                        <ul className="navbar-nav flex flex-col pl-0 list-style-none ml-auto text-pink-600">

                            <li className="nav-item px-2 mb-3 md:m-0">
                                <CustomLink className="nav-link active" aria-current="page" to={'/blogs'}>Blogs</CustomLink>
                            </li>
                            <li className="nav-item px-2  mb-3 md:m-0 flex items-center"> 
                                    {
                                        user?.uid&&(
                                            <div className='h-[35px] w-[35px] rounded-[50%] border border-2 flex justify-center items-center mr-2 bg-gray-300 text-white'> {user.displayName?.slice(0,1).toUpperCase()}</div>
                                        )
                                    
                                    }
                                
                                {
                                    user?.uid?<button className='bg-gray-300 text-black font-bold py-1 px-2 rounded' onClick={()=>signOut(auth)}>Logout</button>:
                                    <CustomLink className="nav-link py-2 px-2  text-white" aria-current="page" to={'/login'} >
                                    LogIn
                                    <FontAwesomeIcon className='ml-1' icon={faSignIn}/>
                                </CustomLink>
                                }
                                
                            </li>
                        
                        </ul>
                        {/* Right Links */}
                    </div>
                    {/* <!-- Collapsible wrapper --> */}
                </div>
        </nav>


    );
};

export default Header;