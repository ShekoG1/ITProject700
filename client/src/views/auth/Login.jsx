import FilledBtn from "../../components/FilledBtn";
import PinInput from "../../components/PinInput";

export default function Login(){
    const myAction = ()=>{
        alert("Clicked")
    };

    return(
        <>
            {/* <FilledBtn label={"ClickMe"} onClick={myAction}/> */}
            <PinInput pinCount={4} />
        </>
    );
}