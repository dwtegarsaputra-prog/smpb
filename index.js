const TelegramBot = require('node-telegram-bot-api');

// Menggunakan Token Bot Resmi Anda
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// ==========================================
// 1. KAMUS KONTEN INFORMASI RESMI (KNOWLEDGE GABUNGAN UTUH)
// ==========================================
const KONTEN_BOT = {
    salam: `🤖 *PUSAT INFORMASI SPMB SMKN 1 KUTASARI 2026/2027* 🤖\n\n` +
           `Halo! 👋 Selamat datang di Chatbot Resmi SMK Negeri 1 Kutasari.\n` +
           `Motto: _Sekolah Unggul, Siap Kerja, Siap Kuliah, Siap Wirausaha_\n\n` +
           `Silakan klik tombol pilihan di bawah ini atau ketik pertanyaan langsung seputar pendaftaran:`,
    
    jadwal: `📅 *JADWAL RESMI SELEKSI SPMB 2026/2027*:\n\n` +
            `1️⃣ *Pengajuan Akun Calon Murid Baru*\n` +
            `   • CMB mengajukan akun secara daring/online\n` +
            `   • Waktu: *03 – 12 Juni 2026*\n\n` +
            `2️⃣ *Verifikasi Dokumen & Aktivasi Akun*\n` +
            `   • Verifikasi luring/offline langsung di sekolah\n` +
            `   • Waktu: *04 – 13 Juni 2026*\n` +
            `   • _Catatan_: Aktivasi online ditutup 13 Juni pukul 22.00 WIB\n\n` +
            `3️⃣ *Sinkronisasi Data Calon Murid*\n` +
            `   • Waktu: *14 Juni 2026*\n\n` +
            `4️⃣ *Pendaftaran & Pemilihan Kompetensi Keahlian*\n` +
            `   • Secara daring mulai 15 Juni (06.00 WIB)\n` +
            `   • Resmi ditutup: *18 Juni 2026 pukul 15.00 WIB*\n\n` +
            `5️⃣ *Evaluasi & Masa Tenang*: 19 – 20 Juni 2026\n\n` +
            `6️⃣ *Pengumumkan Hasil Seleksi Utama*\n` +
            `   • Waktu: *21 Juni 2026* (Paling lambat pukul 23.59 WIB)\n\n` +
            `7️⃣ *Daftar Ulang Utama*: *22 – 25 Juni 2026* (Maksimal pukul 15.00 WIB)\n\n` +
            `8️⃣ *Pengumuman & Daftar Ulang Cadangan*: 26 – 30 Juni 2026\n\n` +
            `🚀 *Awal Tahun Ajaran Baru*: *13 Juli 2026*`,
            
    kuota: `📊 *SELEKSI & RINCIAN KUOTA PENERIMAAN (Total 468 Siswa)*:\n\n` +
           `🏆 *1. JALUR PRESTASI (Minimal 75% = 351 Siswa)*\n` +
           `• Prestasi akademik/non-akademik, Ketua OSIS/Pramuka, Prestasi Khusus (Maks 50% dalam kuota).\n\n` +
           `🤝 *2. JALUR AFIRMASI (Minimal 15% = 70 Siswa)*\n` +
           `• Ekonomi tidak mampu (Desil 1-4), Anak Panti (Maks 3%), ATS/Anak Tidak Sekolah (Maks 2%), Disabilitas (Maks 2%).\n\n` +
           `📍 *3. JALUR DOMISILI TERDEKAT (Maksimal 10% = 47 Siswa)*\n` +
           `• Domisili terdekat & kuota khusus wilayah desa tempat tanah kas sekolah berdiri (Maks 5%).\n\n` +
           `*TABEL DAYA TAMPUNG PER JURUSAN:*\n` +
           `• TJKT: 108 Siswa (75% Pres: 81 | 15% Afir: 16 | 10% Dom: 11)\n` +
           `• AKL : 108 Siswa (75% Pres: 81 | 15% Afir: 16 | 10% Dom: 11)\n` +
           `• TO  : 108 Siswa (75% Pres: 81 | 15% Afir: 16 | 10% Dom: 11)\n` +
           `• TK  : 72 Siswa  (75% Pres: 54 | 15% Afir: 11 | 10% Dom: 7)\n` +
           `• DPIB: 72 Siswa  (75% Pres: 54 | 15% Afir: 11 | 10% Dom: 7)`,
           
    syarat: `📑 *PERSYARATAN DOKUMEN & BIAYA MASUK*:\n\n` +
            `*A. DOKUMEN WAJIB (Dibawa saat verifikasi fisik):*\n` +
            `1. Fotokopi Rapor & Asli Surat Keterangan Nilai Rapor\n` +
            `2. Asli Sertifikat Hasil Tes Kemampuan Akademik (TKA)\n` +
            `3. Asli Ijazah atau Surat Keterangan Lulus (SKL)\n` +
            `4. Asli Kartu Keluarga (KK) & Akta Kelahiran\n` +
            `5. Asli Surat Keterangan Sehat & Bebas Buta Warna dari Dokter\n` +
            `6. Asli Surat Pernyataan Kebenaran Dokumen\n\n` +
            `*B. DOKUMEN TAMBAHAN (Jika ada):*\n` +
            `1. Asli Piagam Prestasi Kejuaraan\n` +
            `2. Asli Surat Keterangan Kepala Sekolah (Bagi Ketua OSIS/MPK/Pramuka)\n\n` +
            `💰 *BIAYA PENDAFTARAN:* **100% GRATIS!**\n` +
            `⚠️ _Tegas melarang segala bentuk titipan uang maupun jasa titip pendaftaran (NO TITIP, NO JASTIP)!_`,
            
    jurusan: `🏫 *PROGRAM KEAHLIAN / JURUSAN YANG TERSEDIA*:\n\n` +
             `Silakan klik pilihan jurusan di bawah untuk melihat rincian detail kompetensi keahlian secara lengkap:`,
             
    fasilitas: `🏫 *FASILITAS UTAMA SMK NEGERI 1 KUTASARI*:\n\n` +
               `Untuk mendukung pembelajaran praktik yang maksimal, sekolah menyediakan:\n` +
               `• 💻 Gedung Laboratorium Komputer & Jaringan (Full AC & Fiber Optic)\n` +
               `• 🚗 Bengkel Kerja Teknik Otomotif Luas & Standar Industri\n` +
               `• 📐 Studio Gambar Arsitektur & Ruang Teori DPIB\n` +
               `• ⚡ Laboratorium Instalasi Tenaga Listrik & Otomasi PLC\n` +
               `• 📚 Perpustakaan Digital, Masjid Sekolah, Lapangan Olahraga, dan Area Parkir Luas.`,
               
    kegiatan: `✨ *KEGIATAN & EKSTRAKURIKULER SEKOLAH*:\n\n` +
              `Selain kegiatan KBM Intrakurikuler, siswa dapat mengembangkan minat melalui:\n` +
              `• 🎖️ *Organisasi Resmi:* OSIS, MPK, dan Dewan Ambalan Pramuka.\n` +
              `• ⚽ *Ekstrakurikuler Olahraga:* Futsal, Voli, Basket, dan Pencak Silat.\n` +
              `• 🎨 *Ekstrakurikuler Seni & Komunitas:* Hadroh/Seni Musik, Jurnalistik, Coding Club, dan Palang Merah Remaja (PMR).`,
             
    grup: `💬 *KONTAK & ALUR KOORDINASI RESMI*:\n\n` +
           `• *Alamat / Lokasi:* Jl. Raya Tobong, Kutasari, Kabupaten Purbalingga, Jawa Tengah\n` +
           `• *Telepon:* (0281) 5551234\n` +
           `• *Website Resmi Sekolah:* www.smkn1kutasari.sch.id\n` +
           `• *Instagram:* @smkn1kutasari\n` +
           `• *Portal Pengumuman Provinsi:* spmb.jatengprov.go.id\n\n` +
           `📌 *Grup WhatsApp Informasi:* Silakan scan QR code *\"SPMB SMKKu 2026\"* yang tertera pada brosur atau mading pendaftaran sekolah saat melakukan verifikasi fisik!`
};

