const texts = [
    "Learn by doing real projects.",
    "Build your billing system.",
    "Manage daily tasks easily.",
    "full stack web development.",
    "Automate your routines."
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