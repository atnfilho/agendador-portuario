'use client';

import BackdropLoader from "@/components/_ui/BackdropLoader";
import Title from "@/components/_ui/Title";
import api from "@/service/api";
import SaveIcon from '@mui/icons-material/Save';
import { Alert, Button, FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    id?: number
}


export default function FrotaDaCasaForm({ id }: Props) {

    const router = useRouter();
    const [formData, updateFormData] = useState({ plate: "", plate_position: "" });
    const [loading, updateLoading] = useState(false);
    const [error, updateError] = useState("");


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
                    updateFormData(prevState => ({ plate: response.plate, plate_position: response.plate_position }));

                } catch (error: any) {
                    updateError(`Falha ao obter os dados do veículo. Mensagem: ${error.message}`);
                } finally {
                    updateLoading(false);
                }
            }
            getOwner();
        }
    }, [id]);


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

    return (
        <section style={{ background: '#fff', boxShadow: 'var(--box-shadow)', borderRadius: 'var(--border-radius)' }}>

            <BackdropLoader open={loading} />

            <Title>Cadastro de Frota da Casa</Title>

            <Paper sx={{ p: 3, pb: 1 }}>

                <h3>{id ? "Formulário de Edição" : "Novo Veículo da Frota"}</h3>

                <form action="#" style={{ margin: '40px 0' }} onSubmit={handleSubmit}>

                    <Grid container spacing={3} rowSpacing={3}>

                        <Grid item xs={6} sm={2}>
                            <TextField
                                label="Placa"
                                name="plate"
                                size="small"
                                fullWidth
                                inputProps={{ maxLength: 7, style: { textTransform: 'uppercase' } }}
                                value={formData.plate}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl>
                                <RadioGroup
                                    row
                                    name="plate_position"
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="frontal" control={<Radio checked={formData.plate_position == "FRONTAL"} required/>} label="Frontal" />
                                    <FormControlLabel value="traseira" control={<Radio checked={formData.plate_position == "TRASEIRA"} required/>} label="Traseira" />

                                </RadioGroup>
                            </FormControl>
                        </Grid>



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
