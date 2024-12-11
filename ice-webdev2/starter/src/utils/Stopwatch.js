const createStopwatch = () => {
    let startMS;

    const start = () => {
        startMS = new Date().getTime();
    }

    const get = () => {
        return new Date().getTime() - startMS;
    }

    const reset = () => {
        startMS = undefined;
    }

    return {
        start, get, reset
    }
}

const Stopwatch = createStopwatch();

export default Stopwatch;