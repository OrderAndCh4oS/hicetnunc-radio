const pad = (n, width, unit) => {
    unit = unit || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(unit) + n;
};

const getAudioTime = (time) => {
    const minutes = ~~(time / 60);
    const seconds = time - minutes * 60;
    return `${minutes}.${pad(~~seconds, 2)}`;
};

export default getAudioTime;
