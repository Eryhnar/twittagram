const isValidHashtag = (hashtag) => {
  return hashtag.startsWith('#') && hashtag.length > 1 && hashtag.length <= 10;
}