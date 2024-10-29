import { jwtDecode } from "jwt-decode";

export function decodeToken(token: string): Record<string, string> {
  let decoded;

  try {
    decoded = jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error);
  }

  return decoded as Record<string, string>;
}
