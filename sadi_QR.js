  const popup = document.getElementById("popup");
  const popupContent = document.getElementById("popupContent");
  const emailInput = document.getElementById("emailInput");
  const otpInput = document.getElementById("otpInput");
  const upiInput = document.getElementById("upiInput");
  const statusMsg = document.getElementById("statusMsg");
  const qrCanvas = document.getElementById("qrCanvas");
  const qrImageBox = document.getElementById("qrImageBox");
  const generateQRBtn = document.getElementById("generateQRBtn");
  const deleteQRBtn = document.getElementById("deleteQRBtn");
  const receiverName = document.getElementById("receiverName");
  const downloadPopupBtn = document.getElementById("downloadPopupBtn");

  let upiDisplay = document.createElement("div");
  upiDisplay.id = "upiDisplay";
  upiDisplay.style.fontSize = "15px";
  upiDisplay.style.color = "#333";
  upiDisplay.style.marginTop = "6px";
  qrCanvas.appendChild(upiDisplay);

  let generatedOTP = "";
  let email = "";

  document.getElementById("openPopupBtn").addEventListener("click", () => {
    popup.style.display = "flex";
    resetPopup();
    const savedQR = localStorage.getItem("qrCodeData");
    const savedName = localStorage.getItem("qrName");
    const savedUPI = localStorage.getItem("qrUpi");
    if (savedQR) {
      qrCanvas.style.display = "block";
      qrImageBox.innerHTML = savedQR;
      receiverName.innerText = savedName || "";
      upiDisplay.innerText = savedUPI || "";
      deleteQRBtn.style.display = "block";
      hideInputs();
      downloadPopupBtn.style.display = "inline-block"; // Show download btn
    } else {
      downloadPopupBtn.style.display = "none";
    }
  });

  function closePopup() {
    popup.style.display = "none";
  }

  function setStatusMsg(msg, color) {
    statusMsg.textContent = msg;
    statusMsg.style.color = color;
  }

  function resetPopup() {
    setStatusMsg("", "");

    emailInput.style.display = "block";
    otpInput.style.display = "block";

    emailInput.value = "";
    otpInput.value = "";
    upiInput.value = "";

    document.querySelectorAll(".popup-content button").forEach(btn => {
      if (btn.id !== "deleteQRBtn" && btn.id !== "downloadPopupBtn") btn.style.display = "inline-block";
    });

    upiInput.style.display = "none";
    generateQRBtn.style.display = "none";
    qrCanvas.style.display = "none";
    deleteQRBtn.style.display = "none";
    downloadPopupBtn.style.display = "none";

    receiverName.innerText = "";
    upiDisplay.innerText = "";
  }

  function hideInputs() {
    emailInput.style.display = "none";
    otpInput.style.display = "none";
    document.querySelectorAll(".popup-content button").forEach(btn => {
      if (btn.id !== "deleteQRBtn" && btn.id !== "downloadPopupBtn") btn.style.display = "none";
    });
  }

  function sendOTP() {
    email = emailInput.value.trim();
    if (!email) {
      setStatusMsg("Please enter a valid email.", "red");
      return;
    }

    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    setStatusMsg("Sending OTP...", "orange");

    fetch(`https://formsubmit.co/ajax/${email}`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: `Your OTP is: ${generatedOTP}` })
    })
    .then(() => {
      setStatusMsg("OTP Sent Successfully!", "green");
    })
    .catch(() => {
      setStatusMsg("Failed to send OTP", "red");
    });
  }

  function verifyOTP() {
    if (otpInput.value.trim() === generatedOTP) {
      setStatusMsg("OTP Verified!", "green");
      upiInput.style.display = "block";
      generateQRBtn.style.display = "block";
    } else {
      setStatusMsg("Invalid OTP!", "red");
    }
  }

  function extractNameFromUPI(upiID) {
    let namePart = upiID.split('@')[0];
    namePart = namePart.replace(/[0-9]/g, '');
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  }

  function generateQR() {
    const upiID = upiInput.value.trim();
    if (!upiID || !upiID.includes("@")) {
      setStatusMsg("Enter a valid UPI ID", "red");
      return;
    }

    const upiURL = `upi://pay?pa=${upiID}&pn=Receiver&cu=INR`;
    const name = extractNameFromUPI(upiID);

    QRCode.toDataURL(upiURL, { width: 250 }, (err, url) => {
      if (err) {
        setStatusMsg("QR generation failed!", "red");
        return;
      }

      qrImageBox.innerHTML = `<img src="${url}" style="width:100%; border-radius:12px;">`;
      receiverName.textContent = name;
      upiDisplay.textContent = upiID;

      qrCanvas.style.display = "block";
      setStatusMsg("QR generated successfully!", "green");

      // Save to localStorage
      localStorage.setItem("qrCodeData", qrImageBox.innerHTML);
      localStorage.setItem("qrName", name);
      localStorage.setItem("qrUpi", upiID);

      hideInputs();
      deleteQRBtn.style.display = "block";
      downloadPopupBtn.style.display = "inline-block";
    });
  }

  function deleteQR() {
    qrCanvas.style.display = "none";
    qrImageBox.innerHTML = "";
    receiverName.textContent = "";
    upiDisplay.textContent = "";
    localStorage.removeItem("qrCodeData");
    localStorage.removeItem("qrName");
    localStorage.removeItem("qrUpi");
    deleteQRBtn.style.display = "none";
    downloadPopupBtn.style.display = "none";
    resetPopup();
  }

  // The key function: Download popup content as an image with a solid white background
  function downloadPopupImage() {
    // Clone popupContent to avoid modifying original UI
    const clone = popupContent.cloneNode(true);

    // Remove close button and download/delete buttons from clone to keep image clean
    const closeBtn = clone.querySelector('.close-btn');
    if (closeBtn) closeBtn.remove();
    const deleteBtn = clone.querySelector('#deleteQRBtn');
    if (deleteBtn) deleteBtn.remove();
    const downloadBtn = clone.querySelector('#downloadPopupBtn');
    if (downloadBtn) downloadBtn.remove();

    // Make sure the cloned popup content has white background (no transparency)
    clone.style.background = "white";

    // Append clone to body but keep hidden off-screen
    clone.style.position = "fixed";
    clone.style.top = "-9999px";
    clone.style.left = "-9999px";
    clone.style.width = "350px"; // fixed width for clarity
    clone.style.padding = "25px 30px 40px 30px";
    document.body.appendChild(clone);

    html2canvas(clone, {
      backgroundColor: "#ffffff",
      scale: 10, // higher scale for better quality
      useCORS: true,
      allowTaint: false,
    }).then(canvas => {
      // Create link to download image
      const link = document.createElement('a');
      link.download = 'primepay_qr.png';
      link.href = canvas.toDataURL('image/png');
      link.click();

      document.body.removeChild(clone);
    });
  }