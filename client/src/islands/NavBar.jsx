import NavBtn from "../components/NavBtn";
import Login from "../views/auth/Login";
import Academics from "../views/Academics"
import Dashboard from "../views/Dashboard";
import Finances from "../views/Finances";
import StudentDetails from "../views/StudentDetails";
import "./../lib/style/nav.css";
import React, { useState ,useEffect,number} from 'react';


export default function NavBar(props){

    /*
        Required:
        - Highlight item (int)
    */
    const [width, setWidth] = useState<number>(window.innerWidth);
    const isMobile = width <= 1024;
    // Events
    const toggleMobileNav = (e)=>{
        
    }
    const handleWindowSizeChange = ()=>{
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return(
        <nav>
            <div id="nav-items-container">
                <div id="nav-items-list">
                    <NavBtn highlight={props.highlight} href="#" text="Dashboard"/>
                    <NavBtn highlight={props.highlight} href="#" text="Academics"/>
                    <NavBtn highlight={props.highlight} href="#" text="Finances"/>
                    <NavBtn highlight={props.highlight} href="#" text="Academics"/>
                </div>
            </div>
            <div id="nav-toggle-custom-icon" onClick={toggleMobileNav} >
                <svg className="hb" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" stroke="#eee" strokeWidth=".6" fill="rgba(0,0,0,0)" strokeLinecap="round" style={{cursor: "pointer", width: "50px"}}>
                    <path d="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7">
                        <animate dur="0.2s" attributeName="d" values="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7;M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7" fill="freeze" begin="start.begin" />
                        <animate dur="0.2s" attributeName="d" values="M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7;M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7" fill="freeze" begin="reverse.begin" />
                    </path>
                    <rect width="10" height="10" stroke="none">
                        <animate dur="2s" id="reverse" attributeName="width" begin="click" />
                    </rect>
                    <rect width="10" height="10" stroke="none">
                        <animate dur="0.001s" id="start" attributeName="width" values="10;0" fill="freeze" begin="click" />
                        <animate dur="0.001s" attributeName="width" values="0;10" fill="freeze" begin="reverse.begin" />
                    </rect>
                </svg>
            </div>
            <div id="logo">
                RICHFIELD
            </div>
        </nav>
    );
}