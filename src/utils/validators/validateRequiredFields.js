import InvalidInputError from "../errors/InvalidInputError.js";

// const validateRequiredFields = (fields, reqBody) => {
//     for (let field of fields) {
//         if (!reqBody[field]) {
//             throw new InvalidInputError(400, `${field} is required`);
//         }
//     }
// }

const validateRequiredFields = (fields, reqBody) => {
    const missingFields = fields.filter(field => !reqBody[field]);
    if (missingFields.length > 0) {
        throw new InvalidInputError(400, `${missingFields.join(', ')} are required`);
    }
}
export default validateRequiredFields;