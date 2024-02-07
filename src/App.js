import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "./App.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(4),
  margin: "0 40px",
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "500px",
}));

function App() {
  const [cat, setCat] = useState("");
  const [img, setImg] = useState("");
  const [radio, setRadio] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);

  const handleChange = (e) => {
    const target = e.target;
    if (target.checked) {
      setRadio(target.value);
    }
  };

  useEffect(() => {
    const imageUrl = process.env.REACT_APP_CAT_KEY + cat;
    const waitTime = 500;

    const fetchImage = async () => {
      const res = await fetch(imageUrl);
      if (res.status < 200 || res.status >= 300) {
        setErrorStatus(res.status);
      }
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImg(imageObjectURL);
      setLoading(false);
    };

    if (cat !== "") {
      setLoading(true);
      setImg(null);
      setErrorStatus(null);
    }

    const catTimer = setTimeout(() => fetchImage(), waitTime);
    return () => {
      clearInterval(catTimer);
    };
  }, [cat, radio]);

  return (
    <Box className="child">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>
            <FormControl noValidate autoComplete="off">
              <TextField
                placeholder="Add cat name"
                type="text"
                id="cat"
                name="cat"
                onChange={(e) => setCat(e.target.value)}
              />
              <RadioGroup name="radio-buttons-group">
                <FormControlLabel
                  type="text"
                  value="green"
                  control={<Radio />}
                  onChange={handleChange}
                  label="Green"
                />
                <FormControlLabel
                  type="text"
                  value="blue"
                  control={<Radio />}
                  onChange={handleChange}
                  label="Blue"
                />
                <FormControlLabel
                  type="text"
                  value="red"
                  control={<Radio />}
                  onChange={handleChange}
                  label="Red"
                />
              </RadioGroup>
            </FormControl>
            {!cat && (
              <h1 style={{ marginTop: "2em" }}>Use form to generate cat</h1>
            )}
          </Item>
        </Grid>

        <Grid item xs={6}>
          <Item>
            {loading && <h1>Loading...</h1>}
            {errorStatus && <h1>Cat could not be loaded</h1>}
            <img src={img} alt="cat" />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
