'use client';

import BackdropLoader from "@/components/_ui/BackdropLoader";
import Title from "@/components/_ui/Title";
import api from "@/service/api";
import SaveIcon from '@mui/icons-material/Save';
import { Alert, Button, Checkbox, FormControlLabel, FormGroup, Grid, Paper, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    id?: number
}

export default function VeiculoForm({ id }: Props) {

    const router = useRouter();
    const [formData, updateFormData] = useState({ name: '', code: '', plate_front: false, plate_trailer: false, plate_semi_trailer: false, container_quantity: 0 });
    const [loading, updateLoading] = useState(false);
    const [error, updateError] = useState("");

    useEffect(() => {
        if (id) {
            const getVehicle = async () => {
                try {
                    updateLoading(true);
                    const response = (await api.get(`/vehicle_type/${id}`)).data;

                    if (!response) {
                        updateError(`Nenhum registro encontrado para o identificador ${id}.`);
                        return;
                    }

                    updateFormData({ name: response.name, code: response.code, plate_front: response.plate_front, plate_trailer: response.plate_trailer, plate_semi_trailer: response.plate_semi_trailer, container_quantity: response.container_quantity })
                } catch (error: any) {
                    updateError(`Falha ao obter os dados do veículo. Mensagem: ${error.message}`)
                } finally {
                    updateLoading(false);
                }
            }
            getVehicle();
        }
    }, [id]);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        updateFormData(prevState => ({ ...prevState, [name]: type === 'checkbox' ? checked : value }));
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await saveVehicle();
    }


    const saveVehicle = async () => {
        if (!validate()) return;

        try {
            updateLoading(true);

            id
                ? await api.patch(`/vehicle_type/${id}`, { ...formData })
                : await api.post('/vehicle_type', { ...formData });

            router.push('/veiculo');
        } catch (error: any) {
            updateError(`Falha ao gravar os dados do veículo. Mensagem: ${error.message}`)
        } finally {
            updateLoading(false);
        }
    }

    const validate = (): boolean => {

        const nenhumaPlacaSelecionada = !formData.plate_front && !formData.plate_trailer && !formData.plate_semi_trailer;
        if (nenhumaPlacaSelecionada) {
            alert('Necessário selecionar ao menos um tipo de placa.');
            return false;
        }

        if (formData.container_quantity > 4) {
            alert('A quantidade de containeres deve ser entre 1 e 4');
            return false;
        }

        return true;
    }

    return (
        <section style={{ background: '#fff', boxShadow: 'var(--box-shadow)', borderRadius: 'var(--border-radius)' }}>

            <BackdropLoader open={loading} />

            <Title>Cadastro de Tipo de Veículo</Title>

            <Paper sx={{ p: 3 }}>

                <h3>{id ? "Formulário de Edição" : "Novo Tipo de Veículo"}</h3>

                <form action="#" style={{ margin: '20px 0' }} onSubmit={handleSubmit}>

                    <Grid container spacing={2} rowSpacing={3}>

                        <Grid item xs={12} sm={7}>
                            <TextField
                                label="Nome"
                                name="name"
                                size="small"
                                fullWidth
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={2}>
                            <TextField
                                label="Sigla"
                                name="code"
                                size="small"
                                fullWidth
                                value={formData.code}
                                onChange={handleChange}
                                required
                            />
                        </Grid>



                        <Grid item xs={4}>
                            <h2 style={{ color: '#cecece', margin: '10px 0' }}>Placas</h2>
                            <FormGroup>

                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Placa Carreta"
                                    name="plate_front"
                                    onChange={handleChange}
                                    checked={formData.plate_front}
                                    value={formData.plate_front}

                                />
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Placa Reboque"
                                    name="plate_trailer"
                                    onChange={handleChange}
                                    checked={formData.plate_trailer}
                                    value={formData.plate_trailer}
                                />

                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Placa Semi-Reboque"
                                    name="plate_semi_trailer"
                                    onChange={handleChange}
                                    checked={formData.plate_semi_trailer}
                                    value={formData.plate_semi_trailer}
                                />

                            </FormGroup>
                        </Grid>



                        <Grid item xs={2} sm={1}>
                            <h2 style={{ color: '#cecece', margin: '10px 0' }}>Containeres</h2>
                            <TextField
                                // label="Nome"
                                size="small"
                                name="container_quantity"
                                type="number"
                                defaultValue={0}
                                InputProps={{ inputProps: { min: 0, max: 4 } }}
                                fullWidth
                                value={formData.container_quantity}
                                onChange={handleChange}
                                required
                            />
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
                                startIcon={<SaveIcon />}
                                disabled={error !== ""}
                            >
                                {id ? "Atualizar" : "Gravar"}
                            </Button>
                            <Button variant="outlined" size="small"><a href="/veiculo">Voltar</a></Button>
                        </Grid>

                    </Grid>

                </form>
            </Paper>


        </section>
    )
}
