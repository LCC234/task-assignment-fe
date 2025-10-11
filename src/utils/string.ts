export const getTruncatedTitle = (title: string) => {
  const words = title.trim().split(/\s+/);
  return words.length > 3 ? words.slice(0, 3).join(' ') + '...' : title;
};
