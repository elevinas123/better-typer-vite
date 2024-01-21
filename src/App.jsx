import { FaRegUser } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";
import { FaKeyboard } from "react-icons/fa";
import { FaAt } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaFont } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";
import { FaMountain } from "react-icons/fa";
import { FaWrench } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";
import Text from "./components/Text";
import { useEffect, useRef, useState } from "react";
import { atom, useAtom } from 'jotai';
import { textWrittenAtom } from "./atoms/atoms";
import EndDiagram from "./components/EndDiagram";

export default function App() {
  const [textWritten, setTextWritten] = useAtom(textWrittenAtom)
  const testTime = 100
  const [time, setTime] = useState(testTime)
  const [timeStarted, setTimeStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  
  



  const intervalRef = useRef(null);
  const handleTimerEnd = () => {
    setGameEnded(true)
    setTimeStarted(false)
    setTime(testTime)

  }


  useEffect(() => {
    console.log("is apppasdasda", textWritten)
  }, [textWritten])

  useEffect(() => {
    if (timeStarted) {
      intervalRef.current = setInterval(() => {
        setTime(i => {
          if (i - 1 <= 0) {
            clearInterval(intervalRef.current); // Clears the interval using the ref
            handleTimerEnd(); // Calls the handleTimerEnd function
            return 0;
          }
          return i - 1; // Decrements the time
        });
      }, 1000);
    } else {
      // Clear the interval if timeStarted is false
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  
    // Cleanup function: Clear the interval when the component is unmounted or when timeStarted changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timeStarted]);
    
  const startTime = () => {
    setTimeStarted(true)
   
}
  const handleReset = () => {
    setGameEnded(false)
    setTimeStarted(false)
    setTime(testTime)
    setTextWritten("")
  }


  return (
    <div className="flex flex-row justify-center h-100vh w-full text-sub-color bg-bg-color ">
      <div className="flex flex-col  w-3/5 mt-8 justify-between  ">
      {/*Top part */}
          
        <div className="flex flex-col ">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row ">
              <div className="font-bold text-3xl" >BetterType</div>
              <div className="ml-6 pt-2  flex justify-center items-center" ><FaKeyboard size="1.1em"/></div>
              <div className="ml-6 pt-2  flex justify-center items-center" ><FaCrown size="1.1em" /></div>
              <div className="ml-6 pt-2 flex justify-center items-center" ><FaInfo size="1.1em" /></div>
              <div className="ml-6 pt-2 flex justify-center items-center" ><FaCog size="1.1em" /></div>
            </div>
            <div className="flex flex-row">
              <div className="mr-6 pt-1 flex justify-center items-center" ><FaBell size="1em" /></div>
              <div className="pt-1 flex justify-center items-center"><FaRegUser size="1em" /></div>
            </div>

          </div>
          <div className="flex flex-row justify-center mt-8  ">
            <div className="flex flex-row bg-sub-alt-color rounded-lg pr-4 pt-1 pb-1 h-10 items-center text-sm">
              <div className="flex flex-row  mr-4" >
                <div className="ml-4 flex flex-row" ><div  className="flex pt-0.5 justify-center items-center mr-2"><FaAt size="1em" /></div> punctuation</div>
                <div className="ml-4 flex flex-row" ><div  className="flex pt-0.5 justify-center items-center mr-2"><FaHashtag size="1em" /></div> numbers</div>

              </div>
              <div className="flex flex-row  mr-4" >
                <div className="ml-4 flex flex-row" ><div  className=" pt-0.5 flex justify-center items-center mr-2"><FaClock size="1em" /></div> time</div>
                <div className="ml-4 flex flex-row" ><div  className=" pt-0.5 flex justify-center items-center mr-2"><FaFont size="1em" /></div> words</div>
                <div className="ml-4 flex flex-row" ><div  className=" pt-0.5 flex justify-center items-center mr-2"><FaQuoteLeft size="1em" /></div> quote</div>
                <div className="ml-4 flex flex-row" ><div  className=" pt-0.5 flex justify-center items-center mr-2"><FaMountain size="1em" /></div> zen</div>
                <div className="ml-4 flex flex-row" ><div  className=" pt-0.5 flex justify-center items-center mr-2"><FaWrench size="1em" /></div> custom</div>
                
              </div>
              <div className="flex flex-row ml-4 text-xs" >
                <div className="" >15</div>
                <div className="ml-4" >30</div>
                <div className="ml-4" >60</div>
                <div className="ml-4" >120</div>
                <div className="ml-4 flex flex-row" ><div  className=" pt-0.5 flex justify-center items-center mr-2"><FaTools size="1em" /></div></div>

              </div>
            </div>
          </div>
        </div>




        {/*Main text */}
        {!gameEnded?
          <div className="flex flex-col  text-lg mb-32 ">
          <div className="flex relative">
            <div className="absolute text-xl text-yellow-500">{timeStarted && time}</div>
            <div className="flex flex-row justify-center w-full">
              
              <div className="ml-4 flex flex-row" ><div  className=" pt-0.5 flex justify-center items-center mr-2"><FaGlobeAmericas  size="0.85em" /></div> english</div>
            </div>
          </div>
          <Text  startTime={startTime} timeStarted={timeStarted} />
          <div className="flex flex-row justify-center mt-10 text-xl">
            <div onClick={handleReset} className=" "><FaRedoAlt /></div>
          </div>
        </div>
          :
          <EndDiagram time={testTime} handleReset={handleReset}  />

        }

        {/*Footer */}
        <div></div>
      </div>
    </div>
  )
}


