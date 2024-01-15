'use client';


import { cepMask, cnpjMask } from "@/commom/masks";
import BackdropLoader from "@/components/_ui/BackdropLoader";
import Title from "@/components/_ui/Title";
import api from "@/service/api";
import { TTransporter } from "@/types/TTransporter";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SetDynamicRoute from "../SetDynamicRoute";

export default function TransporterList() {

    const [transporters, updateTransporters] = useState<TTransporter[]>([]);
    const [loading, updateLoading] = useState(true);
    const { data: session } = useSession();

    const isAuthorized = session?.roles?.includes('Administrator');

    useEffect(() => {
        getTransporters();
    }, []);

    async function getTransporters() {
        try {
            const response = await api.get('/transporter');
            updateTransporters(response.data.items);
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

                <Title>Transportadoras Cadastradas</Title>

                <div style={{ width: '95%', margin: 'auto', padding: '20px 0 40px' }}>

                    <Register isAuthorized={isAuthorized} />

                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>CNPJ</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Razão Social</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Endereço</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>CEP</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Cidade</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transporters.map((item: TTransporter, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{item.name}</TableCell>
                                        <TableCell sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{cnpjMask(item.cnpj)}</TableCell>
                                        <TableCell sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{item.socialrazion}</TableCell>
                                        <TableCell sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{item.address}</TableCell>
                                        <TableCell sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{cepMask(item.cep)}</TableCell>
                                        <TableCell sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{item.city}</TableCell>
                                        <TableCell sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>
                                            {isAuthorized &&
                                                <Tooltip title="Editar">
                                                    <a href={`/transportadora/${item.id}`}>
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
            <a href="/transportadora/cadastro">
                <Tooltip title="Adicionar" placement="right">
                    <IconButton color="primary" sx={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </a>
        </div>
    )
}