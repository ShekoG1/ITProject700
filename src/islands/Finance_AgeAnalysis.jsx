import validateUser from './../util/auth';
import DataTable from 'react-data-table-component';

export default function Finance_AgeAnalysis(){

    const columns = [
        {
            name: '160',
            selector: row => row.term_160,
        },
        {
            name: '90',
            selector: row => row.term_90,
        },
        {
            name: '60',
            selector: row => row.term_60,
        },
        {
            name: '30',
            selector: row => row.term_30,
        },
        {
            name: 'Current',
            selector: row => row.current,
        },
        {
            name: 'Credit',
            selector: row => row.credit,
        },
        {
            name: 'Future',
            selector: row => row.future,
        },
        {
            name: 'Unallocated',
            selector: row => row.unallocated,
        },
        {
            name: 'Balance',
            selector: row => row.balance,
        },

    ];
    
    const data = [
        {
            id: 1,
            term_160: 3501.00,
            term_90: 0.00,
            term_60: 0.00,
            term_30: 0.00,
            current: 0.00,
            credit: 0.00,
            future: 4173,
            unallocated: 0.00,
            balance: 7674.00
        }
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