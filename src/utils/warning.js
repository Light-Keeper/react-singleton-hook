
export const warning = (message) => {
  if (console && console.warn) {
    console.warn(message);
  }
};
