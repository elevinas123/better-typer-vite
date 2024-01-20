import { useEffect, useRef } from "react";

export default function Cursor({ left, top }) {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursorNode = cursorRef.current;
        if (cursorNode) {
            // Trigger reflow to restart the animation
            void cursorNode.offsetWidth;
            cursorNode.classList.remove('pulse');
            void cursorNode.offsetWidth; // Trigger reflow
            cursorNode.classList.add('pulse');
        }
    }, [left, top]); // Dependency array includes the properties that, when changed, should restart the animation

    return (
        <div
            ref={cursorRef}
            className="absolute w-0.5 h-6 bg-yellow-400 pulse z-10 select-none"
            style={{
                left: `${left}px`,
                top: `${top}px`,
                transform: 'translateY(-50%)',
                transition: 'left 0.1s ease-out, top 0.1s ease-out',
            }}
        ></div>
    );
}
