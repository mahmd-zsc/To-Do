// local/Storage.clear();
// main
let arrayOfTasks = [];
let data = [];
let completed = [];
let starArray = [];
let important = [];
let plan = [];
let allArray = [];

allCount();
//aside
let aside = document.querySelectorAll("aside ul li");
console.log(aside)
let all = document.querySelectorAll(" atrial .boxes");
console.log(all)
aside.forEach((li) => {
  if (window.localStorage.active) {
    aside.forEach((li) => {
      if (li.id === window.localStorage.active) {
        li.classList.add("active");
        document.title = `To Do - ${li.id}`;
      }
    });
  }
  li.onclick = function () {
    // deleted();
    // deletedStar();
    all.forEach((e) => {
      e.classList.remove("d-flex");
      if (e.classList.contains(li.id)) {
        e.classList.add("d-flex");
      }
    });
    if (li.id === "new") {
      return;
    }
    aside.forEach((li) => {
      li.classList.remove("active");
    });

    li.classList.add("active");
    let name = li.getAttribute("data-title");
    document.title = `To Do - ${name}`;
    window.localStorage.active = li.id;
  };
});

// -------------------------------------------------------
// chick();
// star("important");
// star("today");

// deleted();
// allStorageChick();
// checkboxes_Imp();
// checkboxes_day();
// deletedStar();

//Today
let toDayForm = document.querySelector(".today form");
let todayText = document.querySelector(".today input[type='text']");
toDayForm.addEventListener("submit", (e) => {
  let spaceValue = todayText.value.trim();
  deleteText("today", arrayOfTasks, spaceValue, false, todayText);
  deleted();
  checkboxes_day();
  star("today");
  allCount();
  e.preventDefault();
});
// all
// let allForm = document.querySelector(".all form");
// let allText = document.querySelector(".all input[type='text']");
// allForm.addEventListener("submit", (e) => {
//   let spaceValue = allText.value.trim();
//   deleteText("all", allArray, spaceValue, false, allText);
//   deleted();
//   checkboxes_all();
//   star("all");
//   allCount();
//   e.preventDefault();
// });

//important
let importantForm = document.querySelector(".important form");
let importantText = document.querySelector(".important input[type='text']");
importantForm.addEventListener("submit", (e) => {
  let spaceValue = importantText.value.trim();
  deleteText("important", important, spaceValue, true, importantText);
  deleted();
  checkboxes_Imp();
  star("important");
  deletedStar();
  allCount();
  e.preventDefault();
});

//plan
let planForm = document.querySelector(".plan form");
let planText = document.querySelector(".plan input[type='text']");
let date = document.querySelector(".plan input[type='date']");

planForm.addEventListener("submit", (e) => {
  console.log(date.value);
  let spaceValue = planText.value.trim();
  deleteText("plan", plan, spaceValue, false, planText, date.value);
  deleted();
  checkboxes_plan();
  star("plan");
  allCount();
  e.preventDefault();
});

// function

// make element of task
function createList(where, arr, text, complete, id, date) {
  if (where == "plan") {
    lists = document.querySelector(".plan .lists");
    let list = document.createElement("div");
    list.className = "list d-flex justify-content-between align-items-center";
    list.classList.add(".topToDown");
    // list.classList.add("animate__bounceOut");
    list.id = id;
    lists.prepend(list);
    let div = document.createElement("div");
    div.className = "chickText";
    list.appendChild(div);
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checked";

    div.appendChild(checkbox);
    let span = document.createElement("span");
    span.innerHTML = text;
    let calender = document.createElement("span");
    calender.className = "date";
    calender.innerHTML = date;
    div.appendChild(span);
    let images = document.createElement("div");
    images.className = "images d-flex gap-2";
    let del = document.createElement("img");
    del.className = "delete";
    del.src = "images/icon/trash.png";
    let star = document.createElement("img");
    star.className = "star";
    if (complete == false) {
      star.src = "images/icon/star-false.png";
    } else {
      star.src = "images/icon/star-true.png";
    }
    list.appendChild(images);
    images.appendChild(calender);
    images.appendChild(star);
    images.appendChild(del);
  } else {
    if (where == "today") {
      lists = document.querySelector(".today .lists");
      let list = document.createElement("div");
      list.className = "list d-flex justify-content-between align-items-center";
      list.classList.add(".topToDown");
      // list.classList.add("animate__bounceOut");
      list.id = id;
      lists.prepend(list);
      let div = document.createElement("div");
      div.className = "chickText";
      list.appendChild(div);
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "checked";

      div.appendChild(checkbox);
      let span = document.createElement("span");
      span.innerHTML = text;
      div.appendChild(span);
      let images = document.createElement("div");
      images.className = "images d-flex gap-2";
      let del = document.createElement("img");
      del.className = "delete";
      del.src = "images/icon/trash.png";
      list.appendChild(images);
      images.appendChild(del);
    } else {
      if (where == "important") {
        lists = document.querySelector(".important .lists");
      }
      if (where == "all") {
        lists = document.querySelector(".all .lists");
      }
      let list = document.createElement("div");
      list.className = "list d-flex justify-content-between align-items-center";
      list.classList.add(".topToDown");
      // list.classList.add("animate__bounceOut");
      list.id = id;
      lists.prepend(list);
      let div = document.createElement("div");
      div.className = "chickText";
      list.appendChild(div);
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "checked";

      div.appendChild(checkbox);
      let span = document.createElement("span");
      span.innerHTML = text;
      div.appendChild(span);
      let images = document.createElement("div");
      images.className = "images d-flex gap-2";
      let del = document.createElement("img");
      del.className = "delete";
      del.src = "images/icon/trash.png";
      let star = document.createElement("img");
      star.className = "star";
      if (complete == false) {
        star.src = "images/icon/star-false.png";
      } else {
        star.src = "images/icon/star-true.png";
      }
      list.appendChild(images);
      images.appendChild(star);
      images.appendChild(del);
    }
  }

  if (where == "today") {
    window.localStorage.list = JSON.stringify(arr);
  } else if (where == "important") {
    window.localStorage.important = JSON.stringify(arr);
  } else if (where == "all") {
    window.localStorage.all = JSON.stringify(arr);
  } else if (where == "plan") {
    window.localStorage.plan = JSON.stringify(arr);
  }
}

