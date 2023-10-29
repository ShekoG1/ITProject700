
export default function ExamResultCard(props){

    var result = props.result;
    var resultMarkup;

    switch (result) {
        case "fail":
            resultMarkup = <span className={result+"-text"}>FAILED</span>
        break;
        case "pass-warning":
            resultMarkup = <span className={result+"-text"}>PASS</span>
        break;
        case "pass-safe":
            resultMarkup = <span className={result+"-text"}>PASS</span>
        break;
        case "pass":
            resultMarkup = <span className={result+"-text"}>PASS</span>
        break;
        case "pass-distinction":
            resultMarkup = <span className={result+"-text"}>PASS</span>
        break;
    
        default:
            resultMarkup = <span className={result+"-text"}>PASS DISTINCTION</span>
            break;
    }

    return(
        <div className={"card " + result + "-border"}>
            <div className="subject">
                Subject: <span>{props.subject}</span>
            </div>
            <div className="card-content">
                <table>
                    <tbody>
                        <tr>
                            {/* Heading */}
                            <td>Examination Month</td>
                            {/* Value */}
                            <td> {props.examMonth} </td>
                        </tr>

                        <tr>
                            {/* Heading */}
                            <td>Half Period Mark</td>
                            {/* Value */}
                            <td> {props.halfPeriodMark ? props.halfPeriodMark : null} </td>
                        </tr>

                        <tr>
                            {/* Heading */}
                            <td>Full Period Mark</td>
                            {/* Value */}
                            <td> {props.fullPeriodMark ? props.fullPeriodMark : null} </td>
                        </tr>

                        <tr>
                            {/* Heading */}
                            <td>Final Mark</td>
                            {/* Value */}
                            <td> {props.finalMark ? props.finalMark : null} </td>
                        </tr>

                        <tr>
                            {/* Heading */}
                            <td>Result</td>
                            {/* Value */}
                            <td> {resultMarkup} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}