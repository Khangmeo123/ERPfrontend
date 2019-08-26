import {marker} from '@biesbjerg/ngx-translate-extract-marker';

export const generateRandomString = (length: number) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += alphabet[Math.random() * alphabet.length];
  }
  return result;
};

export const translate = (str: string) => {
  return marker(str);
};
