import React from 'react';
import './style.css';

const SelectBox = props => {
    return (
        <div className="select-box">
            <select>
                {props.options}
            </select>
        </div>
    );
}

export default SelectBox;
