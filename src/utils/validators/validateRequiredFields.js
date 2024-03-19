import InvalidInputError from "../errors/InvalidInputError.js";

const validateRequiredFields = (fields, reqBody) => {
    for (let field of fields) {
        if (!reqBody[field]) {
            throw new InvalidInputError(400, `${field} is required`);
        }
    }
}
export default validateRequiredFields;