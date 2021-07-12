import React from 'react'

function FilterButtons({ tagBtn, filter }) {
    return (
        <div>
            {
                tagBtn.map((tag, i) => {
                    return <button type="button" onClick={() => filter(tag)} className="btn">{tag}</button>
                })
            }
        </div>
    )
}

export default FilterButtons;