import {Fragment, useState} from 'react';

const Dropdown = (props) => {

    const [selection, setSelection] = useState()


    const changeHandler = (event) => {
        setSelection(event.target.value);
    }

    const mapOptions = () => {
        return props.options.forEach((item) => <option value={item}>{item}</option>);
    }

    return (
        <Fragment>
            <select onChange={changeHandler}>
            {mapOptions}
            </select>
        </Fragment>
    )
}

export default Dropdown;