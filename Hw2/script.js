var current = ""
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
    calculation.value = "0";
}
//Addition function
function addition(){
	current = current + "+";
	calculation.value = current;
}
//Subtraction function
function subtraction(){
	current = current + "-";
	calculation.value = current;
}
//Multiplication function 
function division(){
	current = current + "/";
	calculation.value = current;
}
//Division function
function multiplication(){
	current = current + "*";
	calculation.value = current;
}

function decimalPoint(){
    var decpnt = ".";
    if(current.indexOf(".") == -1){
        current = current + decpnt;
        calculation.value = current;
    }
}

function findPercent(){
    current = eval(current)/100;
    calculation.value = current;
}

function xToPowerOfY(){
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
    current = factorialFunction(eval(current));
    calculation.value = current;
}

function exp(){
    var disp = current + "E";
    current = "";
    calculation.value = disp;
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
    current = Math.sqrt(eval(current));
    calculation.value = current;
}

function resultEqualsTo(){
    var expr = '?expr=' + encodeURIComponent(calculation.value);

  $.ajax({
    type: 'POST',
    url: 'http://api.mathjs.org/v4/',
    data: expr,
    contentType: 'application/json',
    success: function (result) {
      alert(JSON.stringify(result, null, 2))
    },
    error: function (resp) {
      alert('Error: ' + resp.responseText)
    }
  });
}




