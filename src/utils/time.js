export default function time() {
    const timeNow = new Date();

    const hours = String(timeNow.getHours()).padStart(2, '0');
    const minutes = String(timeNow.getMinutes()).padStart(2, '0');
 
    return `${hours}:${minutes}`;
}
