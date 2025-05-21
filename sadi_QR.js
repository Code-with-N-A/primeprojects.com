 const popup = document.getElementById("popup");
  const emailInput = document.getElementById("emailInput");
  const otpInput = document.getElementById("otpInput");
  const fileInput = document.getElementById("fileInput");
  const preview = document.getElementById("preview");
  const deleteBtn = document.getElementById("deleteImageBtn");
  const statusMsg = document.getElementById("statusMsg");
  const qrContainer = document.getElementById("qrContainer");

  let generatedOTP = "";
  let email = "";

  document.getElementById("openPopupBtn").addEventListener("click", () => {
    popup.style.display = "flex";
    resetPopup();

    const savedEmail = localStorage.getItem("email");
    const savedImg = localStorage.getItem("imageData");

    if (savedEmail) emailInput.value = savedEmail;

    if (savedImg) {
      preview.src = savedImg;
      qrContainer.style.display = "flex";
      preview.style.display = "block";
      deleteBtn.style.display = "block";

      emailInput.style.display = "none";
      otpInput.style.display = "none";
      fileInput.style.display = "none";
      document.getElementById("sendOtpBtn").style.display = "none";
      document.getElementById("verifyOtpBtn").style.display = "none";
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
    otpInput.value = "";
    fileInput.style.display = "none";
    preview.style.display = "none";
    qrContainer.style.display = "none";
    deleteBtn.style.display = "none";

    emailInput.style.display = "block";
    otpInput.style.display = "block";
    document.getElementById("sendOtpBtn").style.display = "block";
    document.getElementById("verifyOtpBtn").style.display = "block";
  }

  function sendOTP() {
    email = emailInput.value.trim();
    if (!email) {
      setStatusMsg("Please enter a valid email.", "red");
      return;
    }

    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem("email", email);
    setStatusMsg("Sending OTP...", "orange");

    fetch(`https://formsubmit.co/ajax/${email}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Your OTP is: ${generatedOTP}`
      })
    })
    .then(res => res.json())
    .then(() => setStatusMsg("OTP Sent Successfully!", "green"))
    .catch(() => setStatusMsg("Failed to send OTP", "red"));
  }

  function verifyOTP() {
    const enteredOTP = otpInput.value.trim();
    if (enteredOTP === generatedOTP) {
      setStatusMsg("OTP Verified!", "green");
      fileInput.style.display = "block";
    } else {
      setStatusMsg("Invalid OTP!", "red");
    }
  }

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
      preview.style.display = "block";
      qrContainer.style.display = "flex";
      deleteBtn.style.display = "block";

      localStorage.setItem("imageData", reader.result);

      // Hide everything else
      emailInput.style.display = "none";
      otpInput.style.display = "none";
      fileInput.style.display = "none";
      document.getElementById("sendOtpBtn").style.display = "none";
      document.getElementById("verifyOtpBtn").style.display = "none";

      setStatusMsg("", "");
    };
    reader.readAsDataURL(file);
  });

  function deleteImage() {
    localStorage.removeItem("imageData");
    localStorage.removeItem("email");

    resetPopup();
    setStatusMsg("Image deleted.", "red");
  }