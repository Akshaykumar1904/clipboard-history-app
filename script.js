class ListApp {
  constructor() {
    this.items = this.loadItems();
    this.initElements();
    this.bindEvents();
    this.render();
  }

  initElements() {
    this.itemInput = document.getElementById('itemInput');
    this.addBtn = document.getElementById('addBtn');
    this.clearBtn = document.getElementById('clearBtn');
    this.itemList = document.getElementById('itemList');
    this.itemCount = document.getElementById('itemCount');
    this.emptyState = document.getElementById('emptyState');
  }

  bindEvents() {
    this.addBtn.addEventListener('click', () => this.addItem());
    this.itemInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addItem();
    });
    this.clearBtn.addEventListener('click', () => this.clearAll());
  }

  addItem() {
    const text = this.itemInput.value.trim();
    if (text === '') {
      this.itemInput.focus();
      return;
    }

    const item = {
      id: Date.now(),
      text: text,
      timestamp: new Date().toLocaleString()
    };

    this.items.unshift(item);
    this.saveItems();
    this.render();
    this.itemInput.value = '';
    this.itemInput.focus();
  }

  deleteItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveItems();
    this.render();
  }

  clearAll() {
    if (this.items.length === 0) return;

    if (confirm('Are you sure you want to clear all items?')) {
      this.items = [];
      this.saveItems();
      this.render();
    }
  }

  render() {
    this.itemList.innerHTML = '';
    this.itemCount.textContent = this.items.length;

    if (this.items.length === 0) {
      this.emptyState.style.display = 'block';
      return;
    }

    this.emptyState.style.display = 'none';

    this.items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'list-item';
      li.innerHTML = `
                        <span class="item-text">${this.escapeHtml(item.text)}</span>
                        <button class="delete-btn" onclick="app.deleteItem(${item.id})" title="Delete item">×</button>
                    `;
      this.itemList.appendChild(li);
    });
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  saveItems() {
    localStorage.setItem('listAppItems', JSON.stringify(this.items));
  }

  loadItems() {
    try {
      const saved = localStorage.getItem('listAppItems');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Failed to load items from localStorage:', e);
      return [];
    }
  }
}

// Initialize the app
const app = new ListApp();

// Focus input on page load
window.addEventListener('load', () => {
  document.getElementById('itemInput').focus();
});