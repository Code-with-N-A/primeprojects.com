const user = JSON.parse(localStorage.getItem('userData'));
    if (!user || !user.verified) {
      window.location.href = "ragistretion.html";
    }