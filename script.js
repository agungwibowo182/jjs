// Atur Tanggal Peluncuran ke 1 November 2025, pukul 00:00:00
const countdownTo = new Date("Nov 1, 2025 00:00:00").getTime();

// Mendapatkan elemen DOM
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// Fungsi untuk format angka (tambahkan 0 di depan jika < 10)
function formatTime(time) {
    return time < 10 ? (`0${time}`) : time;
}

// Fungsi utama untuk memperbarui hitungan mundur
function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownTo - now;

    // Perhitungan waktu untuk Hari, Jam, Menit, Detik
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Memperbarui elemen di HTML
    daysEl.innerHTML = formatTime(days);
    hoursEl.innerHTML = formatTime(hours);
    minutesEl.innerHTML = formatTime(minutes);
    secondsEl.innerHTML = formatTime(seconds);

    // Jika hitungan mundur selesai
    if (distance < 0) {
        clearInterval(countdownInterval);
        daysEl.innerHTML = hoursEl.innerHTML = minutesEl.innerHTML = secondsEl.innerHTML = "00";
        document.querySelector('.coming-soon').textContent = "WE ARE LIVE!";
        document.querySelector('.under-construction').textContent = "VISIT NOW";
    }
}

// Panggil fungsi segera saat pertama kali dimuat
updateCountdown();

// Atur interval untuk memanggil fungsi setiap 1 detik (1000ms)
const countdownInterval = setInterval(updateCountdown, 1000);