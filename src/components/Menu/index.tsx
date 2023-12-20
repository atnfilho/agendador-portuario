"use client";

import HomeIcon from '@mui/icons-material/Home';
import { useSession } from 'next-auth/react';
import styles from './Menu.module.css';

export default function Menu() {

    const { data: session, status } = useSession();

    const renderMenu = () => {
        if (status === "loading") {
            return <></>
        } else if (session) {
            return (
                <>
                    <li className={styles.menu_item}><a href="/agendamento">Agendamentos</a></li>
                    <li className={styles.menu_item}><a href="/motivacao">Motivações</a></li>
                    <li className={styles.menu_item}><a href="/patio">Pátios</a></li>
                    <li className={styles.menu_item}><a href="/transportadora">Transportadoras</a></li>
                    <li className={styles.menu_item}><a href="/veiculo">Veículos</a></li>
                </>
            )
        } else {
            return <></>
        }
    }

    return (
        <>
            <div style={{ padding: '10px' }}>
                Menu
            </div>
            <ul>
                <li className={styles.menu_item}><a href="/"><HomeIcon />Página Inicial</a></li>
                {renderMenu()}
            </ul>
        </>
    )
}