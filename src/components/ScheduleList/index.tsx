import api from "@/service/api";
import { TSchedule } from "@/types/TSchedule";
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DataTableComponent from "../DataTableComponent";
import SetDynamicRoute from "../SetDynamicRoute";
import BackdropLoader from "../_ui/BackdropLoader";
import Title from "../_ui/Title";

export default function ScheduleList() {

    const [schedules, updateSchedules] = useState<TSchedule[]>([]);
    const [loading, updateLoading] = useState(true);
    const { data: session } = useSession();

    useEffect(() => {
        getSchedules();
    }, []);

    async function getSchedules() {
        try {
            const response = await api.get(`/schedule`);
            updateSchedules(response.data.items);
        } catch (error) {
            console.log(error);
        } finally {
            updateLoading(false);
        }
    }

    return (
        <>
            <BackdropLoader open={loading} />
            <SetDynamicRoute />

            <div style={{ background: '#fff' }}>

                <Title>Agendamentos Cadastrados</Title>

                <div style={{ width: '95%', margin: 'auto', padding: '20px 0 40px' }}>

                    <Register loading={loading} isAuthorized={session?.roles?.includes('Administrator')} />

                    <DataTableComponent data={schedules} loading={loading} />
                </div>
            </div>
        </>
    )

}

type Props = {
    isAuthorized: boolean | undefined,
    loading: boolean
}

function Register({ isAuthorized, loading }: Props) {

    if(loading) {
        return <></>
    }

    if(!isAuthorized) {
        return <></>
    }

    return (
        <div style={{ textAlign: 'right', position: 'absolute', top: '150px', zIndex: 9999 }}>
            <a href="/agendamento/cadastro">
                <Tooltip title="Adicionar" placement="right">
                    <IconButton color="primary" sx={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </a>
        </div>
    )
}