'use client';

import { validadorCPF } from "@/commom/validaters";
import BasicDateTimePicker from "@/components/BasicDatePicker";
import Subtitle from "@/components/_ui/Subtitle";
import Title from "@/components/_ui/Title";
import { TMotivation } from "@/types/TMotivation";
import { TTransporter } from "@/types/TTransporter";
import { TVehicle } from "@/types/TVehicle";
import { TYard } from "@/types/TYard";
import SaveIcon from '@mui/icons-material/Save';
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Containeres from "./Conteineres";

const validate = (values: any) => {
    const errors: any = {};

    if (!validadorCPF(values.driver_cpf)) {
        errors.driver_cpf = 'CPF inválido';
    }

    return errors;
}

export default function AgendamentoForm() {

    const [motivationList, updateMotivationList] = useState<TMotivation[]>([]);
    const [vehicleTypeList, updateVehicleTypeList] = useState<TVehicle[]>([]);
    const [yardList, updateYardList] = useState<TYard[]>([]);
    const [transporterList, updateTransporterList] = useState<TTransporter[]>([]);

    const [dataInicio, updateDataInicio] = useState<string | null>(null);
    const [dataFim, updateDataFim] = useState<string | null>(null);


    const formik = useFormik({
        initialValues: {
            motivation: "",
            yard: "",
            user_id: "",
            transporter: "",
            driver_cpf: "",
            vehicle_type: "",
            containeres: {
                container1: "",
                container1iso: "",
                container2: "",
                container2iso: "",
                container3: "",
                container3iso: "",
                container4: "",
                container4iso: "",
            },
            plate_front: "",
            plate_trailer: "",
            plate_semi_trailer: "",
            schedule_window_start: "",
            schedule_window_end: "",
            justify: ""
        },
        validate,
        onSubmit: async (values, {resetForm}) => {
            const { containeres, ...obj } = values;
            const data = {...obj, ...containeres};
            await saveSchedule(data);
            // resetForm();
        }
    })

    useEffect(() => {
        getMotivationList();
        getVehicleTypeList();
        getYardList();
        getTransporterList();
    }, []);

    useEffect(() => {
        formik.setFieldValue('schedule_window_start', dataInicio);
        formik.setFieldValue('schedule_window_end', dataFim);
    }, [dataInicio, dataFim]);


    const handleChangeContaineres = (e: any) => {
        const { name, value } = e.target;
        const novoObjeto = { ...formik.values.containeres, [name]: value };
        formik.setFieldValue('containeres', novoObjeto);
    }


    async function getMotivationList() {
        console.log('chamou')
        try {
            const response = await axios.get('/api/motivation?id=1&limit=100');
            updateMotivationList(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getVehicleTypeList() {
        try {
            const response = await axios.get('/api/vehicle?id=1&limit=100');
            updateVehicleTypeList(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getYardList() {
        try {
            const response = await axios.get('/api/yard?id=1&limit=100');
            updateYardList(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getTransporterList() {
        try {
            const response = await axios.get('/api/transporter?id=1&limit=100');
            updateTransporterList(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    const saveSchedule = async (data: any) => {
        try {
          await axios.post('/api/schedule', { ...data });
        } catch (error) {
          console.log(error);
        } finally {
    
        }
      }




    const veiculoSelecionado: TVehicle = vehicleTypeList.filter((obj: TVehicle) => {
        return obj.id === Number(formik.values.vehicle_type);
    })[0];


    return (
        <section style={{ background: '#fff', boxShadow: 'var(--box-shadow)', borderRadius: 'var(--border-radius)' }}>

            <Title>Agendamento</Title>

            <Paper sx={{ p: 3 }}>

                <form onSubmit={formik.handleSubmit} style={{ margin: '20px 0', boxSizing: 'border-box' }}>

                    <Grid container spacing={2} rowSpacing={2}>

                        <Grid item xs={12}>
                            <Subtitle text="Motivação" />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Motivação</InputLabel>
                                <Select
                                    label="Motivação"
                                    name="motivation"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.motivation}
                                    required
                                >
                                    {motivationList?.map((item: TMotivation) => {
                                        return (
                                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>

                                        )
                                    })}
                                </Select>
                                {formik.touched.motivation && formik.errors.motivation ? <div style={{ margin: '5px 5px 0', fontSize: '0.8rem', color: '#f00' }}>{formik.errors.motivation}</div> : null}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Pátio</InputLabel>
                                <Select
                                    label="Pátio"
                                    name="yard"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.yard}
                                    required
                                >
                                    {yardList.map((item: TYard) => {
                                        return (
                                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>

                                        )
                                    })}
                                </Select>
                                {formik.touched.yard && formik.errors.yard ? <div style={{ margin: '5px 5px 0', fontSize: '0.8rem', color: '#f00' }}>{formik.errors.yard}</div> : null}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Subtitle text="Dados do Agendamento" />
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                label="Usuário"
                                size="small"
                                name="user_id"
                                onChange={formik.handleChange}
                                fullWidth
                                disabled
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Transportadora</InputLabel>
                                <Select
                                    label="Transportadora"
                                    name="transporter"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.transporter}
                                    required
                                >
                                    {transporterList.map((item: TTransporter) => {
                                        return (
                                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>

                                        )
                                    })}
                                </Select>
                                {formik.touched.transporter && formik.errors.transporter ? <div style={{ margin: '5px 5px 0', fontSize: '0.8rem', color: '#f00' }}>{formik.errors.transporter}</div> : null}
                            </FormControl>
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                label="CPF Motorista"
                                size="small"
                                fullWidth
                                inputProps={{ maxLength: 11 }}
                                name="driver_cpf"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.driver_cpf}
                                required
                            />
                            {formik.touched.driver_cpf && formik.errors.driver_cpf ? <div style={{ margin: '5px 5px 0', fontSize: '0.8rem', color: '#f00' }}>{formik.errors.driver_cpf}</div> : null}
                        </Grid>

                        <Grid item xs={9}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Tipo de Veículo</InputLabel>
                                <Select
                                    label="Tipo de Veículo"
                                    name="vehicle_type"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.vehicle_type}
                                    required
                                >
                                    {vehicleTypeList.map((item: TVehicle) => {
                                        return (
                                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                                {formik.touched.vehicle_type && formik.errors.vehicle_type ? <div style={{ margin: '5px 5px 0', fontSize: '0.8rem', color: '#f00' }}>{formik.errors.vehicle_type}</div> : null}
                            </FormControl>
                        </Grid>


                        {/* <Placas tipoVeiculo={Number(formik.values.tipoVeiculo)} listaDeTiposDeVeiculos={listaDeTiposDeVeiculos} values={placas} updateValue={atualizaPlacas} /> */}

                        {veiculoSelecionado && <Grid item xs={12}>
                            <Subtitle text="Placas" />
                        </Grid>}

                        {veiculoSelecionado?.plate_front && <Grid item xs={3}>
                            <TextField
                                label="Placa Frontal"
                                name="plate_front"
                                size="small"
                                fullWidth
                                inputProps={{ maxLength: 7, textTransform: 'uppercase' }}
                                onChange={formik.handleChange}
                                value={formik.values.plate_front}
                                required
                            />
                        </Grid>
                        }

                        {veiculoSelecionado?.plate_trailer &&
                            <Grid item xs={3}>
                                <TextField
                                    label="Reboque"
                                    name="plate_trailer"
                                    size="small"
                                    fullWidth
                                    inputProps={{ maxLength: 7, textTransform: 'uppercase' }}
                                    onChange={formik.handleChange}
                                    value={formik.values.plate_trailer}
                                    required
                                />
                            </Grid>
                        }

                        {veiculoSelecionado?.plate_semi_trailer && <Grid item xs={3}>
                            <TextField
                                label="Semi Reboque"
                                name="plate_semi_trailer"
                                size="small"
                                fullWidth
                                inputProps={{ maxLength: 7, textTransform: 'uppercase' }}
                                onChange={formik.handleChange}
                                value={formik.values.plate_semi_trailer}
                                required
                            />
                        </Grid>}

                        <Containeres vehicle_type={Number(formik.values.vehicle_type)} vehicleTypeList={vehicleTypeList} handleChange={handleChangeContaineres} />

                        <Grid item xs={12}>
                            <Subtitle text="Janela de Agendamento" />
                        </Grid>

                        <Grid item xs={3}>
                            <BasicDateTimePicker label="Início" value={dataInicio} handleChange={updateDataInicio} />
                        </Grid>

                        <Grid item xs={3}>
                            <BasicDateTimePicker label="Fim" value={dataFim} handleChange={updateDataFim} />
                        </Grid>


                        <Grid item xs={12}>
                            <Subtitle text="Justificativa" />
                        </Grid>

                        <Grid item xs={12}>
                            <textarea
                                style={{ width: '100%', padding: '10px' }}
                                rows={5}
                                name="justify"
                                value={formik.values.justify}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Grid>


                        <Grid item xs={12} style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
                            <Button type="submit" variant="contained" size="small"><SaveIcon fontSize="small" sx={{ marginRight: '8px', marginBottom: '4px' }} />Gravar</Button>
                            <Button variant="outlined" size="small"><a href="/agendamento">Voltar</a></Button>
                        </Grid>

                    </Grid>

                </form>
            </Paper>

        </section>
    )
}



