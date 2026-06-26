import "./style.css";
import javascriptLogo from "./assets/javascript.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import { setupCounter } from "./counter.js";
// import framedatas from "./data/framedata.json";
const mainNav = document.querySelector("#main-nav");
let framedatas = {};
const getData = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.BASE_URL}data/framedata.json`,
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Erro ao carregar o JSON: " + error);
  }
};
framedatas = getData();

const renderFrameData = (character) => {
  try {
    document.querySelector("#CharName").innerText = framedatas[character].name;
  } catch {}

  const target = document.querySelector("#main-container");
  target.innerHTML = ``;

  framedatas[character].frames.forEach((action) => {
    const div = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.innerText = "TESTE";
    div.classList.add("w-full");

    div.innerHTML = ` 
              <h1 class="text-gray-100 ">${action.action} </h1>
              <div id=${action.action}
                class="max-w-full bg-gray-950/90 bg-gray-800 flex bg-gradient-to-b from-gray-950/80 from-20% to-gray-900/30"
              >
                <table id="mobile-table"
                  class="sm:hidden  table-auto sm:w-200 border-y-1 border-t-pink-950/0 border-b-pink-950/50"
                >
                  <thead class="text-gray-300 border-x-gray-800/0 border-x-1">
                    <tr class=" ">
                      <th class="p-2">
                        <div class="flex w-full">
                          <p class="">INPUT</p>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody id=${"mobile-body-" + action.action} class="text-gray-500">
             
                  </tbody>
                </table>
                <div class="overflow-x-auto overscroll-hidden max-w-full">
                  <table
                    class="table-auto sm:w-200 border-y-1 border-t-pink-950/0 border-b-pink-950/50"
                  >
                    <thead class="text-gray-300 border-x-gray-800/0 border-x-1">
                      <tr class="">
                        <th class="p-2 hidden sm:block">
                          <div class="flex w-full">
                            <p>INPUT</p>
                          </div>
                        </th>
                        <th class="p-2">
                          <div class="flex w-full">
                            <p>RANGE</p>
                          </div>
                        </th>
                        <th class="p-2">
                          <div class="flex w-full">
                            <p>DMG</p>
                          </div>
                        </th>

                        <th class="p-2">
                          <div class="flex w-full">
                            <p>SPEED</p>
                          </div>
                        </th>

                        <th class="p-2">
                          <div class="flex w-full">
                            <p>BLOCK</p>
                          </div>
                        </th>

                        <th class="p-2">
                          <div class="flex w-full">
                            <p>HIT</p>
                          </div>
                        </th>

                        <th class="p-2">
                          <div class="flex w-full">
                            <p>CH</p>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody id=${"main-body-" + action.action} class="text-gray-500" > </tbody>
                  </table>
                </div></div>`;
    target.append(div);
    const mobileBody = document.querySelector("#mobile-body-" + action.action);
    mobileBody.innerHTML = "";
    const mainBody = document.querySelector("#main-body-" + action.action);
    mainBody.innerHTML = "";
    action.data.forEach((input) => {
      const renderMobileTr = () => {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.innerText = input.input;
        td.className = "p-2";
        tr.className =
          "border-t-1 border-t-pink-950/20 hover:border-l-pink-950/20 border-x-gray-800/0 border-x-1 hover:bg-gradient-to-r from-pink-950/30 to-pink-950/70";
        tr.append(td);
        mobileBody.append(tr);
      };
      const renderMainTr = () => {
        const tr = document.createElement("tr");
        const fragment = document.createDocumentFragment();
        ["input", "range", "DMG", "speed", "block", "hit", "ch"].forEach(
          (data) => {
            const td = document.createElement("td");
            td.innerText = input[data];
            td.className = data === "input" ? "p-2 hidden sm:block" : "p-2";
            tr.append(td);
          },
        );

        tr.className =
          "border-t-1 border-t-pink-950/20 hover:border-l-pink-950/20 border-x-gray-800/0 border-x-1 hover:bg-gradient-to-r from-pink-950/30 to-pink-950/70";
        mainBody.append(tr);
      };
      renderMobileTr();
      renderMainTr();
    });
  });
};
window.addEventListener("hashchange", () => {
  try {
    document
      .querySelector(`a.sm\\:bg-gradient-to-l`)
      .classList.toggle("border-b-1");
    document
      .querySelector(`a.sm\\:bg-gradient-to-l`)
      .classList.toggle("sm:bg-gradient-to-l");
  } catch (err) {}
  try {
    const currentA = document.querySelector(
      `nav a[href="${window.location.hash}"]`,
    );
    currentA.classList.add("sm:bg-gradient-to-l");
    currentA.classList.add("border-b-1");
    const character = window.location.hash.substring(1);
    renderFrameData(character);
  } catch (error) {}
});
window.addEventListener("DOMContentLoaded", async () => {
  try {
    framedatas = await getData();
    Object.values(framedatas).forEach((value) => {
      const a = document.createElement("a");
      a.className =
        "text-text text-nowrap hover:bg-pink-600/20 hover:text-100 border-b-pink-700 p-4 from-pink-900/30 to-pink-900/70";
      a.innerText = value.name;
      a.href = "#" + value.name;
      mainNav.append(a);
    });
    if (window.location.hash) {
      const currentA = document.querySelector(
        `nav a[href="${window.location.hash}"]`,
      );
      if (currentA) {
        currentA.classList.add("sm:bg-gradient-to-l");
        currentA.classList.add("border-b-1");
      }
      const character = window.location.hash.substring(1);

      renderFrameData(character);
    }
  } catch (e) {
    console.log(e);
  }
});
