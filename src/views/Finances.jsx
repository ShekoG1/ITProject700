import { useState,useEffect } from "react";
import Finance_FeeDetail from "../islands/Finance_FeeDetail";
import Finance_AgeAnalysis from "../islands/Finance_AgeAnalysis";
import Finance_BursaryDetail from "../islands/Finance_BursaryDetail";
import Finance_DepositDetail from "../islands/Finance_DepositDetail";
import "./../lib/style/finances.css";
import { createClient } from '@supabase/supabase-js';

export default function Finances(){

    // All select option string use underscores for spaces and are always lower cased
    const [selectedOption, setSelectedOption] = useState("fee_detail");
    let widget = null;

    const [wait,setWait] = useState(true)
    const[finance,setFinance]= useState(null);

    useEffect(() => {
        const fetchSupabaseData = async () => {
          const supabase = createClient(
            process.env.REACT_APP_SUPABASE_URL,
            process.env.REACT_APP_SUPABASE_KEY
          );
    
          try {
            const { data, error } = await supabase
              .from('studentFinance')
              .select(`*`)
              .eq('studentNumber',localStorage.getItem('studentNumber'));
            if (error) {
                setWait(true);
                console.log(error)
            } else {
                console.log(data)
                setFinance(data);
                setWait(false);
            }
          } catch (error) {
            setWait(true);
            console.log(error)
          }
        };
    
        fetchSupabaseData();
      }, []);

    // Determine widget to show
    switch (selectedOption) {
        case "fee_detail":
            widget = <Finance_FeeDetail financeData={finance}/>;
        break;
        case "age_analysis":
            widget = <Finance_AgeAnalysis/>
        break;
        case "deposit_detail":
            widget = <Finance_DepositDetail/>
        break;
        case "bursary_detail":
            widget = <Finance_BursaryDetail/>
        break;
    
        default:
            widget = <>
                <h1>Oops...Something went wrong!</h1>
                <p>An error occured while loading the page content. Please conact your administrator or try again later.</p>
            </>
            break;
    }

    return (
        <div id="finances">
            <div id="view-options">
                <button onClick={()=>{setSelectedOption("fee_detail");}} className={selectedOption === "fee_detail" ? "option option-selected":"option"}>Fee Detail</button>
                <button onClick={()=>{setSelectedOption("age_analysis");}} className={selectedOption === "age_analysis" ? "option option-selected":"option"}>Age Analysis</button>
                <button onClick={()=>{setSelectedOption("deposit_detail");}} className={selectedOption === "deposit_detail" ? "option option-selected":"option"}>Deposit Detail</button>
                <button onClick={()=>{setSelectedOption("bursary_detail");}} className={selectedOption === "bursary_detail" ? "option option-selected":"option"}>Bursary Detail</button>
            </div>
            <div id="finance-content">
                {
                    wait ? "Loading...":
                    widget
                }
            </div>
        </div>
    );
}
