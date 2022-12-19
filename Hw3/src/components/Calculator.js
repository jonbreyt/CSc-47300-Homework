import React, {useRef} from 'react';
import $ from 'jquery';

function Calculator(){
    /* const [prevAns, setPrevAns] = useState("");
    const [ans, setAns] = useState('0');
    const [operand, setOperand] = useState(""); */
    let currentProb = "";
    let forEval = "";
    let lastEntered = "";
    let trigFunctionInUse = false;
    const calculation = useRef();
    const scrn2 = useRef();

    const handleOperand = (e) => {
        let value = e.target.value;
        if(currentProb.length <= 35 && currentProb.indexOf("0") !== 0){
            forEval = forEval + value;
            currentProb = currentProb + value;
            calculation.current.value = currentProb;
        }
        if(currentProb.indexOf(".") !== -1){
            forEval = forEval + value;
            currentProb = currentProb + value;
            calculation.current.value = currentProb;
        }
        if(value === "."){
            var decpnt = ".";
            forEval = forEval + decpnt;
            currentProb = currentProb + decpnt;
            calculation.current.value = currentProb;
        }
    } 

    const handleOperator = (e) => {
        let value = e.target.value;
        if(value === "/"){
            forEval = forEval + value;
            lastEntered = currentProb;
            currentProb = currentProb + value;
            calculation.current.value = currentProb;
        }
        else if(value === "+"){
            forEval = forEval + value;
            lastEntered = currentProb;
            currentProb = currentProb + value;
            calculation.current.value = currentProb;
        }
        else if(value === "*"){
            forEval = forEval + value;
            lastEntered = currentProb;
            currentProb = currentProb + value;
            calculation.current.value = currentProb;
        }
        else if(value === "-"){
            forEval = forEval + value;
            lastEntered = currentProb;
            currentProb = currentProb + value;
            calculation.current.value = currentProb;
        }
        else if(value === "^"){
            forEval = forEval + value;
            lastEntered = currentProb;
            currentProb = currentProb + value;
            calculation.current.value = currentProb;
        }
        else if(value === "%"){
            currentProb = eval(currentProb)/100;
            calculation.current.value = currentProb;
        }
        else if(value === "!"){
            forEval = forEval + value;
            currentProb = currentProb + value;
            calculation.current.value = currentProb;
        }
        else if(value === "sqrt"){
            forEval = forEval + "sqrt(";
            currentProb = currentProb + "√(";
            calculation.current.value = currentProb;
        }
    }

    const handleDelete = (e) => {
        let value = e.target.value;
        if(value === "AC"){
            scrn2.current.value = "0";
            currentProb = "";
            forEval = "";
            lastEntered = "";
            calculation.current.value = "0";
        }
    }

    const handleParenthesis = (e) => {
        let value = e.target.value;
        if(value === "("){
            forEval = forEval + value;
            lastEntered = currentProb;
            currentProb = currentProb + value;
            calculation.current.value = currentProb;  
        }
    }

    const handleCPar = (e) => {
        let value = e.target.value;
        if(value === ")" && trigFunctionInUse === true){
            forEval = forEval + 'deg)';
            lastEntered = currentProb;
            currentProb = currentProb + value;
            calculation.current.value = currentProb;
            trigFunctionInUse = false;
            console.log("clicked");
        }
        else if(value === ")" && trigFunctionInUse === false){
            forEval = forEval + ')';
            lastEntered = currentProb;
            currentProb = currentProb + value;
            calculation.current.value = currentProb;
            console.log("clicked");
        }
        
    }

    const sciFunctions = (e) => {
        let value = e.target.value;
        if(value === "sin"){
            trigFunctionInUse = true;
            forEval = forEval + "sin(";
            lastEntered = currentProb;
            currentProb = currentProb + "sin(";
            calculation.current.value = currentProb;
        }
        else if(value === "tan"){
            trigFunctionInUse = true;
            forEval = forEval + "tan(";
            lastEntered = currentProb;
            currentProb = currentProb + "tan(";
            calculation.current.value = currentProb;
        }
        else if(value === "cos"){
            trigFunctionInUse = true;
            forEval = forEval + "cos(";
            lastEntered = currentProb;
            currentProb = currentProb + "cos(";
            calculation.current.value = currentProb;
        }
        else if(value === "exp"){
            forEval = forEval + "E";
            lastEntered = currentProb;
            currentProb = currentProb + "E";
            calculation.current.value = currentProb;
        }
        else if(value === "log"){
            forEval = forEval + "log10(";
            lastEntered = currentProb;
            currentProb = currentProb + "log(";
            calculation.current.value = currentProb;
        }
        else if(value === "ln"){
            forEval = forEval + "log(";
            lastEntered = currentProb;
            currentProb = currentProb + "ln(";
            calculation.current.value = currentProb;
        }

    }

    const handleEqualsTo = (e) => {
        let value = e.target.value;
        if(value === "="){
            var expr = 'expr=' + encodeURIComponent(forEval);

            $.ajax({
                type: 'GET',
                url: 'https://api.mathjs.org/v4/',
                data: expr,
                contentType: 'application/json',
                success: function (result) {
                    scrn2.current.value = currentProb + "="
                    currentProb = "";
                    var ans = JSON.stringify(result, null, 2).replace(/[""]/g, '');
                    currentProb += ans;
                    calculation.current.value = currentProb;
                },
                error: function (resp) {
                    alert('Error: ' + resp.responseText)
                }
            });
        }
    }

    return(
        <div id="calculator" className="calculator">
            <form id="screen" className="screen">
                <input id="previous" className='previous' type = "text" value = "" maxlength = "35" readonly ref={scrn2}></input>
                <input id="ans" className="ans" type = "text" value = "" maxlength = "35" readonly ref={calculation}></input>
            </form>
            <div id="keys" className="keys">
                <div class="row justify-content-md-center">
                    <button type="button" class="btn btn-secondary btn-sm" disabled>Deg</button>
                    <button type="button" value="!" id="fac" class="btn btn-secondary" onClick={handleOperator}>x!</button>
                    <button type="button" value="(" id="openpar"class="btn btn-secondary" onClick={handleParenthesis}>(</button>
                    <button type="button" value=")" id="closedpar" class="btn btn-secondary" onClick={handleCPar}>)</button>
                    <button type="button" value="%" id="prcnt" class="btn btn-secondary" onClick={handleOperator}>%</button>
                    <button type="button" value="AC" id="clr" class="btn btn-secondary" onClick={handleDelete}>AC</button>
                </div>
                <div class="row justify-content-md-center">
                    <button type="button" value="sin" id="trig" class="btn btn-secondary" onClick={sciFunctions}>sin</button>
                    <button type="button" value="ln" id="natl" class="btn btn-secondary" onClick={sciFunctions}>ln</button>
                    <button type="button" value="7" id="num" class="btn btn-secondary" onClick={handleOperand}>7</button>
                    <button type="button" value="8" id="num" class="btn btn-secondary" onClick={handleOperand}>8</button>
                    <button type="button" value="9" id="num" class="btn btn-secondary" onClick={handleOperand}>9</button>
                    <button type="button" value="/" id="divide" class="btn btn-secondary" onClick={handleOperator}>÷</button>
                </div>
                <div class="row justify-content-md-center">
                    <button type="button" value="cos" id="trig" class="btn btn-secondary" onClick={sciFunctions}>cos</button>
                    <button type="button" value="log" id="log" class="btn btn-secondary" onClick={sciFunctions}>log</button>
                    <button type="button" value="4" id="num" class="btn btn-secondary" onClick={handleOperand}>4</button>
                    <button type="button" value="5" id="num" class="btn btn-secondary" onClick={handleOperand}>5</button>
                    <button type="button" value="6" id="num" class="btn btn-secondary" onClick={handleOperand}>6</button>
                    <button type="button" value="*" id="multiply" class="btn btn-secondary" onClick={handleOperator}>&#215;</button>
                </div>
                <div class="row justify-content-md-center">
                    <button type="button" value="tan" id="trig" class="btn btn-secondary" onClick={sciFunctions}>tan</button>
                    <button type="button" value="sqrt" id="sqrt" class="btn btn-secondary" onClick={handleOperator}>&#8730;</button>
                    <button type="button" value="1" id="num" class="btn btn-secondary" onClick={handleOperand}>1</button>
                    <button type="button" value="2" id="num" class="btn btn-secondary" onClick={handleOperand}>2</button>
                    <button type="button" value="3" id="num" class="btn btn-secondary" onClick={handleOperand}>3</button>
                    <button type="button" value="-" id="minus" class="btn btn-secondary" onClick={handleOperator}>-</button>
                </div>
                <div class="row justify-content-md-center">
                    <button type="button" value="exp" class="btn btn-secondary" onClick={sciFunctions}>EXP</button>
                    <button type="button" value="^" class="btn btn-secondary" onClick={handleOperator}>x<sup>y</sup></button>
                    <button type="button" value="0" id="num" class="btn btn-secondary" onClick={handleOperand}>0</button>
                    <button type="button" value="." id="num" class="btn btn-secondary" onClick={handleOperand}>.</button>
                    <button type="button" value="=" id="equals" class="btn btn-primary" onClick={handleEqualsTo}>=</button>
                    <button type="button" value="+" id="add" class="btn btn-secondary" onClick={handleOperator}>+</button>
                </div>
            </div>
        </div>
    )
}

export default Calculator