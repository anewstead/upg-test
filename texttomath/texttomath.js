(function TextToMath() {

  var container;

  var txt = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'  //charCode test info  // var txt = 'abcdefghijklmnopqrstuvwxyz';//97-122  // var txt = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';//65-90  window.addEventListener("load", init);

  function init() {
    container = document.getElementById('container');
    parseTxt();
  }

  function parseTxt() {
    //check no extra white space and split to array
    var txt2 = txt.replace(/\s+/g, " ")
    .split('');

    //loop and swap letter
    var str='';
    for (var i=0; i < txt2.length; i++) {
      var c = txt2[i].charCodeAt(0);
      var n;
      //console.log(n);
      if(c>=97 && c<=122){
        n=c-97;//lowercase
      }
      else if (c>=65 && c<=90) {
        n=(c-65)+1;//uppercase
      }
      else{
        n=txt2[i];
      }
      str+=n;
    }

    //replace math
    var txt3 = str.replace(/\,\s+/g, "-")
    .replace(/\.\s+/g, "*")
    .replace(/\s+/g, "+");

    //remove trailing .
    if (txt3.charAt(txt3.length-1) == '.') {
      txt3 = txt3.substr(0, txt3.length-1);
    }

    //console.log(txt3);

    var compute = eval(txt3);

    container.innerHTML+='<div>'+txt+'</div>';
    container.innerHTML+='<div>'+txt3+'</div>';
    container.innerHTML+='<div>'+compute+'</div>';
  }


})();
