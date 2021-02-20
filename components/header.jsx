import styles from './header.module.scss';
import classname from 'classname';

export default function Header({menuOpened, toggleMenu}) {
    return <div className={styles.header}>
        <div className="hire-me"></div>
        <div className={classname({
            [styles.menuButton]: true,
            [styles.opened]: menuOpened
        })} onClick={() => {
            toggleMenu(!menuOpened);
        }}>
            <span className={classname(styles.menuButtonLine)}></span>
            <span className={classname(styles.menuButtonLine)}></span>
            <span className={classname(styles.menuButtonLine)}></span>
        </div>
    </div>;
}
