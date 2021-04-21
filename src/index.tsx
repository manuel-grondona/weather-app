import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  :root {
    box-sizing: border-box
  };

  body {
    margin: 0;
  }

  *, ::before, ::after {
    box-sizing: inherit
  }
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
