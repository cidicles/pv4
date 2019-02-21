export function hexToRGB(h) {
    const hex = h.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}