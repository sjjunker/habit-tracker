import { setupCounter } from 'src/scripts/counter.mjs'

let javascriptLogo = document.createElement("img");
javascriptLogo.src = "habit-tracker/src/public/images/javascript.svg";
javascriptLogo.alt = "JavaScript Logo";

let viteLogo = document.createElement("img");
viteLogo.src = "habit-tracker/src/scripts/counter.js";
vite.alt = "Vite Logo";

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
