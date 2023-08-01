export const parseTime = (decimalSeconds : any, includeMilliseconds = true) => {
    decimalSeconds = parseFloat(decimalSeconds);
    if (!decimalSeconds) return includeMilliseconds ? ['00', '00', '000'] : ['00', '00'];
    const minutes = Math.floor((decimalSeconds % 3600) / 60);
    const seconds = Math.floor(decimalSeconds % 60);
    const milliseconds = Math.floor(decimalSeconds * 1000) % 1000;
    if (includeMilliseconds) {
        return [
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0'),
            milliseconds.toString().padStart(3, '0')
        ];
    } else {
        return [
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0')
        ];
    }
}