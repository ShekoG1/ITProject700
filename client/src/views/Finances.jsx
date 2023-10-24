import Finance_FeeDetail from "../islands/Finance_FeeDetail";

export default function Finances(){
    return (
        <div id="finances">
            <div id="view-options">
                <button className="option">Fee Detail</button>
                <button className="option">Age Analysis</button>
                <button className="option">Deposit Detail</button>
                <button className="option">Bursary Detail</button>
            </div>
            {Finance_FeeDetail}
        </div>
    );
}
