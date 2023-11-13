import Image from "next/image";
import logo from "@/public/images/logo.png"

import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs';
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Search from '@/components/Search';
import useMovieList from '@/hooks/useMovieList';
const TOP_OFFSET = 66;

interface NavbarProps {
    index: number | undefined;
}

const Navbar: React.FC<NavbarProps> = ({
    index
}) => {
    const router = useRouter();

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);
    const { data: movies = [] } = useMovieList();
    const indexString = Array.isArray(index) ? index[0] : index;

    const handleLogoClick = () => {
        router.reload(); // Reload the current page
    };
    const [showSearch, setShowSearch] = useState(false);

    const toggleSearch = () => {
        setShowSearch((prevShowSearch) => !prevShowSearch);
    };

    const localImagePaths = [
        '/images/Netflix-avatar1.png',
        '/images/Netflix-avatar2.jpg',
        '/images/Netflix-avatar3.png',
        '/images/Netflix-avatar4.jpg'
      ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
             setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const toogleMobileMenu = useCallback(() => {
       setShowMobileMenu((current) => !current); 
    }, []);

    const toogleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current);
    }, []);
    


    return ( 
        <nav className="w-full fixed z-40 scrollbar-hide">
            <div className={`
                px-4
                md:px-16
                py-6
                flex 
                flex-row
                items-center
                transition
                duration-500
                ${showBackground ? 'bg-zinc-800 bg-opacity-80' : ''}

            `}>
                <Image title='StreamFlix' src={logo} alt="Logo" priority className="lg:h-[36px] lg:w-[11vw] h-[6vw] w-[23vw] sm:h-[4vw] sm:w-[15vw] md:h-[4vw] md:w-[15vw]" onClick={handleLogoClick}/>
                <div
                    className="
                        flex-row
                        ml-8
                        gap-7
                        hidden
                        lg:flex
                    "
                >
                    <NavbarItem label="Home" onClick={handleLogoClick}/>
                    <NavbarItem label="Series"/>
                    <NavbarItem label="Films"/>
                    <NavbarItem label="New & Popular"/>
                    <NavbarItem label="My List"/>
                    <NavbarItem label="Browse by languages"/>
                </div>
                <div onClick={toogleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-4 cursor-pointer relative">
                    <p className="text-white text-[13px]">
                        Browse
                    </p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-0' : '-rotate-90'}`}/>
                    <MobileMenu visible={showMobileMenu}/>
                </div> 
                <div className="flex flex-row ml-auto gap-7 items-center">
                <div className={`navbar-search mt-12 md:mt-7 md:mr-32 lg:mt-6 lg:mr-52 mr-6 ${showSearch ? 'active' : ''}`} style={{ zIndex: showSearch ? 1 : 0 }}>
                    {showSearch && <Search details={movies} />}
                </div>
                    <div className="text-gray-200 flex hover:text-gray-300 cursor-pointer gap-2" onClick={toggleSearch}>
                        <BsSearch />
                    </div>
                    
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
                        <BsBell />
                    </div>
                    <div onClick={toogleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-lg overflow-hidden">
                        <Image src={localImagePaths[indexString - 1]} alt="Avatar" width={50} height={50}/>
                        </div>
                        <AccountMenu visible={showAccountMenu} index={index}/>
                    </div>
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;