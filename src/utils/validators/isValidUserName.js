//. _ - are allowed
//no special characters
//any language
//numbers allowed
//no more than 20 characters
//no less than 3 characters
//no consecutive dots, underscores or hyphens
//no dots, underscores or hyphens at the beginning

const regex = /^(?!.*[._-]{2})[a-zA-Z0-9_. -]{3,20}$/;
export const isValidUserName = (userName) => {
    return regex.test(userName);
}

