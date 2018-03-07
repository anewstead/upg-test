(function Circle() {

  var container;
  var canvas;
  var ctx;
  var pts;

  window.addEventListener("load", init);

  function init() {
    container = document.getElementById('container');
    canvas = document.getElementById('canvas');
    refresh = document.getElementById('refresh');
    refresh.addEventListener('click', doRefresh)
    ctx = canvas.getContext("2d");
    randomDots();
    circleDots()
  }

    function doRefresh(e) {
      randomDots();
      circleDots();
    }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  function randomDots() {
    pts=[];
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var n = getRandomIntInclusive(3, 12);
    var pad = getRandomIntInclusive(50, 100)
    var x,y;
    for (var i=0; i<n; i++) {
      x = getRandomIntInclusive(pad, canvas.width-pad);
      y = getRandomIntInclusive(pad, canvas.height-pad);
      pts.push({
        'x':x,
        'y':y
      })
      ctx.fillStyle = "#333333";
      ctx.beginPath();
      ctx.arc(x,y,3,0,2*Math.PI);//x,y,r,startangle,endangle
      ctx.fill();
  		ctx.closePath();
    }
    // console.log(x+';'+y);
  }

  /*
  find center of points (x,y)
  find furthest point from center (r)
  */
  function circleDots() {

    // algorithim from
    // https://www.nayuki.io/page/smallest-enclosing-circle
    var circle = window.makeCircle(pts);

    //draw center point
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(circle.x,circle.y,3,0,2*Math.PI);//x,y,r,startangle,endangle
    ctx.fill();
    ctx.closePath();

    //draw enclosing circle
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(circle.x,circle.y,circle.r,0,2*Math.PI);//x,y,r,startangle,endangle
    ctx.stroke();
    ctx.closePath();
  }

})();
