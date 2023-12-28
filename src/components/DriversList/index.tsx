'use client';

import BackdropLoader from '@/components/_ui/BackdropLoader';
import Title from '@/components/_ui/Title';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import SetDynamicRoute from '../SetDynamicRoute';

export default function DriversList() {

    const [loading, updateLoading] = useState(false);
    const { data: session } = useSession();


    return (
        <>
            <BackdropLoader open={loading} />
            <SetDynamicRoute />

            <div style={{ background: '#fff' }}>

                <Title>Motoristas Cadastrados</Title>

                <div style={{ width: '95%', margin: 'auto', padding: '20px 0 40px' }}>

                    <Register isAuthorized={ session?.roles?.includes('Administrator') } />

                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>CPF</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Validade CNH</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

            </div>
        </>
    )
}



type Props = {
    isAuthorized: boolean | undefined
}

function Register({ isAuthorized }: Props) {

    if (!isAuthorized) {
        return <></>
    }

    return (
        <div style={{ textAlign: 'right' }}>
            <a href="/motorista/cadastro">
                <Tooltip title="Adicionar" placement="right">
                    <IconButton color="primary" sx={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </a>
        </div>
    )
}