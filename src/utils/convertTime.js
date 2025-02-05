export const convertTime = (time) => {
  const date = new Date(time);
  const formattedDate = date.toLocaleDateString("vi-VN");
  return formattedDate;
};
