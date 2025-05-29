import RandomNumberCSS from '../CustomCSS/RandomNumberCSS.css'
import { motion } from 'motion/react';
import { getRandomNumberInRange } from './UtilityFunc';
export function RandomNumberButton({ onNumberGenerated, min, max, className }) {






    return (<>
        <motion.button whileTap={{ backgroundColor: "black" }} type="button" className={"RandomNumberClass " + className} onClick={() => { onNumberGenerated(getRandomNumberInRange(min, max)) }}>Random</motion.button>
    </>)
}