import { useEffect, useRef } from "react"



export default function Letter(props) {
    
    const letterRef = useRef(null)
    const style = {
        
    }

    useEffect(() => {
        if (props.pointer) {
            props.updateCursorPosition(letterRef)
        }
    }, [props])

    return(
        <div className={`min-w-4 flex flex-row    ${props.letter === props.letterWritten ? "text-text-color" : props.letterWritten==""?"text-sub-color":props.letter !== ""?"text-red-500":"text-red-700"}`}>
            <div ref={letterRef} className="min-w-4">{props.letter == "" && props.letterWritten!==""?props.letterWritten:props.letter}</div>
            


        </div>
    );
    
}

