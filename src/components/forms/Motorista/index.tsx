'use client';

import BackdropLoader from "@/components/_ui/BackdropLoader";
import Title from "@/components/_ui/Title";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Grid, Paper, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function MotoristaForm() {

    const router = useRouter();
    const [formData, setFormData] = useState({ name: '', cpf: '', documentValidation: '', photo: '' });
    const [loading, updateLoading] = useState(false);
    const [error, updateError] = useState("");

    const handleChange = (e: any) => {
        const { value, type, name, checked } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: type === 'checkbox' ? checked : value }));
    }






    return (
        <section style={{ background: '#fff', boxShadow: 'var(--box-shadow)', borderRadius: 'var(--border-radius)' }}>

            <BackdropLoader open={loading} />

            <Title>Cadastro</Title>

            <Paper sx={{ p: 3 }}>

                <h3>Novo Motorista</h3>

                <form action="#" style={{ margin: '20px 0' }}>

                    <Grid container spacing={2} rowSpacing={3}>

                        <Grid item xs={7}>
                            <TextField
                                label="Nome"
                                name="name"
                                size="small"
                                fullWidth
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <TextField
                                label="CPF"
                                name="cpf"
                                size="small"
                                fullWidth
                                inputProps={{ maxLength: 11 }}
                                value={formData.cpf}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid xs={12}></Grid>

                        <Grid item xs={2}>
                            <TextField
                                label="Validade CNH"
                                name="documentValidation"
                                size="small"
                                fullWidth
                                value={formData.documentValidation}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <Button
                                variant="outlined"
                                component="label"
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload Foto do Motorista
                                <input
                                    type="file"
                                    name="photo"
                                    value={formData.photo}
                                    onChange={handleChange}
                                    hidden
                                />
                            </Button>
                        </Grid>



                        <Grid item xs={12} style={{ display: 'flex', gap: '20px' }}>
                            <Button type="submit" variant="contained" size="small" startIcon={<SaveIcon />}>Gravar</Button>
                            <Button variant="outlined" size="small"><a href="/motivacao">Voltar</a></Button>
                        </Grid>

                        <Grid item xs={12} style={{ color: "#f00" }}>
                            {error}
                        </Grid>

                    </Grid>


                </form>
            </Paper>


        </section>
    )
}

