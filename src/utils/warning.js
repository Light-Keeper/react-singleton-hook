
export const warning = (message) => {
  if (console && console.error) {
    console.error(message);
  }
};
