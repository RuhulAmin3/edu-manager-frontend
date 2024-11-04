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

export function getGreeting() {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Good Morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    return "Good Afternoon";
  } else if (currentHour >= 17 && currentHour < 21) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
}

export const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
