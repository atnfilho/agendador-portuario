'use client';


import BackdropLoader from "@/components/_ui/BackdropLoader";
import Title from "@/components/_ui/Title";
import { TYard } from "@/types/TYard";
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function YardList() {

    const [yards, updateYards] = useState<TYard[]>([]);
    const [loading, updateLoading] = useState(true);

    useEffect(() => {
        getYards();
    }, []);

    async function getYards() {
        try {
            const response = await axios.get('/api/yard');
            updateYards(response.data);
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

                <Title>Pátios Cadastrados</Title>

                <div style={{ width: '95%', margin: 'auto', padding: '20px 0 40px' }}>

                    <div style={{ textAlign: 'right' }}>
                        <a href="/patio/cadastro">
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {yards.map((item: TYard, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{item.name}</TableCell>
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