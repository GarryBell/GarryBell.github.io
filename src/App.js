import "./App.css";
import React, { useState } from "react";
import { Typography, TextField, Grid, Button } from "@mui/material";

function App() {
  // All lines which have been inputted
  const [lines, addLine] = useState([]);

  // The current line which the user has inputted
  const [currentLine, setCurrentLine] = useState("");

  /**
   *
   * @param {*} input The string for which the Hamming distance is to be found
   * @param {*} index The index of this string, in the array of strings
   * @returns The string representing the Hamming distance of this string form the initial string
   */
  const getHamming = (input, index) => {
    var resultString = "";
    if (index === 0) {
      return "";
    }
    const previous = lines[index - 1];
    for (var i = 0; i < input.length; i++) {
      if (input[i] === previous[i]) {
        resultString += "0";
      } else {
        resultString += "1";
      }
    }
    return resultString;
  };

  /**
   *
   * @param {*} input String to be added, from the TextField
   */
  const addString = (input) => {
    if (input.target && input.target.value.length < 6) {
      setCurrentLine(input.target.value);
    }
  };

  /**
   * Function is called when `Submit` is pressed, and handles how to process the currently inputted string, before emptying the TextField
   */
  const handleSubmit = () => {
    console.log("added?");

    addLine(
      lines.concat([currentLine]).sort((a, b) => parseInt(a) - parseInt(b))
    );

    getItems();
    setCurrentLine("");
  };

  /**
   * Clears all inputted strings
   */
  const handleReset = () => {
    addLine([]);
  };

  /**
   * Extracted from the HTML to improve readability
   * @returns all lines which have been imputted, along with their Hamming distance
   */
  const getItems = () => {
    return lines.map((line, index) => (
      <>
        <Grid key={index} item xs={12}>
          <Typography>
            {index + 1}: {line} {getHamming(line, index)}
          </Typography>
        </Grid>
      </>
    ));
  };

  return (
    <Grid container spacing={2} sx={{ width: "100%", padding: 2 }}>
      <Grid item xs={6}>
        <TextField
          label="Enter strings here"
          type="number"
          placeholder="Some string"
          focused
          onChange={addString}
          value={currentLine}
        ></TextField>
      </Grid>
      <Grid item xs={3}>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={currentLine.length !== 5}
        >
          Submit
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button type="button" onClick={handleReset}>
          Reset
        </Button>
      </Grid>

      {getItems()}
    </Grid>
  );
}

export default App;
