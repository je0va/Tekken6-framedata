import "./style.css";
import javascriptLogo from "./assets/javascript.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import { setupCounter } from "./counter.js";
// import framedatas from "./data/framedata.json";
const mainNav = document.querySelector("#main-nav");
const charList = document.querySelector("#char-list");
const charName = document.querySelector("#CharName");
const mainContainer = document.querySelector("#main-container");
const titleImgDiv = document.querySelector("#title-char-img-div");
const contentDiv = document.querySelector("#content");
const filterBtnDiv = document.querySelector("#filter-btn-div");
const backBtnDiv = document.querySelector("#back-btn-div");
const headerDiv = document.querySelector("#header-div");
const backBtn = document.querySelector("#back-btn");
backBtn.href = import.meta.env.BASE_URL;
const slugify = (text) => {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};
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
const hideHeader = () => {
  filterBtnDiv.classList.add("hidden");
  backBtnDiv.classList.add("hidden");
  if (headerDiv.classList.contains("justify-between")) {
    headerDiv.classList.remove("justify-between");
    headerDiv.classList.add("justify-center");
  }
};
const showHeader = () => {
  if (filterBtnDiv.classList.contains("hidden")) {
    filterBtnDiv.classList.remove("hidden");
  }
  if (backBtnDiv.classList.contains("hidden")) {
    backBtnDiv.classList.remove("hidden");
  }
  if (headerDiv.classList.contains("justify-center")) {
    headerDiv.classList.add("justify-between");
    headerDiv.classList.remove("justify-center");
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
const createCharCard = (char) => {
  const a = document.createElement("a");
  a.className =
    "border-gray-700  w-20 sm:w-24  cursor-pointer items-center bg-black/70 border-1 h-min flex flex-col";
  a.href = "#" + char;
  const imgContainer = document.createElement("div");
  imgContainer.className = "w-full h-ffull";
  const imgElement = document.createElement("img");
  imgElement.className = "w-full h-full  aspect-square object-cover";
  imgElement.src = `${import.meta.env.BASE_URL}/chars-imgs/${char}.jpg`;
  imgElement.alt = char;
  imgContainer.append(imgElement);
  const nameContainer = document.createElement("div");
  nameContainer.className = "";
  const p = document.createElement("p");
  p.className = "text-base text-white";
  p.innerText = char;
  nameContainer.append(p);
  a.append(imgContainer, nameContainer);
  return a;
};
const renderCharList = (list) => {
  hideHeader();
  charList.innerHTML = "";
  charName.innerText = "Lista";
  if (contentDiv.classList.contains("sm:w-min")) {
    contentDiv.classList.remove("sm:w-min");
  }
  if (!titleImgDiv.classList.contains("hidden")) {
    titleImgDiv.classList.add("hidden");
  }
  if (!mainContainer.classList.contains("hidden")) {
    mainContainer.classList.add("hidden");
  }
  mainContainer.innerHTML = "";
  if (document.querySelector("#char-list").classList.contains("hidden")) {
    document.querySelector("#char-list").classList.remove("hidden");
  }
  list.forEach((char) => {
    const a = createCharCard(char);
    document.querySelector("#char-list").append(a);
  });
};
const renderFrameData = (characterData) => {
  mainContainer.classList.remove("hidden");
  charList.classList.add("hidden");

  if (characterData == "Erro" || !characterData.frames) {
    const target = document.querySelector("#main-container");
    hideHeader();
    target.innerHTML = "";
    charName.innerText = "Erro";
    const errorContent = document.createElement("h1");
    errorContent.innerText = "Erro: Framedata não encontrada ou indisponível";
    errorContent.style.width = "100%";
    errorContent.style.color = "red";
    if (contentDiv.classList.contains("sm:w-min")) {
      contentDiv.classList.remove("sm:w-min");
    }
    titleImgDiv.classList.add("hidden");
    target.append(errorContent);
    return;
  }

  try {
    showHeader();
    if (!contentDiv.classList.contains("sm:w-min")) {
      contentDiv.classList.add("sm:w-min");
    }
    charName.innerText = characterData.name;
    titleImgDiv.classList.remove("hidden");
    document.querySelector("#title-char-img").src =
      `${import.meta.env.BASE_URL}/chars-imgs/${characterData.name}.jpg`;
  } catch (e) {}
  const createTr = (mainBody, input) => {
    const tr = document.createElement("tr");
    ["input", "range", "DMG", "speed", "block", "hit", "ch"].forEach((data) => {
      const td = document.createElement("td");
      td.innerText = input[data] === undefined ? "?" : input[data];
      td.className = "p-2 border-y-zinc-800 border-x-zinc-900 border-1";
      tr.append(td);
      tr.onclick = () => {
        tr.classList.toggle("bg-gradient-to-r");
        tr.classList.toggle("text-blue-300");
      };
    });

    tr.className =
      "cursor-pointer text-nowrap   hover:bg-gradient-to-r from-slate-400/40 to-gray-400/40";
    mainBody.append(tr);
  };
  const target = document.querySelector("#main-container");
  target.innerHTML = ``;
  console.log("here" + characterData);

  const renderTableUnique = (characterData) => {
    const div = document.createElement("div");

    div.className = "max-h-full gap-2 w-full";
    div.innerHTML = ` 
               <h1 class="h-min  text-gray-100 "></h1>
              <div id="table-unique-container"}
                class="max-w-full h-95/100 max-h-d130 sm:max-h-200 bg-black/66 bg-gradijent-to-r from-gray-950/40 from-20% to-black/40 "
              >
               
                <div class="h-full overflow-x-auto max-w-full ">
                  <table
                    class="table-auto sm:w-200"
                  >
                    <thead class="text-gray-300  border-x-zinc-900 border-x-1">
                      <tr class="">
                        <th class="p-2 sticky top-0">
                          <div class="flex w-full ">
                            <p>INPUT</p>
                          </div>
                        </th>
                        <th class="p-2 sticky top-0">
                          <div class="flex w-full ">
                            <p>RANGE</p>
                          </div>
                        </th>
                        <th class="p-2 sticky top-0">
                          <div class="flex w-full ">
                            <p>DMG</p>
                          </div>
                        </th>

                        <th class="p-2 sticky top-0">
                          <div class="flex w-full ">
                            <p>SPEED</p>
                          </div>
                        </th>

                        <th class="p-2 sticky top-0">
                          <div class="flex w-full ">
                            <p>BLOCK</p>
                          </div>
                        </th>

                        <th class="p-2 sticky top-0  ">
                          <div class="flex w-full ">
                            <p>HIT</p>
                          </div>
                        </th>

                        <th class="p-2 sticky top-0">
                          <div class="flex w-full ">
                            <p>CH</p>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody id=${"table-unique"} class="text-blue-300/55" > </tbody>
                  </table>
                </div></div>`;
    target.append(div);
    const mainBody = document.querySelector("#table-unique");
    mainBody.innerHTML = "";
    characterData.frames.forEach((action) => {
      const trAction = document.createElement("tr");
      trAction.className = `
       text-nowrap border-x-zinc-900 border-x-1`;

      const tdAction = document.createElement("td");
      tdAction.innerText = action.action;
      tdAction.className = "p-2 text-blue-400/80 text-lg";
      trAction.append(tdAction);

      mainBody.append(trAction);
      action.data.forEach((input) => {
        createTr(mainBody, input);
      });
    });
  };
  renderTableUnique(characterData);
};
const toggleCurrentAStyle = (currentA) => {
  currentA.classList.toggle("sm:bg-black/65");
  currentA.classList.toggle("text-blue-500");
  currentA.classList.toggle("sm:border-t-gray-400");
  currentA.classList.toggle("sm:border-b-gray-600");
  currentA.classList.toggle("sm:border-x-gray-600");
  currentA.classList.toggle("sm:border-l-transparent");
};
window.addEventListener("hashchange", async () => {
  try {
    const pastA = document.querySelector(`a.sm\\:bg-black\\/65`);
    toggleCurrentAStyle(pastA);
  } catch (err) {}
  try {
    const currentA = document.querySelector(
      `nav a[href="${window.location.hash}"]`,
    );
    if (currentA) {
      toggleCurrentAStyle(currentA);
    }

    const character = window.location.hash.substring(1);
    if (character) {
      renderFrameData(await getData(character));
    } else {
      const indexes = await getIndexes();
      renderCharList(indexes.chars);
    }
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
        "border-2 rounded-r-xl border-transparent px-2 text-nowrap flex items-center sm:w-full hover:bg-black/65 sm:p-4 ";
      const aText = document.createElement("p");
      aText.innerText = value;
      aText.className = "";
      a.append(aText);
      a.href = "#" + value;
      mainNav.append(a);
    });
    if (window.location.hash) {
      const currentA = document.querySelector(
        `nav a[href="${window.location.hash}"]`,
      );
      if (currentA) {
        toggleCurrentAStyle(currentA);
      }
      const character = window.location.hash.substring(1);

      renderFrameData(await getData(character));
    }
  } catch (e) {
    console.log(e);
  }
});
window.addEventListener("DOMContentLoaded", async () => {
  if (!window.location.hash) {
    try {
      const indexes = await getIndexes();
      renderCharList(indexes.chars);
    } catch (e) {
      console.log(e);
    }
  }
});
