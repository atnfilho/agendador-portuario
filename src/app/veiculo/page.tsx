'use client';


import BackdropLoader from "@/components/_ui/BackdropLoader";
import Title from "@/components/_ui/Title";
import { TVehicle } from "@/types/TVehicle";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

    const [vehicles, updateVehicles] = useState<TVehicle[]>([]);
    const [loading, updateLoading] = useState(true);

    useEffect(() => {
        getVehicles();
    }, []);

    async function getVehicles() {
        try {
            const response = await axios.get('/api/vehicle?id=1&limit=100');
            updateVehicles(response.data);
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

                <Title>Veículos Cadastrados</Title>

                <div style={{ width: '95%', margin: 'auto', padding: '20px 0 40px' }}>

                    <div style={{ textAlign: 'right' }}>
                        <a href="/veiculo/cadastro">
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
                                    <TableCell sx={{ fontWeight: 'bold' }}>Sigla</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Placa Frontal</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Placa Reboque</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Placa Semireboque</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Qtde Conteineres</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {vehicles.map((item: TVehicle, index: number) => {

                                    const check = <CheckIcon color="success" sx={{ fontSize: '0.8rem' }} />;
                                    const noCheck = <CloseIcon color="error" sx={{ fontSize: '0.8rem' }} />;


                                    const plate_front = item.plate_front ? check : noCheck;
                                    const plate_trailer = item.plate_trailer ? check : noCheck;
                                    const plate_semi_trailer = item.plate_semi_trailer ? check : noCheck;

                                    return (
                                        <TableRow key={index}>
                                            <TableCell sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{item.name}</TableCell>
                                            <TableCell sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{item.code}</TableCell>
                                            <TableCell align="center" sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{plate_front}</TableCell>
                                            <TableCell align="center" sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{plate_trailer}</TableCell>
                                            <TableCell align="center" sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{plate_semi_trailer}</TableCell>
                                            <TableCell align="center" sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{item.container_quantity}</TableCell>
                                        </TableRow>

                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>

            </div>
        </>
    )
}
