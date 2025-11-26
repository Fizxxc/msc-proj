import { db } from "/firebase.js";
import { collection, query, orderBy, limit, onSnapshot } 
    from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const statusPreview = document.getElementById("statusPreview");

// mengambil 3 status terbaru
const q = query(
    collection(db, "status"),
    orderBy("createdAt", "desc"),
    limit(3)
);

onSnapshot(q, (snapshot) => {
    if (snapshot.empty) {
        statusPreview.innerHTML = `<p class="text-gray-600">Belum ada status terbaru.</p>`;
        return;
    }

    statusPreview.innerHTML = ""; // kosongkan dulu

    snapshot.forEach(doc => {
        const data = doc.data();

        const item = `
            <div class="p-3 rounded-lg border bg-gray-50 hover:bg-gray-100 transition">
                <p class="font-semibold text-gray-800">${data.title || "Status"}</p>
                <p class="text-gray-600 text-sm mt-1 line-clamp-2">${data.message || ""}</p>

                <p class="text-xs text-gray-400 mt-2">
                    ${data.date || "-"}
                </p>
            </div>
        `;

        statusPreview.innerHTML += item;
    });
});
