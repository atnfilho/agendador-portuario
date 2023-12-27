"use client";

import Menu from "@/components/Menu";
import { signOut, useSession } from "next-auth/react";
import styles from "./Body.module.css";

import LogoutIcon from '@mui/icons-material/Logout';

import BackdropLoader from "@/components/_ui/BackdropLoader";
import { Button, Tooltip } from "@mui/material";
import { useState } from "react";

export default function Body({ children }: any) {

    const { data: session, status } = useSession();
    const [loading, updateLoading] = useState(false);

    async function keycloakSessionLogout() {
        try {
            updateLoading(true);
            await fetch(`/api/auth/logout`, { method: 'GET' })
        } catch (error) {
            console.log(error);
        } finally {
            updateLoading(false);
        }
    }


    const renderLoginStatus = () => {

        if (session) {
            return (
                <>
                    <div>
                        <Button
                            size="small"
                            variant="contained"
                            style={{ background: 'rgba(0,0,0,0.3)', color: '#fff' }}
                            onClick={() => {
                                keycloakSessionLogout().then(() => signOut({ callbackUrl: '/' }));
                            }}
                        >
                            <Tooltip title="Logout">
                                <LogoutIcon style={{ color: '#fff', marginLeft: '0.5rem', fontSize: '0.9rem' }} />
                            </Tooltip>
                        </Button>
                    </div>
                    <div>
                        <p>{session?.user?.name}</p>
                        <p>{session?.user?.email}</p>
                    </div>
                </>
            )
        }
    }

    return (
        <main className={styles.main}>
            <div>
                <div className={styles.infobox}>
                    {renderLoginStatus()}
                </div>
                <BackdropLoader open={loading} />
                <Menu />
            </div>
            <div className={styles.pd}>{children}</div>
        </main>
    )
}