// make chick if there is list in local storage or not
//then make loop on the list and make createList function
function chick() {
  if (localStorage.list) {
    let dataList = JSON.parse(localStorage.list);
    dataList.forEach((e) => {
      createList("today", arrayOfTasks, e.title, e.complete, e.id);
    });
    arrayOfTasks = dataList;
    localStorage.list = JSON.stringify(arrayOfTasks);
  }
  if (localStorage.important) {
    let dataImportant = JSON.parse(localStorage.important);
    dataImportant.forEach((e) => {
      createList("important", important, e.title, e.complete, e.id);
    });
    important = dataImportant;
    localStorage.important = JSON.stringify(important);
  }
  if (localStorage.complete) {
    dataCom = JSON.parse(localStorage.complete);
    dataCom.forEach((e) => {
      createCompleted(e.title, e.id);
    });
    completed = dataCom;
    localStorage.complete = JSON.stringify(completed);
  }
  if (localStorage.all) {
    let dataAll = JSON.parse(localStorage.all);
    dataAll.forEach((e) => {
      createList("all", allArray, e.title, e.complete, e.id);
    });
    allArray = dataAll;
    localStorage.all = JSON.stringify(allArray);
  }
  if (localStorage.plan) {
    dataPlan = JSON.parse(localStorage.plan);
    dataPlan.forEach((e) => {
      createList("plan", plan, e.title, e.complete, e.id, e.date);
    });
    plan = dataPlan;
    localStorage.plan = JSON.stringify(plan);
  }

  if (window.localStorage.backgroundActive) {
    let backgrounds = document.querySelectorAll(".background ul li img");
    backgrounds.forEach((img) => {
      data = JSON.parse(window.localStorage.backgroundActive);
      if (img.getAttribute("src") === data) {
        img.classList.add("light");
      }
    });
  }
}
// when click on trash delete the task from the page and local storage

function deleted() {
  let list = document.querySelectorAll(".list");
  let del = document.querySelectorAll(".lists .list .delete");
  del.forEach((d, index) => {
    d.onclick = () => {
      list[index].classList.add("animate__bounceOut");
      remove_time_storage(list[index], 700);
      deletedAllFromLocalStorage(list[index]);
      deletedImportantFromLocalStorage(list[index]);
      deletedListFromLocalStorage(list[index]);
      deletedPlanFromLocalStorage(list[index]);
      deletedComFromLocalStorage(list[index]);
      allCount();
    };
  });
}

