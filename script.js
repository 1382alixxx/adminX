// گرفتن IP کاربر (اینجا از API خارجی ساده استفاده می‌کنیم چون JavaScript مستقیم به $_SERVER دسترسی نداره)
async function getIp() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    document.getElementById('currentIp').innerText = data.ip;
    return data.ip;
}

// بارگذاری اولیه
window.onload = function() {
    getIp();
    updateBanList();
};

// فرم بن کردن
document.getElementById('banForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const banIp = document.getElementById('banIp').value;
    if (banIp) {
        let bannedIps = JSON.parse(localStorage.getItem('bannedIps') || '[]');
        if (!bannedIps.includes(banIp)) {
            bannedIps.push(banIp);
            localStorage.setItem('bannedIps', JSON.stringify(bannedIps));
            alert('کاربر با IP ' + banIp + ' بن شد!');
            updateBanList();
        } else {
            alert('این IP قبلاً بن شده است!');
        }
        document.getElementById('banIp').value = '';
    }
});

// فرم رفع بن
document.getElementById('unbanForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const unbanIp = document.getElementById('unbanIp').value;
    if (unbanIp) {
        let bannedIps = JSON.parse(localStorage.getItem('bannedIps') || '[]');
        const index = bannedIps.indexOf(unbanIp);
        if (index !== -1) {
            bannedIps.splice(index, 1);
            localStorage.setItem('bannedIps', JSON.stringify(bannedIps));
            alert('IP ' + unbanIp + ' از بن خارج شد!');
            updateBanList();
        } else {
            alert('این IP در لیست بن نیست!');
        }
        document.getElementById('unbanIp').value = '';
    }
});

// به‌روزرسانی لیست بن‌شده‌ها
function updateBanList() {
    const banList = document.getElementById('banList');
    banList.innerHTML = '';
    const bannedIps = JSON.parse(localStorage.getItem('bannedIps') || '[]');
    bannedIps.forEach(ip => {
        const li = document.createElement('li');
        li.textContent = ip;
        banList.appendChild(li);
    });
}