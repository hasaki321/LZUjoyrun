/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
let g = new util();
function Submit() {
  let subimg = document.getElementById("submit_img");
  subimg.src = "imgs/submit.png";
  let div = document.getElementById("showdiv");
  div.style.display = "none";

  subimg.style.opacity = 1;
  setTimeout(function () {
    subimg.style.opacity = 0;
  }, 2000);

  let stid = document.getElementById("stid").value;
  let spwd = document.getElementById("spwd").value;
  let dis = document.getElementById("dis").value;
  let pace = document.getElementById("pace").value;
  let freq = document.getElementById("freq").value;
  let place = document.getElementById("place").value;
  stid = g.Base64.encode(stid);
  spwd = g.Base64.encode(spwd);

  let data = {
    stid: stid,
    spwd: spwd,
    dis: dis,
    pace: pace,
    freq: freq,
    place: place,
  };

  $.ajax({
    url: "http://101.43.184.204:4000/joyrun",
    type: "POST",
    dataType: "text",
    data: data,
    success: successCallback,
    error: errorCallback,
  });
}

successCallback = (data) => {
  let a = document.getElementById("show");
  let img = document.getElementById("img");
  let div = document.getElementById("showdiv");
  let err = document.getElementById("errordiv");
  err.style.display = "none";
  a.textContent = data;
  img.src = "imgs/success.jpg";
  div.style.display = "block";
};

errorCallback = (jqXHR, textStatus, errorThrown) => {
  let a = document.getElementById("show");
  let img = document.getElementById("img");
  let div = document.getElementById("showdiv");
  let err = document.getElementById("errordiv");

  err.style.display = "block";
  a.textContent = "呃...出了点问题 D:";
  img.src = "imgs/fail.jpg";
  div.style.display = "block";
  let errt = document.getElementById("error_text");
  errt.textContent = jqXHR.responseText;
};
