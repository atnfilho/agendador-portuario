"use client";

import SetDynamicRoute from "@/components/SetDynamicRoute";
import BackdropLoader from "@/components/_ui/BackdropLoader";
import Title from "@/components/_ui/Title";
import { TSchedule } from "@/types/TSchedule";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';

import { Button, Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";



export default function ScheduleDetail({ params }: { params: { scheduleId: string } }) {

    const [loading, updateLoading] = useState(true);
    const [schedule, updateSchedule] = useState<TSchedule>();
    const [error, updateError] = useState("");

    useEffect(() => {

        if (params.scheduleId === undefined) return;

        const getScheduleById = async () => {
            try {
                const response: any = await axios.get(`/api/schedule/${params.scheduleId}`);
                updateSchedule(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                updateLoading(false);
            }
        }

        getScheduleById();

    }, [params.scheduleId]);


    return (
        <>
            <BackdropLoader open={loading} />
            <SetDynamicRoute />


            <Title>Detalhes do Agendamento</Title>

            <Paper sx={{ display: 'flex', flexDirection: 'column', gap: '20px', p: 3 }}>

                <section>
                    <Paper sx={{ display: 'flex', alignItems: 'center', gap: '20px', p: 1 }}>

                        <div style={{ display: 'flex', gap: '5px' }}>
                            <div style={{ color: '#A9A9A9' }}>Pátio: </div>
                            <div style={{ fontWeight: 600 }}>
                                {schedule?.yard?.name}
                            </div>
                        </div>

                    </Paper>
                </section>

                <section style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>

                    <Paper sx={{ display: 'flex', alignItems: 'center', gap: '20px', p: 3, flexGrow: 1 }}>

                        <QueryBuilderIcon />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <div style={{ color: '#A9A9A9' }}>Início</div>
                                <div style={{ fontWeight: 600 }}>
                                    {new Date(schedule?.schedule_window_start as string).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>

                            <div>
                                <div style={{ color: '#A9A9A9' }}>Fim</div>
                                <div style={{ fontWeight: 600 }}>
                                    {new Date(schedule?.schedule_window_start as string).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>

                    </Paper>

                    <Paper sx={{ display: 'flex', alignItems: 'center', gap: '20px', p: 3 }}>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <div style={{ color: '#A9A9A9' }}>Motivação</div>
                            <div style={{ fontWeight: 600 }}>
                                {`(${schedule?.motivation?.code}) ${schedule?.motivation?.name}`}
                            </div>
                            <div style={{ color: '#A9A9A9', fontSize: '0.9rem' }}>
                                {schedule?.motivation?.description}
                            </div>
                        </div>

                    </Paper>


                    <Paper sx={{ display: 'flex', alignItems: 'center', gap: '20px', p: 3 }}>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <div style={{ color: '#A9A9A9' }}>Veículo</div>
                            <div style={{ fontWeight: 600 }}>
                                {`(${schedule?.vehicle_type?.code}) ${schedule?.vehicle_type?.name}`}
                            </div>
                            <div style={{ color: '#A9A9A9', fontSize: '0.9rem' }}>
                                Placa Frontal: {schedule?.plate_front}
                            </div>
                            <div style={{ color: '#A9A9A9', fontSize: '0.9rem' }}>
                                Reboque: {schedule?.plate_trailer}
                            </div>
                            <div style={{ color: '#A9A9A9', fontSize: '0.9rem' }}>
                                Semi Reboque:{schedule?.plate_semi_trailer}
                            </div>
                        </div>

                    </Paper>


                    <Paper sx={{ display: 'flex', alignItems: 'center', gap: '20px', p: 3 }}>


                        <LocalShippingIcon />
                        <div>


                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>

                                <div style={{ color: '#A9A9A9' }}>Transportadora</div>

                                <div style={{ fontWeight: 600 }}>{schedule?.transporter?.name}</div>

                                <div style={{ color: '#A9A9A9', fontSize: '0.9rem' }}>
                                    CNPJ: {schedule?.transporter?.cnpj}
                                </div>

                                <div style={{ color: '#A9A9A9', fontSize: '0.9rem' }}>
                                    Endereço: {schedule?.transporter?.address} {schedule?.transporter?.city}
                                </div>

                                <div style={{ color: '#A9A9A9', fontSize: '0.9rem' }}>
                                    CEP: {schedule?.transporter?.cep}
                                </div>

                            </div>

                            

                        </div>

                    </Paper>


                    <Paper sx={{ display: 'flex', alignItems: 'center', gap: '20px', p: 3 }}>

                        <div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>

                                <div style={{ color: '#A9A9A9' }}>Containeres</div>

                                <div style={{ fontWeight: 600 }}>{schedule?.container1} <span style={{color: '#A9A9A9', fontSize: '0.9rem'}}>ISO: {schedule?.container1iso}</span></div>
                                <div style={{ fontWeight: 600 }}>{schedule?.container2} <span style={{color: '#A9A9A9', fontSize: '0.9rem'}}>ISO: {schedule?.container2iso}</span></div>
                                <div style={{ fontWeight: 600 }}>{schedule?.container3} <span style={{color: '#A9A9A9', fontSize: '0.9rem'}}>ISO: {schedule?.container3iso}</span></div>
                                <div style={{ fontWeight: 600 }}>{schedule?.container4} <span style={{color: '#A9A9A9', fontSize: '0.9rem'}}>ISO: {schedule?.container4iso}</span></div>

                            </div>

                        </div>

                    </Paper>

                </section>



                <div style={{ margin: '30px 0 0' }}>
                    <Button variant="outlined" size="small"><a href="/agendamento">Voltar</a></Button>
                </div>

            </Paper >

            {/* <pre>{JSON.stringify(schedule, null, 4)}</pre> */}
        </>
    )
}