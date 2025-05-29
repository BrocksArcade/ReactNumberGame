import { motion, useAnimationControls } from "motion/react";
import { useEffect, useState } from "react";
import { CommonAnims } from "../anims/CommonAnimations";
import "../CustomCSS/InputStyles.css";
import NumericInput from "../inputstypes/NumericInput";
import { FactComponent } from "./FactComponent";
import { RandomNumberButton } from "./RandomNumberGeneratorComponent";
import { getRandomNumberInRange } from "./UtilityFunc";
export default function NumericFactComponent({ url, urlsuffix, title, className }) {
  const [factString, SetfactString] = useState('Enter A Number in Purple Box to see fact about it');
  const [mathInpNum, SetMathInpNum] = useState();
  const [errormsg, setErrorMessage] = useState();
  const [RandomNumber, setRandomNumber] = useState();
  const factAnimationControls = useAnimationControls();
  const [isAnimationPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isAnimationPlaying) {
      doAPICall();
    }
    else {
    
      setTimeout(() => {
        //rechecking if animation is still playing if yes then we will arroive here again if not then we will call API
        doAPICall();
      }, 100);
    }
  }, [mathInpNum, RandomNumber]);

  return (<>
    <motion.div animate={CommonAnims.popUpSpring} className={className + " GameFrame d-flex justify-content-center text-center align-items-center"}>
      <label className="DisplayTitle text-center my-1 px-5">{title}</label>
      <FactComponent factAnimationControls={factAnimationControls} factString={factString}
        setIsPlaying={(val) => setIsPlaying(val)} />
      <NumericInput className="row my-1" title={""} min={0} max={9999} onValueChanged={SetMathInpNum} shouldDisableInput={false} CustomInputValue={mathInpNum
        // RandomNumber

      } onErrorCatch={(e) => setErrorMessage(e)}></NumericInput>

      <RandomNumberButton className={"mb-3"} min={0} max={99} onNumberGenerated={(num) => {
        if (!isAnimationPlaying) {
          SetMathInpNum(num);
          // setRandomNumber(getRandomNumberInRange(0,99))
        }
      }} />
      {errormsg && <label className="ErrorMessage">{errormsg}</label>}
    </motion.div ></>)

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
  }
}

