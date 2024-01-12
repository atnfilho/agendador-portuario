'use client';

import { formataDataHoraPadraoBR } from '@/commom/formatters';
import InfoIcon from '@mui/icons-material/Info';
import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';
import NoDataComponent from './NoDataComponent';

// A super simple expandable component.
// const ExpandedComponent = ({ data }: any) => <pre>{JSON.stringify(data, null, 2)}</pre>;

//  Internally, customStyles will deep merges your customStyles with the default styling.
const customStyles = {
    rows: {
        style: {
            // minHeight: '72px', // override the row height
            fontSize: '25px'
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            fontWeight: 'bold'
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px'
        },
    },
};

const paginationComponentOptions = {
    rowsPerPageText: 'Linhas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};


const columns = [
    {
        name: 'Início',
        selector: (row: any) => row.schedule_window_start,
        sortable: true,
        width: '150px',
        cell: (row: any) => <div style={{ fontSize: 14 }}>{new Date(row.schedule_window_start).toLocaleDateString('pt-br', { hour: 'numeric', minute: 'numeric' })}</div>
    },
    {
        name: 'Fim',
        selector: (row: any) => row.schedule_window_end,
        sortable: true,
        width: '150px',
        cell: (row: any) => <div style={{ fontSize: 14 }}>{new Date(row.schedule_window_end).toLocaleDateString('pt-br', { hour: 'numeric', minute: 'numeric' })}</div>
    },
    {
        name: 'Pátio',
        selector: (row: any) => row.yard.id,
        sortable: true,
        wrap: true,
        cell: (row: any) => <div style={{ fontSize: 14 }}>{row.yard.name}</div>
    },
    {
        name: 'Veículo',
        selector: (row: any) => row.vehicle_type.code,
        sortable: true,
        wrap: true,
        cell: (row: any) => <div style={{ fontSize: 14 }}>{`(${row.vehicle_type.code}) ${row.vehicle_type.name}`}</div>
    },
    {
        name: 'Motivação',
        selector: (row: any) => row.motivation.code,
        sortable: true,
        wrap: true,
        cell: (row: any) => <div style={{ fontSize: 14 }}>{`(${row.motivation.code}) ${row.motivation.name}`}</div>
    },
    {
        name: 'Transportadora',
        selector: (row: any) => row.transporter?.name,
        sortable: true,
        cell: (row: any) => <div style={{ fontSize: 14 }}>{row.transporter?.name}</div>
    },
    {
        name: '',
        cell: (row: any) => <div>
            <a href={`/agendamento/${row.id}`}>
                <InfoIcon color='primary' style={{ cursor: 'pointer' }} /> {row.id}
            </a>
        </div>
    }
];






export default function DataTableComponent({ data, loading }: any) {

    const [filterText, setFilterText] = useState('');
    const filteredItems = data.filter(
        (item: any) => {

            const dataInicioFormatada = formataDataHoraPadraoBR(item.schedule_window_start);
            const dataFimFormatada = formataDataHoraPadraoBR(item.schedule_window_end);

            return dataInicioFormatada && dataInicioFormatada.includes(filterText.toLowerCase())
                || dataFimFormatada && dataFimFormatada.toLowerCase().includes(filterText.toLowerCase())
                || item.motivation.name && item.motivation.name.toLowerCase().includes(filterText.toLowerCase())
                || item.yard.name && item.yard.name.toLowerCase().includes(filterText.toLowerCase())
                || item.transporter?.name && item.transporter?.name.toLowerCase().includes(filterText.toLowerCase())
        }
    );


    const subHeaderComponentMemo = useMemo(() => {
        return (
            <FilterComponent onFilter={(e: any) => setFilterText(e.target.value)} filterText={filterText} loading={loading} />
        );
    }, [filterText, loading]);


    return (
        <DataTable
            columns={columns}
            data={filteredItems}
            // selectableRows
            // expandableRows
            // expandableRowsComponent={ExpandedComponent}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            customStyles={customStyles}
            dense
            highlightOnHover
            progressPending={loading}
            progressComponent={<></>}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            noDataComponent={<NoDataComponent />}
        />
    );
};

