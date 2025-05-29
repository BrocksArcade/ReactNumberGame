import { motion } from "motion/react";
import { CommonAnims } from "../anims/CommonAnimations";


export function FactComponent({factAnimationControls, setIsPlaying, factString, classname}) {
    return <motion.label
        animate={factAnimationControls}
        onAnimationComplete={() => setIsPlaying(false)}
        variants={{
            onFactFinding: CommonAnims.shrinkDown
        }}
        onAnimationStart={() => setIsPlaying(true)}

        className={'FactStyle text-center '+classname}>{factString}</motion.label>;
}