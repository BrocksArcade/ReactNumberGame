export function getRandomNumberInRange(min = 0, max = 99) {
    let ran=Math.floor(Math.random().toExponential(2) * 100);
    const variation = Math.floor(Math.random().toExponential(2) * 10);
    
    ran = ran > max ? max - variation : ran;
    ran = ran < min ? min + variation : ran;
    return ran;
}