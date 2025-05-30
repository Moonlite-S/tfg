import { useCallback, useState } from "react";

export const useMouseCapture = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
    }, [])

    return { mousePosition, handleMouseMove };
}