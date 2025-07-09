
const input = document.querySelector(".form-control.me-2");
const suggestionBox = document.getElementById("suggestionBox");
const overlay = document.getElementById("overlay");

const otherPages = [
   { title: "JavaScript", url: "https://studyvibe.netlify.app/" },
    { title: "HTML & CSS", url: "https://studyvibe.netlify.app/" },
    { title: "React", url: "https://studyvibe.netlify.app/" },
    { title: "Python", url: "https://studyvibe.netlify.app/" },
    { title: "Django", url: "https://studyvibe.netlify.app/" },
    { title: "Node.js", url: "https://studyvibe.netlify.app/" },
    { title: "Java", url: "https://studyvibe.netlify.app/" },
    { title: "PHP", url: "https://studyvibe.netlify.app/" },
    { title: "Machine Learning", url: "https://studyvibe.netlify.app/" },
    { title: "certificates", url : "https://studyvibe.netlify.app/"},
    { title: "studyvibe", url: "Exam_Papers.html"},
    { title: "coding", url: "https://studyvibe.netlify.app/"},
    { title: "full stack webdevlopment", url: "https://studyvibe.netlify.app/"},
    { title: "programing lengug", url: "https://studyvibe.netlify.app/"},
    { title: "peparlibrary", url: "Exam_Papers.html"},
    { title: "pepar", url: "Exam_Papers.html" },
    { title: "all paper", url: "Exam_Papers.html"},
    { title: "about", url: "about.html"},
    { title: "bill", url: "https://primeprojects.netlify.app/biling"},
    { title: "birthody", url: "https://primeprojects.netlify.app/birthdy"},
    { title: "contect", url: "https://primeprojects.netlify.app/contect"},
    { title: "all projects", url: "https://primeprojects.netlify.app/explor.html"},
    { title: "location map", url: "https://primeprojects.netlify.app/map"},
    { title: "QR qr code ganretar", url: "QR.html"},
    {title: " task manager", url: "https://primeprojects.netlify.app/task_menegar"},
    {title: "img to pdf ", url: "https://primeprojects.netlify.app/img_to_pdf_5G"},
    {title: " The Coding Blueprint map", url: "Roode_Map.html"},
    {title: " Password Cheker", url: "Password_chekar.html"},
    {title: "PDFshift", url: "pdf_to_img.html"},
    {title: "Accounts Management", url: "worck.html"},
    {title: "Budget Tracker", url: "bjat-trecar.html"},
    {title: "Product Listener", url: "product_list.html"},
    {title: "Pocket Expense", url: "Pocket_Expense.html"},
    {title: "Unicode Character", url: "Unicode_Character.html"},
    {title: "Aaj Ka Suvichar Hindi", url: "Suvichar.html"},
    {title: "Payroll Record", url: "Payroll.html"},
    {title: "Wedding & Dowry Records", url: "Sadi_Money.html"},
    {title: "Hindi Notse", url: "notse_to_pdf.html"},
    {title: "English Notse", url: "notse_English.html"},
];

input.addEventListener("input", () => {
  const query = input.value.trim().toLowerCase();
  suggestionBox.innerHTML = "";
  suggestionBox.style.display = "none";

  if (!query) {
    overlay.style.display = "none";
    removeAllHighlights();
    return;
  }

  overlay.style.display = "block";
  removeAllHighlights();

  const lines = [];
  document.querySelectorAll("body *:not(script):not(style)").forEach(el => {
    if (el.children.length === 0 && el.innerText.trim().length > 0) {
      const text = el.innerText;
      const index = text.toLowerCase().indexOf(query);
      if (index !== -1) {
        const id = "match_" + Math.random().toString(36).substr(2, 9);
        const before = text.substring(0, index);
        const match = text.substring(index, index + query.length);
        const after = text.substring(index + query.length);
        el.innerHTML = before + `<mark id="${id}" data-temp style="background: yellow; font-weight: bold;">${match}</mark>` + after;
        lines.push({ text, id });
      }
    }
  });

  const pageMatches = otherPages.filter(p => p.title.toLowerCase().includes(query));
  const allSuggestions = [];

  // Show matched lines
  lines.forEach(match => {
    const li = document.createElement("li");
    li.innerHTML = `<div style="padding: 10px; cursor: pointer;">📄 ${highlightText(match.text, query)}</div>`;
    li.style.borderBottom = "1px solid #eee";
    li.onclick = () => {
      const el = document.getElementById(match.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.style.background = "orange";
        setTimeout(() => {
          removeAllHighlights();
        }, 1000);
      }
      hideSuggestions();
    };
    suggestionBox.appendChild(li);
    allSuggestions.push(null);
  });

  // Show matched links
  pageMatches.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${p.url}" style="display: block; padding: 10px; text-decoration: none; color: black;">🔗 ${highlightText(p.title, query)}</a>`;
    li.style.borderBottom = "1px solid #eee";
    li.onmouseover = () => li.style.background = "#f0f0f0";
    li.onmouseout = () => li.style.background = "#fff";
    li.onclick = () => hideSuggestions();
    suggestionBox.appendChild(li);
    allSuggestions.push(p.url);
  });

  // ❌ No match found
  if (lines.length === 0 && pageMatches.length === 0) {
    const li = document.createElement("li");
    li.innerHTML = `<div style="padding: 10px; color: red; text-align:center;">❌ No record found</div>`;
    suggestionBox.appendChild(li);
  }

  if (lines.length || pageMatches.length) {
    suggestionBox.style.display = "block";
  }

  // ENTER to go to first page match
  input.onkeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const firstLink = allSuggestions.find(url => url);
      if (firstLink) {
        hideSuggestions();
        window.location.href = firstLink;
      }
    }
  };
});

function highlightText(text, term) {
  const index = text.toLowerCase().indexOf(term);
  if (index === -1) return text;
  return text.substring(0, index)
    + `<mark style="background: yellow; font-weight: bold;" data-temp>${text.substring(index, index + term.length)}</mark>`
    + text.substring(index + term.length);
}

function removeAllHighlights() {
  document.querySelectorAll("mark[data-temp]").forEach(m => {
    const parent = m.parentNode;
    parent.replaceChild(document.createTextNode(m.innerText), m);
    parent.normalize();
  });
}

function hideSuggestions() {
  suggestionBox.style.display = "none";
  overlay.style.display = "none";
}

document.addEventListener("click", (e) => {
  if (!e.target.closest("#suggestionBox") && !e.target.closest(".form-control.me-2")) {
    hideSuggestions();
    removeAllHighlights();
  }
});

const observer = new ResizeObserver(() => {
  const rect = input.getBoundingClientRect();
  suggestionBox.style.left = rect.left + "px";
  suggestionBox.style.top = rect.bottom + window.scrollY + "px";
});
observer.observe(input);

