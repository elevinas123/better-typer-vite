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
import { atom, useAtom } from "jotai";
import { textWrittenAtom } from "./atoms/atoms";
import EndDiagram from "./components/EndDiagram";

export default function App() {
    const [textWritten, setTextWritten] = useAtom(textWrittenAtom);
    const [testTime, setTestTime] = useState(3);
    const testTimeRef = useRef();
    testTimeRef.current = testTime;
    const [time, setTime] = useState(testTime);
    const [timeStarted, setTimeStarted] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);
    const [triggerTransition, setTriggerTransition] = useState(false);
    const [reset, setReset] = useState(false)

    useEffect(() => {
        console.log("cia");

        setTriggerTransition(true);

        // Optional: Reset the trigger after the transition duration
        const timer = setTimeout(() => {
            setTriggerTransition(false);
        }, 200); // match this duration to your CSS transition-duration

        return () => clearTimeout(timer);
    }, [testTime]); // Empty array means this effect runs once on mount

    const intervalRef = useRef(null);
    const handleTimerEnd = () => {
        setGameEnded(true);
        setTimeStarted(false);
        setTime(testTimeRef);
    };

    useEffect(() => {
        console.log("is apppasdasda", textWritten);
    }, [textWritten]);

    useEffect(() => {
        if (timeStarted) {
            intervalRef.current = setInterval(() => {
                setTime((i) => {
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
        setTimeStarted(true);
    };

    useEffect(() => {
        console.log("time", time);
    }, [time]);

    const handleReset = (newTime = false) => {
        console.log("resetino", newTime);
        setReset(i => !i)
        setTextWritten("");
        setGameEnded(false);
        setTimeStarted(false);
        if (!newTime) setTime(testTimeRef.current);
        else setTime(newTime);
    };
    const handleTimeChange = (e) => {
        console.log(e.target.id);
        if (e.target.id == "custom") return;
        setTestTime(Number(e.target.id));
        handleReset(Number(e.target.id));
        console.log("resetinoTime", Number(e.target.id));
    };

    return (
        <div className="flex flex-row justify-center h-100vh w-full text-sub-color bg-bg-color">
            <div className="flex flex-col w-3/5 mt-8">
                {/* Top part */}
                <div className="flex flex-col m">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row">
                            <div className="font-bold text-3xl">BetterType</div>
                        </div>
                    </div>
                    {!gameEnded && (
                        <div className="flex flex-row justify-center mt-32 ml-4">
                            <div className="flex flex-row bg-sub-alt-color rounded-lg pr-4 pt-1 pb-1 h-10 items-center text-sm">
                                <div className="flex flex-row  text-xs select-none">
                                    <button
                                        onClick={handleTimeChange}
                                        id="3"
                                        className={`ml-4 hover:text-text-color ${
                                            Number(testTime) == 3 ? "text-yellow-500" : "text-sub-color"
                                        }`}
                                        onKeyDown={(e) => {
                                            // Prevents the default action if the space key is pressed
                                            if (e.key === " " || e.key === "Spacebar" || e.key === "Enter") {
                                                // 'Spacebar' for older browsers
                                                e.preventDefault();
                                            }
                                        }}
                                    >
                                        15
                                    </button>
                                    <button
                                        onClick={handleTimeChange}
                                        id="30"
                                        className={`ml-4 hover:text-text-color ${
                                            Number(testTime) == 30 ? "text-yellow-500" : "text-sub-color"
                                        }`}
                                        onKeyDown={(e) => {
                                            // Prevents the default action if the space key is pressed
                                            if (e.key === " " || e.key === "Spacebar" || e.key === "Enter") {
                                                // 'Spacebar' for older browsers
                                                e.preventDefault();
                                            }
                                        }}
                                    >
                                        30
                                    </button>
                                    <button
                                        onClick={handleTimeChange}
                                        id="60"
                                        className={`ml-4 hover:text-text-color ${
                                            Number(testTime) == 60 ? "text-yellow-500" : "text-sub-color"
                                        }`}
                                        onKeyDown={(e) => {
                                            // Prevents the default action if the space key is pressed
                                            if (e.key === " " || e.key === "Spacebar" || e.key === "Enter") {
                                                // 'Spacebar' for older browsers
                                                e.preventDefault();
                                            }
                                        }}
                                    >
                                        60
                                    </button>
                                    <button
                                        onClick={handleTimeChange}
                                        id="120"
                                        className={`ml-4 hover:text-text-color ${
                                            Number(testTime) == 120 ? "text-yellow-500" : "text-sub-color"
                                        }`}
                                        onKeyDown={(e) => {
                                            // Prevents the default action if the space key is pressed
                                            if (e.key === " " || e.key === "Spacebar" || e.key === "Enter") {
                                                // 'Spacebar' for older browsers
                                                e.preventDefault();
                                            }
                                        }}
                                    >
                                        120
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main text */}
                {!gameEnded ? (
                    <div className="flex flex-col text-lg mb-32 mt-20">
                        <div
                            className={`flex relative transition duration-200 ease-in ${
                                triggerTransition ? "trigger-transition-class" : ""
                            }`}
                        >
                            <div className="absolute text-xl text-yellow-500">{timeStarted && time}</div>
                            <div className="flex flex-row justify-center w-full">
                                <div className="ml-4 flex flex-row">
                                    <div className="pt-0.5 flex justify-center items-center mr-2">
                                        <FaGlobeAmericas size="0.85em" />
                                    </div>{" "}
                                    Javascript
                                </div>
                            </div>
                        </div>
                        <Text reset={reset} handleReset={handleReset} startTime={startTime} timeStarted={timeStarted} />
                        <div className="flex flex-row justify-center mt-10 text-xl">
                            <div onClick={handleReset}>
                                <FaRedoAlt />
                            </div>
                        </div>
                    </div>
                ) : (
                    <EndDiagram time={testTime} handleReset={handleReset} />
                )}

                {/* Footer */}
                <div></div>
            </div>
        </div>
    );
}
