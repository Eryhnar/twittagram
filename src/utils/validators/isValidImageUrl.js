const imageUrlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|svg|png)/g;

const isValidImageUrl = (url) => {
    return imageUrlRegex.test(url);
}

export default isValidImageUrl;