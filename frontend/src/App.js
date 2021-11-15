import React, { useState } from "react";
import './App.css';
import Button from '@mui/material/Button';
import { Container, Typography, Stack, TextField } from "@mui/material";
import Axios from "axios";
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from "@mui/system";
import Footer from "./Footer";


function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark'
        },
      }),
    [prefersDarkMode],
  );

  const [inputText, setInputText] = useState("")
  const [questions, setQuestions] = useState([])

  const handleClick = () => {
    setQuestions([])
    Axios({
      method: "post",
      data: {
        inputText: inputText,
      },
      url: "http://localhost:8000/"
    }).then((res) => {
      if (res.data.questions) {
        res.data.questions.forEach(question => {
          console.log(question)
          setQuestions(questions => [...questions, question])
        });
      }
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography variant="h4" sx={{ textAlign: 'center' }} mt={10} component="div" gutterBottom>
          🤖 Question Generation 🤖
        </Typography>
        <Stack spacing={2}>
          <TextField
            id="outlined-multiline-flexible"
            label="Input"
            multiline
            maxRows={14}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button onClick={() => handleClick()} variant="contained">Generate</Button>
          <ul>
            {questions.map(question => {
              return (<li> {question} </li>)
            })}
          </ul>
        </Stack>
        <Box mt={8}>
          <Footer />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
