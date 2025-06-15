let primepay_qrObj, primepay_upi = "", primepay_amt = "";

  function primepay_showPopup() {
    document.getElementById("primepay_overlay").style.display = "flex";
    const saved = JSON.parse(localStorage.getItem("primepay_qr_data") || "{}");
    if (saved.upi && saved.amount) {
      primepay_upi = saved.upi;
      primepay_amt = saved.amount;
      document.getElementById("primepay_upiInput").value = primepay_upi;
      document.getElementById("primepay_amtInput").value = primepay_amt;
      primepay_generateQR(true);
    } else {
      document.getElementById("primepay_inputSection").style.display = "block";
      document.getElementById("primepay_resultBox").style.display = "none";
    }
  }

  function primepay_closePopup() {
    document.getElementById("primepay_overlay").style.display = "none";
  }

  function primepay_generateQR(silent = false) {
    primepay_upi = document.getElementById("primepay_upiInput").value.trim();
    primepay_amt = document.getElementById("primepay_amtInput").value.trim();
    if (!primepay_upi || !primepay_amt) {
      if (!silent) alert("Please enter UPI ID and Amount.");
      return;
    }

    const qrURL = `upi://pay?pa=${primepay_upi}&pn=PrimePay&am=${primepay_amt}&cu=INR`;
    localStorage.setItem("primepay_qr_data", JSON.stringify({ upi: primepay_upi, amount: primepay_amt }));

    document.getElementById("primepay_qrcode").innerHTML = "";
    primepay_qrObj = new QRCode(document.getElementById("primepay_qrcode"), {
      text: qrURL,
      width: 200,
      height: 200,
      correctLevel: QRCode.CorrectLevel.H
    });

    document.getElementById("primepay_text").innerText = `UPI: ${primepay_upi}\nAmount: ₹${primepay_amt}`;
    document.getElementById("primepay_amtEdit").value = primepay_amt;
    document.getElementById("primepay_inputSection").style.display = "none";
    document.getElementById("primepay_resultBox").style.display = "block";
  }

  function primepay_updateAmount() {
    const newAmt = document.getElementById("primepay_amtEdit").value.trim();
    if (!newAmt) return;
    primepay_amt = newAmt;

    const qrURL = `upi://pay?pa=${primepay_upi}&pn=PrimePay&am=${primepay_amt}&cu=INR`;
    localStorage.setItem("primepay_qr_data", JSON.stringify({ upi: primepay_upi, amount: primepay_amt }));

    document.getElementById("primepay_qrcode").innerHTML = "";
    primepay_qrObj = new QRCode(document.getElementById("primepay_qrcode"), {
      text: qrURL,
      width: 200,
      height: 200,
      correctLevel: QRCode.CorrectLevel.H
    });

    document.getElementById("primepay_text").innerText = `UPI: ${primepay_upi}\nAmount: ₹${primepay_amt}`;
  }

  function primepay_downloadQR() {
    const qrEl = document.getElementById("primepay_qrWrap");
    html2canvas(qrEl, { scale: 5 }).then(canvas => {
      const link = document.createElement("a");
      link.download = "PrimePay_QR_HD.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }

  function primepay_deleteQR() {
    localStorage.removeItem("primepay_qr_data");
    document.getElementById("primepay_inputSection").style.display = "block";
    document.getElementById("primepay_resultBox").style.display = "none";
    document.getElementById("primepay_upiInput").value = "";
    document.getElementById("primepay_amtInput").value = "";
    document.getElementById("primepay_amtEdit").value = "";
    document.getElementById("primepay_qrcode").innerHTML = "";
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("primepay_amtEdit").addEventListener("blur", primepay_updateAmount);
  });