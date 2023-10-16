import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react";

import './Nav.css'

export default function Nav({setUser, user}) {
    const [navbar, setNavbar] = useState(false);

    const navigate = useNavigate()

    const handleLogout = () =>{
        fetch("/users/signout",{
            method:"DELETE"
        })
        .then((r) => {
            if(r.ok){
                setUser(null)
            }
        })
        navigate("/")
    }

    return (
        <nav className="w-full bg-white shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block navbar-logo">
                        <Link to="/">
                        <span className = "text-uppercase ms-2">Pulse<span style={{color:"orange"}}></span></span>
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}
                    >

                        { user ? (
                    <div className= "navbar-nav mx-auto text-center">
                        <ul className="items-center justify-center space-y-12 md:flex md:space-x-6 md:space-y-0 mt-3 navbar-list">
                            <li className="text-black-600">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="text-black-600">
                                <Link to="/services">Service</Link>
                            </li>
                    <button className = "btn position-relative logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                        </ul>
                 
                    
                    </div>
                ) : (
                    <>
                        <ul className="items-center justify-center space-y-12 md:flex md:space-x-6 md:space-y-0 mt-3 navbar-list">
                            <li className="text-black-600">
                            <Link to="/">Home</Link>
                            </li>
                            <li className="text-black-600">
                            <Link to="/services">Service</Link>
                            </li>
                            <Link to={"/login"} type = "button">
                                 <i className="fa-regular fa-user"></i>
                            </Link>
                        
                        </ul>
                    
                    </>
                )}
                        {/* <ul className="items-center justify-center space-y-12 md:flex md:space-x-6 md:space-y-0 mt-3 navbar-list">
                            <li className="text-black-600">
                            <Link to={"/"} type = "button">Home</Link>
                                                    </li>
                            <li className="text-black-600">
                            <Link to={"/services"} type = "button">Services</Link>
                                                    </li>
                            <Link to={"/login"} type = "button">
                                 <i class="fa-regular fa-user"></i>
                            </Link> */}
                        
                        {/* </ul> */}
                    </div>
                </div>
            </div>
        </nav>
    );
}