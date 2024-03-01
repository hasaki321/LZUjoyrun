const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const g = new util();
const { spawn } = require("child_process");

app.use(bodyParser.json());
app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors()
);

app.post("/joyrun", (req, res) => {
  let stid = req.body.stid;
  let spwd = req.body.spwd;
  let dis = req.body.dis;
  let pace = req.body.pace;
  let freq = req.body.freq;
  let place = req.body.place;
  if (place == "东操") {
    place = "dongcao";
  } else if (place == "西操") {
    place = "xicao";
  } else {
    place = "random";
  }
  stid = g.Base64.decode(stid);
  spwd = g.Base64.decode(spwd);
  console.log([stid, spwd, dis, pace, freq, place]);
  const pythonPath = "python3";
  const scriptPath = "../pre-main.py";
  const pythonProcess = spawn(pythonPath, [
    scriptPath,
    stid,
    spwd,
    dis,
    pace,
    freq,
    place,
  ]);

  let output = "";
  let error = "";

  pythonProcess.stdout.on("data", (data) => {
    output += data;
  });

  pythonProcess.stderr.on("data", (data) => {
    error += data;
  });

  pythonProcess.on("close", () => {
    let regex = /response.json error/;
    if (!error) {
      res.status(200).send("非常成功的一次跑步！:P 自律每一天! ");
      console.log("success");
    } else {
      console.log(`err:${error}`)
      if (regex.test(error)) {
        res.status(500).send("账号或密码错误，请重新输入");
      } else {
        res.status(500).send("遇到了一些意料之外的情况，请联系管理员");
      }
    }
    res.end();
  });
});

app.get("/joyrun", (req, res) => {
  res.format({
    html: () => {
      res.render("joyrun.ejs");
    },
  });
});
port = 4000
app.listen(port, () => {
  console.log(`Express web app on localhost:${port}`);
});

function util() {
  function Base64() {
    // private property
    var _keyStr =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    // public method for encoding
    var encode = function (input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;
      input = _utf8_encode(input);
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output =
          output +
          _keyStr.charAt(enc1) +
          _keyStr.charAt(enc2) +
          _keyStr.charAt(enc3) +
          _keyStr.charAt(enc4);
      }
      return output;
    };
    this.encode = encode;
    // public method for decoding
    var decode = function (input) {
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      while (i < input.length) {
        enc1 = _keyStr.indexOf(input.charAt(i++));
        enc2 = _keyStr.indexOf(input.charAt(i++));
        enc3 = _keyStr.indexOf(input.charAt(i++));
        enc4 = _keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
        }
      }
      output = _utf8_decode(output);
      return output;
    };
    this.decode = decode;
    // private method for UTF-8 encoding
    var _utf8_encode = function (string) {
      string = string.replace(/\r\n/g, "\n");
      var utftext = "";
      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if (c > 127 && c < 2048) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
      }
      return utftext;
    };
    // private method for UTF-8 decoding
    var _utf8_decode = function (utftext) {
      var string = "";
      var i = 0;
      var c = (c1 = c2 = 0);
      while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        } else if (c > 191 && c < 224) {
          c2 = utftext.charCodeAt(i + 1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        } else {
          c2 = utftext.charCodeAt(i + 1);
          c3 = utftext.charCodeAt(i + 2);
          string += String.fromCharCode(
            ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
          );
          i += 3;
        }
      }
      return string;
    };
  }
  this.Base64 = new Base64();
}
