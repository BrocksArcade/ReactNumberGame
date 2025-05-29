import { motion, useAnimationControls } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CommonAnims } from "../anims/CommonAnimations";
import "../CustomCSS/InputStyles.css";
import NumericInput from "../inputstypes/NumericInput";
import { FactComponent } from "./FactComponent";
import { RandomNumberButton } from "./RandomNumberGeneratorComponent";
import { debounceAPI, getRandomNumberInRange } from "./UtilityFunc";
export default function NumericFactComponent({ url, urlsuffix, title, className }) {
  const [factString, SetfactString] = useState('Enter A Number in Purple Box to see fact about it');
  const [mathInpNum, SetMathInpNum] = useState();
  const [errormsg, setErrorMessage] = useState();
  const [RandomNumber, setRandomNumber] = useState();
  const factAnimationControls = useAnimationControls();
  const [isAnimationPlaying, setIsPlaying] = useState(false);
  // const debouncedfunction = useRef(debounce_local(()=>{doAPICall()}, 50)).current;

  useEffect(() => {
    const timerhandler=setTimeout(() => {
       doAPICall();
    }, 300);
    return ()=>clearTimeout(timerhandler);
    // doAPICallWAnimationCheck(300);
    // if (isAnimationPlaying === false) {
    //   const debouncedfunction=debounceAPI(doAPICall,100);
    //   debouncedfunction();
    //   // doAPICall();
    // }
    // else {
    //   setTimeout(() => {
    //     doAPICall();
    //   }, 1500);
    //   // debounce(doAPICall,150);
    // }
  }, [mathInpNum]);

  return (<>
    <motion.div animate={CommonAnims.popUpSpring} className={className + " GameFrame d-flex justify-content-center text-center align-items-center"}>
      <label className="DisplayTitle text-center my-1 px-5">{title}</label>
      <FactComponent factAnimationControls={factAnimationControls} factString={factString}
        setIsPlaying={(val) => setIsPlaying(val)} />
      <NumericInput className="row my-1" title={""} min={0} max={999} onFieldCleared={() => SetfactString("Enter A Number in Purple Box to see fact about it")} onValueChanged={(e) => {
        { SetMathInpNum(e) }
      }} shouldDisableInput={false} CustomInputValue={mathInpNum
        // RandomNumber

      } onErrorCatch={(e) => setErrorMessage(e)}></NumericInput>

      <RandomNumberButton className={"mb-3"} min={0} max={99} onNumberGenerated={(num) => {

        SetMathInpNum(num);
        // setRandomNumber(getRandomNumberInRange(0,99))

      }} />
      {errormsg && <label className="ErrorMessage">{errormsg}</label>}
    </motion.div ></>)

  function doAPICallWAnimationCheck(delay = 300) {
    if (isAnimationPlaying === false) {
      doAPICall();
      return;
    } else {
      setTimeout(() => {
        doAPICallWAnimationCheck(delay);

      }, delay);
    }

  }

  function doAPICall() {

    if (mathInpNum >= 0) {
      factAnimationControls.start("onFactFinding");
      setIsPlaying(true);
      console.log("Anim is Playing");

      fetch(url + mathInpNum + urlsuffix).then((response) => {
        response.text().then((value) => {
          let valu = String(value).trim();
          if (valu.indexOf("boring") > 0 || valu.indexOf("unremarkable") > 0 || valu.indexOf("missing a fact") > 0 || valu.indexOf("uninteresting") > 0) {
            valu = "fact not found, try another number";
            SetfactString(valu);
            //fallback message 

          } else {
            SetfactString(value);
          }
          setErrorMessage("");
        })
      });


    }
    else {  }
  }
  function debounce_local(func, delay) {
    let timeout;
    //timeout is a handler of timer which we set in settimeout return value
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
}

