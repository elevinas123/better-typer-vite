import { useAtom } from "jotai"
import { currentTextAtom, textWrittenAtom } from "../atoms/atoms"
import { useEffect, useState } from "react"
import { FaRedoAlt } from "react-icons/fa"




export default function EndDiagram (props) {


    const [textWritten, setTextWritten] = useAtom(textWrittenAtom)
    const [currentText, setCurrentText] = useAtom(currentTextAtom)
    const [wpm, setWpm] = useState(0)
    const [acc, setAcc] = useState(0)

    useEffect(() => {
        console.log("textWritten", textWritten);
        console.log("text", currentText);
        const splitTextWritten = textWritten.split("/sp /sp")
        const splitText = currentText.split("/sp /sp");
        
        let acuracy = splitTextWritten.length
        for(let i=0; i<splitTextWritten.length - 1; i++) {
            let a = false
            for(let j=0; j<splitText[i].length; j++) {
                if (splitTextWritten[i].length < j) {
                    a = true
                    break
                }
                if (splitText[i][j] !== splitTextWritten[i][j]) {
                    a = true
                    break
                }
            }
            if (a) acuracy--
        }
        let lastIndex = splitTextWritten.length-1
        for(let i=0; i<splitTextWritten[lastIndex].length; i++) {
            if (splitText[lastIndex].length < i) {
                acuracy--
                break
            }
            if (splitText[lastIndex][i] !== splitTextWritten[lastIndex][i]) {
                acuracy--
                break
            }
        }
        setWpm(60/props.time*splitTextWritten.length)
        setAcc(Math.floor(acuracy/splitTextWritten.length * 100))
    }, [textWritten])
    useEffect(() => {
        const handleKeyPress = (event) => {
            
           
             if (event.key === "Escape") {
                props.handleReset();
            }
            
        };
        // Add event listener when component mounts
        document.addEventListener("keydown", handleKeyPress);

        // Cleanup: Remove event listener when component unmounts
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);
    return (
        <div className="flex flex-col mt-32">
            <div className="flex flex-col">
                <div className="text-3xl text-sub-color">wpm</div>
                <div className="text-yellow-500 text-4xl">{wpm}</div>
            </div>
            <div className="flex flex-col">
                <div className="text-3xl text-sub-color">acc</div>
                <div className="text-yellow-500 text-4xl">{acc}%</div>
            </div>
            <div className="flex flex-row justify-center mt-10 text-xl">
                <div onClick={() => props.handleReset()}>
                    <FaRedoAlt />
                </div>
            </div>
        </div>
    );
}