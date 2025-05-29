import { transform } from "motion"

export class CommonAnims {

    static popUpSpring =
        {
            scale: [0.1, 1.1, 1],
            transition: {
                duration: 1
            }
        }
    static shrinkDown = {
        scaleX: [1, 0.1, 1], transition: {
            duration: 0.5
        }
    }
    static fadeIn = {
        scaleX: [0.1,1],
         opacity: [1,0.5, 1], 
       transition: { duration: 1 },
       

    }

}