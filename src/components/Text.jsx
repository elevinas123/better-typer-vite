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
    const [index, setIndex] = useState(0)
    timeRef.current = props.timeStarted;
    const indexRef = useRef()
    indexRef.current = index
    const code = [
        `function calculateFactorial(n) {\\n   if (n === 0 || n === 1) {\\n      return 1;\\n   } else {\\n      return n * calculateFactorial(n - 1);\\n   }\\n}`,
        
        `function fibonacci(n) {\\n  if (n <= 1) {\\n    return n;\\n  } else {\\n    return fibonacci(n - 1) + fibonacci(n - 2);\\n  }\\n}\\n`,
        
    ];
    const [text, setText] = useState(code[0].replace(/\s/g, '/sp /sp').replace(/\\n/g, '/enter'))
    const textRef = useRef()
    textRef.current = text
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
        let splitText = enterSplit(text).splice(Math.max(0, index-1),  5)
        let splitTextWritten = enterSplit(textWritten).splice(Math.max(0, index-1), 5)
        setSentences(splitText.map((sentence, index) => <SentenceLine prevIndex={index+1} updateCursorPosition ={updateCursorPosition }  index={index} pointer={index==splitTextWritten.length-1?true:false} sentence={sentence} key={index} sentenceWritten={splitTextWritten[index] !== undefined?splitTextWritten[index]:""} />))
        if (textWritten == "") {
            setCursorPosition({left: 0, top: 32})
        }
        console.log("textWritten", textWritten)
        console.log("text", splitText)
    }, [textWritten, text])
    
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
                setIndex(i=> i+1)
                setTextWritten(textWritten => textWritten + "/enter")
                console.log("refText", textRef.current.split("/enter").length)
                console.log("refIndex", 2+indexRef.current)
                if (textRef.current.split("/enter").length<4+indexRef.current) {
                    setText(text => text +"/enter"+ code[Math.floor(Math.random() * code.length)].replace(/\s/g, '/sp /sp').replace(/\\n/g, '/enter'))
                }
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
            <div className=" relative text-2xl  mt-4 flex flex-col flex-wrap overflow-hidden text-pretty select-none" >
                {sentences}
            </div>
            <Cursor  left={cursorPosition.left} top={cursorPosition.top} />
        </div>
    )
}




