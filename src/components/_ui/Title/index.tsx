import styles from './Title.module.css';


export default function Title({ children }: any) {
    return (
        <div className={styles.header}>
            <h2>{children}</h2>
        </div>
    )
}