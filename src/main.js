import "./style.css";
import javascriptLogo from "./assets/javascript.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import { setupCounter } from "./counter.js";
// import framedatas from "./data/framedata.json";
const mainNav = document.querySelector("#main-nav");

const getIndexes = async () => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data/index.json`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Erro ao carregar o JSON da lista de personagens: " + error);
    return "Erro";
  }
};

const getData = async (character) => {
  try {
    const response = await fetch(
      `${import.meta.env.BASE_URL}data/${character}.json`,
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Erro ao carregar o JSON: " + error);
    return "Erro";
  }
};

const renderFrameData = (characterData) => {
  if (characterData == "Erro") {
    const target = document.querySelector("#main-container");
    target.innerHTML = "";
    document.querySelector("#CharName").innerText = "Erro";
    const errorContent = document.createElement("h1");
    errorContent.innerText = "Erro: Frame data não encontrada ou indisponível";
    errorContent.style.width = "100%";
    errorContent.style.color = "red";
    target.append(errorContent);
    return;
  }

  try {
    document.querySelector("#CharName").innerText = characterData.name;
  } catch (e) {
    console.log(e);
  }

  const target = document.querySelector("#main-container");
  target.innerHTML = ``;
  console.log("here" + characterData);
  characterData.frames.forEach((action) => {
    const div = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.innerText = "TESTE";
    div.classList.add("w-full");

    div.innerHTML = ` 
              <h1 class="text-gray-100 ">${action.action} </h1>
              <div id=${action.action}
                class="max-w-full h-full max-h-130 sm:max-h-200 bg-gray-950/90   flex bg-gradient-to-r from-gray-950/80 from-20% to-black/50 "
              >
               
                <div class="tefst h-full overflow-x-auto bg-gradient-to-r from-gray-950 from-20% to-pink-900/0  max-w-full ">
                  <table
                    class="table-auto  sm:w-200 bordder-y-1 border-t-pink-950 border-b-pink-950"
                  >
                    <thead class="text-gray-300      bordjer-x-pink-800 bordder-r-1">
                      <tr class="">
                        <th class="p-2 sticky top-0 ">
                          <div class="flex w-full">
                            <p>INPUT</p>
                          </div>
                        </th>
                        <th class="p-2 sticky top-0">
                          <div class="flex w-full">
                            <p>RANGE</p>
                          </div>
                        </th>
                        <th class="p-2 sticky top-0">
                          <div class="flex w-full">
                            <p>DMG</p>
                          </div>
                        </th>

                        <th class="p-2 sticky top-0">
                          <div class="flex w-full">
                            <p>SPEED</p>
                          </div>
                        </th>

                        <th class="p-2 sticky top-0">
                          <div class="flex w-full">
                            <p>BLOCK</p>
                          </div>
                        </th>

                        <th class="p-2 sticky top-0">
                          <div class="flex w-full">
                            <p>HIT</p>
                          </div>
                        </th>

                        <th class="p-2 sticky top-0">
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
    // const mobileBody = document.querySelector("#mobile-body-" + action.action);
    // mobileBody.innerHTML = "";
    const mainBody = document.querySelector("#main-body-" + action.action);
    mainBody.innerHTML = "";
    action.data.forEach((input) => {
      const renderMobileTr = () => {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.innerText = input.input;
        td.className = "p-2";
        tr.className =
          "border-t-1 text-nowrap border-t-pink-950/20 hover:border-l-pink-950/20 border-x-gray-800/0 border-x-1 hover:bg-gradient-to-r from-pink-950/30 to-pink-950/70";
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
            td.className =
              data === "input" ? "p-2 " : "p-2 border-x-pink-950/70 border-x-1";
            tr.append(td);
          },
        );

        tr.className =
          "border-t-1 text-nowrap border-t-pink-950/45 hover:border-l-pink-950/20 border-x-pink-900/50 border-r-1 hover:bg-gradient-to-r from-pink-950/30 to-pink-950/70";
        mainBody.append(tr);
      };
      // renderMobileTr();
      renderMainTr();
    });
  });
};
window.addEventListener("hashchange", async () => {
  console.log("TESTEt");
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
    if (currentA) {
      currentA.classList.add("sm:bg-gradient-to-l");
      currentA.classList.add("border-b-1");
    }

    const character = window.location.hash.substring(1);
    renderFrameData(await getData(character));
  } catch (error) {
    alert(error);
  }
});
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const indexes = await getIndexes();
    indexes.chars.forEach((value) => {
      const a = document.createElement("a");
      a.className =
        "text-text text-nowrap hover:bg-pink-600/20 hover:text-100 border-b-pink-700 p-4 from-pink-900/30 to-pink-900/70";
      a.innerText = value;
      a.href = "#" + value;
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

      renderFrameData(await getData(character));
    }
  } catch (e) {
    console.log(e);
  }
});
