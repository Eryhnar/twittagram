const imageUrlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|svg|png)/g;

export default function isValidImageUrl(url) {
    return imageUrlRegex.test(url);
}