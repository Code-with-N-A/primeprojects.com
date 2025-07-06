
  const lines = [
   "PrimeProjects offers practical coding solutions for students and developers.",
"The website simplifies learning through real-world web development projects.",
"It provides useful tools like data analytics, task managers, and image-to-PDF converters.",
"All projects are fully responsive and work smoothly on phones, tablets, and desktops.",
"Advanced JavaScript features like LocalStorage, OTP login, and PDF export are included.",
"The site is designed to help users from beginner to advanced coding levels.",
"PrimeProjects enhances coding logic and improves real-world problem solving.",
"Each tool is built with high performance and a professional design.",
"The platform also supports students with exam help and coding assignments.",
"PrimeProjects is updated regularly with features based on real-world needs."

  ];

  const element = document.getElementById("typewriter");
  let lineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentLine = lines[lineIndex];
    const visibleText = isDeleting
      ? currentLine.substring(0, charIndex--)
      : currentLine.substring(0, charIndex++);

    element.textContent = visibleText;

    let delay = isDeleting ? 40 : 90;

    if (!isDeleting && charIndex === currentLine.length) {
      delay = 1200;  // wait after full line
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
      delay = 500;
    }

    setTimeout(typeEffect, delay);
  }

  typeEffect();

