const isValidCaption = (caption) => {
    if (caption.length < 1 || caption.length > 150) {
        return false;
    }
    return true;
}
export default isValidCaption;