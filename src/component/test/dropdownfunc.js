import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

function SelectVariants() {
    const [tuyen, setTuyen] = React.useState('');
    const [dotkiemtra, setDotKT] = React.useState('');

    const handleChange = (event) => {
      setTuyen(event.target.value);
    };

    const handleChange1 = (event) => {
        setDotKT(event.target.value);
      };
  
    return (
      <div style={{
        margin: "10px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "center",
      }}>
        <FormControl variant="outlined" style={{
            alignSelf: "center",
            minWidth: "25%",
            marginLeft: 10,
          }}>
          <InputLabel id="demo-simple-select-standard-label">Tuyen</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={tuyen}
            onChange={handleChange}
            label="Tuyen"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Chem-Nghia Do">Chem-Nghia Do</MenuItem>
            <MenuItem value="Chem-Ha Dong">Chem-Ha Dong</MenuItem>
            <MenuItem value="Kim Nguu-TimesCity">Kim Nguu-TimesCity</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{
            alignSelf: "center",
            minWidth: "30%",
            marginLeft: 60,
          }}>
          <InputLabel id="demo-simple-select-filled-label">Dot Kiem Tra</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={dotkiemtra}
            onChange={handleChange1}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="01/07/2022">01/07/2022</MenuItem>
            <MenuItem value="15/07/2022">15/07/2022</MenuItem>
            <MenuItem value="31/07/2022">31/07/2022</MenuItem>
            <MenuItem value="01/08/2022">01/08/2022</MenuItem>
            <MenuItem value="15/08/2022">15/08/2022</MenuItem>
            <MenuItem value="31/08/2022">31/08/2022</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  };

export {SelectVariants};


function LoaiTB() {
  const [thietBi, setTB] = React.useState('');

  const handleChange = (event) => {
    setTB(event.target.value);
  };

  return (
    <div style={{
      margin: "10px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      alignItems: "center",
    }}>
      <FormControl variant="outlined" style={{
          alignSelf: "center",
          minWidth: "25%",
          marginLeft: 10,
        }}>
        <InputLabel id="demo-simple-select-standard-label">LoaiTB</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={thietBi}
          onChange={handleChange}
          label="Tuyen"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Cot Don Than">Cot Don Than</MenuItem>
          <MenuItem value="Cot Thep Hinh">Cot Thep Hinh</MenuItem>
          <MenuItem value="Duong day dien">Duong day dien</MenuItem>
          <MenuItem value="Ta chong rung">Ta chong rung</MenuItem>
          <MenuItem value="Cach dien thuy tinh">Cach dien thuy tinh</MenuItem>
          <MenuItem value="Cach dien silicon">Cach dien silicon</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export {LoaiTB};


