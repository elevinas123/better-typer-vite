import { useEffect, useState } from "react"
import Word from "./Word"



export default function SentenceLine(props) {


    const [sentences, setSentences] = useState([])


    useEffect(() => {

    })

    const spaceSplit = (sentence) => {
        let splitSentence = sentence.split("/sp")
        if (splitSentence[splitSentence.length-1] == "") {
            splitSentence.pop()
        }
        let n = 0
        for(let i=0; i<splitSentence.length; i++) {
            if (splitSentence[i] === " " || splitSentence[i] === "") {
                n++
            } else {
                break
            }
        } 
        
        return splitSentence.slice(n)
    }
    const spaceSplitWord = (sentence) => {
        let splitSentence = sentence.split("/sp")
        if (splitSentence[splitSentence.length-1] == "") {
            splitSentence.pop()
        } 
        let newSent = []
        for(let i=0; i<splitSentence.length; i++) {
            if (splitSentence[i] !== "" ) {
                newSent.push(splitSentence[i])
            }
        }
        return newSent 
    }

    useEffect(() => {
        let splitWords = spaceSplit(props.sentence)
        let splitWordsWritten = spaceSplit(props.sentenceWritten)
        let splitSpaceWords = spaceSplitWord(props.sentence)
        let newWords = []
        let n = 0
        let u = false
        console.log("word1", splitSpaceWords)
        console.log("word2", splitWords)
        console.log("word3", splitWordsWritten)
                newWords.push(<Word  updateCursorPosition ={props.updateCursorPosition }  index={-1} pointerIndex={splitWordsWritten.length-1} pointer={-1==splitWordsWritten.length-1 && props.pointer?true:false} word={" "} key={-1} wordWritten={"/nw"} />)
                newWords.push()
        for(let i=0; i<splitSpaceWords.length; i++) {
            if  (i+1<splitSpaceWords.length && splitSpaceWords[i+1] !== " " && splitSpaceWords[i] == " " && u === false) {
                newWords.push(<Word  updateCursorPosition ={props.updateCursorPosition }  index={i} pointerIndex={splitWordsWritten.length-1} pointer={-1==splitWordsWritten.length-1 && props.pointer?true:false} word={" "} key={i} wordWritten={"/nw"} />)

            }
            else if (splitSpaceWords[i] !== " " || u) {
                newWords.push(<Word  updateCursorPosition ={props.updateCursorPosition }   index={i} pointerIndex={splitWordsWritten.length-1} pointer={n==splitWordsWritten.length-1 && props.pointer?true:false} word={splitWords[n]} key={i} wordWritten={splitWordsWritten[n]?splitWordsWritten[n]:""} />)
                n++
                u =true
            } else {
                newWords.push(<Word updateCursorPosition ={props.updateCursorPosition }  index={i} pointerIndex={splitWordsWritten.length-1}  pointer={i==splitWordsWritten.length-1 && props.pointer?true:false} word={" "} key={i} wordWritten={"/nw"} />)
            }
        }
        setSentences(newWords)
    }, [props])

    return(
        <div className="flex flex-row">
            {sentences}
        </div>
    )
}