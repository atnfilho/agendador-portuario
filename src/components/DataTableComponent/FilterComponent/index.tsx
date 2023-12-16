import { TextField } from "@mui/material";

type Props = {
    filterText: string,
    onFilter: (e: any) => void,
    loading: boolean
}

export default function FilterComponent({ filterText, onFilter, loading }: Props) {

    if(loading) return <></>

    return (
        <>
            <TextField
                id="search"
                type="text"
                placeholder="Filtrar"
                variant="outlined"
                aria-label="Search Input"
                value={filterText}
                onChange={onFilter}
                size="small"
                style={{ fontSize: '0.7rem', width: '300px', margin: '0 0 20px' }}
            />
        </>
    )
};
