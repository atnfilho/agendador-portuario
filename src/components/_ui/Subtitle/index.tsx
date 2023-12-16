import styles from './Subtitle.module.css';

type Props = {
    text: string
}

export default function Subtitle({text}: Props) {
    return (
        <h2 className={styles.subtitle}>{text}</h2>
    )
}