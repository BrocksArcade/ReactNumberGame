import { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { RandomNumberButton } from "../basicComponents/RandomNumberGeneratorComponent";




export default function NumericInput({ onValueChanged, min, max, title, onErrorCatch, CustomInputValue, shouldDisableInput,ref }) {

    const [inpvalue, SetInpValue] = useState(CustomInputValue);
    useEffect(() => {
        validateAndSubmitInput(CustomInputValue);

    }, [CustomInputValue]);
    useEffect(() => {

    }, [shouldDisableInput])

    function validateAndSubmitInput(e) {
        {

            // if (String(e).length>0) { e = Number(e).toString(3); }
            e = e && String(e).replaceAll("-", " ").trim();
            e = String(e).length >= 4 ? inpvalue : e;
            if (Number(e) >= min) {
                // e=Number(e).toString();
                const loc_val = parseInt(e);
                if (loc_val >= 0) {
                    if (loc_val <= max) {
                        onErrorCatch("")//clear error
                        SetInpValue(e);
                        onValueChanged(e);
                    }
                    else {
                        onErrorCatch("Value should be less than " + max);
                    }
                }
                else {
                    SetInpValue();
                    onErrorCatch("Value cannot be empty or less than " + min);
                }
            }
            else if (!isNaN(e) && e != undefined && e != 0) {
                console.log(e);
                // SetInpValue(min);
                SetInpValue(e);
                onErrorCatch("Value cannot be negative");
            }
        }


    }

    function IncrementValue() {
        if (!shouldDisableInput) {
            let e = Number(inpvalue) + 1;
            if (e <= max) { validateAndSubmitInput(e); }
            else if (Number.isNaN(e)) {
                SetInpValue(1);
                validateAndSubmitInput(1);
            }
            else { onErrorCatch("Max Value Reached"); }
            // validateAndSubmitInput(e);}
        }
    }



    function decrementValue() {
        //incase of playing anims
        if (!shouldDisableInput) {
            let e = 0;
            e = Number(inpvalue) - 1;
            if (e >= min) { validateAndSubmitInput(e); }
            else if (Number.isNaN(e)) {
                SetInpValue(min); validateAndSubmitInput(min);
            }
            else {
                onErrorCatch("Min Value Reached");
            }
        }
    }




    return (


        <div className="d-flex flex-row  container-fluid align-items-center justify-content-center gap-3">
            {title && <label className="InputLabel text-center align-self-center">{title}</label>}
            <div className="d-flex col flex-row justify-content-center align-items-center text-center InputFrame my-3 py-2">
                <button type="button" className="btn-ripple  but_inputchanger col text-center align-self-center m-2 py-2" onClick={() => decrementValue()}>-</button>
                <input type="number" ref={ref} max={max} maxLength={3} disabled={shouldDisableInput} className="inputclass col w-50" value={inpvalue} step={1} onInput={(value)=>console.log("Input changed" + value)
                } onChange={(value) => {
                    validateAndSubmitInput(value.target.value);
                   
                }}


                />
                <button type="button" className="btn-ripple  but_inputchanger  col mtext-center align-self-center m-2 py-2" onClick={() => IncrementValue()}>+</button>

            </div>
        </div>


    )
}
