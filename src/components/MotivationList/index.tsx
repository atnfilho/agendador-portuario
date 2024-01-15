'use client';

import BackdropLoader from '@/components/_ui/BackdropLoader';
import Title from '@/components/_ui/Title';
import api from '@/service/api';
import { TMotivation } from '@/types/TMotivation';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import SetDynamicRoute from '../SetDynamicRoute';

export default function MotivationList() {

    const [motivations, updateMotivations] = useState<TMotivation[]>([]);
    const [loading, updateLoading] = useState(true);
    const { data: session } = useSession();

    const isAuthorized = session?.roles?.includes('Administrator');

    useEffect(() => {
        getMotivations();
    }, []);

    async function getMotivations() {
        try {
            const response = await api.get('/motivation');
            updateMotivations(response.data.items);
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

                <Title>Motivações Cadastradas</Title>

                <div style={{ width: '95%', margin: 'auto', padding: '20px 0 40px' }}>

                    <Register isAuthorized={isAuthorized} />

                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center' sx={{ fontWeight: 'bold' }}>Sigla</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Descrição</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold' }}>Transportadora</TableCell>
                                    <TableCell align='center'></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {motivations.map((item: TMotivation, index: number) => (
                                    <TableRow key={item.id}>
                                        <TableCell align='center' sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{item.code}</TableCell>
                                        <TableCell sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{item.name}</TableCell>
                                        <TableCell sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{item.description}</TableCell>
                                        <TableCell align='center' sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{item.transporterRequired ? 'SIM' : 'NÃO'}</TableCell>
                                        <TableCell align='center' sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>
                                            {isAuthorized &&
                                                <Tooltip title="Editar">
                                                    <a href={`/motivacao/${item.id}`}>
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
            <a href="/motivacao/cadastro">
                <Tooltip title="Adicionar" placement="right">
                    <IconButton color="primary" sx={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </a>
        </div>
    )
}