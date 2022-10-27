var current = ""
var lastEntered = ""
var maxLength = 35
var calculation = document.getElementById('ans')
var numpad = document.getElementById('num')
var trig = document.getElementById('trig')

function dispDigits(number){
    if(current.length <= 35 && current.indexOf("0") != 0){
		current = current + number;
		calculation.value = current;
	}
	if(current.indexOf(".") != -1){
		current = current + number;
		calculation.value = current;
	}
}

function clearAll(){
    current = "";
    lastEntered = "";
    calculation.value = "0";
}

function addition(){
    lastEntered = current;
	current = current + "+";
	calculation.value = current;
}

function subtraction(){
    lastEntered = current;
	current = current + "-";
	calculation.value = current;
}
 
function division(){
    lastEntered = current;
	current = current + "/";
	calculation.value = current;
}

function multiplication(){
    lastEntered = current;
	current = current + "*";
	calculation.value = current;
}

function decimalPoint(){
    var decpnt = ".";
    current = current + decpnt;
    calculation.value = current;
}

function findPercent(){
    current = eval(current)/100;
    calculation.value = current;
}

function xToPowerOfY(){
    lastEntered = current;
    current = current + "^";
    calculation.value = current;
}

function sinFunction(){
    current = Math.sin(toDegree(eval(current)));
    calculation.value = current;
}

function cosFunction(){
    current = Math.cos(toDegree(eval(current)));
    calculation.value = current;
}

function tanFunction(){
    current = Math.tan(toDegree(eval(current)));
    calculation.value = current;
}


function factorial(){
    current = current + "!";
    calculation.value = current;
}

function exp(){
    lastEntered = current;
    current = current + "E";
    calculation.value = current;
}

function naturalLog(){
    current = Math.log(eval(current));
    calculation.value = current;
}

function logarithm(){
    current = Math.log10(eval(current));
    calculation.value = current;
}

function squareRoot(){
    current = current + "sqrt(";
    calculation.value = current;
}

function resultEqualsTo(){
    var expr = 'expr=' + encodeURIComponent(calculation.value);

  $.ajax({
    type: 'GET',
    url: 'https://api.mathjs.org/v4/',
    data: expr,
    contentType: 'application/json',
    success: function (result) {
      current = "";
      var ans = JSON.stringify(result, null, 2).replace(/[""]/g, '');
      current += ans;
      calculation.value = current;
    },
    error: function (resp) {
      alert('Error: ' + resp.responseText)
    }
  });
}




