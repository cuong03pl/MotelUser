function sendTelegramMessage(message) {
  const apiToken = "7878315364:AAF-XkmnrdzXJ46KtvstiYGYmR-qpd-grI8";
  const chatId = "7286592155";

  // Replace \n with %0A for proper line breaks in URL
  const encodedMessage = message.replace(/\n/g, '%0A');
  const url = `https://api.telegram.org/bot${apiToken}/sendMessage?chat_id=${chatId}&text=${encodedMessage}&parse_mode=HTML&disable_web_page_preview=true`;

  console.log(url);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML"
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Gửi Telegram thất bại");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Telegram đã gửi:", data);
    })
    .catch((error) => {
      console.error("Lỗi khi gửi Telegram:", error);
    });
}
export default sendTelegramMessage;