function deletedStar() {
  let list = document.querySelectorAll(".important .list");
  let stars = document.querySelectorAll(".important .lists .list .star");
  // let data = JSON.parse(localStorage.list);
  let dataImp = JSON.parse(localStorage.important);
  stars.forEach((star) => {
    star.onclick = function () {
      let parent = star.parentElement.parentElement;

      deletedImportantFromLocalStorage(parent);
      parent.remove();
      allCount();
    };
  });
}
// limit time after then make espial function
function remove_time_storage(element, time) {
  setTimeout(() => {
    element.remove();
  }, time);
}
// delete task from local storage
function deletedListFromLocalStorage(element) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != element.id);
  window.localStorage.list = JSON.stringify(arrayOfTasks);
}
function deletedPlanFromLocalStorage(element) {
  plan = plan.filter((task) => task.id != element.id);
  window.localStorage.plan = JSON.stringify(plan);
}
function deletedImportantFromLocalStorage(element) {
  important = important.filter((task) => task.id != element.id);
  window.localStorage.important = JSON.stringify(important);
}
function deletedAllFromLocalStorage(element) {
  allArray = allArray.filter((task) => task.id != element.id);
  window.localStorage.all = JSON.stringify(allArray);
}
function deletedComFromLocalStorage(element) {
  completed = completed.filter((task) => task.id != element.id);
  window.localStorage.complete = JSON.stringify(completed);
}
// checkboxes
function checkboxes_day() {
  let checkboxes = document.querySelectorAll(".checked");
  let ball = document.querySelector(".ball");

  checkboxes.forEach((e) => {
    e.onclick = () => {
      let this_list = e.parentElement.parentElement;
      arrayOfTasks.forEach((e) => {
        if (e.id == this_list.id) {
          e.time = new Date();
          completed.push(e);
          createCompleted(e.title, e.id);
        }
      });
      ball.play();
      window.localStorage.complete = JSON.stringify(completed);
      remove_time_storage(this_list, 300);

      deletedListFromLocalStorage(this_list);
      allCount();
    };
  });
}
function checkboxes_all() {
  let checkboxes = document.querySelectorAll(".checked");
  let ball = document.querySelector(".ball");

  // const audio = new Audio(
  //   "/ToDo List/Audio/mixkit-bike-magical-bell-591 (mp3cut.net).wav"
  // );

  checkboxes.forEach((e) => {
    e.onclick = () => {
      let this_list = e.parentElement.parentElement;
      allArray.forEach((e) => {
        if (e.id == this_list.id) {
          e.time = new Date();
          completed.push(e);
          createCompleted(e.title, e.id);
        }
      });
      ball.play();
      window.localStorage.complete = JSON.stringify(completed);
      remove_time_storage(this_list, 300);

      deletedAllFromLocalStorage(this_list);
      allCount();
    };
  });
}
function checkboxes_Imp() {
  let checkboxes = document.querySelectorAll(".checked");
  let ball = document.querySelector(".ball");

  checkboxes.forEach((e) => {
    e.onclick = () => {
      ball.play();
      let this_list = e.parentElement.parentElement;
      important.forEach((e) => {
        if (e.id == this_list.id) {
          e.time = new Date();
          completed.push(e);
          createCompleted(e.title, e.id);
        }
      });
      // audio.play();
      window.localStorage.complete = JSON.stringify(completed);
      remove_time_storage(this_list, 300);

      deletedImportantFromLocalStorage(this_list);
      allCount();
    };
  });
}
function checkboxes_plan() {
  let checkboxes = document.querySelectorAll(".checked");
  let ball = document.querySelector(".ball");

  checkboxes.forEach((e) => {
    e.onclick = () => {
      ball.play();
      let this_list = e.parentElement.parentElement;
      plan.forEach((e) => {
        if (e.id == this_list.id) {
          e.time = new Date();
          completed.push(e);
          createCompleted(e.title, e.id);
        }
      });
      // audio.play();
      window.localStorage.complete = JSON.stringify(completed);
      remove_time_storage(this_list, 300);

      deletedPlanFromLocalStorage(this_list);
      allCount();
    };
  });
}
// ---------------------------------------------------------
function star(arr) {
  let importantStars = [];
  if (arr === "today") {
    if (localStorage.list) {
      let data = JSON.parse(localStorage.list);
      let stars = document.querySelectorAll(".today .star");
      stars.forEach((star) => {
        star.onclick = function () {
          let src = star.getAttribute("src");

          if (src === "images/star-false.png") {
            star.setAttribute("src", "images/star-true.png");
            data.forEach((dat) => {
              if (dat.id == star.parentElement.parentElement.id) {
                dat.complete = true;
              }
            });
          } else if (src === "images/star-true.png") {
            star.setAttribute("src", "images/star-false.png");
            data.forEach((dat) => {
              if (dat.id == star.parentElement.parentElement.id) {
                dat.complete = false;
              }
            });
          }

          window.localStorage.list = JSON.stringify(data);
        };
      });
    }
  }
  if (arr === "all") {
    if (localStorage.all) {
      let data = JSON.parse(localStorage.all);
      let stars = document.querySelectorAll(".all .star");
      stars.forEach((star) => {
        star.onclick = function () {
          let src = star.getAttribute("src");

          if (src === "images/star-false.png") {
            star.setAttribute("src", "images/star-true.png");
            data.forEach((dat) => {
              if (dat.id == star.parentElement.parentElement.id) {
                dat.complete = true;
              }
            });
          } else if (src === "images/star-true.png") {
            star.setAttribute("src", "images/star-false.png");
            data.forEach((dat) => {
              if (dat.id == star.parentElement.parentElement.id) {
                dat.complete = false;
              }
            });
          }
          window.localStorage.all = JSON.stringify(data);
        };
      });
    }
  }

  if (arr === "plan") {
    if (localStorage.plan) {
      let data = JSON.parse(localStorage.plan);
      let stars = document.querySelectorAll(".plan .star");
      stars.forEach((star) => {
        star.onclick = function () {
          let src = star.getAttribute("src");

          if (src === "images/star-false.png") {
            star.setAttribute("src", "images/star-true.png");
            data.forEach((dat) => {
              if (dat.id == star.parentElement.parentElement.id) {
                dat.complete = true;
              }
            });
          } else if (src === "images/star-true.png") {
            star.setAttribute("src", "images/star-false.png");
            data.forEach((dat) => {
              if (dat.id == star.parentElement.parentElement.id) {
                dat.complete = false;
              }
            });
          }
          window.localStorage.plan = JSON.stringify(data);
        };
      });
    }
  }
}
function addTaskToArray(arr, text, id, star, date) {
  let task = { id: id, title: text, complete: star, date };
  arr.push(task);
}

