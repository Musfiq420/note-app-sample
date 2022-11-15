import { useEffect, useState } from 'react';

const useCheckMobile = () => {
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

    return width<760;
}

export default useCheckMobile