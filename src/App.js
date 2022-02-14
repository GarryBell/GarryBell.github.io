import "./App.css";
import React, { useState } from "react";
import { Typography, TextField, Grid, Button } from "@mui/material";

function App() {
  // All lines except the first line which have been inputted
  const [lines, addLine] = useState([]);

  // The first line, against which all others will be compared
  const [firstLine, setFirstLine] = useState("");

  // The current line which the user has inputted
  const [currentLine, setCurrentLine] = useState("");

  /**
   *
   * @param {*} input The string for which the Hamming distance is to be found
   * @returns The string representing the Hamming distance of this string form the initial string
   */
  const getHamming = (input) => {
    var resultString = "";
    for (var i = 0; i < input.length; i++) {
      if (input[i] === firstLine[i]) {
        resultString += "0";
      } else {
        resultString += "1";
      }
    }
    if (input.length < firstLine.length) {
      resultString += "".padEnd(firstLine.length - input.length, "1");
    }
    return resultString;
  };

  /**
   *
   * @param {*} input String to be added, from the TextField
   */
  const addString = (input) => {
    if (input.target) {
      setCurrentLine(input.target.value);
    }
  };

  /**
   * Function is called when `Submit` is pressed, and handles how to process the currently inputted string, before emptying the TextField
   */
  const handleSubmit = () => {
    if (firstLine === "") {
      setFirstLine(currentLine);
      console.log("added?");
    } else {
      addLine(lines.concat([currentLine]));
      getHamming(currentLine);
    }
    getItems();
    setCurrentLine("");
  };

  /**
   * Clears all inputted strings
   */
  const handleReset = () => {
    setFirstLine("");
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
            {index + 1}: {line}, {getHamming(line)}
          </Typography>
        </Grid>
      </>
    ));
  };

  return (
    <Grid container spacing={2} sx={{ width: "100%", padding: 2 }}>
      <Grid item xs={6}>
        <TextField
          label={
            firstLine === ""
              ? "Enter first string here"
              : "Enter strings to compare"
          }
          placeholder="Some string"
          focused
          onChange={addString}
          value={currentLine}
        ></TextField>
      </Grid>
      <Grid item xs={3}>
        <Button type="button" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button type="button" onClick={handleReset}>
          Reset
        </Button>
      </Grid>
      {firstLine !== "" ? (
        <Grid item xs={3}>
          <Typography>First line: {firstLine}</Typography>
        </Grid>
      ) : null}
      {getItems()}
    </Grid>
  );
}

export default App;
