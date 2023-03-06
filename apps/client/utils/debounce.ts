const debounce = (timeoutRef: any, fn: () => void, delay: number) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(fn, delay);
};

export default debounce;