export const convertToUrlParams = (word: string): string => {
  // Convert to lowercase and replace spaces with hyphens
  const urlParams: string = word.toLowerCase().replace(/\s+/g, "-");
  return urlParams;
};

export const convertFromUrlParams = (urlParams: string): string => {
  // Replace hyphens with spaces and capitalize each word
  const humanReadableWord: string = urlParams
    .replace(/\//g, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
  return humanReadableWord;
};
