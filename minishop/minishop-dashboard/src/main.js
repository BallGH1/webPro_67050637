import './style.css'

let cartCount = 2
let qty = 1

document.querySelector('#app').innerHTML = `
  <div class="min-h-screen bg-slate-100 flex flex-col font-sans">
    
    <header class="bg-white border-b border-gray-200 px-8 py-3 flex items-center justify-between sticky top-0 z-50">
      <h1 class="text-2xl font-bold text-blue-600 cursor-pointer" id="logo-btn">MiniShop</h1>
      <div class="flex items-center gap-5">
        <button class="text-gray-500 hover:text-gray-700 text-lg">🔍</button>
        
        <div class="relative cursor-pointer">
          <span class="text-2xl text-blue-600">🛒</span>
          <span id="cart-badge" class="absolute -top-1.5 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
            ${cartCount}
          </span>
        </div>

        <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm cursor-pointer border border-blue-200">
          👤
        </div>
      </div>
    </header>

    <div class="flex-1 max-w-7xl w-full mx-auto p-6 flex gap-6">
      
      <aside class="w-56 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 h-fit flex flex-col gap-2 shrink-0">
        <button id="nav-dashboard" class="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition bg-blue-50 text-blue-600">
          <span>🏠</span> Dashboard
        </button>

        <button id="nav-products" class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition text-gray-600 hover:bg-gray-50">
          <span>📦</span> Products
        </button>

        <button id="nav-profile" class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition text-gray-600 hover:bg-gray-50">
          <span>👤</span> Profile
        </button>
      </aside>

      <main class="flex-1">
        
        <div id="page-dashboard">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>

          <div class="grid grid-cols-3 gap-6 mb-8">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl">📦</div>
              <div>
                <p class="text-xs text-gray-500 font-medium">Total Products</p>
                <h3 class="text-2xl font-bold text-blue-600 mt-1">24</h3>
              </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-3xl">🛒</div>
              <div>
                <p class="text-xs text-gray-500 font-medium">Orders</p>
                <h3 class="text-2xl font-bold text-emerald-600 mt-1">128</h3>
              </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-3xl">฿</div>
              <div>
                <p class="text-xs text-gray-500 font-medium">Revenue</p>
                <h3 class="text-2xl font-bold text-purple-600 mt-1">฿48,500</h3>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Recent Orders</h3>
            
            <table class="w-full text-left text-sm">
              <thead>
                <tr class="text-gray-400 font-medium border-b border-gray-100 pb-3">
                  <th class="py-3 font-medium">#</th>
                  <th class="py-3 font-medium">Date</th>
                  <th class="py-3 font-medium">Customer</th>
                  <th class="py-3 font-medium">Items</th>
                  <th class="py-3 font-medium">Total</th>
                  <th class="py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50 text-gray-700">
                <tr>
                  <td class="py-3.5">1</td>
                  <td>2025-09-15</td>
                  <td>Somchai J.</td>
                  <td>3</td>
                  <td>฿1,260</td>
                  <td><span class="bg-emerald-50 text-emerald-600 text-xs px-2.5 py-1 rounded-full font-medium">Completed</span></td>
                </tr>
                <tr>
                  <td class="py-3.5">2</td>
                  <td>2025-09-14</td>
                  <td>Nattaya K.</td>
                  <td>1</td>
                  <td>฿520</td>
                  <td><span class="bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full font-medium">Processing</span></td>
                </tr>
                <tr>
                  <td class="py-3.5">3</td>
                  <td>2025-09-13</td>
                  <td>Kritsada P.</td>
                  <td>2</td>
                  <td>฿900</td>
                  <td><span class="bg-indigo-50 text-indigo-600 text-xs px-2.5 py-1 rounded-full font-medium">Shipped</span></td>
                </tr>
                <tr>
                  <td class="py-3.5">4</td>
                  <td>2025-09-12</td>
                  <td>Piyaporn S.</td>
                  <td>1</td>
                  <td>฿450</td>
                  <td><span class="bg-emerald-50 text-emerald-600 text-xs px-2.5 py-1 rounded-full font-medium">Completed</span></td>
                </tr>
                <tr>
                  <td class="py-3.5">5</td>
                  <td>2025-09-11</td>
                  <td>Thanawat C.</td>
                  <td>4</td>
                  <td>฿1,800</td>
                  <td><span class="bg-amber-50 text-amber-600 text-xs px-2.5 py-1 rounded-full font-medium">Pending</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="page-products" class="hidden">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Products</h2>

          <div class="flex gap-4 mb-6">
            <div class="relative flex-1">
              <input type="text" placeholder="Search products..." class="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-blue-500" />
              <span class="absolute left-3.5 top-2.5 text-gray-400">🔍</span>
            </div>
            <select class="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 font-medium">
              <option>All Categories</option>
            </select>
          </div>

          <div class="grid grid-cols-4 gap-6">
            <div id="card-laptop" class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-300 hover:shadow-md transition cursor-pointer flex flex-col justify-between group">
              <div>
                <div class="h-36 bg-blue-50/50 rounded-xl flex items-center justify-center text-5xl mb-4 group-hover:scale-105 transition">
                  💻
                </div>
                <h4 class="font-bold text-gray-900 group-hover:text-blue-600 transition">Laptop</h4>
                <p class="text-base font-bold text-gray-900 mt-1">฿12,900</p>
                <p class="text-xs text-amber-500 mt-1">★ 4.5 (24)</p>
              </div>
              <button class="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl text-sm transition">
                Add to Cart
              </button>
            </div>

            <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div class="h-36 bg-blue-50/50 rounded-xl flex items-center justify-center text-5xl mb-4">🎧</div>
                <h4 class="font-bold text-gray-900">Headphones</h4>
                <p class="text-base font-bold text-gray-900 mt-1">฿1,290</p>
                <p class="text-xs text-amber-500 mt-1">★ 4.3 (18)</p>
              </div>
              <button id="btn-add-headphones" class="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl text-sm transition">
                Add to Cart
              </button>
            </div>

            <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div class="h-36 bg-blue-50/50 rounded-xl flex items-center justify-center text-5xl mb-4">🎒</div>
                <h4 class="font-bold text-gray-900">Backpack</h4>
                <p class="text-base font-bold text-gray-900 mt-1">฿890</p>
                <p class="text-xs text-amber-500 mt-1">★ 4.7 (32)</p>
              </div>
              <button id="btn-add-backpack" class="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl text-sm transition">
                Add to Cart
              </button>
            </div>

            <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div class="h-36 bg-blue-50/50 rounded-xl flex items-center justify-center text-5xl mb-4">⌚</div>
                <h4 class="font-bold text-gray-900">Smart Watch</h4>
                <p class="text-base font-bold text-gray-900 mt-1">฿2,990</p>
                <p class="text-xs text-amber-500 mt-1">★ 4.4 (20)</p>
              </div>
              <button id="btn-add-watch" class="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl text-sm transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div id="page-laptop" class="hidden">
          <button id="back-to-products" class="mb-6 flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
            ← Back to Products
          </button>

          <div class="flex items-center justify-between mb-2">
            <h2 class="text-2xl font-bold text-gray-900">Laptop Details</h2>
            <div class="border border-blue-200 bg-white rounded-xl px-4 py-2 flex items-center gap-2 text-blue-600">
              <span>🛒</span>
              <span id="detail-cart-badge" class="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                ${cartCount}
              </span>
            </div>
          </div>
          <p class="text-sm font-semibold text-gray-700">เลือกจำนวนสินค้าที่ต้องการสั่งซื้อ</p>
          <p class="text-xs text-gray-400 mb-8">เพิ่มจำนวนสินค้าในตะกร้า และดูจำนวนสินค้าที่เลือกได้ที่ไอคอนตะกร้า</p>

          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex gap-8 items-center max-w-2xl">
            <div class="w-56 h-56 bg-blue-50/50 rounded-2xl flex items-center justify-center text-7xl shrink-0">
              💻
            </div>

            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-900">Laptop</h3>
              <p class="text-xl font-bold text-gray-900 mt-1">฿12,900</p>
              <p class="text-xs text-amber-500 mt-1">★ 4.5 (24)</p>

              <div class="flex items-center gap-3 mt-6">
                <button id="btn-minus" class="w-9 h-9 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center transition">
                  -
                </button>
                <span id="qty-text" class="w-10 text-center font-bold text-gray-800">1</span>
                <button id="btn-plus" class="w-9 h-9 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center transition">
                  +
                </button>
              </div>

              <button id="btn-add-laptop" class="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition">
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div id="page-profile" class="hidden">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Profile</h2>

          <div class="grid grid-cols-3 gap-6">
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
              <div class="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-5xl mb-4">
                👤
              </div>
              <h3 class="text-lg font-bold text-gray-900">Alex Student</h3>
              <p class="text-xs text-gray-500 mt-2 flex items-center gap-1">✉️ alex@email.com</p>
              <p class="text-xs text-gray-500 mt-1 flex items-center gap-1">🪪 Student ID: 6501234567</p>

              <button class="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition">
                ✏️ Edit Profile
              </button>
            </div>

            <div class="col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 class="text-base font-bold text-gray-900 mb-4">Account Summary</h3>

              <div class="grid grid-cols-2 gap-4">
                <div class="bg-blue-50/70 border border-blue-100 rounded-xl p-5">
                  <span class="text-2xl">🛒</span>
                  <p class="text-xs text-gray-500 mt-2 font-medium">Total Orders</p>
                  <h4 class="text-xl font-bold text-gray-900 mt-1">128</h4>
                </div>

                <div class="bg-purple-50/70 border border-purple-100 rounded-xl p-5">
                  <span class="text-2xl">฿</span>
                  <p class="text-xs text-gray-500 mt-2 font-medium">Total Spent</p>
                  <h4 class="text-xl font-bold text-gray-900 mt-1">฿48,500</h4>
                </div>

                <div class="bg-emerald-50/70 border border-emerald-100 rounded-xl p-5">
                  <span class="text-2xl">📦</span>
                  <p class="text-xs text-gray-500 mt-2 font-medium">Wishlist Items</p>
                  <h4 class="text-xl font-bold text-gray-900 mt-1">6</h4>
                </div>

                <div class="bg-amber-50/70 border border-amber-100 rounded-xl p-5">
                  <span class="text-2xl">⭐</span>
                  <p class="text-xs text-gray-500 mt-2 font-medium">Loyalty Points</p>
                  <h4 class="text-xl font-bold text-gray-900 mt-1">320</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  </div>
`

