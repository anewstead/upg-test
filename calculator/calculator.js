(function Calculator() {

  //var operators = ['+', '-', 'x', '÷', '^', '%', '√'];
  var keys,
    screen,
    A,
    B,
    OP;

  window.addEventListener("load", init);

  function init() {
    screen = document.getElementById('screen');
    addEventListeners();
  }

  function addEventListeners() {
    keys = document.querySelectorAll('.calculator button');
    for (var i = 0; i < keys.length; i++) {
      keys[i].addEventListener("click", keyClickHandler);
    }
  }

  function keyClickHandler(e) {
    var btn = e.target;
    var val = btn.innerHTML;
    if (val == 'c') {
      reset();
    } else if (val == '=') {
      if(OP != '√'){
        doCalc();
      }
    } else if (val == '.') {
      addDecimal();
    } else if (val == '+/-') {
      invertNumber();
    } else if (isNaN(val)) {
      addOperator(val);
    } else {
      addNumber(val);
    }
  }

  function addDecimal() {
    if (screen.innerHTML.indexOf('.') == -1) {
      if (screen.innerHTML == '') {
        screen.innerHTML += '0';
      }
      screen.innerHTML += '.';
      setAB()
    }
  }

  function addNumber(val) {
    screen.innerHTML += val;
    setAB()
  }

  function setAB(){
    if (!OP) {
      A = screen.innerHTML;
    }else{
      A = screen.innerHTML.split(OP)[0];
      B = screen.innerHTML.split(OP)[1];
    }
    console.log('setAB:'+A+';'+B);
  }

  function invertNumber() {
    var str = screen.innerHTML;
    if (str.charAt(0) != '-') {
      screen.innerHTML = '-' + str;
    } else {
      screen.innerHTML = str.substring(1);
    }
    setAB()
  }

  function addOperator(val) {
    if (!validEntry()) {
      return;
    }
    //add 0 if trailing '.'
    var lastChar = screen.innerHTML[screen.innerHTML.length - 1]
    if (lastChar == '.') {
      screen.innerHTML += '0';
    }
    if (B) {
      doCalc();
    }

    OP = val;

    if (val == '√') {
      doCalc();
    }
    if (val != '√') {
      screen.innerHTML += val;
    }
  }

  function validEntry() {
    var txt = screen.innerHTML;
    if (txt != '' && txt != '.') {
      return true;
    }
    return false;
  }

  function doCalc() {
    if (B || OP == '√') {
      if (OP == '^') {
        displayCalc(evalPOW());
      }
      else if (OP == '√') {
        displayCalc(evalSQRT());
        OP=false;
      }
      else {
        if (validEntry()) {
          displayCalc(evalMath());
        }
      }
      A = screen.innerHTML;
      B = false;
    }
  }

  function evalMath() {
    if(B){
      var op = OP;
      if (op == '÷') {
        op = '/';
      } else if (op == 'x') {
        op = '*';
      }
      var eq = String(A) + String(op) + String(B);
      console.log(eq);
      return eval(eq);
    }
  }

  function reset() {
    A = B = OP = false;
    screen.innerHTML = '';
  }

  function evalSQRT() {
    return Math.sqrt(A);
  }

  function evalPOW() {
    return Math.pow(A, B);
  }

  function displayCalc(num) {
    screen.innerHTML = parseFloat(num.toFixed(12));
  }

})();
