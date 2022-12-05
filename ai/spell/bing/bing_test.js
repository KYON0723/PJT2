"use strict";
let https = require("https");
// const axios = require("axios").default;

let host = "api.bing.microsoft.com";
let path = "/v7.0/spellcheck";
let key = "ce11f020da1241f182ed7ee34ec9fcc1";
// let key = "a4c16387baad41bc954d67b2b108c20d";
// let key = "<ENTER-KEY-HERE>";

let mkt = "en-US";
let mode = "proof";
let text = "Hollo, wrld! iwas a car, plz i colundd hel pyuo";
let query_string = "?mkt=" + mkt + "&mode=" + mode;
let wrongWordList = {};

let request_params = {
  method: "POST",
  hostname: host,
  path: path + query_string,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Length": text.length + 5,
    "Ocp-Apim-Subscription-Key": key,
  },
};

let response_handler = function (response) {
  let body = "";
  response.on("data", function (d) {
    body += d;
  });
  response.on("end", function () {
    let body_ = JSON.parse(body);
    console.log(body_);
    // console.log(body_.flaggedTokens);
    for (const word of body_.flaggedTokens) {
      for (const sugges of word.suggestions) {
        if (sugges.score >= 0.65) {
          // console.log(word.token, sugges);
          if (typeof wrongWordList[word.token] == "undefined") {
            wrongWordList[word.token] = [];
          }
          let temp = wrongWordList[word.token];
          // console.log(typeof temp);
          temp.push(sugges.suggestion);
          wrongWordList[word.token] = temp;
        }
        // wrongWordList[word.token]
      }
    }
    console.log(text);
    console.log(wrongWordList);
  });
  response.on("error", function (e) {
    console.log("Error: " + e.message);
  });
};

// let req = null;
// axios({
//   method: "post",
//   hostname: host,
//   url: path + query_string,
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//     "Content-Length": text.length + 5,
//     "Ocp-Apim-Subscription-Key": key,
//   },
// })
//   .then(function (response) {
//     // console.log(response);
//     let body_ = JSON.parse(body);
//     // console.log(body_);
//     // console.log(body_.flaggedTokens);
//     // for (const word of body_.flaggedTokens) {
//     //   for (const sugges of word.suggestions) {
//     //     if (sugges.score >= 0.65) {
//     //       // console.log(word.token, sugges);
//     //       if (typeof wrongWordList[word.token] == "undefined") {
//     //         wrongWordList[word.token] = [];
//     //       }
//     //       let temp = wrongWordList[word.token];
//     //       // console.log(typeof temp);
//     //       temp.push(sugges.suggestion);
//     //       wrongWordList[word.token] = temp;
//     //     }
//     //     // wrongWordList[word.token]
//     //   }
//     // }
//     // console.log(text);
//     // console.log(wrongWordList);
//   })
//   .catch(function (error) {
//     console.log(error);
//     // console.log("안된다!");
//   });

// let req = axios.request(request_params, response_handler);
let req = https.request(request_params, response_handler);

req.write("text=" + text);
req.end();