function showPage(pageId, navId) {
  document.getElementById('page-dashboard').classList.add('hidden')
  document.getElementById('page-products').classList.add('hidden')
  document.getElementById('page-profile').classList.add('hidden')
  document.getElementById('page-laptop').classList.add('hidden')

  document.getElementById(pageId).classList.remove('hidden')

  document.getElementById('nav-dashboard').className = 'flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition text-gray-600 hover:bg-gray-50'
  document.getElementById('nav-products').className = 'flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition text-gray-600 hover:bg-gray-50'
  document.getElementById('nav-profile').className = 'flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition text-gray-600 hover:bg-gray-50'

  if (navId) {
    document.getElementById(navId).className = 'flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition bg-blue-50 text-blue-600'
  }
}

function updateCart(amount) {
  cartCount += amount
  document.getElementById('cart-badge').innerText = cartCount
  document.getElementById('detail-cart-badge').innerText = cartCount
}

document.getElementById('logo-btn').addEventListener('click', function() {
  showPage('page-dashboard', 'nav-dashboard')
})

document.getElementById('nav-dashboard').addEventListener('click', function() {
  showPage('page-dashboard', 'nav-dashboard')
})

document.getElementById('nav-products').addEventListener('click', function() {
  showPage('page-products', 'nav-products')
})

document.getElementById('nav-profile').addEventListener('click', function() {
  showPage('page-profile', 'nav-profile')
})

document.getElementById('card-laptop').addEventListener('click', function() {
  qty = 1
  document.getElementById('qty-text').innerText = qty
  showPage('page-laptop', 'nav-products')
})

document.getElementById('back-to-products').addEventListener('click', function() {
  showPage('page-products', 'nav-products')
})

document.getElementById('btn-plus').addEventListener('click', function() {
  qty++
  document.getElementById('qty-text').innerText = qty
})

document.getElementById('btn-minus').addEventListener('click', function() {
  if (qty > 1) {
    qty--
    document.getElementById('qty-text').innerText = qty
  }
})

document.getElementById('btn-add-laptop').addEventListener('click', function() {
  updateCart(qty)
  showPage('page-products', 'nav-products')
})

document.getElementById('btn-add-headphones').addEventListener('click', function() {
  updateCart(1)
})

document.getElementById('btn-add-backpack').addEventListener('click', function() {
  updateCart(1)
})

document.getElementById('btn-add-watch').addEventListener('click', function() {
  updateCart(1)
})