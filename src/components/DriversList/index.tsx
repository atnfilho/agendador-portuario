'use client';

import { formataDataPadraoBR } from '@/commom/formatters';
import { cpfMask } from '@/commom/masks';
import BackdropLoader from '@/components/_ui/BackdropLoader';
import Title from '@/components/_ui/Title';
import api from '@/service/api';
import { TDriver } from '@/types/TDriver';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import SetDynamicRoute from '../SetDynamicRoute';

export default function DriversList() {

    const [drivers, updateDrivers] = useState<Array<TDriver>>([])
    const [loading, updateLoading] = useState(true);
    const { data: session } = useSession();

    const isAuthorized = session?.roles?.includes('Administrator');

    useEffect(() => {
        getMotivations();
    }, []);

    async function getMotivations() {
        try {
            const response = await api.get('/driver');
            updateDrivers(response.data.items);
        } catch (error) {
            console.log(error);
        } finally {
            updateLoading(false);
        }
    }


    return (
        <>
            <BackdropLoader open={loading} />
            <SetDynamicRoute />

            <div style={{ background: '#fff' }}>

                <Title>Motoristas Cadastrados</Title>

                <div style={{ width: '95%', margin: 'auto', padding: '20px 0 40px' }}>

                    <Register isAuthorized={isAuthorized} />

                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold' }}>CPF</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold' }}>Data de Nascimento</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold' }}>Nº CNH</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold' }}>Validade CNH</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {drivers.map((item: TDriver, index: number) => (
                                    <TableRow key={item.code}>
                                        <TableCell sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{item.name}</TableCell>
                                        <TableCell align='center' sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{cpfMask(item.code)}</TableCell>
                                        <TableCell align='center' sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{formataDataPadraoBR(item.birth)}</TableCell>
                                        <TableCell align='center' sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{item.cnh}</TableCell>
                                        <TableCell align='center' sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{formataDataPadraoBR(item.cnhValidate)}</TableCell>
                                        <TableCell sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>
                                            {isAuthorized &&
                                                <Tooltip title="Editar">
                                                    <a href={`/motorista/${item.id}`}>
                                                        <EditIcon color='primary' style={{ fontSize: '20px' }} />
                                                    </a>
                                                </Tooltip>}
                                        </TableCell>
                                    </TableRow>

                                ))}
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