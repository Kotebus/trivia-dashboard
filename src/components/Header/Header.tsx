import type {JSX} from "react";
import styles from './Header.module.css';

interface HeaderProps {
    title: string;
    subtitle?: string;
}

export const Header = ({title, subtitle}: HeaderProps): JSX.Element => {
    return (
        <header className={styles.header}>

            <h1 className={styles.title}>{title}</h1>

            {subtitle && (<p className={styles.subtitle}>{subtitle}</p>)}
        </header>
    );
}