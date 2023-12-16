'use client';

import DataTableComponent from '@/components/DataTableComponent';
import Title from '@/components/_ui/Title';
import AddIcon from '@mui/icons-material/Add';

import BackdropLoader from '@/components/_ui/BackdropLoader';
import { TSchedule } from '@/types/TSchedule';
import { IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';



export default function Home() {

    const [schedules, updateSchedules] = useState<TSchedule[]>([]);
    const [loading, updateLoading] = useState(true);

    useEffect(() => {
        getSchedules();
    }, []);

    async function getSchedules() {
        try {
            const response = await axios.get('/api/schedule?id=1&limit=100');
            updateSchedules(response.data);

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

                <Title>Agendamentos Cadastrados</Title>

                <div style={{ width: '95%', margin: 'auto', padding: '20px 0 40px' }}>

                    {!loading && <div style={{ textAlign: 'right', position: 'absolute', top: '150px', zIndex: 9999 }}>
                        <a href="/agendamento/cadastro">
                            <Tooltip title="Adicionar" placement="right">
                                <IconButton color="primary" sx={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        </a>
                    </div>}

                    <DataTableComponent data={schedules} loading={loading} />
                </div>


            </div>

        </>
    )
}


