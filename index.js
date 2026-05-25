const TelegramBot = require('node-telegram-bot-api');

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// ==========================================
// 1. KAMUS KONTEN INFORMASI RESMI
// ==========================================
const KONTEN_BOT = {
    salam: `🤖 *PUSAT INFORMASI SPMB SMKN 1 KUTASARI 2026/2027* 🤖\n\n` +
           `Halo! 👋 Selamat datang di Chatbot Resmi SMK Negeri 1 Kutasari.\n` +
           `Motto: _Sekolah Unggul, Siap Kerja, Siap Kuliah, Siap Wirausaha_\n\n` +
           `Silakan klik tombol pilihan di bawah ini atau ketik pertanyaan langsung seputar pendaftaran:`,
    
    jadwal: `📅 *JADWAL RESMI SELEKSI SPMB 2026/2027*:\n\n` +
            `1️⃣ *Pengajuan Akun Calon Murid Baru*\n` +
            `   • Waktu: *03 – 12 Juni 2026*\n\n` +
            `2️⃣ *Verifikasi Dokumen & Aktivasi Akun*\n` +
            `   • Verifikasi luring/offline langsung di sekolah\n` +
            `   • Waktu: *04 – 13 Juni 2026*\n\n` +
            `3️⃣ *Pendaftaran & Pemilihan Kompetensi Keahlian*\n` +
            `   • Secara daring mulai 15 Juni (06.00 WIB)\n` +
            `   • Resmi ditutup: *18 Juni 2026 pukul 15.00 WIB*\n\n` +
            `🚀 *Awal Tahun Ajaran Baru*: *13 Juli 2026*`,
            
    kuota: `📊 *SELEKSI & RINCIAN KUOTA PENERIMAAN (Total 468 Siswa)*:\n\n` +
           `🏆 *1. JALUR PRESTASI (Minimal 75% = 351 Siswa)*\n` +
           `🤝 *2. JALUR AFIRMASI (Minimal 15% = 70 Siswa)*\n` +
           `📍 *3. JALUR DOMISILI TERDEKAT (Maksimal 10% = 47 Siswa)*\n\n` +
           `*TABEL DAYA TAMPUNG PER JURUSAN:*\n` +
           `• TJKT: 108 Siswa | AKL: 108 Siswa | TO: 108 Siswa\n` +
           `• TK: 72 Siswa | DPIB: 72 Siswa`,
           
    syarat: `📑 *PERSYARATAN DOKUMEN & BIAYA MASUK*:\n\n` +
            `1. Fotokopi Rapor & Asli SK Nilai Rapor\n` +
            `2. Asli Sertifikat Hasil TKA\n` +
            `3. Asli Ijazah atau Surat Keterangan Lulus (SKL)\n` +
            `4. Asli Kartu Keluarga (KK) & Akta Kelahiran\n` +
            `5. Asli Surat Keterangan Sehat & Bebas Buta Warna\n\n` +
            `💰 *BIAYA PENDAFTARAN:* **100% GRATIS!**`,
            
    jurusan: `🏫 *PROGRAM KEAHLIAN / JURUSAN YANG TERSEDIA*:\n\n` +
             `Silakan klik pilihan jurusan di bawah untuk melihat rincian detail kompetensi keahlian secara lengkap:`,
             
    fasilitas: `🏫 *FASILITAS UTAMA SMK NEGERI 1 KUTASARI*:\n\n` +
               `• 💻 Lab Komputer & Jaringan (Full AC & Fiber Optic)\n` +
               `• 🚗 Bengkel Kerja Teknik Otomotif Standar Industri\n` +
               `• 📐 Studio Gambar Arsitektur & Ruang Teori DPIB\n` +
               `• ⚡ Laboratorium Instalasi Tenaga Listrik & Otomasi PLC`,
               
    kegiatan: `✨ *KEGIATAN & EKSTRAKURIKULER SEKOLAH*:\n\n` +
              `• 🎖️ OSIS, MPK, dan Dewan Ambalan Pramuka.\n` +
              `• ⚽ Futsal, Voli, Basket, dan Pencak Silat.\n` +
              `• 🎨 Hadroh, Jurnalistik, Coding Club, dan PMR.`,
             
    grup: `💬 *KONTAK & ALUR KOORDINASI RESMI*:\n\n` +
           `• *Alamat / Lokasi:* Jl. Raya Tobong, Kutasari, Kabupaten Purbalingga\n` +
           `• *Website Resmi Sekolah:* www.smkn1kutasari.sch.id\n` +
           `• *Instagram:* @smkn1kutasari\n` +
           `• *Portal Pengumuman Provinsi:* spmb.jatengprov.go.id`
};

