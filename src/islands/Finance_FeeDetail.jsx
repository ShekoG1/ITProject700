import validateUser from './../util/auth';
import DataTable from 'react-data-table-component';
import { usePDF } from "react-to-pdf";

export default function Finance_FeeDetail(props){

    const financeData = props.financeData;
    const { toPDF, targetRef } = usePDF({filename: 'FeeDetail.pdf'});

    console.log(financeData
        )

    const columns = [
        {
            name: 'Date',
            selector: row => row.date,
            sortable:true
        },
        {
            name: 'Reference',
            selector: row => row.reference,
        },
        {
            name: 'Description',
            selector: row => row.description,
        },
        {
            name: 'Debit',
            selector: row => row.debit,
        },
        {
            name: 'Credit',
            selector: row => row.credit,
        },
        {
            name: 'Balance',
            selector: row => row.balance,
        },
    ];
    
    // Transform financeData to match the format of the 'data' variable
    const data = financeData.map(item => ({
        id: item.id,
        date: new Date(item.createdAt).toLocaleDateString(),
        reference: item.ref,
        description: item.description,
        debit: item.amount_paid > 0 ? "" : item.amount_paid.toString(),
        credit: item.amount_paid > 0 ? item.amount_paid.toString() : "",
        balance: item.balance.toString()
    }));

    return (
        <>
        <div id="fetail-table">
            <div id="finance-tools">
                <button onClick={() => {toPDF()}}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                    </span>
                    <span>Download</span>
                </button>
                <button onClick={()=>window.print()}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
                            <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
                            <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
                        </svg>
                    </span>
                    <span>Print</span>
                </button>
            </div>
            <div id="table" ref={targetRef}>
                <div id="pdf-title">
                    <h1>Richfield<br/><span style={{fontSize:'20px'}}>Graduate Institute of Technology</span></h1>
                    <h2>Fee Detail</h2>
                </div>
                <p>Student Number: <span>{localStorage.getItem('studentNumber')}</span></p>
                <DataTable
                    columns={columns}
                    data={data}
                    // selectableRows
                />
            </div>
        </div>
        </>
    );
}