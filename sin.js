
window.onload = () => {
  const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = value;
    return acc;
  }, {});

  if (!cookies.verifiedUser) {
    // Save current page URL
    const currentURL = window.location.href;
    document.cookie = `redirectedFrom=${encodeURIComponent(currentURL)}; path=/`;
    // Redirect to registration (OTP) form
    window.location.href = "ragistretion.html";
  }
};

