'use client';

import { onlyNumbers } from "@/commom/formatters";
import { cpfMask } from "@/commom/masks";
import BackdropLoader from "@/components/_ui/BackdropLoader";
import Title from "@/components/_ui/Title";
import SaveIcon from '@mui/icons-material/Save';
import { Button, Grid, Paper, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isCNH, isCPF } from "validation-br";


const validate = (values: any) => {
    const errors: any = {};

    if (!values.name) {
        errors.name = "Nome não informado."
    }

    if (!values.code) {
        errors.code = "CPF não informado."
    }

    if (!isCPF(values.code)) {
        errors.code = 'CPF inválido.';
    }

    if (!values.cnh) {
        errors.cnh = "Nº da CNH não informado."
    }

    if (!isCNH(values.cnh)) {
        errors.cnh = "Nº da CNH inválido."
    }

    if (values.cnh.length < 11) {
        errors.cnh = "Nº da CNH deve conter 11 dígitos."
    }

    if (!values.cnhValidate) {
        errors.cnhValidate = "Validade da CNH não informada."
    }


    return errors;
}

export function MotoristaForm() {

    const router = useRouter();
    const [loading, updateLoading] = useState(false);
    const [error, updateError] = useState("");

    const formik = useFormik({
        initialValues: {
            name: "",
            code: "",
            cnh: "",
            cnhValidate: ""
        },
        validate,
        onSubmit: async (values, { resetForm }) => {
            await saveDriver(values, resetForm);
        }
    });

    const saveDriver = async (data: any, resetForm: Function) => {
        try {
            updateLoading(true);
            await axios.post('/api/driver', { ...data });
            resetForm();
            router.push('/motorista');
        } catch (error: any) {
            updateError(error.message);
        } finally {
            updateLoading(false);
        }
    }



    return (
        <section style={{ background: '#fff', boxShadow: 'var(--box-shadow)', borderRadius: 'var(--border-radius)' }}>

            <BackdropLoader open={loading} />

            <Title>Cadastro</Title>

            <Paper sx={{ p: 3 }}>

                <h3>Novo Motorista</h3>

                <form onSubmit={formik.handleSubmit} style={{ margin: '20px 0' }} >

                    <Grid container spacing={2} rowSpacing={3}>

                        <Grid item xs={7}>
                            <TextField
                                label="Nome"
                                name="name"
                                size="small"
                                fullWidth
                                inputProps={{ maxlength: 100 }}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            {formik.touched.name && formik.errors.name ? <div style={{ margin: '5px 5px 0', fontSize: '0.8rem', color: '#f00' }}>{formik.errors.name}</div> : null}
                        </Grid>

                        <Grid item xs={2}>
                            <TextField
                                label="CPF"
                                name="code"
                                size="small"
                                fullWidth
                                inputProps={{ maxLength: 11 }}
                                value={cpfMask(formik.values.code)}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            {formik.touched.code && formik.errors.code ? <div style={{ margin: '5px 5px 0', fontSize: '0.8rem', color: '#f00' }}>{formik.errors.code}</div> : null}
                        </Grid>

                        <Grid xs={12}></Grid>

                        <Grid item xs={2}>
                            <TextField
                                label="Nº CNH"
                                name="cnh"
                                size="small"
                                fullWidth
                                inputProps={{ maxLength: 11 }}
                                value={formik.values.cnh}
                                onChange={(e) => {
                                    const value = onlyNumbers(e.target.value);
                                    formik.setFieldValue('cnh', value);
                                }}
                                onBlur={formik.handleBlur}
                                required
                            />
                            {formik.touched.cnh && formik.errors.cnh ? <div style={{ margin: '5px 5px 0', fontSize: '0.8rem', color: '#f00' }}>{formik.errors.cnh}</div> : null}
                        </Grid>

                        <Grid item xs={2}>
                            <TextField
                                label="Validade CNH"
                                name="cnhValidate"
                                size="small"
                                type="date"
                                fullWidth
                                inputProps={{ maxLength: 10 }}
                                InputLabelProps={{ shrink: true }}
                                value={formik.values.cnhValidate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            {formik.touched.cnhValidate && formik.errors.cnhValidate ? <div style={{ margin: '5px 5px 0', fontSize: '0.8rem', color: '#f00' }}>{formik.errors.cnhValidate}</div> : null}
                        </Grid>


                        {/* <Grid item xs={4}>
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
                        </Grid> */}



                        <Grid item xs={12} style={{ display: 'flex', gap: '20px' }}>
                            <Button type="submit" variant="contained" size="small" startIcon={<SaveIcon />}>Gravar</Button>
                            <Button variant="outlined" size="small"><a href="/motorista">Voltar</a></Button>
                        </Grid>

                        <Grid item xs={12} style={{ color: "#f00" }}>
                            {error}
                        </Grid>

                    </Grid>


                </form>
            </Paper>

            <pre>{JSON.stringify(formik.values, null, 2)}</pre>

        </section>
    )
}