function allStorageChick() {
  if (window.localStorage.active) {
    all.forEach((e) => {
      if (e.classList.contains(window.localStorage.active)) {
        e.classList.add("d-flex");
      }
    });
  }
}
function deleteText(where, arr, spaceValue, complete, text, date) {
  if (text.value != "" && spaceValue != "") {
    if (where === "today") {
      addTaskToArray(arr, text.value, Date.now(), false);
    }
    if (where === "important") {
      addTaskToArray(arr, text.value, Date.now(), true);
    }
    if (where === "all") {
      addTaskToArray(arr, text.value, Date.now(), false);
    }
    if (where === "plan") {
      addTaskToArray(arr, text.value, Date.now(), false, date);
    }
    createList(where, arr, text.value, complete, Date.now(), date);
    text.value = "";
  }
}
function createCompleted(text, id) {
  let completeList = document.querySelector(".completed .lists");
  let list = document.createElement("div");
  list.setAttribute("class", "list");
  list.setAttribute("id", id);
  let tex = document.createElement("del");
  tex.textContent = text;
  let trash = document.createElement("img");
  trash.src = "images/icon/trash.png";
  trash.className = "delete";
  list.append(tex, trash);
  completeList.appendChild(list);
}

function filters(arr) {
  const uniqueArr = [...new Set(arr.map((item) => item.id))]
    .map((id) => arr.find((item) => item.id === id))
    .filter((item) => item);
  return uniqueArr;
}

function allCount() {
  function counting(arr, where) {
    // let li = document.querySelector("aside ul #today")
    let li = document.querySelector(`aside ul #${where}`);
    let num = document.querySelector(`aside ul #${where} .num`);
    let data;
    if (where === "today") {
      if (localStorage.list) {
        data = JSON.parse(localStorage.list);
        num.textContent = data.length;
      }
    }
    if (where === "important") {
      if (localStorage.important) {
        data = JSON.parse(localStorage.important);
        num.textContent = data.length;
      }
    }
    if (where === "completed") {
      if (localStorage.complete) {
        data = JSON.parse(localStorage.complete);
        num.textContent = data.length;
      }
    }
    // if (where === "all") {
    //   if (localStorage.all) {
    //     data = JSON.parse(localStorage.all);
    //     num.textContent = data.length;
    //   }
    // }
    if (where === "plan") {
      if (localStorage.plan) {
        data = JSON.parse(localStorage.plan);
        num.textContent = data.length;
      }
    }
  }
  counting(arrayOfTasks, "today");
  counting(important, "important");
  counting(completed, "completed");
  counting(plan, "plan");
  // counting(allArray, "all");
}

let parent = document.querySelector(".parent");
let backgrounds = document.querySelectorAll(".background ul li img");
backgrounds.forEach((img) => {
  img.onclick = () => {
    var images = img.getAttribute("data-img");
    backgrounds.forEach((e) => [e.classList.remove("light")]);
    img.classList.add("light");

    src = img.getAttribute("src");
    window.localStorage.backgroundActive = JSON.stringify(src);
    console.log(images);
    parent.style.cssText = `background-image: url(${images})`;
    window.localStorage.background = JSON.stringify(images);
  };
});
localStorage.cl