'use client';

import { onlyNumbers } from "@/commom/formatters";
import { cpfMask } from "@/commom/masks";
import BackdropLoader from "@/components/_ui/BackdropLoader";
import Title from "@/components/_ui/Title";
import api from "@/service/api";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import { Alert, Button, Grid, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

    if (!values.birth) {
        errors.birth = "Data de nascimento não informada."
    }

    if (!values.file) {
        errors.file = "Necessário incluir uma foto do motorista."
    }

    return errors;
}

type Props = {
    id?: number
}

export function MotoristaForm({ id }: Props) {

    const router = useRouter();
    const [loading, updateLoading] = useState(false);
    const [error, updateError] = useState("");
    const [image, setImage] = useState<any>(null);


    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            formik.setFieldValue("file", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            code: "",
            birth: "",
            cnh: "",
            cnhValidate: "",
            file: ""
        },
        validate,
        onSubmit: async (values, { resetForm }) => {
            await saveDriver(values, resetForm);
        }
    });

    useEffect(() => {

        if (id) {
            const getDriver = async () => {
                try {
                    updateLoading(true);
                    const response = (await api.get(`/driver/${id}`)).data;

                    if (!response) {
                        updateError(`Nenhum registro encontrado para o identificador ${id}.`);
                        return;
                    }

                    formik.setFieldValue('name', response.name);
                    formik.setFieldValue('code', response.code);
                    formik.setFieldValue('cnh', response.cnh);
                    formik.setFieldValue('birth', response.birth);
                    formik.setFieldValue('cnhValidate', response.cnhValidate);

                } catch (error: any) {
                    updateError(`Falha ao obter os dados do motorista. Mensagem: ${error.message}`);
                } finally {
                    updateLoading(false);
                }
            }
            getDriver();
        }

    }, [id]);


    const saveDriver = async (data: any, resetForm: Function) => {
        try {
            updateLoading(true);

            {
                id
                    ? await api.patch(`/driver/${id}`, { ...data }, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    : await api.post(`/driver`, { ...data }, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
            };

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

            <Paper sx={{ p: 3, pb: 1 }}>

                <h3>{id ? "Formulário de Edição" : "Novo Motorista"}</h3>

                <form encType="multipart/form-data" onSubmit={formik.handleSubmit} style={{ margin: '20px 0' }} >

                    <Grid container spacing={2} rowSpacing={3}>

                        <Grid item xs={6}>
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
                                InputLabelProps={{ shrink: !!formik.values.code }}
                                value={cpfMask(formik.values.code)}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            {formik.touched.code && formik.errors.code ? <div style={{ margin: '5px 5px 0', fontSize: '0.8rem', color: '#f00' }}>{formik.errors.code}</div> : null}
                        </Grid>

                        <Grid item xs={2}>
                            <TextField
                                label="Data de Nascimento"
                                name="birth"
                                size="small"
                                type="date"
                                fullWidth
                                inputProps={{ maxLength: 10 }}
                                InputLabelProps={{ shrink: true }}
                                value={formik.values.birth}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            {formik.touched.birth && formik.errors.birth ? <div style={{ margin: '5px 5px 0', fontSize: '0.8rem', color: '#f00' }}>{formik.errors.birth}</div> : null}
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


                        <Grid item xs={12}>

                            <div style={{ border: '1px solid #cecece', background: '#F0F0F0', borderRadius: '4px', textAlign: 'center' }}>
                                {image && (
                                    <div>
                                        <h2 style={{margin: '10px 0'}}>Pré-visualização da imagem:</h2>
                                        <img src={image} alt="Imagem selecionada" style={{ maxHeight: '200px', maxWidth: '200px', width: 'auto', objectFit: 'contain' }} />
                                    </div>
                                )}

                                <label htmlFor="upload-photo">
                                    <input
                                        type="file"
                                        name="file"
                                        accept="image/png, image/jpeg"
                                        required
                                        style={{ display: 'none' }}
                                        id="upload-photo"
                                        onChange={handleImageChange}
                                    />
                                    <Button
                                        color="primary"
                                        variant="text"
                                        component="span"
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        Foto do Motorista
                                    </Button>
                                </label>
                            </div>
                            {formik.errors.file ? <div style={{ margin: '5px 5px 0', fontSize: '0.8rem', color: '#f00' }}>{formik.errors.file}</div> : null}

                        </Grid>

                        {error &&
                            <Grid item xs={12} style={{ color: "#f00" }}>
                                <Alert severity="error">
                                    {error}
                                </Alert>
                            </Grid>
                        }

                        <Grid item xs={12} style={{ display: 'flex', gap: '20px', margin: '40px 0 10px' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="small"
                                startIcon={<SaveIcon />}
                                disabled={error !== ""}
                            >
                                {id ? "Atualizar" : "Gravar"}
                            </Button>
                            <Button variant="outlined" size="small"><a href="/motorista">Voltar</a></Button>
                        </Grid>

                    </Grid>

                    {/* <pre>{JSON.stringify(formik.values, null, 4)}</pre> */}
                </form>
            </Paper>

        </section>
    )
}

