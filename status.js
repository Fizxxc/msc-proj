import { db } from '/firebase.js';
import { collection, query, orderBy, onSnapshot } 
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const statusList = document.getElementById('statusList');
statusList.innerHTML = `
  <div class="text-gray-400 text-center col-span-full animate-pulse">
    Memuat status...
  </div>
`;

// Query Firestore
const q = query(collection(db, 'status'), orderBy('createdAt', 'desc'));

// Realtime Listener
onSnapshot(q, (snapshot) => {
  const updates = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  renderStatus(updates);
});

// Render UI
function renderStatus(updates) {
  if (!updates.length) {
    statusList.innerHTML = `
      <div class="text-gray-400 text-center col-span-full">
        Belum ada update status.
      </div>
    `;
    return;
  }

  statusList.innerHTML = '';

  updates.forEach((u, idx) => {
    const div = document.createElement('div');
    div.className = `
      status-card bg-white rounded-xl shadow-md p-5 
      hover:shadow-xl transition cursor-pointer relative 
      opacity-0 translate-y-2 duration-300
    `;

    const category = u.category || 'Info';
    let color = 'bg-blue-100 text-blue-800';
    if (category.toLowerCase() === 'maintenance') color = 'bg-yellow-100 text-yellow-800';
    if (category.toLowerCase() === 'error') color = 'bg-red-100 text-red-800';
    if (category.toLowerCase() === 'success') color = 'bg-green-100 text-green-800';

    div.innerHTML = `
      <span class="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${color}">
        ${category}
      </span>

      <h2 class="text-lg font-bold mb-2 text-gray-800">${u.title || 'Update'}</h2>
      <p class="text-gray-700 mb-3">${u.message || ''}</p>

      <div class="text-xs text-gray-500 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"/>
        </svg>
        <span>${
          new Date(u.createdAt).toLocaleString('id-ID', {
            weekday:'short', day:'numeric', month:'short', year:'numeric',
            hour:'2-digit', minute:'2-digit'
          })
        }</span>
      </div>
    `;

    setTimeout(() => {
      div.classList.remove('opacity-0', 'translate-y-2');
    }, idx * 100);

    statusList.appendChild(div);
  });
}
