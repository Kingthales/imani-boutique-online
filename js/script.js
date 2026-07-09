// --- IMANI BOUTIQUE - FIREBASE LIVE DATABASE CONFIG ---
const firebaseConfig = {
    apiKey: "AIzaSyAs-FakeKeyForSetupPurposesOnly_Imani",
    authDomain: "imani-boutique-online.firebaseapp.com",
    projectId: "imani-boutique-online",
    storageBucket: "imani-boutique-online.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456"
};

// Gufungura Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// 1. KUBIKA IGICURUZWA KURI FIREBASE (ADMIN PANEL)
const addForm = document.getElementById('addProductForm');
if (addForm) {
    addForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('pName').value;
        const price = parseInt(document.getElementById('pPrice').value);
        const category = document.getElementById('pCategory').value;
        let image = document.getElementById('pLink').value;

        if(!image) {
            image = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80"; // Ifoto y'urugero niba asize umwaho
        }

        db.collection("products").add({
            name: name,
            price: price,
            category: category,
            image: image,
            dateAdded: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            alert("Igicuruzwa cyajye online kuri Vercel neza!");
            addForm.reset();
        })
        .catch((error) => {
            console.error("Ikibazo cyabaye: ", error);
        });
    });
}

// 2. KUGARAGAZA IBICURUZWA BYA ONLINE KURI PAJI Y'ABAKIRIYA
const productGrid = document.querySelector('.product-grid');
if (productGrid) {
    db.collection("products").orderBy("dateAdded", "desc").onSnapshot((snapshot) => {
        productGrid.innerHTML = ""; // Siba ibya kera cyangwa ya "Nta gicuruzwa kibonetse"
        
        if(snapshot.size === 0) {
            productGrid.innerHTML = "<p>Nta gicuruzwa kibonetse...</p>";
            return;
        }

        snapshot.forEach((doc) => {
            const product = doc.data();
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-img-box">
                    <img src="${product.image}" class="product-img" alt="${product.name}">
                </div>
                <h3 class="p-title">${product.name}</h3>
                <p class="price">${product.price.toLocaleString()} RWF</p>
                <button class="btn-add">Shyira mu gikapu</button>
            `;
            productGrid.appendChild(card);
        });
    });
}
