import useRadio from '../../../hooks/use-radio';
import styles from '../styles.module.css';
import NextIcon from '../icons/next-icon';

const NextButton = ({tracks}) => {
    const {controls} = useRadio();

    return <button
        className={`${styles.button} ${styles.button_next} ${styles.playerIconHolder}`}
        onClick={controls.next(tracks)}
    >
        <NextIcon/>
    </button>;
};

export default NextButton;
