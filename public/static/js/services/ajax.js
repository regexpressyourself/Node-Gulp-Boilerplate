let httpGetAsync = (theUrl, callback) => { //theURL or a path to file
  let httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      let data = httpRequest.responseText; //if you fetch a file you can JSON.parse(httpRequest.responseText)
      if (callback) {
        callback(data);
      }
    }
  };

  httpRequest.open('GET', theUrl, true);
  httpRequest.send(null);
}


let httpPostAsync = (theUrl, payload, callback) => { //theURL or a path to file
  let httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      let data = httpRequest.responseText; //if you fetch a file you can JSON.parse(httpRequest.responseText)
      if (callback) {
        callback(data);
      }
    }
  };

  httpRequest.open('POST', theUrl, true);
  httpRequest.setRequestHeader('Content-Type', 'application/json');
  httpRequest.send(JSON.stringify({
    payload: payload
  }));
}
