'use client';


import { cepMask, cnpjMask } from "@/commom/masks";
import BackdropLoader from "@/components/_ui/BackdropLoader";
import Title from "@/components/_ui/Title";
import { TTransporter } from "@/types/TTransporter";
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TransporterList() {

    const [transporters, updateTransporters] = useState<TTransporter[]>([]);
    const [loading, updateLoading] = useState(true);

    useEffect(() => {
        getTransporters();
    }, []);

    async function getTransporters() {
        try {
            const response = await axios.get('/api/transporter');
            updateTransporters(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            updateLoading(false);
        }
    }


    return (
        <>
            <BackdropLoader open={loading} />

            <div style={{ background: '#fff' }}>

                <Title>Transportadoras Cadastradas</Title>

                <div style={{ width: '95%', margin: 'auto', padding: '20px 0 40px' }}>

                    <div style={{ textAlign: 'right' }}>
                        <a href="/transportadora/cadastro">
                            <Tooltip title="Adicionar" placement="right">
                                <IconButton color="primary" sx={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        </a>
                    </div>

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