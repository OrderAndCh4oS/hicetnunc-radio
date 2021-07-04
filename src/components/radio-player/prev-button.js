import useRadio from '../../hooks/use-radio';
import styles from './styles.module.css';
import PrevIcon from './prev-icon';

const PrevButton = ({tracks}) => {
    const {controls} = useRadio();

    return <button
        className={`${styles.button} ${styles.button_prev} ${styles.button_playerControl}`}
        onClick={controls.previous(tracks)}
    >
        <PrevIcon/>
    </button>;
};

export default PrevButton;
