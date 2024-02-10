import React, { useState } from 'react';
import Select from "react-select"
import {
    ListItem,
    ListItemText,
    InputBase,
    Checkbox,
    ListItemSecondaryAction,
    IconButton
} from "@material-ui/core"

import DeleteOutlined from "@material-ui/icons/DeleteOutlined"

function ToDo(props) {
    const [x_choice, setXChoice] = useState('');
    const [y_choice, setYChoice] = useState('');
    const handleChange = (selectedItem, axis) => {
        if(axis === 'x') {
            const selectedValues_x = props.item_all.map((item_all) => 
                item_all[selectedItem.value]
            );
            let dict_x = {};
            selectedValues_x.forEach((x) => {
                if (x in dict_x){
                    dict_x[x] += 1;
                }
                else{
                    dict_x[x] = 1;
                }
            });
            setXChoice(dict_x);
        } else {
            const selectedValues_y = props.item_all.map((item_all) =>
                item_all[selectedItem.value]
            );
            let dict_y = {};
            selectedValues_y.forEach((y) => {
                if (y in dict_y){
                    dict_y[y] += 1;
                }
                else{
                    dict_y[y] = 1;
                }
            });
            setYChoice(dict_y);
        }       
        
    }

    //const deleteEventHandler = () => {
    //    props.delete(props.item);
    //}

    const options = props.item.map(item => ({ value:item, label:item}));
    //const selects_x = props.item_all.map(item_all => (item_all.quantity));
    //const selects_y = props.item_all.map(item_all => (item_all.sales));



    return (
        <>
            <Select
                onChange={(selectedItem) => handleChange(selectedItem, 'x')}
                value={x_choice}
                options={options}
                placeholder={'x축'}
                clearable={false} 
            />
            <Select
                onChange={(selectedItem) => handleChange(selectedItem, 'y')}
                value={y_choice}
                options={options}
                placeholder={'y축'}
                clearable={false}
            />
            <h3>{JSON.stringify(x_choice)}  {JSON.stringify(y_choice)}</h3>
        </>
    );
}

export default ToDo;
