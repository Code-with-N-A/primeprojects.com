
 
  
   const primeprojectsData = [
      { name: "Image to PDF", icon: "https://img.icons8.com/color/48/image.png", link: "img_to_pdf_5g.html" },
      { name: "Password Strength", icon: "https://img.icons8.com/color/48/password.png", link: "password_chekar.html" },
      { name: "PDFshift",  icon: "https://img.icons8.com/color/48/pdf.png", link: "pdf_to_img.html" },
      { name: "Payroll Record", icon: "https://img.icons8.com/color/48/money.png", link: "payroll.html" },
      { name: "Bill Generator",  icon: "https://img.icons8.com/color/48/invoice.png", link: "bill.html" },  
      { name: "Pocket Expense",  icon: "https://img.icons8.com/color/48/pocket.png", link: "pocket_expense.html" },
      { name: "Unicode Character",  icon: "https://img.icons8.com/color/48/sigma.png", link: "unicode_character.html" },
      { name: "Product Listener", icon: "https://img.icons8.com/color/48/shopping-cart-loaded.png", link: "product_list.html" },
      { name: "Thought of the Day",  icon: "https://img.icons8.com/color/48/idea-sharing.png", link: "suvichar.html" },
      { name: "Task Manager",  icon: "https://img.icons8.com/color/48/checklist.png", link: "task_menegar.html" },
      { name: "QR Code Generator", icon: "https://img.icons8.com/color/48/qr-code.png", link: "qr.html" },
      { name: "Wedding & Records",  icon: "https://img.icons8.com/color/48/wedding-rings.png", link: "sadi_money.html" },
      { name: "Notebook Notes",icon: "https://img.icons8.com/color/48/spiral-bound-booklet.png", link: "notse_to_pdf.html" }
    ];

  function loadPrimeprojects() {
      const grid = document.getElementById("primeprojects-grid");
      primeprojectsData.forEach(p => {
        const card = document.createElement("a");
        card.className = "primeprojects-card";
        card.href = p.link;
        card.target = "_blank";

        const img = document.createElement("img");
        img.src = p.icon;
        img.alt = p.name;

        const info = document.createElement("div");
        info.className = "primeprojects-info";

        const title = document.createElement("div");
        title.className = "primeprojects-title";
        title.textContent = p.name;

        const desc = document.createElement("div");
        desc.className = "primeprojects-desc";
        desc.textContent = p.desc;

        info.appendChild(title);
        info.appendChild(desc);
        card.appendChild(img);
        card.appendChild(info);
        grid.appendChild(card);
      });
    }

    document.addEventListener("DOMContentLoaded", loadPrimeprojects);