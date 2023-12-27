"use client";

import styles from './Menu.module.css';

export default function Menu() {

    return (
        <>
            <div style={{ padding: '10px' }}>
                Menu
            </div>
            <ul>
                {/* <li className={styles.menu_item}><a href="/"><HomeIcon />Página Inicial</a></li> */}
                <li className={styles.menu_item}><a href="/agendamento">Agendamentos</a></li>
                <li className={styles.menu_item}><a href="/motivacao">Motivações</a></li>
                <li className={styles.menu_item}><a href="/patio">Pátios</a></li>
                <li className={styles.menu_item}><a href="/transportadora">Transportadoras</a></li>
                <li className={styles.menu_item}><a href="/veiculo">Tipos de Veículos</a></li>
                <li className={styles.menu_item}><a href="/motorista">Motoristas</a></li>
                <li className={styles.menu_item}><a href="/frota">Frota da Casa</a></li>
            </ul>
        </>
    )

}

