# CLAUDE.md - Proje Geliştirme ve Mimari Yönergeleri

Bu dosya, AI asistanlarının ve otonom ajanların projede kod yazarken, düzenlerken ve refactor ederken uyması gereken temel kuralları, komutları ve mimari standartları tanımlar.

---

## 1. Sık Kullanılan Terminal Komutları

- **Bağımlılıkları Yükleme:** `npm install`
- **Geliştirici Sunucusu:** `npx expo start` veya `npm run start`
- **Uygulamayı Çalıştırma:**
  - iOS Simulator: `npm run ios`
  - Android Emulator: `npm run android`
- **Tip Kontrolü (Type Check):** `npx tsc --noEmit`
- **Linter & Biçimlendirme:** `npm run lint` / `npx prettier --write .`
- **Test Çalıştırma:** `npm test` veya `npx jest`

---

## 2. Proje Yapısı ve Mimari Standartlar

src/
├── api/ # API servisleri ve istek tanımları
├── components/ # Tekrar kullanılabilir UI bileşenleri (Atomic/Modular)
├── constants/ # Sabitler (renkler, tema, konfigürasyonlar)
├── hooks/ # Özel React hook'ları (Custom Hooks)
├── navigation/ # Sayfa yönlendirmeleri ve parametre tipleri
├── screens/ # Uygulama ekranları
├── store/ # Global state yönetimi (Zustand/Redux)
├── types/ # Global TypeScript arayüz ve tipleri
└── utils/ # Yardımcı fonksiyonlar (formatters, helpers)

- **Mimari Yaklaşım:** Single Responsibility (Tek Sorumluluk) ilkesine uyulmalıdır. UI mantığı ile iş mantığı (business logic) custom hook'lar aracılığıyla birbirinden ayrılmalıdır.
- **State Yönetimi:** Local state için `useState`/`useReducer`, global state işlemleri için proje dizinindeki `@store` yapısı kullanılmalıdır.

---

## 3. Kod Stili ve TypeScript Kuralları

- **Dil & Mod:** TypeScript strictly aktif. `any` tipi kullanımı **kesinlikle yasaktır**. Gerekli durumlarda `unknown` kullanılıp type narrowing yapılmalıdır.
- **Bileşen Yapısı:** Functional Component + Hooks. `class` bileşenleri kullanılmamalıdır.
- **İsimlendirme Standartları:**
  - **Component / Screen:** `PascalCase.tsx` (Örn: `UserProfileCard.tsx`)
  - **Hooks:** `camelCase.ts` (`use` ön eki ile, Örn: `useAuth.ts`)
  - **Utils / Services:** `camelCase.ts` (Örn: `apiClient.ts`)
  - **Type / Interface:** `PascalCase.ts` (Örn: `UserProps`, `ApiResponse`). Arayüz isimlerinin başına `I` ön eki **koymayın**.
- **Styling:** Inline stil tanımları yerine `StyleSheet.create` veya projenin styling kütüphanesi tercih edilmelidir. Renk ve ölçüler `@constants` altındaki tema dosyasından çekilmelidir.

---

## 4. Kesin Kısıtlamalar ve Kurallar (Strict Constraints)

1. **Mutability:** State doğrudan değiştirilmemeli (mutate edilmemeli), daima immutable yöntemler tercih edilmelidir.
2. **Paket Yönetimi:** Projeye yeni bir npm/yarn paketi eklemeden önce kullanıcıdan onay alınmalıdır.
3. **Deprecate API:** Güncel olmayan React veya kütüphane metodları kullanılmamalıdır.
4. **Kod Temizliği:** Kullanılmayan import'lar, derleme hatasına yol açabilecek yorum satırları ve gereksiz `console.log` ifadeleri kodda bırakılmamalıdır.
5. **Hata Yönetimi (Error Handling):** Tüm asenkron işlemlerde `try/catch` blokları kullanılmalı ve kullanıcıya anlamlı hata geri bildirimleri sunulmalıdır.

---

## 5. Test ve Kalite Standartları

- Yazılan yeni yardımcı fonksiyonlar (`utils/`) veya hook'lar için eş zamanlı Jest unit test önerileri sunulmalıdır.
- Kod yazımı tamamlandıktan sonra arka planda `npx tsc --noEmit` çalıştırılmış gibi tipler kontrol edilmeli ve TypeScript derleme hatası barındıran kod parçası sunulmamalıdır.
