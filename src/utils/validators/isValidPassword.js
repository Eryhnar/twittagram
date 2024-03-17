const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,14}$/;
export const isValidPassword = (password) => {
    return passwordRegex.test(password);
}