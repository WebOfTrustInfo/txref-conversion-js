var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let request = obj => {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();

    request.timeout = 5000;
    request.addEventListener('load', () => {
      if (request.status >= 200 && request.status < 300) {
        resolve(request.responseText);
      } else {
        reject(new Error(request.responseText));
      }
    });
    request.addEventListener('error', () => {
      console.error(request.status);
      reject(new Error(request.status));
    });

    request.open(obj.method || "GET", obj.url);
    request.responseType = "json";
    if (obj.body) {
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send(JSON.stringify(obj.body));
    } else {
      request.send();
    }
  });
};


module.exports = {
  request: request
}