const DETAIL_JURUSAN = {
    txt_tjkt: `💻 *TJKT (Teknik Jaringan Komputer dan Telekomunikasi)*\n\nMempelajari tentang perakitan komputer, instalasi jaringan internet, fiber optic, administrasi server Linux/MikroTik, dan keamanan siber.`,
    txt_akl: `📊 *AKL (Akuntansi dan Keuangan Lembaga)*\n\nMempelajari tentang siklus akuntansi perusahaan, pembukuan keuangan berbasis komputer modern (MYOB), manajemen perpajakan, dan keuangan digital.`,
    txt_to: `🚗 *TO / TSM (Teknik Otomotif)*\n\nMempelajari tentang perawatan berkala mesin kendaraan bermotor, perbaikan sistem sasis, kelistrikan otomotif, dan teknologi mesin injeksi terbaru.`,
    txt_dpib: `📐 *DPIB (Desain Pemodelan dan Informasi Bangunan)*\n\nMempelajari tentang gambar arsitektur konstruksi gedung, desain interior/eksterior bangunan 2D & 3D (AutoCAD), serta penyusunan RAB proyek.`,
    txt_tk: `⚡ *TK / TPTUP (Teknik Ketenagalistrikan)*\n\nMempelajari tentang instalasi penerangan, sistem kontrol otomasi industri berbasis PLC, perbaikan motor listrik, dan perakitan panel distribusi.`
};

// ==========================================
// 2. FUNGSI PENJANA TOMBOL DENGAN PENGUNCI ID
// ==========================================
function buatMenuUtama(userId) {
    return {
        reply_markup: {
            inline_keyboard: [
                [{ text: '📅 Jadwal Seleksi Resmi', callback_data: `menu_jadwal_${userId}` }],
                [{ text: '📊 Persentase & Kuota', callback_data: `menu_kuota_${userId}` }],
                [{ text: '🏫 Pilihan Jurusan/Prodi', callback_data: `menu_jurusan_${userId}` }],
                [{ text: '📑 Berkas Syarat & Biaya', callback_data: `menu_syarat_${userId}` }],
                [{ text: '🏢 Fasilitas & Sapras Sekolah', callback_data: `menu_fasilitas_${userId}` }],
                [{ text: '✨ Kegiatan & Ekstrakurikuler', callback_data: `menu_kegiatan_${userId}` }],
                [{ text: '💬 Kontak & Lokasi Resmi', callback_data: `menu_grup_${userId}` }]
            ]
        },
        parse_mode: 'Markdown'
    };
}

function buatTombolBack(userId) {
    return {
        reply_markup: {
            inline_keyboard: [[{ text: '⬅️ Kembali ke Menu Utama', callback_data: `back_main_${userId}` }]]
        },
        parse_mode: 'Markdown'
    };
}

function buatMenuJurusan(userId) {
    return {
        reply_markup: {
            inline_keyboard: [
                [{ text: '💻 Detail TJKT', callback_data: `jur_tjkt_${userId}` }, { text: '📊 Detail AKL', callback_data: `jur_akl_${userId}` }],
                [{ text: '🚗 Detail TO', callback_data: `jur_to_${userId}` }, { text: '📐 Detail DPIB', callback_data: `jur_dpib_${userId}` }],
                [{ text: '⚡ Detail TK', callback_data: `jur_tk_${userId}` }],
                [{ text: '⬅️ Kembali ke Menu Utama', callback_data: `back_main_${userId}` }]
            ]
        },
        parse_mode: 'Markdown'
    };
}

function buatTombolBackJurusan(userId) {
    return {
        reply_markup: {
            inline_keyboard: [[{ text: '⬅️ Kembali ke Menu Jurusan', callback_data: `menu_jurusan_${userId}` }]]
        },
        parse_mode: 'Markdown'
    };
}

console.log('✅ Bot Sistem Pengunci Akurat Aktif...');

// ==========================================
// 3. LOGIKA HANDLING PESAN MASUK
// ==========================================
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userAsliId = msg.from.id;
    const tipeChat = msg.chat.type;
    let teksInput = msg.text ? msg.text.toLowerCase().trim() : '';

    if (!teksInput) return;

    // Bersihkan trigger grup
    teksInput = teksInput.replace('@spmb_smkn1kutasari_bot', '').replace('!', '').replace('/', '').trim();

    // Validasi pemanggilan di Grup
    if (tipeChat !== 'private') {
        const diPanggil = msg.text.includes('@spmb_smkn1kutasari_bot');
        const pakaiSimbol = msg.text.startsWith('!');
        const pakaiGarisMiring = msg.text.startsWith('/');
        if (!diPanggil && !pakaiSimbol && !pakaiGarisMiring) return;
    }

    // Pemicu Menu Utama
    if (teksInput === 'start' || teksInput === 'menu' || teksInput === 'halo') {
        return bot.sendMessage(chatId, KONTEN_BOT.salam, buatMenuUtama(userAsliId));
    }

    // Deteksi Kata Kunci Langsung
    if (teksInput.includes('kuota') || teksInput.includes('jalur')) {
        return bot.sendMessage(chatId, KONTEN_BOT.kuota, buatTombolBack(userAsliId));
    }
    if (teksInput.includes('jadwal') || teksInput.includes('kapan')) {
        return bot.sendMessage(chatId, KONTEN_BOT.jadwal, buatTombolBack(userAsliId));
    }
    if (teksInput.includes('jurusan') || teksInput.includes('prodi')) {
        return bot.sendMessage(chatId, KONTEN_BOT.jurusan, buatMenuJurusan(userAsliId));
    }
    if (teksInput.includes('syarat') || teksInput.includes('berkas')) {
        return bot.sendMessage(chatId, KONTEN_BOT.syarat, buatTombolBack(userAsliId));
    }
    if (teksInput.includes('fasilitas') || teksInput.includes('lab')) {
        return bot.sendMessage(chatId, KONTEN_BOT.fasilitas, buatTombolBack(userAsliId));
    }
    if (teksInput.includes('kegiatan') || teksInput.includes('ekskul')) {
        return bot.sendMessage(chatId, KONTEN_BOT.kegiatan, buatTombolBack(userAsliId));
    }
    if (teksInput.includes('kontak') || teksInput.includes('lokasi')) {
        return bot.sendMessage(chatId, KONTEN_BOT.grup, buatTombolBack(userAsliId));
    }
    if (teksInput.includes('daftar') || teksInput.includes('pendaftaran')) {
        return bot.sendMessage(chatId, KONTEN_BOT.jadwal, buatTombolBack(userAsliId));
    }
});

