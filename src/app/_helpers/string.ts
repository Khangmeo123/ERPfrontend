export const generateRandomString = (length: number) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += alphabet[Math.random() * alphabet.length];
  }
  return result;
};
export function translate(str: string) {
  return str;
}
