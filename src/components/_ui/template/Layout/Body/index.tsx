import Menu from "@/components/Menu";
import styles from "./Body.module.css";

export default function Body({ children }: any) {
    return (
        <main className={styles.main}>
            <div>
                <div className={styles.infobox}>
                    <p>Administrador</p>
                    <p>adminstrador@gmail.com</p>
                </div>
                <Menu />

            </div>
            <div className={styles.pd}>{children}</div>
        </main>
    )
}