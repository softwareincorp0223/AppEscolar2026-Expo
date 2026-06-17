const htmlEntities: Record<string, string> = {
  "&aacute;": "a",
  "&eacute;": "e",
  "&iacute;": "i",
  "&oacute;": "o",
  "&uacute;": "u",
  "&Aacute;": "A",
  "&Eacute;": "E",
  "&Iacute;": "I",
  "&Oacute;": "O",
  "&Uacute;": "U",
  "&ntilde;": "n",
  "&Ntilde;": "N",
  "&nbsp;": " ",
  "&amp;": "&",
};

export function htmlToText(value: string) {
  return value
    .replace(/<\/p>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-zA-Z]+;/g, (entity) => htmlEntities[entity] ?? entity)
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