const DETAIL_JURUSAN = {
    txt_tjkt: `💻 *TJKT (Teknik Jaringan Komputer dan Telekomunikasi)*\n\nMempelajari tentang perakitan komputer, instalasi jaringan internet, fiber optic, administrasi server Linux/MikroTik, keamanan siber, serta manajemen infrastruktur jaringan telekomunikasi.`,
    txt_akl: `📊 *AKL (Akuntansi dan Keuangan Lembaga)*\n\nMempelajari tentang siklus akuntansi perusahaan, pembukuan keuangan berbasis komputer modern (MYOB), manajemen perpajakan, keuangan perbankan, dan pengelolaan transaksi keuangan digital.`,
    txt_to: `🚗 *TO / TSM (Teknik Otomotif)*\n\nMempelajari tentang perawatan berkala mesin kendaraan bermotor, perbaikan sistem sasis, kelistrikan otomotif, sistem pemindah tenaga, serta teknologi mesin injeksi (EFI) terbaru.`,
    txt_dpib: `📐 *DPIB (Desain Pemodelan dan Informasi Bangunan)*\n\nMempelajari tentang gambar arsitektur konstruksi gedung, desain interior/eksterior bangunan 2D & 3D memakai perangkat lunak (AutoCAD), serta penyusunan Rencana Anggaran Biaya (RAB) proyek.`,
    txt_tk: `⚡ *TK / TPTUP (Teknik Ketenagalistrikan)*\n\nMempelajari tentang instalasi penerangan dan daya listrik bangunan, sistem kontrol otomasi industri berbasis PLC, perbaikan motor listrik, pendingin tata udara, dan perakitan panel distribusi.`
};

