export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}${id}`;
}

export function makeThumnailPath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "w500"}${id}`;
}