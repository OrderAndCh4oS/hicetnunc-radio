import React from 'react'

function FilterButtons({ tags, filter }) {
    return (
        <div>
            {
                tags.map((tag, i) => {
                    return <button type="button" onClick={() => filter(tag)} className="btn">{tag}</button>
                })
            }
        </div>
    )
}

export default FilterButtons;