// ==========================================
// 2. STRUKTUR NAVIGASI TOMBOL (INTERFACE)
// ==========================================
const MENU_UTAMA_INLINE = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '📅 Jadwal Seleksi Resmi', callback_data: 'menu_jadwal' }],
            [{ text: '📊 Persentase & Kuota', callback_data: 'menu_kuota' }],
            [{ text: '🏫 Pilihan Jurusan/Prodi', callback_data: 'menu_jurusan' }],
            [{ text: '📑 Berkas Syarat & Biaya', callback_data: 'menu_syarat' }],
            [{ text: '🏢 Fasilitas & Sapras Sekolah', callback_data: 'menu_fasilitas' }],
            [{ text: '✨ Kegiatan & Ekstrakurikuler', callback_data: 'menu_kegiatan' }],
            [{ text: '💬 Kontak & Lokasi Resmi', callback_data: 'menu_grup' }]
        ]
    },
    parse_mode: 'Markdown'
};

const TOMBOL_BACK = {
    reply_markup: {
        inline_keyboard: [[{ text: '⬅️ Kembali ke Menu Utama', callback_data: 'back_to_main' }]]
    },
    parse_mode: 'Markdown'
};

const MENU_JURUSAN_INLINE = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '💻 Detail TJKT', callback_data: 'jur_tjkt' }, { text: '📊 Detail AKL', callback_data: 'jur_akl' }],
            [{ text: '🚗 Detail TO', callback_data: 'jur_to' }, { text: '📐 Detail DPIB', callback_data: 'jur_dpib' }],
            [{ text: '⚡ Detail TK', callback_data: 'jur_tk' }],
            [{ text: '⬅️ Kembali', callback_data: 'back_to_main' }]
        ]
    },
    parse_mode: 'Markdown'
};

const TOMBOL_BACK_JURUSAN = {
    reply_markup: {
        inline_keyboard: [[{ text: '⬅️ Kembali ke Menu Jurusan', callback_data: 'menu_jurusan' }]]
    },
    parse_mode: 'Markdown'
};

console.log('✅ Bot Tanpa AI (100% Fitur Terpenuhi & Aman Grup) Siap Dijalankan...');

