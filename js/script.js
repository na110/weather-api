let findInput = document.getElementById("search");
let findBtn = document.getElementById("find-btn");
let inputLocation = document.getElementById("location");
let custom = document.querySelectorAll(".custom");
let statusPic = document.querySelectorAll(".status-pic");
let degree = document.querySelectorAll(".temp_c");
let weather = {};

async function api(callback) {
  var response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=b8f119c697aa4e8da27155804221106&q=${callback}&aqi=no`
  );

  var finalResult = await response.json();
  weather = finalResult;
  await locationName();
  await customFun();
  await statusPicFun();
  degreeFun();
}

//   LOCATION NAME
function locationName() {
  return new Promise(function (callback) {
    inputLocation.innerHTML = weather.location.name;
    callback();
  });
}

// CUSTOM
function customFun() {
  return new Promise(function (callback) {
    for (let i = 0; i < custom.length; i++) {
      custom[i].innerHTML = weather.current.condition.text;
    }
    callback();
  });
}

// STATUS PICTURE
function statusPicFun() {
  return new Promise(function (callback) {
    for (let i = 0; i < statusPic.length; i++) {
      statusPic[i].src = weather.current.condition.icon;
    }
    callback();
  });
}

// DEGREE
function degreeFun() {
  for (let i = 0; i < degree.length; i++) {
    degree[i].innerHTML = weather.current.temp_c;
  }
}

// FIND LOCATION
findInput.addEventListener("input", function () {
  var validation = /^[a-z]{0,8} {0,1}[a-z]{0,8}$/gim;
  if (validation.test(findInput.value)) {
    api(findInput.value);
  } else {
    alert("ivalid");
  }
});

api("london");
