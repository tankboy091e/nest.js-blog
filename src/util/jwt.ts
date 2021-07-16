export default function parseJwt(token: string) {
  try {
    if (typeof atob === 'undefined') {
      return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    }
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}
