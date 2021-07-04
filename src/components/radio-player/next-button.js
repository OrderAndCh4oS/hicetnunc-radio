import useRadio from '../../hooks/use-radio';
import styles from './styles.module.css';
import NextIcon from './next-icon';

const NextButton = ({tracks}) => {
    const {controls} = useRadio();

    return <button
        className={`${styles.button} ${styles.button_next} ${styles.button_playerControl}`}
        onClick={controls.next(tracks)}
    >
        <NextIcon/>
    </button>;
};

export default NextButton;
