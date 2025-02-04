export const convertTime = (time) => {
  console.log(time);

  const date = new Date(time);
  const formattedDate = date.toLocaleDateString("vi-VN");
  return formattedDate;
};
