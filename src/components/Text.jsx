import { useEffect, useRef, useState } from "react";
import Word from "./Word";
import Cursor from "./Cursor";
import { atom, useAtom } from "jotai";
import { currentTextAtom, textWrittenAtom } from "../atoms/atoms";
import SentenceLine from "./SentenceLine";

export default function Text(props) {
    const [textWritten, setTextWritten] = useAtom(textWrittenAtom);
    const [currentText, setCurrentText] = useAtom(currentTextAtom)
    const containerRef = useRef(null);
    const [sentences, setSentences] = useState("");
    const [cursorPosition, setCursorPosition] = useState({ left: 0, top: 32 });
    const timeRef = useRef();
    const [index, setIndex] = useState(0);
    timeRef.current = props.timeStarted;
    const indexRef = useRef();
    indexRef.current = index;
    const code = [
        // 1. Calculate factorial
        `function calculateFactorial(n) {/enter  if (n === 0 || n === 1) {/enter    return 1;/enter  } else {/enter    return n * calculateFactorial(n - 1);/enter  }/enter}`,

        // 2. Fibonacci sequence
        `function fibonacci(n) {/enter  if (n <= 1) {/enter    return n;/enter  } else {/enter    return fibonacci(n - 1) + fibonacci(n - 2);/enter  }/enter}`,

        // 3. Check if number is prime
        `function isPrime(num) {/enter  for (let i = 2; i <= Math.sqrt(num); i++) {/enter    if (num % i === 0) return false;/enter  }/enter  return num > 1;/enter}`,

        // 4. Find maximum number in an array
        `function findMax(arr) {/enter  return Math.max(...arr);/enter}`,

        // 5. Reverse a string
        `function reverseString(str) {/enter  return str.split('').reverse().join('');/enter}`,

        // 6. Convert temperature from Celsius to Fahrenheit
        `function celsiusToFahrenheit(celsius) {/enter  return celsius * 9/5 + 32;/enter}`,

        // 7. Sort an array of numbers
        `const sortNumbers = (arr) => arr.sort((a, b) => a - b);`,

        // 8. Filter out falsy values from an array
        `const filterFalsy = (arr) => arr.filter(Boolean);`,

        // 9. Find the longest word in a string
        `function findLongestWord(str) {/enter  return str.split(' ').sort((a, b) => b.length - a.length)[0];/enter}`,

        // 10. Capitalize first letter of each word in a string
        `function capitalizeWords(str) {/enter  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');/enter}`,

        // 11. Count the vowels in a string
        `function countVowels(str) {/enter  return str.match(/[aeiou]/gi).length;/enter}`,

        // 12. Generate a random number between two values
        `function randomInRange(min, max) {/enter  return Math.floor(Math.random() * (max - min + 1)) + min;/enter}`,

        // 13. Check if a string is a palindrome
        `function isPalindrome(str) {/enter  const revStr = str.split('').reverse().join('');/enter  return str === revStr;/enter}`,

        // 14. Remove duplicates from an array
        `function removeDuplicates(arr) {/enter  return [...new Set(arr)];/enter}`,

        // 15. Find the greatest common divisor (GCD) of two numbers
        `function gcd(a, b) {/enter  while(b !== 0) {/enter    let t = b;/enter    b = a % b;/enter    a = t;/enter  }/enter  return a;/enter}`,

        // 16. Check if a year is a leap year
        `function isLeapYear(year) {/enter  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;/enter}`,

        // 17. Find the factorial of a number (iterative approach)
        `function factorial(num) {/enter  let result = 1;/enter  for (let i = 2; i <= num; i++) {/enter    result *= i;/enter  }/enter  return result;/enter}`,

        // 18. Sum all numbers till the given one
        `function sumUpTo(n) {/enter  return n * (n + 1) / 2;/enter}`,

        // 19. Count the occurrence of a specific element in an array
        `function countOccurrences(arr, val) {/enter  return arr.reduce((acc, curr) => (curr === val ? acc + 1 : acc), 0);/enter}`,

        // 20. Deep clone an object
        `function deepClone(obj) {/enter  return JSON.parse(JSON.stringify(obj));/enter}`,
    ];

    const [text, setText] = useState(code[Math.floor(Math.random() * code.length)].replace(/\s/g, "/sp /sp"));
    const textRef = useRef();
    textRef.current = text;
    useEffect(() => {
        console.log("jo");
    }, []);
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
        let splitSentence = sentence.split("/enter");

        return splitSentence;
    };

    useEffect(() => {
        setCurrentText(text)
    }, [text])

    useEffect(() => {
        if (textRef.current.split("/enter").length < 5 + indexRef.current) {
            setText(
                (text) => text + "/enter" + code[Math.floor(Math.random() * code.length)].replace(/\s/g, "/sp /sp")
            );
        }
        let splitText = enterSplit(text).splice(Math.max(0, index - 1), 5);
        let splitTextWritten = enterSplit(textWritten).splice(Math.max(0, index - 1), 5);
        setSentences(
            splitText.map((sentence, index) => (
                <SentenceLine
                    prevIndex={index + 1}
                    updateCursorPosition={updateCursorPosition}
                    index={index}
                    pointer={index == splitTextWritten.length - 1 ? true : false}
                    sentence={sentence}
                    key={index}
                    sentenceWritten={splitTextWritten[index] !== undefined ? splitTextWritten[index] : ""}
                />
            ))
        );
        if (textWritten == "") {
            setCursorPosition({ left: 0, top: 32 });
        }
        console.log("textWritten", textWritten);
        console.log("text", splitText);
    }, [textWritten, text]);

    useEffect(() => {
        if (timeRef.current == false) {
            setCursorPosition({ left: 0, top: 32 });
        }
        const handleKeyPress = (event) => {
            console.log("event", event)
            if (!timeRef.current) {
                props.startTime();
            }
            // Prevent default behavior if needed
            // event.preventDefault();

            if (event.key === "Backspace") {
                setTextWritten((textWritten) => {
                    // Check if the last 3 characters are "/br" (assuming "/br" is a marker for a space)
                    if (textWritten.endsWith("/sp")) {
                        return textWritten.slice(0, -7); // Remove last 3 characters
                    } else {
                        return textWritten.slice(0, -1); // Remove last character
                    }
                });
                return;
            } else if (event.key === " ") {
                setTextWritten((textWritten) => textWritten + "/sp /sp");
                return;
            } else if (event.key === "Enter") {
                setIndex((i) => i + 1);
                setTextWritten((textWritten) => textWritten + "/enter");
                console.log("refText", textRef.current.split("/enter").length);
                console.log("refIndex", 2 + indexRef.current);

                return;
            } else if (event.key === "Escape") {
                props.handleReset();
            }
            if (event.key.length > 1) {
                return;
            }

            setTextWritten((textWritten) => textWritten + event.key);
        };
        // Add event listener when component mounts
        document.addEventListener("keydown", handleKeyPress);

        // Cleanup: Remove event listener when component unmounts
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [props.timeStart]);
    useEffect(() => {}, []);

    return (
        <div ref={containerRef} className="relative ">
            <div className=" relative text-2xl  mt-4 flex flex-col flex-wrap overflow-hidden text-pretty select-none">
                {sentences}
            </div>
            <Cursor left={cursorPosition.left} top={cursorPosition.top} />
        </div>
    );
}
