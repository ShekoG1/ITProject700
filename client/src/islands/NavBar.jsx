import NavBtn from "../components/NavBtn";
import Login from "../views/auth/Login";
import Academics from "../views/Academics"
import Dashboard from "../views/Dashboard";
import Finances from "../views/Finances";
import StudentDetails from "../views/StudentDetails";
import "./../lib/style/nav.css";

export default function NavBar(props){

    /*
        Required:
        - Highlight item (int)
    */

    return(
        <nav>
            <div id="nav-items-container">
                <div id="nav-toggle-custom-icon">

                </div>
                <div id="nav-items-list">
                    <NavBtn highlight={props.highlight} href="#" text="Dashboard"/>
                    <NavBtn highlight={props.highlight} href="#" text="Academics"/>
                    <NavBtn highlight={props.highlight} href="#" text="Finances"/>
                    <NavBtn highlight={props.highlight} href="#" text="Academics"/>
                </div>
            </div>
            <div id="logo">
                RICHFIELD
            </div>
        </nav>
    );
}