// ==========================================
// 3. LOGIKA 1: PERINTAH TEKS STRUKTURAL (/)
// ==========================================
bot.onText(/\/start/, (msg) => bot.sendMessage(msg.chat.id, KONTEN_BOT.salam, MENU_UTAMA_INLINE));
bot.onText(/\/menu/, (msg) => bot.sendMessage(msg.chat.id, KONTEN_BOT.salam, MENU_UTAMA_INLINE));

// ==========================================
// 4. LOGIKA 2: PEMROSESAN KLIK TOMBOL INLINE
// ==========================================
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    const dataKlik = query.data;
    const pengklikId = query.from.id; 
    const tipeChat = query.message.chat.type;

    const bagianData = dataKlik.split('_'); 
    const namaAksi = bagianData[0] + '_' + bagianData[1]; 
    const pemanggilAsliId = bagianData[2]; 

    if (tipeChat !== 'private' && pemanggilAsliId && pengklikId.toString() !== pemanggilAsliId.toString()) {
        return bot.answerCallbackQuery(query.id, {
            text: "❌ Maaf, tombol ini hanya bisa digunakan oleh orang yang memanggil bot!",
            show_alert: true
        });
    }

    bot.answerCallbackQuery(query.id);

    const kunciTombol = (strukturTombol) => {
        const susunanBaru = strukturTombol.reply_markup.inline_keyboard.map(baris => {
            return baris.map(tombol => {
                let callbackTarget = tombol.callback_data;
                if (callbackTarget === 'back_to_main') callbackTarget = 'back_main';
                
                const targetBersih = callbackTarget.split('_')[0] + '_' + callbackTarget.split('_')[1];
                return {
                    text: tombol.text,
                    callback_data: `${targetBersih}_${pemanggilAsliId}`
                };
            });
        });
        return { reply_markup: { inline_keyboard: susunanBaru }, parse_mode: 'Markdown' };
    };

    try {
        if (namaAksi === 'back_main') {
            await bot.editMessageText(KONTEN_BOT.salam, { chat_id: chatId, message_id: messageId, ...kunciTombol(MENU_UTAMA_INLINE) });
        } else if (namaAksi === 'menu_jadwal') {
            await bot.editMessageText(KONTEN_BOT.jadwal, { chat_id: chatId, message_id: messageId, ...kunciTombol(TOMBOL_BACK) });
        } else if (namaAksi === 'menu_kuota') {
            await bot.editMessageText(KONTEN_BOT.kuota, { chat_id: chatId, message_id: messageId, ...kunciTombol(TOMBOL_BACK) });
        } else if (namaAksi === 'menu_syarat') {
            await bot.editMessageText(KONTEN_BOT.syarat, { chat_id: chatId, message_id: messageId, ...kunciTombol(TOMBOL_BACK) });
        } else if (namaAksi === 'menu_fasilitas') {
            await bot.editMessageText(KONTEN_BOT.fasilitas, { chat_id: chatId, message_id: messageId, ...kunciTombol(TOMBOL_BACK) });
        } else if (namaAksi === 'menu_kegiatan') {
            await bot.editMessageText(KONTEN_BOT.kegiatan, { chat_id: chatId, message_id: messageId, ...kunciTombol(TOMBOL_BACK) });
        } else if (namaAksi === 'menu_grup') {
            await bot.editMessageText(KONTEN_BOT.grup, { chat_id: chatId, message_id: messageId, ...kunciTombol(TOMBOL_BACK) });
        } else if (namaAksi === 'menu_jurusan') {
            await bot.editMessageText(KONTEN_BOT.jurusan, { chat_id: chatId, message_id: messageId, ...kunciTombol(MENU_JURUSAN_INLINE) });
        } 
        else if (namaAksi === 'jur_tjkt') {
            await bot.editMessageText(DETAIL_JURUSAN.txt_tjkt, { chat_id: chatId, message_id: messageId, ...kunciTombol(TOMBOL_BACK_JURUSAN) });
        } else if (namaAksi === 'jur_akl') {
            await bot.editMessageText(DETAIL_JURUSAN.txt_akl, { chat_id: chatId, message_id: messageId, ...kunciTombol(TOMBOL_BACK_JURUSAN) });
        } else if (namaAksi === 'jur_to') {
            await bot.editMessageText(DETAIL_JURUSAN.txt_to, { chat_id: chatId, message_id: messageId, ...kunciTombol(TOMBOL_BACK_JURUSAN) });
        } else if (namaAksi === 'jur_dpib') {
            await bot.editMessageText(DETAIL_JURUSAN.txt_dpib, { chat_id: chatId, message_id: messageId, ...kunciTombol(TOMBOL_BACK_JURUSAN) });
        } else if (namaAksi === 'jur_tk') {
            await bot.editMessageText(DETAIL_JURUSAN.txt_tk, { chat_id: chatId, message_id: messageId, ...kunciTombol(TOMBOL_BACK_JURUSAN) });
        }
    } catch (e) {
        console.log('Info: Sistem pengunci tombol aktif.');
    }
});

