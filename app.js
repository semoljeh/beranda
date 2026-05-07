async function loadAppData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        // Render Menu
        const menuContainer = document.getElementById('main-menu');
        menuContainer.innerHTML = data.menu.map(item => `
            <div class="flex flex-col items-center gap-2">
                <div class="${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-sm">
                    <i class="fa-solid ${item.icon}"></i>
                </div>
                <span class="text-[11px] font-semibold">${item.name}</span>
            </div>
        `).join('');

        // Render News
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = data.articles.map(art => `
            <div class="flex gap-4 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                <div class="w-20 h-20 bg-gray-200 rounded-xl shrink-0"></div>
                <div class="flex flex-col justify-center">
                    <h4 class="font-bold text-sm leading-snug">${art.title}</h4>
                    <p class="text-[10px] text-gray-400 mt-2">${art.time} • ${art.category}</p>
                </div>
            </div>
        `).join('');
        
        document.getElementById('prayer-time').innerText = "Dzuhur - 12:00 WIB";

    } catch (error) {
        console.error("Gagal memuat data:", error);
    }
}

loadAppData();
