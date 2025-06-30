import axios from "axios";

const STK = "9100002102003";
const TYPE = "compact2";


const generateAddInfo = () => {
  return `Thanh toan dang bai tro ${
    Math.floor(Math.random() * (10000000 - 1 + 1)) + 1
  }`;
};

const ACCOUNTNAME = "HOANG KIM CUONG";
const BANK = "MB";

var AMOUNT = 0;
var CURRENT_ADDINFO = ""; 

export const paymentConfig = (amount) => {
  AMOUNT = amount;
  CURRENT_ADDINFO = generateAddInfo(); 
  return `https://img.vietqr.io/image/${BANK}-${STK}-${TYPE}.png
              ?amount=${amount}&addInfo='${CURRENT_ADDINFO}'&accountName=${ACCOUNTNAME}`;
};

export const checkPayment = async () => {
  try {
    const response = await axios.get(
      "https://script.google.com/macros/s/AKfycbxkB1pJe8BqGa6DNon_fihBoiVY3cdSf9FnI8uNR0zawqa0cMvI_OCYQY1tsUpmzJjjrA/exec"
    );
    const data = response.data.data[response.data.data.length - 1];

    return AMOUNT === data["Giá trị"] && data["Mô tả"].includes(CURRENT_ADDINFO);
  } catch (error) {
    console.error("Fetch error details:", error);
    return false;
  }
};
