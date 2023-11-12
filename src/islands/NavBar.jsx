import NavBtn from "../components/NavBtn";
import FilledBtn from "../components/FilledBtn";
import "./../lib/style/nav.css";
import React, { useState ,useEffect,useRef,number} from 'react';
import logOut from "./../util/logout";
import validateUser from './../util/auth';

export default function NavBar(props) {
  validateUser();
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(width <= 1024);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const navWidget = <>
    <NavBtn highlight={props.highlight} href="/Dashboard" text="Dashboard" />
    <NavBtn highlight={props.highlight} href="/Academics" text="Academics" />
    <NavBtn highlight={props.highlight} href="/Finances" text="Finances" />
    <NavBtn highlight={props.highlight} href="/StudentInfo" text="Student Info" />
    <hr />
    {isMobile ? <div id="logout-container">
      <FilledBtn onClick={()=>logOut()} label="Log Out"/>
    </div> : <></>}
  </>

  const navItemsListRef = useRef(null); // Ref for the nav-items-list

  // Events
  const toggleMobileNav = (e) => {
    setShowMobileNav(!showMobileNav);
  };

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
    setIsMobile(width <= 1024);
  };

  const scrollLeft = () => {
    if (navItemsListRef.current) {
      navItemsListRef.current.scrollLeft -= 100; // Adjust the scroll distance as needed
    }
  };

  const scrollRight = () => {
    if (navItemsListRef.current) {
      navItemsListRef.current.scrollLeft += 100; // Adjust the scroll distance as needed
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return (
    <>
      <nav>
        {!isMobile ? (
          <div id="nav-items-container">
            <button onClick={scrollLeft}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
            </button>
            <div id="nav-items-list" ref={navItemsListRef}>
              {navWidget}
            </div>
            <button onClick={scrollRight}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
          </div>
        ) : null}
        {!isMobile ? null : (
            <div id="nav-toggle-custom-icon" onClick={toggleMobileNav}>
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
        )}
        <div id="logo">
          <span >RICHFIELD</span>
        </div>
        {isMobile ? null :
          <div id="logout-container">
            <FilledBtn onClick={()=>logOut()} label="Log Out"/>
          </div>
        }
      </nav>
      {isMobile ? (
        <div id="nav-items-container" className={showMobileNav ? 'md-active' : 'md-hide'}>
          <div id="nav-items-list">
            {navWidget}
          </div>
        </div>
      ) : null}
    </>
  );
}
