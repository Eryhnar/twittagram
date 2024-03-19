const isValidBio = (bio) => {
    if (bio.length > 100) {
        return false;
    }
    return true;
}

export default isValidBio;