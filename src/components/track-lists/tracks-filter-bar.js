import styles from './styles.module.css';
import FilterTypes from '../../enums/filter-types';

const TracksFilterBar = ({filter, setFilter}) => <div className={styles.filterTabs}>
    <button
        className={`${styles.filterButton} ${filter === FilterTypes.ALL
            ? styles.selected
            : ''}`}
        onClick={() => setFilter(FilterTypes.ALL)}
    >All
    </button>
    <button
        className={`${styles.filterButton} ${filter === FilterTypes.CREATIONS
            ? styles.selected
            : ''}`}
        onClick={() => setFilter(FilterTypes.CREATIONS)}
    >Creations
    </button>
    <button
        className={`${styles.filterButton} ${filter === FilterTypes.COLLECTIONS
            ? styles.selected
            : ''}`}
        onClick={() => setFilter(FilterTypes.COLLECTIONS)}
    >Collections
    </button>
</div>;

export default TracksFilterBar;
