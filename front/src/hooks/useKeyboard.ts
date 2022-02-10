export const keyLog = (e: KeyboardEvent) => {
  console.log(e.key, e.altKey, e.code, e.ctrlKey, e.shiftKey);
  return false;
};
