import { useEffect, useState } from "react"
import Letter from "./Letter"



export default function Word(props) {

    const [letters, setLetters] = useState("")
    const [underlined, setUnderlined] = useState(false)
    
    useEffect(() => {
        let u = false
        let splitWord = props.word.split("")
        let splitWordWritten = props.wordWritten.split("")
        console.log("split word", splitWord)
        console.log("splitWordWritten", splitWordWritten)
        if (splitWord.length == splitWordWritten.length) {
            for(let i=0; i<splitWordWritten.length; i++) {
                console.log(splitWord[i])
                console.log(splitWordWritten[i])
                if (splitWord[i] !== splitWordWritten[i])  {
                    u = true
                    break
                }
            } 
        } else {
            u = true
        }
        setUnderlined(u)
    }, [props.wordWritten])
    useEffect(() => {
        if (props.word.length === 1 && props.word[0] === ' ') {
            setLetters( [<Letter letter=" " pointer={props.pointer?true:false} updateCursorPosition={props.updateCursorPosition }  />])
            return
        }
        let splitWord = props.word.split("")
        let splitWordWritten = props.wordWritten.split("")
       
        if (props.word.length>=props.wordWritten.length ) {
            setLetters(splitWord.map((letter, index) => <Letter updateCursorPosition={props.updateCursorPosition }  letter={letter} index={index}  pointer={index==splitWordWritten.length-1 &&props.pointer?true:false} letterWritten={splitWordWritten[index] !== undefined?splitWordWritten[index]:""} />))
        } else {
            setLetters(splitWordWritten.map((letterWritten, index) => <Letter updateCursorPosition ={props.updateCursorPosition }  index={index}  pointer={index==splitWordWritten.length-1 && props.pointer?true:false} letter={splitWord[index] !== undefined?splitWord[index]:""} letterWritten={letterWritten} />))

        }
    }, [props])

    return(
        <div className={`flex flex-row text-red-500 ${props.index<props.pointerIndex && underlined?"underline":""}`}>
            {letters}
        </div>
    )
}

