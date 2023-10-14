import './../lib/style/login.css'

export default function NavBtn(props){

    /*
        Requried:
        - href
        - text

        Optional:
        - onclick
        - returnElement
    */

    const btnClick = (e)=>{
        if(props.onclick){
            props.onclick();
        }
        props.newTab ? window.open(props.href, "_blank") : window.location.href = props.href;
    }

    return(
        <button className="NavBtn" onClick={btnClick}>
            <span>
                {props.text}
            </span>
            <div className="hover"></div>
        </button>
    );
}