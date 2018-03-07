(function FizzBuzz() {

  var container;
  var iCount;
  var count=1;

  window.addEventListener("load", init);

  function init() {
    container = document.getElementById('container');
    iCount = setInterval(fizzbuzz, 100)
  }

  function fizzbuzz(){
    // console.log('--'+iCount);
    var i = count;
    var txt = count;
    if(count%3==0 || String(count).indexOf('3')>-1){
      // console.log(count+'fizz');
      txt= 'Fizz';
    }
    if(count%5==0 || String(count).indexOf('5')>-1){
      // console.log(count+'buzz');
      if(txt=='Fizz'){
        txt+=' Buzz'
      }else{
        txt='Buzz';
      }
    }
    txt+='<br/>';
    container.innerHTML+=txt;

    if(++count > 100){
      clearInterval(iCount);
    }

  }

})();
