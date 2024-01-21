import {useEffect, useRef, useState} from "react"
import Word from "./Word"
import Cursor from './Cursor';
import { atom, useAtom } from 'jotai';
import { textWrittenAtom } from "../atoms/atoms";
import SentenceLine from "./SentenceLine";

export default function Text(props) {

    const [textWritten, setTextWritten] = useAtom(textWrittenAtom)
    const containerRef = useRef(null)
    const [sentences, setSentences] = useState("")
    const [cursorPosition, setCursorPosition] = useState({ left: 0, top: 32 });
    const timeRef = useRef();
    timeRef.current = props.timeStarted;

    
    useEffect(() => {
        console.log("jo")
    }, [])
        // Example of updating cursor position
        const updateCursorPosition = (newLetterElement) => {
            const containerRect = containerRef.current.getBoundingClientRect();
            const letterRect = newLetterElement.current.getBoundingClientRect();
        
            // Calculate the top position to align the cursor vertically to the middle of the letter
            const relativeTop = letterRect.top - containerRect.top + letterRect.height / 2;

        
            // Calculate the left position to align the cursor to the right of the letter + 10px offset
            const relativeLeft = letterRect.left - containerRect.left + letterRect.width;
        
            setCursorPosition({ left: relativeLeft, top: relativeTop });
        };
        

    

    const enterSplit = (sentence) => {
        let splitSentence = sentence.split("/enter")
       
        
        return splitSentence
    }
    useEffect(() => {
        let mainText = props.text
        let splitText = enterSplit(mainText)
        let splitTextWritten = enterSplit(textWritten)
        console.log("splitTextWritten", splitTextWritten)
        setSentences(splitText.map((sentence, index) => <SentenceLine updateCursorPosition ={updateCursorPosition }  index={index} pointer={index==splitTextWritten.length-1?true:false} sentence={sentence} key={index} sentenceWritten={splitTextWritten[index] !== undefined?splitTextWritten[index]:""} />))
        if (textWritten == "") {
            setCursorPosition({left: 0, top: 32})
        }
    }, [textWritten])
    
    useEffect(() => {
        if (timeRef.current == false) {
            setCursorPosition({left: 0, top: 32})
        }
        const handleKeyPress = (event) => {
            if (!timeRef.current) {
                props.startTime()
            }
            // Prevent default behavior if needed
            // event.preventDefault();
            
            if (event.key === "Backspace") {
                setTextWritten(textWritten => {
                    // Check if the last 3 characters are "/br" (assuming "/br" is a marker for a space)
                    if (textWritten.endsWith("/sp")) {
                        return textWritten.slice(0, -7); // Remove last 3 characters
                    } else {
                        return textWritten.slice(0, -1); // Remove last character
                    }
                });
                return
                
            } else if (event.key === " ") {
                setTextWritten(textWritten => textWritten + "/sp /sp");
                return
            } else if (event.key === "Enter") {
                setTextWritten(textWritten => textWritten + "/enter")
                return
            }
            if (event.key.length > 1) {
                return
            }
            
            setTextWritten(textWritten => textWritten + event.key);
          };
        // Add event listener when component mounts
        document.addEventListener('keydown', handleKeyPress);
    
        // Cleanup: Remove event listener when component unmounts
        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
      }, [props.timeStart])
    useEffect(() => {

    }, [])

    return (
        <div ref={containerRef}  className="relative">
            <div className="text-2xl  mt-4 flex flex-col flex-wrap overflow-hidden text-pretty select-none" >
                {sentences}
            </div>
            <Cursor  left={cursorPosition.left} top={cursorPosition.top} />
        </div>
    )
}




