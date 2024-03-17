//. _ - are allowed
//no special characters
//no spaces
//any language
//numbers allowed
//no more than 20 characters
//no less than 3 characters
//no consecutive dots, underscores or hyphens
//no dots, underscores or hyphens at the beginning

const regex = /^@[a-z0-9](?!.*[._-]{2})[a-z0-9_.-]{2,19}$/;
const isValidHandle = (handle) => {
    return regex.test(handle);
}

export default isValidHandle;
