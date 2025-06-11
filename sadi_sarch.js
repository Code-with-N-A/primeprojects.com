
function filterAndHighlightRows() {
  const inputField = document.getElementById("tableSearchInput");
  const input = inputField.value.trim().toLowerCase();
  const tbody = document.getElementById("tableBody");
  const rows = tbody.getElementsByTagName("tr");
  const container = tbody.closest(".overflow-y-auto");

  // Remove old highlights
  tbody.querySelectorAll(".search-highlight").forEach(span => {
    const parent = span.parentNode;
    if (parent) {
      parent.replaceChild(document.createTextNode(span.textContent), span);
      parent.normalize();
    }
  });

  let firstMatch = null;
  let matchCount = 0;

  for (let row of rows) {
    let matchFoundInRow = false;

    for (let cell of row.cells) {
      const text = cell.textContent.toLowerCase();
      if (text.includes(input) && input !== "") {
        matchFoundInRow = true;

        // Highlight matching text
        for (let node of Array.from(cell.childNodes)) {
          if (node.nodeType === 3) {
            const rawText = node.nodeValue;
            const index = rawText.toLowerCase().indexOf(input);
            if (index !== -1) {
              const span = document.createElement("span");
              span.className = "search-highlight";
              span.textContent = rawText.substr(index, input.length);
              span.style.background = "yellow";
              span.style.color = "black";
              span.style.fontWeight = "bold";

              const after = node.splitText(index);
              after.nodeValue = after.nodeValue.substring(input.length);
              cell.insertBefore(span, after);

              if (!firstMatch) firstMatch = span;
              break;
            }
          }
        }
      }
    }

    if (input === "") {
      row.style.display = "";
    } else {
      row.style.display = matchFoundInRow ? "" : "none";
      if (matchFoundInRow) matchCount++;
    }
  }

  // If no match found
  if (input !== "" && matchCount === 0) {
    inputField.value = "";
    inputField.placeholder = "NOT FOUND RECORD";
    inputField.classList.add("not-found");

    setTimeout(() => {
      inputField.placeholder = "Search table...";
      inputField.classList.remove("not-found");

      // Restore all rows
      for (let row of rows) {
        row.style.display = "";
      }
    }, 2000);
  }

  // Scroll first match into view
  if (firstMatch && container) {
    const matchTop = firstMatch.getBoundingClientRect().top;
    const containerTop = container.getBoundingClientRect().top;
    const scrollOffset = matchTop - containerTop + container.scrollTop - 50;
    container.scrollTo({ top: scrollOffset, behavior: "smooth" });
  }
}

