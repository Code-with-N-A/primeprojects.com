const pages = [
    { name: "Web Development", url: "https://studyvibe.netlify.app/" },
    { name: "JavaScript", url: "https://studyvibe.netlify.app/" },
    { name: "HTML & CSS", url: "https://studyvibe.netlify.app/" },
    { name: "React", url: "https://studyvibe.netlify.app/" },
    { name: "Python", url: "https://studyvibe.netlify.app/" },
    { name: "Django", url: "https://studyvibe.netlify.app/" },
    { name: "Node.js", url: "https://studyvibe.netlify.app/" },
    { name: "Java", url: "https://studyvibe.netlify.app/" },
    { name: "PHP", url: "https://studyvibe.netlify.app/" },
    { name: "Machine Learning", url: "https://studyvibe.netlify.app/" },
    { name: "certificates", url : "https://studyvibe.netlify.app/"},
    { name: "studyvibe", url: "https://studyvibe.netlify.app/"},
    { name: "coding", url: "https://studyvibe.netlify.app/"},
    { name: "full stack webdevlopment", url: "https://studyvibe.netlify.app/"},
    { name: "programing lengug", url: "https://studyvibe.netlify.app/"},
    { name: "peparlibrary", url: "https://paperlibrary.netlify.app/"},
    { name: "pepar", url: "https://paperlibrary.netlify.app/" },
    { name: "all paper", url: "https://paperlibrary.netlify.app/"},
    { name: "about", url: "https://primeprojects.netlify.app/servises"},
    { name: "bill", url: "https://primeprojects.netlify.app/biling"},
    { name: "birthody", url: "https://primeprojects.netlify.app/birthdy"},
    { name: "contect", url: "https://primeprojects.netlify.app/contect"},
    { name: "all projects", url: "https://primeprojects.netlify.app/explor.html"},
    { name: "location map", url: "https://primeprojects.netlify.app/map"},
    { name: "QR qr code ganretar", url: "QR.html"},
    {name: " task manager", url: "https://primeprojects.netlify.app/task_menegar"},
    {name: "img to pdf ", url: "https://primeprojects.netlify.app/img_to_pdf_5G"},
    {name: " The Coding Blueprint map", url: "Roode_Map.html"},
    {name: " Password Cheker", url: "Password_chekar.html"},
    {name: "PDFshift", url: "pdf_to_img.html"},
    {name: "Accounts Management", url: "worck.html"},
    {name: "Budget Tracker", url: "bjat-trecar.html"},
    {name: "Product Listener", url: "product_list.html"},
    {name: "Pocket Expense", url: "Pocket_Expense.html"},
    {name: "Unicode Character", url: "Unicode_Character.html"},
    {name: "Aaj Ka Suvichar Hindi", url: "Suvichar.html"},
    {name: "Payroll Record", url: "Payroll.html"},
    {name: "Wedding & Dowry Records", url: "Sadi_Money.html"},
    {name: "Hindi Notse", url: "notse_to_pdf.html"},
    {name: "English Notse", url: "notse_English.html"},



  ];

  function showSuggestions(query) {
    const suggestionsList = document.getElementById("suggestions");
    suggestionsList.innerHTML = '';  // Clear previous suggestions

    if (query.length < 1) {
      suggestionsList.style.display = 'none';
      return;
    }

    const filteredSuggestions = pages.filter(page => 
      page.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredSuggestions.length === 0) {
      suggestionsList.style.display = 'none';
      return;
    }

    filteredSuggestions.forEach(page => {
      const div = document.createElement("div");
      div.classList.add("suggestion-item");
      div.textContent = page.name;
      div.onclick = function() {
        window.location.href = page.url;  // Redirect to the URL on suggestion click
      };
      suggestionsList.appendChild(div);
    });

    suggestionsList.style.display = 'block';
  }

  function performSearch() {
    const query = document.getElementById("searchInput").value;
    const matchedPage = pages.find(page => page.name.toLowerCase().includes(query.toLowerCase()));

    if (matchedPage) {
      window.location.href = matchedPage.url;  // Redirect to the matching page URL
    } else {
      alert("No  Available.");
    }
  }

  // Check if Enter key is pressed
  function checkEnter(event) {
    if (event.key === 'Enter') {
      performSearch();
    }
  }

  // Click outside to hide suggestions
  document.addEventListener('click', function(event) {
    const searchContainer = document.getElementById('searchContainer');
    if (!searchContainer.contains(event.target)) {
      document.getElementById('suggestions').style.display = 'none';
    } else {
      searchContainer.classList.add('active');
    }
  });