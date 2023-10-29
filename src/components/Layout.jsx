import { Outlet,useLocation  } from "react-router-dom"
import NavBar from "./../islands/NavBar"
// import Footer from "./Footer"

export default function Layout() {
    const location = useLocation();

    // Determine current nav link to highlight

    const isAuth = location.pathname === "/" ? null : <NavBar highlight={false} />;
    console.log(location.pathname);
    return (
        <>
            {isAuth}
            <main>                
                <Outlet />
            </main>
            {/* <Footer /> */}
        </>
    )
}