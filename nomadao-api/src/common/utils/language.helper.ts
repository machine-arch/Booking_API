import { HttpResponseStrings } from '../app-strings/http-response-strings';

export const getAppString = (lang: string, key: string): string => {
  return HttpResponseStrings[lang][key];
};
