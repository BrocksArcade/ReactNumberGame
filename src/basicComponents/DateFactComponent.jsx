import { useAnimationControls } from "motion/react";
import { useEffect, useRef, useState } from "react";
import "../CustomCSS/InputStyles.css";
import NumericInput from "../inputstypes/NumericInput";
import { FactComponent } from "./FactComponent";
import { RandomNumberButton } from "./RandomNumberGeneratorComponent";
import { getRandomNumberInRange } from "./UtilityFunc";

export default function DateFactComponent({ url, urlsuffix, title, className, onErrorCatch }) {

    const [factString, SetfactString] = useState('Enter Day and Month in below purple boxes');
    const [monthinput, setMonthInp] = useState();
    const [dayinp, setDayInp] = useState();
    const [errormsg, setErrorMessage] = useState("");
    const factAnimationControls = useAnimationControls();
    const [isAnimationPlaying, setIsPlaying] = useState(false);

    const dateRef = useRef(null);
    const monthRef = useRef(null);

    useEffect(() => {
        const timerhandler = setTimeout(() => {
            doAPICall();
        }, 300);
        return () => clearTimeout(timerhandler);
        // if (isAnimationPlaying == false) {
        //     doAPICall();
        // } else {
        //     setTimeout(() => {
        //         //rechecking if animation is still playing if yes then we will arroive here again if not then we will call API
        //         doAPICall();
        //     }, 30);
        // }
        //isanimation plsyaing is not here because we are chaning isAnimationPlaying inside doAPICall to true

    }, [monthinput, dayinp]);
    return (<>
        <div className={className + ' GameFrame d-flex flex-column justify-content-center justify-items-center text-center align-items-center gap-1'}>
            <label className="DisplayTitle  my-2">{title}</label>
            <FactComponent classname={""} factAnimationControls={factAnimationControls} factString={factString} setIsPlaying={(val) => setIsPlaying(val)} />
            <div className="d-flex flex-row justify-content-center align-items-center gap-1">
                <NumericInput ref={dateRef} title={"Day"} onFieldCleared={() => SetfactString("Enter A Number in Purple Box to see fact about it")} CustomInputValue={dayinp} min={0} max={31} onValueChanged={(v) => {
                    if (isInputRefValid());
                    { setDayInp(v); }
                }} shouldDisableInput={false} onErrorCatch={(e) => { setErrorMessage(e); }} />
            </div>
            <RandomNumberButton className={"p-3"} onNumberGenerated={handleRandomNumberRecived} />
            <div className="d-flex flex-row justify-content-center align-items-center gap-1">
                <NumericInput title={"Month"} onFieldCleared={() => SetfactString("Enter A Number in Purple Box to see fact about it")} ref={monthRef} CustomInputValue={monthinput} min={0} max={12} onValueChanged={(v) => {
                    if (isInputRefValid());
                    { setMonthInp(v); }
                }} shouldDisableInput={false} onErrorCatch={(e) => { setErrorMessage(e); }} />

            </div>
            {/* <RandomNumberButton className={"mb-3"} min={0} max={12} onNumberGenerated={hand} /> */}
            {errormsg && <label className="ErrorMessage">{errormsg}</label>}
        </div>

    </>)

    function doAPICall() {

        if (monthinput > 0 && dayinp > 0 && dateRef.current.value && monthRef.current.value) {

            if (monthinput == 2 && dayinp > 29) {
                setErrorMessage("Febraury Cannot have more than 29 Days");
                // alert("Error");
            }
            else {  // factAnimationControls.mount()
                factAnimationControls.start("onFactFinding");
                console.log(url + '/' + monthinput + '/' + dayinp + urlsuffix);

                fetch(url + monthinput + '/' + dayinp + urlsuffix).then((response) => {
                    response.text().then((fact) => {
                        let valu = String(fact).trim();
                        if (valu.indexOf("boring") > 0 || valu.indexOf("unremarkable") > 0 || valu.indexOf("missing a fact") > 0 || valu.indexOf("uninteresting") > 0) {
                            let fallbackfact = "fact not found, try another number";
                            SetfactString(fallbackfact);
                        }
                        else {
                            SetfactString(fact);
                        }

                    });
                });
            }
        }
        else if (!(isNaN(monthinput) && isNaN(dayinp))) {
            //this is fallback in case value was Zero but set through Numbers or Random Number
            if(!dateRef){setErrorMessage("Day cannot be empty or zero");}
            else if(!monthRef){setErrorMessage("Month cannot be empty or zero");}
            // setErrorMessage(errormsg);
        }

    }

    function handleRandomNumberRecived() {

        if (!isAnimationPlaying) {
            setDayInp(getRandomNumberInRange(1, 31));
            setMonthInp(getRandomNumberInRange(1, 12));
        }
    }
    function isInputRefValid() {
        console.log("Day Value Ref" + dateRef.current.value);
        console.log("month Value Ref" + monthRef.current.value);

        if (dateRef.current.value && dateRef.current.value !== NaN && dateRef.current.value !== undefined && dateRef.current.value !== null && dateRef.current.value !== 0) {
            if (monthRef.current.value && monthRef.current.value !== NaN && monthRef.current.value !== undefined && monthRef.current.value !== null && monthRef.current.value !== 0) {
                return true;
            }
            else {
                setErrorMessage("Month cannot be empty or zero");
                return false;
            }

        }
        else {
            setErrorMessage("Day cannot be empty or zero");
            return false;
        }

    }




}