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
const filterCardBtn = document.querySelector("#filter-card-btn");
const filterCardContainer = document.querySelector("#filters-card-container");
const filterCard = document.querySelector("#filters-card");
const closeFilterCardBtn = document.querySelector("#close-filter-card-btn");
const inputs = document.querySelectorAll("input");
let currentCharData;
const filter = { range: [], block: [], hit: [], ch: [] };
inputs.forEach((i) => {
  i.addEventListener("change", () => {
    filter.range = [];
    filter.block = [];
    filter.hit = [];
    filter.ch = [];
    document.querySelectorAll("#range-check-div input:checked").forEach((i) => {
      if (i.checked) {
        filter.range.push(i.value);
      }
    });
    document.querySelectorAll("#block-check-div input:checked").forEach((i) => {
      if (i.checked) {
        filter.block.push(i.value);
      }
    });
    document.querySelectorAll("#hit-check-div input:checked").forEach((i) => {
      if (i.checked) {
        filter.hit.push(i.value);
      }
    });
    document.querySelectorAll("#ch-check-div input:checked").forEach((i) => {
      if (i.checked) {
        filter.ch.push(i.value);
      }
    });

    renderFrameData(currentCharData);
  });
});
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
const createFilterCard = () => {
  filterCardContainer.classList.remove("hidden");
};
filterCardBtn.onclick = createFilterCard;
filterCardContainer.onclick = (e) => {
  filterCardContainer.classList.add("hidden");
};
closeFilterCardBtn.onclick = (e) => {
  filterCardContainer.classList.add("hidden");
};
filterCard.onclick = (e) => {
  e.stopPropagation();
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
  currentCharData = characterData;

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
      if (data == "block" || data == "hit" || data == "ch") {
        if (input[data][0] === "-") {
          td.classList.add("text-red-600");
        } else if (input[data][0] === "+") {
          td.classList.add("text-green-600");
        }
      }

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

  const renderTableUnique = (characterData) => {
    const div = document.createElement("div");

    div.className = "max-h-full gap-2 w-full";
    div.innerHTML = ` 
               <h1 class="h-min  text-gray-100 "></h1>
              <div id="table-unique-container"}
                class="max-w-full h-95/100 max-h-d130 sm:max-h-200 bg-zinc-950/80 bg-gradijent-to-r from-gray-950/40 from-20% to-black/40 "
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
                    <tbody id=${"table-unique"} class="text-gray-400" > </tbody>
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
        if (checkInput(input)) {
          createTr(mainBody, input);
        }
      });
    });
  };
  renderTableUnique(characterData);
};
window.addEventListener("hashchange", async () => {
  try {
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
    if (window.location.hash) {
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
const checkInput = (input) => {
  const rangeCheck = (input) => {
    if (filter.range.length === 0) return true;
    const arr = [];
    filter.range.forEach((f) => {
      arr.push(input.range.includes(f));
    });
    if (arr.includes(true)) return true;
  };
  const blockCheck = (input) => {
    if (filter.block.length === 0) return true;
    const arr = filter.block.map((v) => {
      if (v === "Negative") {
        if (input.block.includes("-")) return true;
      }
      if (v === "Positive") {
        if (input.block.includes("+")) return true;
      }
    });
    if (arr.includes(true)) {
      return true;
    } else {
      return false;
    }
  };
  const hitCheck = (input) => {
    if (filter.hit.length === 0) return true;
    const arr = filter.hit.map((v) => {
      if (v === "Negative") {
        if (input.hit.includes("-")) return true;
      }
      if (v === "Positive") {
        if (input.hit.includes("+")) return true;
      }
    });
    if (arr.includes(true)) {
      return true;
    } else {
      return false;
    }
  };
  const chCheck = (input) => {
    if (filter.ch.length === 0) return true;
    const arr = filter.ch.map((v) => {
      if (v === "Negative") {
        if (input.ch.includes("-")) return true;
      }
      if (v === "Positive") {
        if (input.ch.includes("+")) return true;
      }
    });
    if (arr.includes(true)) {
      return true;
    } else {
      return false;
    }
  };

  const cond = [
    rangeCheck(input),
    blockCheck(input),
    hitCheck(input),
    chCheck(input),
  ].every((c) => {
    return c === true;
  });

  return cond;
};
