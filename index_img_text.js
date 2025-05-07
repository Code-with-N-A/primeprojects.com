const texts = [
    "Learn by doing real projects.",
    "Build your billing system.",
    "Manage daily tasks easily.",
    "full stack web development.",
    "Learn by doing real projects.",
    "Master coding with practical projects.",
    "Track your personal finances effectively.",
    "Easily manage product feedback.",
    "Effortlessly organize and manage tasks.",
    "Manage tasks and deadlines efficiently.",
    "Get inspired with a daily thought.",
    "Track and manage your expenses smartly.",
    "Keep your financial records organized.",
    "Create and download QR codes in your preferred format.",
    "Manage and track your accounts efficiently."    
   
  ];

  let count = 0;
  let index = 0;
  let currentText = '';
  let letter = '';
  const typewriter = document.getElementById('typewriter-text');

  function type() {
    if (count === texts.length) {
      count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    typewriter.textContent = letter;
    if (letter.length === currentText.length) {
      setTimeout(() => {
        erase();
      }, 2000);
    } else {
      setTimeout(type, 100);
    }
  }

  function erase() {
    if (index > 0) {
      letter = currentText.slice(0, --index);
      typewriter.textContent = letter;
      setTimeout(erase, 50);
    } else {
      count++;
      setTimeout(type, 500);
    }
  }

  // Start animation
  type();