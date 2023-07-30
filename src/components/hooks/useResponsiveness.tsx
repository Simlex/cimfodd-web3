import { useEffect, useState } from "react";

export default function useIsWithin768px(): boolean {

    const [isWithin768px, setIsWithin768px] = useState(() => window.innerWidth <= 768);
    // const [isWithin768px, setIsWithin768px] = useState(false);

    useEffect(() => {
        function handleResize() {
            setIsWithin768px(window.innerWidth <= 768);
        }

        if (typeof window !== "undefined") {
            setIsWithin768px(window.innerWidth <= 768);
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    return isWithin768px;
}