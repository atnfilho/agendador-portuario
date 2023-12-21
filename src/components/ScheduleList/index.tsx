import { TSchedule } from "@/types/TSchedule";
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import DataTableComponent from "../DataTableComponent";
import BackdropLoader from "../_ui/BackdropLoader";
import Title from "../_ui/Title";

export default function ScheduleList() {

    const [schedules, updateSchedules] = useState<TSchedule[]>([]);
    const [loading, updateLoading] = useState(true);

    useEffect(() => {
        getSchedules();
    }, []);

    async function getSchedules() {
        try {
            const response = await axios.get('/api/schedule');
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