import "./style.css";
const mainNav = document.querySelector("#main-nav");
const charListContainer = document.querySelector("#char-list-container");
//const charList = document.querySelector("#char-list");
const charName = document.querySelector("#CharName");
const mainContainer = document.querySelector("#main-container");
const titleImgDiv = document.querySelector("#title-char-img-div");
//const contentDiv = document.querySelector("#content");
//const loadContainer = document.querySelector("#load-container");
const mainContent = document.querySelector("#main-content");
const filterBtnDiv = document.querySelector("#filter-btn-div");
const backBtnDiv = document.querySelector("#back-btn-div");
const headerDiv = document.querySelector("#header-div");
const backBtn = document.querySelector("#back-btn");
const loadingContainer = document.createElement("div");
loadingContainer.className =
  "w-full h-full gap-3 text-white flex justify-center py-20 items-center";
loadingContainer.innerHTML = ` <span class="w-10 h-10 border-2 animate-spin border-neutral-600 border-l-neutral-900 rounded-full"
        ></span> <p>Carregando…</p> `;
backBtn.href = import.meta.env.BASE_URL;
const apiBaseLink =
  "https://cdn.jsdelivr.net/gh/je0va/Tekken6-framedata-db@HEAD/";
const filterCardBtn = document.querySelector("#filter-card-btn");
const filterCardContainer = document.querySelector("#filters-card-container");
const filterCard = document.querySelector("#filters-card");
const closeFilterCardBtn = document.querySelector("#close-filter-card-btn");
const inputs = document.querySelectorAll("#filters-card-container input");
const modeViewBtnCard = document.querySelector("#mode-view-btn-card");
const modeViewCardBtn = document.querySelector("#mode-view-cards-btn");
const modeViewTableBtn = document.querySelector("#mode-view-table-btn");
let startFrom = 0;
const perPage = 12;
let modeView = "cards";
const checkBtn = () => {
  modeView === "cards"
    ? (modeViewCardBtn.classList.add("btn-active"),
      modeViewTableBtn.classList.remove("btn-active"))
    : (modeViewTableBtn.classList.add("btn-active"),
      modeViewCardBtn.classList.remove("btn-active"));
};
checkBtn();
let currentCharData;
const filter = { range: [], block: [], hit: [], ch: [] };
modeViewCardBtn.onclick = () => {
  if (modeView == "cards") return;
  modeView = "cards";
  checkBtn();
  renderFrameData(currentCharData, modeView);
};
modeViewTableBtn.onclick = () => {
  if (modeView == "table") return;
  modeView = "table";
  checkBtn();
  renderFrameData(currentCharData, modeView);
};
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

    let arr = [...filter.range, ...filter.block, ...filter.hit, ...filter.ch];
    document.querySelector("#filterP").innerText =
      "Filtros " + (arr.length > 0 ? `(${arr.length})` : "");
    startFrom = 0;
    if (arr.length > 0) {
      document.querySelector("#filter-card-btn").classList.add("btn-active");
    } else {
      document.querySelector("#filter-card-btn").classList.remove("btn-active");
    }
    renderFrameData(currentCharData, modeView, startFrom);
  });
});
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
    const response = await fetch(`${apiBaseLink}data/index.json`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Erro ao carregar o JSON da lista de personagens: " + error);
    return "Erro";
  }
};
const hideHeader = () => {
  filterBtnDiv.classList.add("hidden");
  titleImgDiv.classList.add("hidden");
  modeViewBtnCard.classList.add("hidden");
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
    const response = await fetch(`${apiBaseLink}data/${character}.json`);
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
    "border-gray-700 w-20 sm:w-24  cursor-pointer items-center bg-black/70 border-1 h-min flex flex-col";
  a.href = "#" + char;
  const imgContainer = document.createElement("div");
  imgContainer.className = "w-full h-ffull";
  const imgElement = document.createElement("img");
  imgElement.className = "w-full h-full  aspect-square object-cover";
  imgElement.src = `${apiBaseLink}/char-imgs/${char}.jpg`;
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
  const charList = document.createElement("div");
  charList.className =
    "gap-2  max-h-full h-fçull flex flex-wrap overflow-y-auto";

  list.forEach((char) => {
    const a = createCharCard(char);
    charList.append(a);
  });
  return charList;
};
const renderFrameData = (characterData, type, n) => {
  const target = document.querySelector("#main-container");
  target.innerHTML = "";
  currentCharData = characterData;

  if (characterData == "Erro" || !characterData.frames) {
    hideHeader();

    target.innerHTML = "";
    charName.innerText = "Erro";
    const errorContent = document.createElement("h1");
    errorContent.className = "w-full text-xl text-neutral-500 text-center py-5";

    errorContent.innerText = "Erro: Framedata não encontrada ou indisponível";
    target.append(errorContent);
    return;
  }

  try {
    showHeader();
    //if (!contentDiv.classList.contains("sm:w-min")) {
    // contentDiv.classList.add("sm:w-min");
    // }
    charName.innerText = characterData.name;
    titleImgDiv.classList.remove("hidden");
    document.querySelector("#title-char-img").src =
      `${apiBaseLink}/char-imgs/${characterData.name}.jpg`;
  } catch (e) {}

  const renderTableUnique = () => {
    const createTr = (mainBody, input, i) => {
      const tr = document.createElement("tr");
      ["input", "range", "DMG", "speed", "block", "hit", "ch"].forEach(
        (data) => {
          const td = document.createElement("td");
          td.innerText = input[data] == "undefined" ? "?" : input[data];

          td.className = "p-2 border-y-neutral-800 border-y-1";
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
        },
      );

      tr.className =
        "cursor-pointer hover:bg-gradient-to-r from-indigo-900/20 to-indigo-950/20";
      // if (i % 2 === 0) {
      //   tr.classList.add("bg-neutral-950/60");
      // }
      mainBody.append(tr);
    };
    const wrapper = document.createElement("div");

    wrapper.className =
      "max-h-full h-full overflow-x-auto sm:overflow-visible max-w-full w-full min-w-full";
    wrapper.innerHTML = ` 
                  <table
                    class="min-w-full  max-w-full bg-neutral-900"
                  >
                    <thead class=" text-gray-300 border-x-zinc-900 border-x-1">
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

                        <th class="p-2 sticky top-0">
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
                    <tbody id=${"table-unique"} class="text-gray-400 " > </tbody>
                  </table>
             `;

    const mainBody = wrapper.querySelector("#table-unique");
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
      action.data.forEach((input, i) => {
        if (checkInput(input)) {
          createTr(mainBody, input, i);
        }
      });
    });
    return wrapper;
  };
  const renderCards = () => {
    const wrapper = document.createElement("div");
    wrapper.className =
      "h-full overflow-y-auto w-full  pt-2 pb-16 text-white flex flex-col sm:flex-row sm:flex-wrap items-center  gap-3";
    const createCard = (input) => {
      const cardDiv = document.createElement("div");
      cardDiv.className =
        " border-1 border-zinc-600 h-full w-98/100 max-w-98/100 sm:w-4/10 bg-indigo-900/5 ";
      const inputRow = document.createElement("p");
      inputRow.className = "p-2 text-lg";
      const demoCard = document.createElement("div");
      demoCard.className =
        "bg-neutral-950 w-full aspect-video flex justify-center items-center text-neutral-700";
      const demoVideo = document.createElement("video");
      demoVideo.className = "bg-black/50 w-full h-full aspect-video";

      // const iframedemo = document.createElement("iframe");
      // iframedemo.className = "bg-black w-full aspect-video";
      // iframedemo.src =
      //   "https://www.youtube.com/embed/UWN7eHdnqk4?si=zMr8Fpc3WoHSCcvN&amp;controls=0&start=25&rel=0&modestbranding=1";
      // iframedemo.allowFullscreen = true;
      const infosCard = document.createElement("div");
      infosCard.className = " w-full h-40 flex flex-wrap p-1 gap-y-1";
      ["range", "DMG", "speed", "block", "hit", "ch"].forEach((e) => {
        const infodiv = document.createElement("div");

        infodiv.className = " w-1/3 flex gap-2 px-1 flex flex-col";
        if (["range", "DMG", "block", "hit"].includes(e)) {
          infodiv.classList.add("border-r-1");
          infodiv.classList.add("border-neutral-700");
        }
        const infoName = document.createElement("span");
        infoName.className = "text-neutral-400";
        const infoData = document.createElement("span");
        infoName.innerText = e + ":";
        infoData.className = "break-all";
        infoData.innerText = input[e];
        if (input[e][0] === "-") {
          infoData.classList.add("text-red-400");
        } else if (input[e][0] === "+") {
          infoData.classList.add("text-green-600");
        }
        infodiv.append(infoName, infoData);
        infosCard.append(infodiv);
      });
      // demoVideo.className = "bg-black w-full aspect-video";
      // demoVideo.src = "https://www.youtube.com/watch?v=v0LgWMauW7A";
      if (false) {
        demoCard.append(demoVideo);
      } else {
        demoCard.innerText = "Demo indisponível";
      }

      inputRow.innerText = input.input;
      cardDiv.append(inputRow, demoCard, infosCard);
      return cardDiv;
    };
    const newData = [];

    characterData.frames.forEach((e) => {
      newData.push(...e.data);
      // e.data.forEach((input) => {
      //   if (checkInput(input)) {
      //     wrapper.append(createCard(input));
      //   }
      // });
    });

    startFrom = startFrom ? startFrom : 0;
    let filterData = [];
    newData.forEach((e) => {
      if (checkInput(e)) {
        filterData.push(e);
      }
    });
    filterData.slice(startFrom, startFrom + perPage).forEach((e) => {
      wrapper.append(createCard(e));
    });
    const div = document.createElement("div");
    div.className = "border-f1 w-full justify-center flex gap-2 flex-wrap";
    //  div.innerText = `total: ${filterData.length / perPage}, inteiro: ${Math.ceil(filterData.length / perPage)}`;
    const totalPages = Math.ceil(filterData.length / perPage);
    for (let index = 0; index < totalPages; index++) {
      const pageNCard = document.createElement("button");
      pageNCard.id = "pg-" + index * perPage;
      pageNCard.className =
        "border-1 border-neutral-900 px-3 p-1 aspect-square text-neutral-500";
      if ("pg-" + startFrom === pageNCard.id)
        [pageNCard.classList.add("btn-active")];
      pageNCard.innerText = index + 1;
      pageNCard.onclick = (e) => {
        startFrom = perPage * index;

        renderFrameData(currentCharData, modeView, startFrom);
        window.scrollTo({ top: 0, behavior: "smooth" });
      };

      div.append(pageNCard);
    }
    wrapper.append(div);
    return wrapper;
  };
  if (!type) {
    target.append(renderTableUnique());
  } else if (type === "cards") {
    target.append(renderCards());
  } else {
    target.append(renderTableUnique());
  }
};
window.addEventListener("hashchange", async () => {
  try {
    const character = window.location.hash.substring(1);
    if (character) {
      charListContainer.classList.add("hidden");
      mainContent.classList.remove("hidden");

      mainContainer.innerHTML = "";
      mainContainer.append(loadingContainer);
      const character = window.location.hash.substring(1);

      (renderFrameData(await getData(character), modeView, startFrom),
        loadingContainer.remove());
    } else {
      try {
        mainContent.classList.add("hidden");
        charListContainer.classList.remove("hidden");
        // charListContainer.append(loadingContainer);
        // const indexes = await getIndexes();

        // const teste = setInterval(() => {
        //   charListContainer.append(renderCharList(indexes.chars));
        //   loadingContainer.remove();
        //   clearInterval(teste);
        // }, 1000);
      } catch (e) {
        console.log(e);
      }
    }
  } catch (error) {
    console.log(error);
  }
});
window.addEventListener("DOMContentLoaded", async () => {
  try {
    if (window.location.hash) {
      charListContainer.classList.add("hidden");
      mainContent.classList.remove("hidden");
      mainContainer.innerHTML = "";
      mainContainer.append(loadingContainer);
      const character = window.location.hash.substring(1);

      renderFrameData(await getData(character), modeView, startFrom);
      loadingContainer.remove();
    }
  } catch (e) {
    console.log(e);
  }
});
window.addEventListener("DOMContentLoaded", async () => {
  if (!window.location.hash) {
    try {
      mainContent.classList.add("hidden");
      charListContainer.classList.remove("hidden");
      charListContainer.append(loadingContainer);
      const indexes = await getIndexes();

      charListContainer.append(renderCharList(indexes.chars));
      loadingContainer.remove();
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

// class renderFrameData {
//   constructor(characterData) {
//     currentCharData = characterData;
//     mainContainer.classList.remove("hidden");
//     charList.classList.add("hidden");

//     if (characterData == "Erro" || !characterData.frames) {
//       const target = document.querySelector("#main-container");
//       hideHeader();
//       target.innerHTML = "";
//       charName.innerText = "Erro";
//       const errorContent = document.createElement("h1");
//       errorContent.innerText = "Erro: Framedata não encontrada ou indisponível";
//       errorContent.style.width = "100%";
//       errorContent.style.color = "red";
//       if (contentDiv.classList.contains("sm:w-min")) {
//         contentDiv.classList.remove("sm:w-min");
//       }
//       titleImgDiv.classList.add("hidden");
//       target.append(errorContent);
//       return;
//     }
//     try {
//       showHeader();
//       if (!contentDiv.classList.contains("sm:w-min")) {
//         contentDiv.classList.add("sm:w-min");
//       }
//       charName.innerText = characterData.name;
//       titleImgDiv.classList.remove("hidden");
//       document.querySelector("#title-char-img").src =
//         `${apiBaseLink}/char-imgs/${characterData.name}.jpg`;
//     } catch (e) {}
//     this.target = document.querySelector("#main-container");
//     this.target.innerHTML = ``;
//   }

//   renderCard = () => {
//     const div = document.createElement("div");
//     div.className = "min-w-full min-h-full bg-red-800/40";
//     div.innerText = "text";
//     this.target.append(div);
//   };
//   renderTableUnique = () => {
//     const createTr = (mainBody, input) => {
//       const tr = document.createElement("tr");
//       ["input", "range", "DMG", "speed", "block", "hit", "ch"].forEach(
//         (data) => {
//           const td = document.createElement("td");
//           td.innerText = input[data] === undefined ? "?" : input[data];

//           td.className = "p-2 border-y-zinc-800 border-x-zinc-900 border-1";
//           if (data == "block" || data == "hit" || data == "ch") {
//             if (input[data][0] === "-") {
//               td.classList.add("text-red-600");
//             } else if (input[data][0] === "+") {
//               td.classList.add("text-green-600");
//             }
//           }

//           tr.append(td);
//           tr.onclick = () => {
//             tr.classList.toggle("bg-gradient-to-r");
//             tr.classList.toggle("text-blue-300");
//           };
//         },
//       );

//       tr.className =
//         "cursor-pointer text-nowrap   hover:bg-gradient-to-r from-slate-400/40 to-gray-400/40";
//       mainBody.append(tr);
//     };
//     const div = document.createElement("div");

//     div.className = "max-h-full gap-2 w-full";
//     div.innerHTML = `
//                <h1 class="h-min  text-gray-100 "></h1>
//               <div id="table-unique-container"}
//                 class="max-w-full h-95/100 max-h-d130 sm:max-h-200 bg-zinc-950/80 bg-gradijent-to-r from-gray-950/40 from-20% to-black/40 "
//               >

//                 <div class="h-full overflow-x-auto max-w-full ">
//                   <table
//                     class="table-auto sm:w-200"
//                   >
//                     <thead class="text-gray-300  border-x-zinc-900 border-x-1">
//                       <tr class="">
//                         <th class="p-2 sticky top-0">
//                           <div class="flex w-full ">
//                             <p>INPUT</p>
//                           </div>
//                         </th>
//                         <th class="p-2 sticky top-0">
//                           <div class="flex w-full ">
//                             <p>RANGE</p>
//                           </div>
//                         </th>
//                         <th class="p-2 sticky top-0">
//                           <div class="flex w-full ">
//                             <p>DMG</p>
//                           </div>
//                         </th>

//                         <th class="p-2 sticky top-0">
//                           <div class="flex w-full ">
//                             <p>SPEED</p>
//                           </div>
//                         </th>

//                         <th class="p-2 sticky top-0">
//                           <div class="flex w-full ">
//                             <p>BLOCK</p>
//                           </div>
//                         </th>

//                         <th class="p-2 sticky top-0  ">
//                           <div class="flex w-full ">
//                             <p>HIT</p>
//                           </div>
//                         </th>

//                         <th class="p-2 sticky top-0">
//                           <div class="flex w-full ">
//                             <p>CH</p>
//                           </div>
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody id=${"table-unique"} class="text-gray-400" > </tbody>
//                   </table>
//                 </div></div>`;

//     const mainBody = div.querySelector("#table-unique");
//     mainBody.innerHTML = "";
//     currentCharData.frames.forEach((action) => {
//       const trAction = document.createElement("tr");
//       trAction.className = `
//        text-nowrap border-x-zinc-900 border-x-1`;

//       const tdAction = document.createElement("td");
//       tdAction.innerText = action.action;
//       tdAction.className = "p-2 text-blue-400/80 text-lg";
//       trAction.append(tdAction);

//       mainBody.append(trAction);
//       action.data.forEach((input) => {
//         if (checkInput(input)) {
//           createTr(mainBody, input);
//         }
//       });
//     });
//     this.target.append(div);
//   };
//   // renderTableUnique(characterData);
// }
