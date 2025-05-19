let historyList = document.querySelector(".historyList");
let searchInput = document.getElementById("search");
const clearBtn = document.getElementById("clearBtn");

let clipboardHistory = JSON.parse(localStorage.getItem("clipboardHistory")) || [];

function renderList(items) {
  historyList.innerHTML = " ";
  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}


document.addEventListener('copy', async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (text && !clipboardHistory.includes(text)) {
      clipboardHistory.unshift(text);
      localStorage.setItem("clipboardHistory", JSON.stringify(clipboardHistory));
      renderList(clipboardHistory);
    }
  } catch (error) {
    console.error("there is some issue in copying", error);
  }
});

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = clipboardHistory.filter(item => {
    item.toLowerCase().includes(searchTerm);
  });
  renderList(filtered);
})

clearBtn.addEventListener('click',()=>{
  clipboardHistory = [];
  localStorage.removeItem("clipboardHistory");
  renderList([]);
})

console.log(clipboardHistory)
renderList(clipboardHistory);