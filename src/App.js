import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import { easeIn, easeInOut, motion, scale } from 'motion/react';
import DateFactComponent from './basicComponents/DateFactComponent';
import NumericFactComponent from './basicComponents/NumericFactComponent';
import { CommonAnims } from './anims/CommonAnimations';
import { DateInputComponent } from './inputstypes/DateInput';

function App() {


  return (
    <div>
      <motion.div className='AnimatedBackground' animate={{ backgroundPositionY: ["0%", "100%"], backgroundPositionX: ["0%", "100%"] }} transition={{
        duration: 110,
        repeat: Infinity,
        ease:'linear'
      }}></motion.div>
      <div className="Background">
        <div className='container-fluid d-flex flex-column justify-content-stretch  align-items-center'>
          <motion.div className='row  mt-5 justify-content-center align-items-center' transition={{ duration: 1 }} animate={{ scale: ["0%", "100%"], borderColor: ['black', 'white'] }}>
            <h1 className='BigHeading text-center w-75'>Welcome to number one game</h1>
          </motion.div>
          <motion.div className='MainFrame container mt-5 col col-md-11 col-lg-12 border border-secondary border-2 rounded-4 p-2 mt-5' animate={CommonAnims.fadeIn}>
            <div className='container-fluid'>
              <div className='col m-md-3 m-3 m-lg-5'>
                <div className='d-flex flex-row row justify-content-center '>

                  <NumericFactComponent className="col-10 m-3 " url={"http://numbersapi.com/"} title={"Number Trivia"} urlsuffix={""} />
                  <NumericFactComponent className="col-10 m-3 " url={"http://numbersapi.com/"} title={"Math Trivia"} urlsuffix={"/math"} />
                  <div className='row justify-content-center'>
                
                    <DateFactComponent className="col m-3 m-sm-3 m-md-2 m-lg-4" url={"http://numbersapi.com/"} title={"Date Trivia"} urlsuffix={"/date"} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>


        </div>
      </div>


    </div>

  );
}


export default App;
