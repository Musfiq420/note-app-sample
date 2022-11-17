import { useEffect, useState } from 'react';

const useCheckDevice = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    if (width>1024)
        return 'desktop'
    else if (width>660)
        return 'tablet'
    else 
        return 'mobile'
}

export default useCheckDevice