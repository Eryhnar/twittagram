const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

export default function isValidEmail(email) {
    return emailRegex.test(email);
}