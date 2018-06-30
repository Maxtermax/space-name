export const calcCenter = (container, item) => {
  let x = container.x + (container.width / 2) - (item.width / 2);
  let y = container.y + (container.height / 2) - (item.height / 2);
  return { y, x }
}

export const isCollide = (type = 'square', a, b) => {
  if (type === 'square') {
    let x = (a.x >= b.x) && (a.x <= b.x + (b.width || b.bulletWidth));
    let y = (a.y >= b.y) && (a.y <= b.y + (b.height || b.bulletHeight));
    return x && y;
  }
  if (type === 'circle') {
    let overLapX = a.x + a.r >= b.x - b.r && a.x - a.r <= b.x + b.r;
    let overLapY = a.y + a.r >= b.y - b.r && a.y - a.r <= b.y + b.r;
    return overLapX && overLapY;
  }
}


export const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export const calcCartesiano = (candidateX, candidateY, canvas) => {
    let x = candidateX-(canvas.width/2);
    //console.log(x)
    let y = (canvas.height/2) - candidateY;    
    return { x, y };
}

export const coordidatesToDeg = (x, y) => {
  let rad = Math.atan2(y, x);
  let deg = rad * 360 / (2* Math.PI);
  return deg;
}

export const getMousePos = (canvas, evt) => {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  }
}



export const touchEvents = (DOMelement, type = 'drag', cb) => {
  if (type === 'drag') {
    let hold = false;
    DOMelement.addEventListener("touchstart", (e) => hold = true, false);
    DOMelement.addEventListener("touchend", (e) => {
      hold = false;
      e.dragStop = true;
      cb(e);
    }, false);
    DOMelement.addEventListener("touchleave", (e) => {
      hold = false;
      e.dragStop = true;
      cb(e);
    }, false);
    DOMelement.addEventListener("touchmove", (e) => hold ? cb(e) : null, false);

    DOMelement.addEventListener('mousedown', (e) => hold = true);
    DOMelement.addEventListener('mousemove', (e) => hold ? cb(e) : null);
    DOMelement.addEventListener('mouseup', (e) => {
      hold = false;
      e.dragStop = true;
      cb(e);
    });
  }
}

export const everyFrame = (data, cb) => {
  let delta = Date.now() - data.initialTime;
  //console.log('delta  ', delta)
  if (delta >= data.futureTime) {
    cb(data);
    data.initialTime = Date.now();  
  }
}

export const clear = (canvas) => canvas.width = canvas.width;

export const hover = (element = window, cb) => {
  element.addEventListener('mousemove', function (e) {
    let data = element.getBoundingClientRect();
    let x = e.clientX - data.x;
    let y = e.clientY - data.y;
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    cb({ x, y });
  })
}

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}