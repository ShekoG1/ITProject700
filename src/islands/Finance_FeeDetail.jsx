import validateUser from './../util/auth';
import DataTable from 'react-data-table-component';

export default function Finance_FeeDetail(){

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
    
    const data = [
        {
            id: 1,
            date: '01-Feb-2021',
            reference: 'CBJ25448',
            description: 'S 402101963 Maharj, M MR',
            debit: "",
            credit: "500",
            balance: "-500"
        },
        {
            id: 2,
            date: '01-Mar-2021',
            reference: 'CBJ25448',
            description: 'S 402101963 Maharj, M MR',
            debit: "",
            credit: "1500",
            balance: "15000"
        },
        {
            id: 3,
            date: '01-Apr-2021',
            reference: 'CBJ25448',
            description: 'S 402101963 Maharj, M MR',
            debit: "",
            credit: "1500",
            balance: "13500"
        },
        {
            id: 4,
            date: '01-May-2021',
            reference: 'CBJ25448',
            description: 'S 402101963 Maharj, M MR',
            debit: "",
            credit: "1500",
            balance: "12000"
        },
        {
            id: 5,
            date: '01-Jun-2021',
            reference: 'CBJ25448',
            description: 'S 402101963 Maharj, M MR',
            debit: "",
            credit: "1500",
            balance: "10500"
        },
    ]

    return (
        <>
        <DataTable
            columns={columns}
            data={data}
            // selectableRows
        />
        </>
    );
}