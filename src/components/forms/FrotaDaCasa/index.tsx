'use client';

import BackdropLoader from "@/components/_ui/BackdropLoader";
import Title from "@/components/_ui/Title";
import api from "@/service/api";
import { TVehicle } from "@/types/TVehicle";
import SaveIcon from '@mui/icons-material/Save';
import { Alert, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    id?: number
}


export default function FrotaDaCasaForm({ id }: Props) {

    const router = useRouter();
    const [formData, updateFormData] = useState({ type_vehicle: "", vehicle_typeId: null, plate_front: "", plate_trailer: "", plate_semi_trailer: "" });
    const [selectedVehicle, updateSelectedVehicle] = useState<TVehicle>();
    const [loading, updateLoading] = useState(false);
    const [error, updateError] = useState("");
    const [vehicleTypeList, updateVehicleTypeList] = useState<TVehicle[]>([]);

    useEffect(() => {
        const loadSelectOptions = async () => {
            await getVehicleTypeList();
            updateLoading(false);
        }
        loadSelectOptions();
    }, []);

    useEffect(() => {
        if (id) {
            const getOwner = async () => {
                try {
                    updateLoading(true);
                    const response = (await api.get(`/owners/${id}`)).data;

                    if (!response) {
                        updateError(`Nenhum registro encontrado para o identificador ${id}.`);
                        return;
                    }
                    updateFormData(prevState => ({ type_vehicle: response.type_vehicle, vehicle_typeId: response.vehicle_typeId, plate_front: response.plate_front, plate_trailer: response.plate_trailer, plate_semi_trailer: response.plate_semi_trailer }));

                } catch (error: any) {
                    updateError(`Falha ao obter os dados do veículo. Mensagem: ${error.message}`);
                } finally {
                    updateLoading(false);
                }
            }
            getOwner();
        }
    }, [id]);


    useEffect(() => {

        const vehicle: TVehicle | undefined = vehicleTypeList.find((obj: TVehicle) => {
            return obj.id === Number(formData.vehicle_typeId);
        });

        updateSelectedVehicle(vehicle);
        updateFormData(prevState => ({...prevState, plate_front: vehicle?.plate_front ? prevState.plate_front : "", plate_trailer: vehicle?.plate_trailer ? prevState.plate_trailer : "", plate_semi_trailer: vehicle?.plate_semi_trailer ? prevState.plate_semi_trailer : "" }));

    }, [formData.vehicle_typeId, vehicleTypeList])


    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        updateFormData(prevState => ({ ...prevState, [name]: type === 'checkbox' ? checked : String(value).toUpperCase() }));
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await saveOwner();
    }


    const saveOwner = async () => {

        try {
            updateLoading(true);

            id
                ? await api.patch(`/owners/${id}`, { ...formData })
                : await api.post('/owners', { ...formData });

            router.push('/frotadacasa');
        } catch (error: any) {
            updateError(`Falha ao gravar veículo. Mensagem: ${error.message}`);
        } finally {
            updateLoading(false);
        }
    }

    async function getVehicleTypeList() {
        try {
            const response = await api.get('/vehicle_type');
            updateVehicleTypeList(response.data.items);
        } catch (error: any) {
            updateError(`Falha ao obter lista de veículos. Mensagem: ${error.message}`)
            console.log(error);
        }
    }


    return (
        <section style={{ background: '#fff', boxShadow: 'var(--box-shadow)', borderRadius: 'var(--border-radius)' }}>

            <BackdropLoader open={loading} />

            <Title>Cadastro de Frota da Casa</Title>

            <Paper sx={{ p: 3, pb: 1 }}>

                <h3>{id ? "Formulário de Edição" : "Novo Veículo da Frota"}</h3>

                <form action="#" style={{ margin: '20px 0' }} onSubmit={handleSubmit}>

                    <Grid container spacing={2} rowSpacing={3}>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Descrição"
                                name="type_vehicle"
                                size="small"
                                fullWidth
                                inputProps={{ maxLength: 45, style: { textTransform: 'uppercase' } }}
                                value={formData.type_vehicle}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel shrink={!!formData.vehicle_typeId}>Tipo de Veículo</InputLabel>
                                <Select
                                    label="Tipo de Veículo"
                                    name="vehicle_typeId"
                                    value={formData.vehicle_typeId}
                                    notched={!!formData.vehicle_typeId}
                                    required
                                    onChange={handleChange}
                                >
                                    {vehicleTypeList.map((item: TVehicle) => {
                                        return (
                                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>


                        {selectedVehicle?.plate_front && <Grid item xs={3}>
                            <TextField
                                label="Placa Frontal"
                                name="plate_front"
                                size="small"
                                fullWidth
                                inputProps={{ maxLength: 7, style: { textTransform: 'uppercase' } }}
                                onChange={handleChange}
                                value={formData.plate_front}
                                required
                            />
                        </Grid>
                        }

                        {selectedVehicle?.plate_trailer &&
                            <Grid item xs={3}>
                                <TextField
                                    label="Placa Reboque"
                                    name="plate_trailer"
                                    size="small"
                                    fullWidth
                                    inputProps={{ maxLength: 7, style: { textTransform: 'uppercase' } }}
                                    onChange={handleChange}
                                    value={formData.plate_trailer}
                                    required
                                />
                            </Grid>
                        }

                        {selectedVehicle?.plate_semi_trailer && <Grid item xs={3}>
                            <TextField
                                label="Placa Semi Reboque"
                                name="plate_semi_trailer"
                                size="small"
                                fullWidth
                                inputProps={{ maxLength: 7, style: { textTransform: 'uppercase' } }}
                                onChange={handleChange}
                                value={formData.plate_semi_trailer}
                                required
                            />
                        </Grid>}

                        {error &&
                            <Grid item xs={12} style={{ color: "#f00" }}>
                                <Alert severity="error">
                                    {error}
                                </Alert>
                            </Grid>
                        }


                        <Grid item xs={12} style={{ display: 'flex', gap: '20px' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="small"
                                disabled={error !== ""}
                                startIcon={<SaveIcon />}
                            >
                                {id ? "Atualizar" : "Gravar"}
                            </Button>
                            <Button variant="outlined" size="small"><a href="/frotadacasa">Voltar</a></Button>
                        </Grid>


                    </Grid>

                </form>
                {/* <pre>{JSON.stringify(formData, null, 4)}</pre> */}
            </Paper>

        </section>
    )
}
