export const convertPrice = (price) => {
  console.log(price);
  if (price < 1) {
    return `${(price * 100000).toLocaleString("vi-VN")}k`;
  }
  return `${price?.toLocaleString("vi-VN")} triệu`;
};

export const formatPrice = (price) => {
  return price.toLocaleString("vi-VN");
};
