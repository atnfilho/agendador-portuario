import { Backdrop, CircularProgress } from "@mui/material";

type Props = {
    open: boolean
}

export default function BackdropLoader({ open }: Props) {
    return (
        <>
            <Backdrop open={open} sx={{ zIndex: 99999 }}>
                <CircularProgress style={{ color: '#fff' }} />
            </Backdrop>
        </>
    )
}