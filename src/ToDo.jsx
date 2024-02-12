import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Select from 'react-select';

function ToDo(props) {
  const [x_choice, setXChoice] = useState('');
  const [y_choice, setYChoice] = useState('');
  const [data, setData] = useState([]);
  let selectedValues_x = [];
  let selectedValues_y = [];
  let dict_x = {};
  const handleChange = (selectedItem, axis) => {
    if (axis === 'x') {
      selectedValues_x = props.item_all.map((item_all) => item_all[selectedItem.value]);
    } else {
      selectedValues_y = props.item_all.map((item_all) => item_all[selectedItem.value]);
    }

    if (selectedValues_x.length === selectedValues_y.length) {
      selectedValues_x.forEach((x, index) => {
        if (x in dict_x) {
          dict_x[x] += selectedValues_y[index];
        } else {
          dict_x[x] = selectedValues_y[index];
        }
      });
      
      setXChoice(dict_x);
      setYChoice(dict_x);
      console.log('dict_x:', dict_x);

      const dataArray = Object.keys(dict_x).map((x) => ({
        name: x,
        value: dict_x[x],
      }));
      console.log(dataArray);
      setData(dataArray);
      
    }
  };

  const options = props.item.map((item) => ({ value: item, label: item }));

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

    

      <BarChart width={1200} height={500} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </>
  );
}

export default ToDo;
