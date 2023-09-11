import { useState, useEffect } from "react";
import Image from 'next/image'
import Link from "next/link";

const hideMenu = "items-center hidden justify-between w-full md:flex md:w-auto md:order-1";
const showMenu = "items-center justify-between w-full md:flex md:w-auto md:order-1";

export default function Navbar() {
    const [toggle, setToggle] = useState(false);
    const [isScrollTop, setIsScrollTop] = useState(true);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    const handleScroll = () => {
        let yPosition = window.pageYOffset;
        if (yPosition === 0) {
            setIsScrollTop(true);
        } else {

            setIsScrollTop(false);
        }

    }
    const handleNavClick = () => {
        setToggle(!toggle);
    }
    return <nav className={`${isScrollTop ? "nav-bg-transparent" : "nav-bg-green-600 shadow-md"} px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 `}>
        <div className="container flex flex-wrap items-center justify-between mx-auto">
            <Link href="/" className="flex items-center">
                <Image src="/logo.png" width={99} height={100} alt="Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap "></span>
            </Link>
            <div className="flex md:order-3">
                <Link href="/beck-inventory-test">
                    <button type="button" className="shadow-md uppercase text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 ">Take the Test</button>
                </Link>
                <button data-collapse-toggle="navbar-sticky" onClick={handleNavClick} type="button" className="inline-flex items-center p-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-7 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
            </div>
            <div className={toggle ? showMenu : hideMenu} id="navbar-sticky">
                <ul className="flex flex-col p-5 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-bold">
                    <li>
                        <a href="#" className="block py-3 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0 " aria-current="page">Home</a>
                    </li>
                    <li>
                        <a href="#" className="block py-3 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                    </li>
                    <li>
                        <a href="#" className="block py-3 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
                    </li>
                    <li>
                        <a href="#" className="block py-3 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
}