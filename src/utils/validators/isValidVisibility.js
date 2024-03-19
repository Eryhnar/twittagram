const isValidVisibility = (visibility) => {
    const validVisibilities = ["public", "friends", "private"];
    return validVisibilities.includes(visibility);
}
export default isValidVisibility;