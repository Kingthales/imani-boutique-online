// --- IMANI BOUTIQUE - FIREBASE LIVE CONFIG ---
const firebaseConfig = {
  apiKey: "AIzaSyChoAhPsycs_SpEkxcXkijg0TjlgIpk0wI",
  authDomain: "imani-boutique1995.firebaseapp.com",
  projectId: "imani-boutique1995",
  storageBucket: "imani-boutique1995.firebasestorage.app",
  messagingSenderId: "325452342357",
  appId: "1:325452342357:web:b3f962e650fc87c91c20dc"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// 1. KUBIKA IBICURUZWA (ADMIN PANEL)
const addForm = document.getElementById('addProductForm');
if (addForm) {
    addForm.addEventListener('submit', function(e) {
        e.preventDefault();
        db.collection("products").add({
            name: document.getElementById('pName').value,
            price: parseInt(document.getElementById('pPrice').value),
            category: document.getElementById('pCategory').value,
            image: document.getElementById('pLink').value || "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80",
            dateAdded: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            alert("Igicuruzwa cyajye online neza!");
            addForm.reset();
        });
    });
}

// 2. KUGARAGAZA IBICURUZWA (INDEX.HTML)
const productGrid = document.querySelector('.product-grid');
if (productGrid) {
    db.collection("products").orderBy("dateAdded", "desc").onSnapshot((snapshot) => {
        productGrid.innerHTML = "";
        snapshot.forEach((doc) => {
            const product = doc.data();
            productGrid.innerHTML += `
                <div class="product-card">
                    <img src="${product.image}" style="width:100%; height:200px; object-fit:cover;">
                    <h3>${product.name}</h3>
                    <p>${product.price.toLocaleString()} RWF</p>
                </div>`;
        });
    });
}
