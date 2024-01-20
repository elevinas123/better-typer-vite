import {useEffect, useRef, useState} from "react"
import Word from "./Word"
import Cursor from "./cursor";



export default function Text(props) {

    const [textWritten, setTextWritten] = useState("")
    const containerRef = useRef(null)
    const [words, setWords] = useState("")
    const [cursorPosition, setCursorPosition] = useState({ left: 0, top: 0 });
    const reqText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut orci nibh. Vestibulum pretium lobortis dignissim. Nam at auctor nulla. Fusce commodo nisi ante, vel sollicitudin ipsum porttitor eu. Fusce a porttitor lacus. Vivamus vel magna vel tellus dignissim rutrum. Quisque auctor diam eu lectus pellentesque, non posuere dui aliquet"

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
        

    

    const spaceSplit = (sentence) => {
        let splitSentence = sentence.split("/sp")
        if (splitSentence[splitSentence.length-1] == "") {
            splitSentence.pop()
        } 
        let newSentence = []
        for(let i=0; i<splitSentence.length; i++) {
            newSentence.push(splitSentence[i])
        }
        return newSentence
    }

    useEffect(() => {
        let mainText = reqText.split(" ").map(i => i+"/sp /sp").join("")
        let splitWords = spaceSplit(mainText)
        let splitTextWritten = spaceSplit(textWritten)
        setWords(splitWords.map((word, index) => <Word updateCursorPosition ={updateCursorPosition }  index={index} pointerIndex={splitTextWritten.length-1} pointer={index==splitTextWritten.length-1?true:false} word={word} key={index} wordWritten={splitTextWritten[index] !== undefined?splitTextWritten[index]:""} />))

    }, [textWritten])
    useEffect(() => {
        const handleKeyPress = (event) => {
            // Prevent default behavior if needed
            // event.preventDefault();
            // Update the state with the new character
            if (event.key === "Shift") {
                return
            }
            if (event.key === "CapsLock") {
                return
            }
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
    
            } else if (event.key == " ") {
                setTextWritten(textWritten => textWritten + "/sp /sp");
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
      }, [])

    return (
        <div ref={containerRef}  className="relative">
            <div className="text-2xl  mt-4 flex flex-row flex-wrap overflow-hidden text-pretty select-none" >
                {words}
            </div>
            <Cursor  left={cursorPosition.left} top={cursorPosition.top} />
        </div>
    )
}