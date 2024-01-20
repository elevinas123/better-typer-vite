import { useAtom } from "jotai"
import { textWrittenAtom } from "../atoms/atoms"
import { useEffect, useState } from "react"




export default function EndDiagram (props) {


    const [textWritten, setTextWritten] = useAtom(textWrittenAtom)
    const [wpm, setWpm] = useState(0)
    const [acc, setAcc] = useState(0)

    useEffect(() => {
        console.log("hi1")
        const splitTextWritten = textWritten.split("/sp /sp")
        const splitText = props.text.split(" ")
        console.log("hi2", splitTextWritten)
        console.log("hi2", props.text)
        console.log("hi3", splitText)
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
        console.log("hi4", acuracy)
        setWpm(60/props.time*splitTextWritten.length)
        setAcc(Math.floor(acuracy/splitTextWritten.length * 100))
    }, [textWritten])

    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <div className="text-3xl text-sub-color" >wpm</div>
                <div className="text-yellow-500 text-4xl" >{wpm}</div>
            </div>
            <div className="flex flex-col">
                <div className="text-3xl text-sub-color" >acc</div>
                <div className="text-yellow-500 text-4xl" >{acc}%</div>
            </div>
        </div>
    )
}