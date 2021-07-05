
import Cover from './cover';

const CoverList = ({
    tracks,
}) => {

    if(!tracks) return null;

    return <>
        {!tracks.length ? <p>No audio tracks available</p> : (
            <div>
                {tracks.map((t, i) =>
                   <Cover track = {t}
                   />
                )}
            </div>
        )}
    </>;
};

export default CoverList;
