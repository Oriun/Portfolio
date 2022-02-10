import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/fr'

dayjs.locale('fr')
dayjs.extend(LocalizedFormat)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const keyLog = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement;
  if (target.tagName === "INPUT") return
  if(e.key.toLowerCase() === 'i' && e.ctrlKey && e.shiftKey) return
  e.preventDefault()
  console.log(e.key,e.altKey, e.code, e.ctrlKey, e.shiftKey)
};

window.addEventListener('keydown',keyLog)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
