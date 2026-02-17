// Constants Start
const API_URL = 'https://fakestoreapi.com';
let cart = [];
let allProducts = [];
// Constants End

// DOM Elements Start
const productGrid = document.getElementById('product-grid');
const trendingGrid = document.getElementById('trending-products');
const categoryContainer = document.getElementById('category-filters');
const cartCountElement = document.getElementById('cart-count');
const productsSection = document.getElementById('products-section');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
// DOM Elements End

// Event Listeners Start
document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
    fetchTrendingProducts();
    fetchProducts('all');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    window.onclick = function (event) {
        const modal = document.getElementById('product-modal');
        if (event.target == modal) {
            closeModal();
        }
    }
});

document.getElementById('cart-btn').addEventListener('click', toggleCart);
// Event Listeners End

// Fetch Functions Start
async function fetchCategories() {
    try {
        const response = await fetch(`${API_URL}/products/categories`);
        const categories = await response.json();

        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'category-btn px-4 py-2 rounded-full border border-gray-300 hover:border-primary hover:bg-primary hover:text-white transition capitalize';
            btn.innerText = category;
            btn.dataset.category = category;
            btn.onclick = () => {
                document.querySelectorAll('.category-btn').forEach(b => {
                    b.classList.remove('bg-primary', 'text-white', 'border-primary');
                    b.classList.add('border-gray-300');
                });
                btn.classList.add('bg-primary', 'text-white', 'border-primary');
                btn.classList.remove('border-gray-300');

                fetchProducts(category);
            };
            categoryContainer.appendChild(btn);
        });

        const allBtn = document.querySelector('[data-category="all"]');
        allBtn.onclick = () => {
            document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('bg-primary', 'text-white', 'border-primary');
                b.classList.add('border-gray-300');
            });
            allBtn.classList.add('bg-primary', 'text-white', 'border-primary');
            fetchProducts('all');
        }

    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

async function fetchProducts(category) {
    const loader = document.getElementById('products-loading');
    loader.classList.remove('hidden');
    productGrid.innerHTML = '';

    let url = `${API_URL}/products`;
    if (category !== 'all') {
        url = `${API_URL}/products/category/${category}`;
    }

    try {
        const response = await fetch(url);
        const products = await response.json();
        allProducts = products;

        loader.classList.add('hidden');
        displayProducts(products, productGrid);

    } catch (error) {
        console.error('Error fetching products:', error);
        loader.classList.add('hidden');
        productGrid.innerHTML = '<p class="text-center text-red-500 w-full col-span-4">Failed to load products.</p>';
    }
}

async function fetchTrendingProducts() {
    try {
        const response = await fetch(`${API_URL}/products?limit=3`);
        const products = await response.json();
        trendingGrid.innerHTML = '';
        displayProducts(products, trendingGrid, true);
    } catch (error) {
        console.error('Error fetching trending:', error);
    }
}
// Fetch Functions End

