import useRadio from '../../hooks/use-radio';

const NextButton = ({tracks, direction}) => {
    const {
        controls,
    } = useRadio();

    const prevHandler = () => {
        controls.previous(tracks)();     
    }

    return <>
        <svg onClick={prevHandler} width="20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="step-forward" class="svg-inline--fa fa-step-forward fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M384 44v424c0 6.6-5.4 12-12 12h-48c-6.6 0-12-5.4-12-12V291.6l-195.5 181C95.9 489.7 64 475.4 64 448V64c0-27.4 31.9-41.7 52.5-24.6L312 219.3V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12z"></path>
        </svg>
    </>;
};

export default NextButton;
