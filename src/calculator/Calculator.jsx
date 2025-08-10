import React, { useState } from "react";
import "./calculator.css";

// This is the main Calculator component.
function Calculator() {
    // `input` stores the current string of numbers and operators.
    const [input, setInput] = useState("");
    // `result` stores the calculated final value.
    const [result, setResult] = useState("");
    const [isOperatorsDisabled, setOperatorsDisabled] = useState(true);
    const [isEqualOperatorDisabled, setEqualOperatorDisabled] = useState(true);
    const operators = ["/", "*", "-", "+", "."];

    // This function handles all button clicks.
    const handleClick = (value) => {
        // Handle special function buttons.
        if (value === "=") {
            try {
                // The `eval()` function is used to calculate the result of the expression.
                // Note: `eval()` can be unsafe for production applications with user-provided input,
                // but it's suitable for a simple example like this.
                // eslint-disable-next-line no-eval
                setResult(eval(input).toString());
                input && setInput(result); // Clear input after calculation.
            } catch (error) {
                // Display "Error" if the calculation fails (e.g., an invalid expression).
                setResult("Error");
            }
        } else if (value === "C") {
            // "C" button clears both the input and the result.
            setInput("");
            setResult("");
        } else if (value === "DEL") {
            // "DEL" button deletes the last character from the input string.
            setInput(input.slice(0, -1));
        } else {
            if (!operators.includes(value)) {
                setResult(eval((input + value)).toString())
            }
            setInput(input + value);
        }

        toogleOperatorDisabled(input + value);
    };

    function toogleOperatorDisabled(inputDetails) {
        console.log(inputDetails);
        if (inputDetails.endsWith("+") || inputDetails.endsWith("-") || inputDetails.endsWith("*") || inputDetails.endsWith("/")) {
            setOperatorsDisabled(true);
        } else {
            setOperatorsDisabled(false);
        }
    }

    return (
        <div className="calculator">
            <h1>Calculator</h1>
            {/* The display area shows the current input and the last result */}
            <div className="display">
                {/* The input field is read-only and displays the `input` state */}
                <input type="text" value={input} readOnly />
                {/* The result div displays the `result` state */}
                <div className="result">{result}</div>
            </div>
            <div className="keypad">
                <button onClick={() => handleClick("C")} className="operator">C</button>
                <button onClick={() => handleClick("DEL")} className="operator">DEL</button>
                <button onClick={() => handleClick("/")} className="operator">/</button>
                <button disabled={isOperatorsDisabled} onClick={() => handleClick("*")} className="operator">*</button>

                <button onClick={() => handleClick("7")}>7</button>
                <button onClick={() => handleClick("8")}>8</button>
                <button onClick={() => handleClick("9")}>9</button>
                <button disabled={isOperatorsDisabled} onClick={() => handleClick("-")} className="operator">-</button>

                <button onClick={() => handleClick("4")}>4</button>
                <button onClick={() => handleClick("5")}>5</button>
                <button onClick={() => handleClick("6")}>6</button>
                <button disabled={isOperatorsDisabled} onClick={() => handleClick("+")} className="operator">+</button>

                <button onClick={() => handleClick("1")}>1</button>
                <button onClick={() => handleClick("2")}>2</button>
                <button onClick={() => handleClick("3")}>3</button>
                <button disabled={isOperatorsDisabled} onClick={() => handleClick(".")}>.</button>

                <button onClick={() => handleClick("0")} className="zero">0</button>
                <button disabled={isOperatorsDisabled} onClick={() => handleClick("=")} className="equals">=</button>

            </div>
        </div>
    );
}

export default Calculator;