// UI Functions Start
function displayProducts(products, container, isTrending = false) {
    if (products.length === 0) {
        container.innerHTML = '<p class="text-center w-full col-span-4">No products found.</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col h-full border border-gray-100';

        const stars = generateStars(product.rating.rate);

        card.innerHTML = `
            <div class="h-48 p-4 flex items-center justify-center bg-white relative group">
                <img src="${product.image}" alt="${product.title}" class="h-full w-auto object-contain transition group-hover:scale-110">
                <div class="absolute top-2 right-2 bg-white px-2 py-1 rounded shadow text-xs font-bold text-gray-600 flex items-center gap-1">
                     <i class="fa-solid fa-star text-yellow-400"></i> ${product.rating.rate}
                </div>
            </div>
            <div class="p-4 flex-1 flex flex-col">
                <div class="mb-2">
                    <span class="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full capitalize">${product.category}</span>
                    <span class="text-xs text-gray-400 float-right flex items-center gap-1"><i class="fa-solid fa-user"></i> ${product.rating.count}</span>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-1 leading-tight line-clamp-2" title="${product.title}">${product.title}</h3>
                <div class="mt-auto pt-4 flex items-center justify-between">
                     <span class="text-xl font-bold text-gray-900">$${product.price}</span>
                     <div class="flex gap-2">
                        <button onclick="openModal(${product.id})" class="text-gray-500 hover:text-primary transition border border-gray-200 p-2 rounded-lg" title="View Details">
                            <i class="fa-regular fa-eye"></i> Details
                        </button>
                        <button onclick="addToCart(${product.id})" class="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg font-bold transition flex items-center gap-2">
                            <i class="fa-solid fa-cart-plus"></i> Add
                        </button>
                     </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.round(rating)) {
            stars += '<i class="fa-solid fa-star"></i>';
        } else {
            stars += '<i class="fa-regular fa-star"></i>';
        }
    }
    return stars;
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl z-[100] transform transition-all duration-300 translate-y-10 opacity-0 flex items-center gap-3';
    toast.innerHTML = `<i class="fa-solid fa-check-circle text-green-400"></i> ${message}`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
// UI Functions End

// Cart Logic Start
function addToCart(productId) {
    let productInCart = cart.find(item => item.id === productId);

    if (productInCart) {
        productInCart.quantity += 1;
        updateCartUI();
        showToast("Quantity updated in cart!");
    } else {
        let product = allProducts.find(p => p.id === productId);
        if (!product && tempProductForModal && tempProductForModal.id === productId) {
            product = tempProductForModal;
        }

        if (product) {
            cart.push({ ...product, quantity: 1 });
            updateCartUI();
            showToast("Added to cart!");
        } else {
            fetch(`${API_URL}/products/${productId}`)
                .then(res => res.json())
                .then(data => {
                    cart.push({ ...data, quantity: 1 });
                    updateCartUI();
                    showToast("Added to cart!");
                });
        }
    }
}

function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.innerText = totalCount;
    renderCartItems();
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const panel = document.getElementById('cart-panel');

    if (sidebar.classList.contains('hidden')) {
        sidebar.classList.remove('hidden');
        setTimeout(() => {
            panel.classList.remove('translate-x-full');
        }, 10);
    } else {
        panel.classList.add('translate-x-full');
        setTimeout(() => {
            sidebar.classList.add('hidden');
        }, 300);
    }
}

function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const totalElement = document.getElementById('cart-total');

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center text-gray-500 mt-10">
                <i class="fa-solid fa-cart-shopping text-4xl mb-3 text-gray-300"></i>
                <p>Your cart is empty.</p>
                <button onclick="toggleCart()" class="mt-4 text-primary font-bold hover:underline">Start Shopping</button>
            </div>
        `;
        totalElement.innerText = '$0.00';
        return;
    }

    let total = 0;
    container.innerHTML = '';

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const div = document.createElement('div');
        div.className = 'flex gap-4 mb-6 animate-fade-in';
        div.innerHTML = `
            <div class="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-md border border-gray-100 p-2">
                <img src="${item.image}" alt="${item.title}" class="w-full h-full object-contain">
            </div>
            <div class="flex-1 flex flex-col justify-between">
                <div>
                    <h4 class="text-sm font-bold text-gray-800 line-clamp-2 leading-tight mb-1"><a href="#" onclick="openModal(${item.id}); toggleCart()">${item.title}</a></h4>
                    <p class="text-xs text-gray-500 capitalize">${item.category}</p>
                </div>
                <div class="flex justify-between items-end">
                    <div class="flex items-center gap-3 border border-gray-200 rounded px-2 py-1">
                        <button onclick="updateQuantity(${item.id}, -1)" class="text-gray-500 hover:text-red-500 transition disabled:opacity-50" ${item.quantity <= 1 ? '' : ''}><i class="fa-solid fa-minus text-xs"></i></button>
                        <span class="text-sm font-bold w-4 text-center">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)" class="text-gray-500 hover:text-green-500 transition"><i class="fa-solid fa-plus text-xs"></i></button>
                    </div>
                    <div>
                        <span class="text-sm font-bold text-primary block text-right">$${itemTotal.toFixed(2)}</span>
                        <button onclick="removeFromCart(${item.id})" class="text-xs text-red-500 hover:text-red-700 underline mt-1">Remove</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(div);
    });

    totalElement.innerText = `$${total.toFixed(2)}`;
}

function updateQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCartUI();
        }
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}
// Cart Logic End

// Modal Functions Start
let tempProductForModal = null;

async function openModal(id) {
    const modal = document.getElementById('product-modal');

    try {
        const response = await fetch(`${API_URL}/products/${id}`);
        const product = await response.json();
        tempProductForModal = product;

        document.getElementById('modal-title').innerText = product.title;
        document.getElementById('modal-image').src = product.image;
        document.getElementById('modal-category').innerText = product.category;
        document.getElementById('modal-price').innerText = `$${product.price}`;
        document.getElementById('modal-description').innerText = product.description;
        document.getElementById('modal-rating').innerHTML = generateStars(product.rating.rate) + ` <span class="text-gray-400 text-xs ml-2">(${product.rating.count} reviews)</span>`;

        modal.classList.remove('hidden');
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

function closeModal() {
    document.getElementById('product-modal').classList.add('hidden');
    tempProductForModal = null;
}

function addToCartFromModal() {
    if (tempProductForModal) {
        addToCart(tempProductForModal.id);
        closeModal();
    }
}
// Modal Functions End
