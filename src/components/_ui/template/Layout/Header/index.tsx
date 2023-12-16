import styles from './Header.module.css';

export default function Header() {
    return (
        <>
            <div className={styles.header}>
                {/* <div className={styles.logo}>
                    <img
                        src="/static/images/logo.png"
                        alt="Logo"
                    />
                </div> */}
                <div className={styles.title}>
                    <p>AGP - AGENDADOR PORTUÁRIO</p>
                    <p className={styles.subtitle}>v1.0</p>
                </div>                
            </div>
        </>
    )
}