// ==========================================
// 4. LOGIKA PROSES KLIK TOMBOL (CALLBACK)
// ==========================================
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    const dataKlik = query.data;
    const pengklikId = query.from.id;
    const tipeChat = query.message.chat.type;

    // Memecah data klik (Contoh: menu_jadwal_1234567)
    const bagianData = dataKlik.split('_');
    const targetAksi = bagianData[0] + '_' + bagianData[1]; // Hasil: menu_jadwal, back_main, jur_tjkt
    const pemanggilAsliId = bagianData[2];

    // Cek kecocokan ID di grup
    if (tipeChat !== 'private' && pemanggilAsliId && pengklikId.toString() !== pemanggilAsliId.toString()) {
        return bot.answerCallbackQuery(query.id, {
            text: "❌ Maaf, tombol ini hanya bisa digunakan oleh orang yang memanggil bot!",
            show_alert: true
        });
    }

    bot.answerCallbackQuery(query.id);

    try {
        if (targetAksi === 'back_main') {
            await bot.editMessageText(KONTEN_BOT.salam, { chat_id: chatId, message_id: messageId, ...buatMenuUtama(pemanggilAsliId) });
        } else if (targetAksi === 'menu_jadwal') {
            await bot.editMessageText(KONTEN_BOT.jadwal, { chat_id: chatId, message_id: messageId, ...buatTombolBack(pemanggilAsliId) });
        } else if (targetAksi === 'menu_kuota') {
            await bot.editMessageText(KONTEN_BOT.kuota, { chat_id: chatId, message_id: messageId, ...buatTombolBack(pemanggilAsliId) });
        } else if (targetAksi === 'menu_syarat') {
            await bot.editMessageText(KONTEN_BOT.syarat, { chat_id: chatId, message_id: messageId, ...buatTombolBack(pemanggilAsliId) });
        } else if (targetAksi === 'menu_fasilitas') {
            await bot.editMessageText(KONTEN_BOT.fasilitas, { chat_id: chatId, message_id: messageId, ...buatTombolBack(pemanggilAsliId) });
        } else if (targetAksi === 'menu_kegiatan') {
            await bot.editMessageText(KONTEN_BOT.kegiatan, { chat_id: chatId, message_id: messageId, ...buatTombolBack(pemanggilAsliId) });
        } else if (targetAksi === 'menu_grup') {
            await bot.editMessageText(KONTEN_BOT.grup, { chat_id: chatId, message_id: messageId, ...buatTombolBack(pemanggilAsliId) });
        } else if (targetAksi === 'menu_jurusan') {
            await bot.editMessageText(KONTEN_BOT.jurusan, { chat_id: chatId, message_id: messageId, ...buatMenuJurusan(pemanggilAsliId) });
        } else if (targetAksi === 'jur_tjkt') {
            await bot.editMessageText(DETAIL_JURUSAN.txt_tjkt, { chat_id: chatId, message_id: messageId, ...buatTombolBackJurusan(pemanggilAsliId) });
        } else if (targetAksi === 'jur_akl') {
            await bot.editMessageText(DETAIL_JURUSAN.txt_akl, { chat_id: chatId, message_id: messageId, ...buatTombolBackJurusan(pemanggilAsliId) });
        } else if (targetAksi === 'jur_to') {
            await bot.editMessageText(DETAIL_JURUSAN.txt_to, { chat_id: chatId, message_id: messageId, ...buatTombolBackJurusan(pemanggilAsliId) });
        } else if (targetAksi === 'jur_dpib') {
            await bot.editMessageText(DETAIL_JURUSAN.txt_dpib, { chat_id: chatId, message_id: messageId, ...buatTombolBackJurusan(pemanggilAsliId) });
        } else if (targetAksi === 'jur_tk') {
            await bot.editMessageText(DETAIL_JURUSAN.txt_tk, { chat_id: chatId, message_id: messageId, ...buatTombolBackJurusan(pemanggilAsliId) });
        }
    } catch (e) {
        console.log('Log: Terjadi pengabaian error transisi teks.');
    }
});
