export const getEllipsisTxt = (str: string | undefined, n = 6) => {
  if (!str) return;
  if (str?.length <= n * 2) {
    return str;
  }
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
  }
  return "";
};

export function capitalize(str: string | undefined): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

