import api from "@/service/api";
import { TOwner } from "@/types/TOwner";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SetDynamicRoute from "../SetDynamicRoute";
import BackdropLoader from "../_ui/BackdropLoader";
import Title from "../_ui/Title";

export default function OwnerList() {

    const [owners, updateOwners] = useState<TOwner[]>([]);
    const [loading, updateLoading] = useState(true);
    const { data: session } = useSession();

    useEffect(() => {
        getOwners();
    }, []);

    async function getOwners() {
        try {
            const response = await api.get('/owners');
            updateOwners(response.data.items);
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

                <Title>Frota da Casa Cadastrada</Title>

                <div style={{ width: '95%', margin: 'auto', padding: '20px 0 40px' }}>

                    <Register isAuthorized={session?.roles?.includes('Administrator')} />

                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Tipo de Veículo</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Modelo</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Código</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Placa Frontal</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Placa Reboque</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Placa Semireboque</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {owners.map((item: TOwner, index: number) => {


                                    return (
                                        <TableRow key={index}>
                                            <TableCell sx={{ background: index % 2 == 0 ? '#fff' : '#ededed', textTransform: 'uppercase' }}>{item.type_vehicle}</TableCell>
                                            <TableCell sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{item.vehicle_type.name}</TableCell>
                                            <TableCell sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{item.vehicle_type.code}</TableCell>
                                            <TableCell align="center" sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{item.plate_front}</TableCell>
                                            <TableCell align="center" sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{item.plate_trailer}</TableCell>
                                            <TableCell align="center" sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>{item.plate_semi_trailer}</TableCell>
                                            <TableCell align="center" sx={{ background: index % 2 == 0 ? '#fff' : '#ededed' }}>
                                                <Tooltip title="Editar">
                                                    <a href={`/frotadacasa/${item.id}`}>
                                                        <EditIcon color='primary' style={{ fontSize: '20px' }} />
                                                    </a>
                                                </Tooltip>
                                            </TableCell>
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



type Props = {
    isAuthorized: boolean | undefined
}

function Register({ isAuthorized }: Props) {

    if (!isAuthorized) {
        return <></>
    }

    return (
        <div style={{ textAlign: 'right' }}>
            <a href="/frotadacasa/cadastro">
                <Tooltip title="Adicionar" placement="right">
                    <IconButton color="primary" sx={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </a>
        </div>
    )
}