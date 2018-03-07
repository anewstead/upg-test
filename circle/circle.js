(function Cirlce() {

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
    //set initial value to check against
    var p=pts[0];
    var minx=p.x;
    var miny=p.y;
    var maxx=p.x;
    var maxy=p.y;
    var cx,cy,r,i;//center-xy,radius,iterator

    for (i=1; i<pts.length; i++) {
      p=pts[i];
      if(p.x<minx){
        minx=p.x;
      }
      if(p.y<miny){
        miny=p.y;
      }
      if(p.x>maxx){
        maxx=p.x;
      }
      if(p.y>maxy){
        maxy=p.y;
      }
      //console.log(minx+':'+maxx+':'+miny+':'+maxy);
    }
    cx = minx+((maxx-minx)/2);
    cy = miny+((maxy-miny)/2);

    r=0;
    var dx,dy;//distance xy from center
    for (i=0; i<pts.length; i++) {
      p=pts[i];
      dx = Math.abs(cx-p.x);
      dy = Math.abs(cy-p.y);
      v = Math.sqrt( dx*dx + dy*dy );
      if(v>r){
        r=v;
      }
      // console.log(r);
    }


  //  r = Math.max(Math.abs(cx-minx),Math.abs(maxx-cx),Math.abs(cy-miny),Math.abs(maxy-cy));

    // console.log(minx+':'+maxx+':'+miny+':'+maxy);

    // console.log(cx+':'+cy);
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(cx,cy,3,0,2*Math.PI);//x,y,r,startangle,endangle
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(cx,cy,r,0,2*Math.PI);//x,y,r,startangle,endangle
    ctx.stroke();
    ctx.closePath();
  }

})();