// ==========================================
// 5. LOGIKA 3: DETEKSI KATA KUNCI (IF-ELSE DIRECT JUMP)
// ==========================================
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userAsliId = msg.from.id; 
    const tipeChat = msg.chat.type;
    let teksInput = msg.text ? msg.text.toLowerCase().trim() : '';

    if (!teksInput) return;

    if (teksInput.startsWith('/') && tipeChat !== 'private') {
        if (!teksInput.startsWith('/start') && !teksInput.startsWith('/menu')) {
            teksInput = teksInput.replace('/', '');
        }
    }

    const diPanggil = teksInput.includes('@spmb_smkn1kutasari_bot');
    const pakaiSimbol = teksInput.startsWith('!');
    const diawaliGarisMiring = msg.text.startsWith('/');

    if (tipeChat !== 'private' && !diPanggil && !pakaiSimbol && !diawaliGarisMiring) {
        return;
    }

    teksInput = teksInput.replace('@spmb_smkn1kutasari_bot', '').replace('!', '').trim();

    if (teksInput === '/start' || teksInput === '/menu') return;

    const injeksiTombolBack = () => {
        return {
            reply_markup: {
                inline_keyboard: [[{ text: '⬅️ Kembali ke Menu Utama', callback_data: `back_main_${userAsliId}` }]]
            },
            parse_mode: 'Markdown'
        };
    };

    // A. Filter Deteksi Pertanyaan KUOTA
    if (teksInput.includes('kuota') || teksInput.includes('jalur') || teksInput.includes('penerimaan') || teksInput.includes('daya tampung')) {
        return bot.sendMessage(chatId, KONTEN_BOT.kuota, injeksiTombolBack());
    }

    // B. Filter Deteksi Pertanyaan JADWAL
    if (teksInput.includes('jadwal') || teksInput.includes('kapan') || teksInput.includes('tanggal') || teksInput.includes('pelaksanaan')) {
        return bot.sendMessage(chatId, KONTEN_BOT.jadwal, injeksiTombolBack());
    }

    // C. Filter Deteksi Pertanyaan ALUR / CARA DAFTAR
    if (teksInput.includes('daftar') || teksInput.includes('cara') || teksInput.includes('gimana') || teksInput.includes('bagaimana') || teksInput.includes('alur')) {
        return bot.sendMessage(chatId, `📝 *Alur Pendaftaran Mandiri SPMB 2026*:\n\nProses pendaftaran wajib mengikuti jadwal resmi provinsi Jateng melalui portal: [spmb.jatengprov.go.id](https://spmb.jatengprov.go.id).\n\n1. *03 - 12 Juni 2026:* CMB melakukan pengajuan pembuatan akun secara daring mandiri.\n2. *04 - 13 Juni 2026:* Calon siswa datang luring ke sekolah membawa berkas fisik asli untuk dilakukan verifikasi dokumen.\n3. *15 - 18 Juni 2026:* Melakukan pemilihan sekolah dan pemantauan jurnal seleksi secara online.`, injeksiTombolBack());
    }

    // D. Filter Deteksi Pertanyaan JURUSAN
    if (teksInput.includes('jurusan') || teksInput.includes('prodi') || teksInput.includes('tjkt') || teksInput.includes('akl') || teksInput.includes('otomotif') || teksInput.includes('keahlian') || teksInput.includes('dpib')) {
        const susunanJurusan = MENU_JURUSAN_INLINE.reply_markup.inline_keyboard.map(baris => {
            return baris.map(tombol => {
                let targetData = tombol.callback_data;
                if (targetData === 'back_to_main') targetData = 'back_main';
                return {
                    text: tombol.text,
                    callback_data: `${targetData}_${userAsliId}`
                };
            });
        });
        return bot.sendMessage(chatId, KONTEN_BOT.jurusan, { reply_markup: { inline_keyboard: susunanJurusan }, parse_mode: 'Markdown' });
    }

    // E. Filter Deteksi Pertanyaan BERKAS
    if (teksInput.includes('syarat') || teksInput.includes('berkas') || teksInput.includes('dokumen') || teksInput.includes('bawa apa') || teksInput.includes('rapor')) {
        return bot.sendMessage(chatId, KONTEN_BOT.syarat, injeksiTombolBack());
    }

    // F. Filter Deteksi Pertanyaan BIAYA
    if (teksInput.includes('biaya') || teksInput.includes('bayar') || teksInput.includes('gratis') || teksInput.includes('uang') || teksInput.includes('jastip')) {
        return bot.sendMessage(chatId, `💰 *Informasi Biaya Pendaftaran*:\n\nSeluruh rangkaian proses pelaksanaan seleksi masuk di SMK Negeri 1 Kutasari adalah *100% GRATIS* tanpa dipungut biaya sepeser pun!\n\nSekolah melarang keras segala tindak pungutan liar, titipan kelulusan, ataupun jasa titip (_NO TITIP, NO JASTIP_). Jika ada kendala, hubungi panitia resmi sekolah.`, injeksiTombolBack());
    }

    // G. Filter Deteksi Pertanyaan FASILITAS
    if (teksInput.includes('fasilitas') || teksInput.includes('gedung') || teksInput.includes('lab') || teksInput.includes('bengkel') || teksInput.includes('sapras')) {
        return bot.sendMessage(chatId, KONTEN_BOT.fasilitas, injeksiTombolBack());
    }

    // H. Filter Deteksi Pertanyaan KEGIATAN / EKSKUL
    if (teksInput.includes('kegiatan') || teksInput.includes('ekskul') || teksInput.includes('ekstrakurikuler') || teksInput.includes('osis') || teksInput.includes('pramuka')) {
        return bot.sendMessage(chatId, KONTEN_BOT.kegiatan, injeksiTombolBack());
    }

    // I. Filter Deteksi Pertanyaan KONTAK / LOKASI
    if (teksInput.includes('kontak') || teksInput.includes('lokasi') || teksInput.includes('alamat') || teksInput.includes('telepon') || teksInput.includes('website') || teksInput.includes('ig')) {
        return bot.sendMessage(chatId, KONTEN_BOT.grup, injeksiTombolBack());
    }

    // J. FALLBACK KATA KUNCI TIDAK COCOK (AUTO-MENU)
    if (tipeChat === 'private' || msg.text.toLowerCase().includes('@spmb_smkn1kutasari_bot') || msg.text.startsWith('!') || msg.text.startsWith('/')) {
        
        const menuGrupAman = {
            reply_markup: {
                inline_keyboard: MENU_UTAMA_INLINE.reply_markup.inline_keyboard.map(baris => {
                    return baris.map(tombol => ({
                        text: tombol.text,
                        callback_data: `${tombol.callback_data}_${userAsliId}`
                    }));
                })
            },
            parse_mode: 'Markdown'
        };

        return bot.sendMessage(chatId, KONTEN_BOT.salam, menuGrupAman);
    }
});