export const dateFormat = (time) => {
  return new Date(time).toLocaleDateString().replaceAll("/", "-");
};
