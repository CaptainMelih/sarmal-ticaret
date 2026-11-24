/**
 * SARMAL TİCARET - PRODUCTION E-TİCARET MOTORU (v4.0)
 * - Tekil dinamik görünüm (View çakışması yok)
 * - History API + Hash uyumlu SPA Routing
 * - Tekilleştirilmiş 39 ürünlü çoklu-görselli katalog
 * - Senkronize canlı geri sayım sayaçları (16:00 Aynı Gün Kargo)
 * - Canlı Arama, Akıllı Fiyat Filtreleri (0-250 / 250-500 / 500-1000 / 1000+ TL)
 * - Slide-Over Sepet Çekmecesi (500 TL kargo barajı, SARMAL10 kuponu, Hediye Paketi & Notu)
 * - PayTR & ETBİS Yasal Bilgilendirme Modalları
 */

// --- 1. MAĞAZA VERİLERİ ---
const CATEGORIES_DATA = [
  {
    slug: "kar-kureleri",
    name: "Kar Küreleri & 3D Cam Küreler",
    shortName: "Kar Küreleri",
    icon: "🔮",
    description: "Nostaljik sokak lambalı kar küreleri, renk değiştiren samanyolu ve gezegen temalı 3D kristal cam küreler."
  },
  {
    slug: "batmayan-gemi",
    name: "Batmayan Gemiler & Akvaryum",
    shortName: "Batmayan Gemi",
    icon: "🚢",
    description: "Masaüstü dekoratif batmayan gemi akvaryumları, sıvı kum saatleri ve deniz temalı stres giderici hediyeler."
  },
  {
    slug: "cicek-buket",
    name: "Çiçek & Buket Koleksiyonu",
    shortName: "Çiçek & Buket",
    icon: "💐",
    description: "Dekoratif yapı blok çiçek setleri, orkideler, mini Love Flowers buketleri ve peluş ayıcıklı güller."
  },
  {
    slug: "taki-mucevher",
    name: "Takı & Sürpriz İnci Kolye",
    shortName: "Takı & Kolye",
    icon: "💎",
    description: "Gerçek istiridye içinden çıkan sürpriz inci kolyeler ve özel gün takı hediye setleri."
  },
  {
    slug: "gece-lambalari",
    name: "Dekoratif Gece Lambaları & Not Panosu",
    shortName: "Gece Lambaları",
    icon: "💡",
    description: "El yapımı bulut gece lambaları, LED yazı tahtası not panoları ve dijital çizim tabletleri."
  },
  {
    slug: "ozel-hediyelikler",
    name: "Özel Hediye & Müzik Kutuları",
    shortName: "Özel Hediyeler",
    icon: "🎁",
    description: "Nostaljik atlı karınca müzik kutusu, metal kalp kutuda ayıcık ve güller ve sevgiliye özel hediye setleri."
  }
];

const PRODUCTS_DATA = [
  {
    "id": 1,
    "name": "Sokak Lambalı Işıklı Kar Küresi – Nostaljik ve Büyüleyici Dekoratif Gece Lambası",
    "brand": "STAR CAST",
    "categorySlug": "kar-kureleri",
    "category": "Kar Küreleri & 3D Cam Küreler",
    "price": 499.9,
    "oldPrice": 699.9,
    "discountPercent": 29,
    "badge": "Çok Satan",
    "rating": "4.9",
    "reviews": 68,
    "image": "https://cdn.dsmcdn.com/ty1822/prod/QC_ENRICHMENT/20260207/01/798dd167-5361-3924-b38d-14b7bdc89c01/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1822/prod/QC_ENRICHMENT/20260207/01/798dd167-5361-3924-b38d-14b7bdc89c01/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1822/prod/QC_ENRICHMENT/20260207/01/0a645a34-28c1-3f64-9dd8-f3233dfbd0b0/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1822/prod/QC_ENRICHMENT/20260207/01/0fd62630-b80a-34b6-9eca-ccfc4bd12686/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1821/prod/QC_ENRICHMENT/20260207/01/83b70a8c-c820-375d-b1a5-7b8d9f7311a5/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1821/prod/QC_ENRICHMENT/20260207/01/6d7504a3-fa97-3db7-9ef3-3e11e372797d/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670580",
    "description": "Sokak Lambalı Işıklı Kar Küresi – Nostaljik ve Büyüleyici Dekoratif Gece Lambası, yüksek berraklıktaki kristal cam gövdesi ve sıcak tonlu LED aydınlatmasıyla yaşam alanlarınıza huzurlu ve romantik bir atmosfer katar. USB veya pil ile pratik şekilde kullanılabilir; doğum günü, yıl dönümü ve sevgililer günü için kalıcı ve etkileyici bir hediye seçeneğidir.",
    "material": "K9 Kristal Cam Küre, Doğal Ahşap / Sert Reçine LED Stand",
    "dimensions": "Küre Çapı: 6-8 cm • Toplam Yükseklik: 9-13 cm",
    "usage": "Başucu Gece Lambası, Masaüstü & Kitaplık Dekoru"
  },
  {
    "id": 2,
    "name": "Batmayan Gemi Şişe Dekoratif Akvaryum",
    "brand": "STAR CAST",
    "categorySlug": "batmayan-gemi",
    "category": "Batmayan Gemiler & Akvaryum",
    "price": 299.9,
    "oldPrice": 429.9,
    "discountPercent": 30,
    "badge": "%30 İndirim",
    "rating": "4.8",
    "reviews": 34,
    "image": "https://cdn.dsmcdn.com/ty1821/prod/QC_PREP/20260207/00/99c72ad8-4957-380e-8677-b0d6f55c749e/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1821/prod/QC_PREP/20260207/00/99c72ad8-4957-380e-8677-b0d6f55c749e/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1821/prod/QC_PREP/20260207/00/b6fa7497-46dc-3bda-bc69-f47bdb88e91e/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670588",
    "description": "Batmayan Gemi Şişe Dekoratif Akvaryum, şeffaf akrilik gövdesi içindeki özel yoğunluklu mavi/yeşil sıvı dengesi sayesinde ne kadar sallanırsa sallansın asla batmayan büyüleyici bir dekorasyon objesidir. Ofis masasında stres giderici ve şık bir hediye arayanlar için mükemmel bir tercihtir.",
    "material": "Yüksek Şeffaflıkta Akrilik Gövde, Reçine Figür & Özel Sıvı",
    "dimensions": "Yaklaşık 14,5 × 5 × 5,2 cm",
    "usage": "Ofis Masası, Çalışma Odası & Stres Giderici Dekor"
  },
  {
    "id": 3,
    "name": "Dekoratif Batmayan Gemi Şişe Akvaryum – Masaüstü Deniz Temalı Hediye",
    "brand": "STAR CAST",
    "categorySlug": "batmayan-gemi",
    "category": "Batmayan Gemiler & Akvaryum",
    "price": 299.9,
    "oldPrice": 429.9,
    "discountPercent": 30,
    "badge": "%30 İndirim",
    "rating": "4.7",
    "reviews": 19,
    "image": "https://cdn.dsmcdn.com/ty1814/prod/QC_ENRICHMENT/20260119/19/91a7736b-5ebb-35d1-bfe3-652abf3d971b/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1814/prod/QC_ENRICHMENT/20260119/19/91a7736b-5ebb-35d1-bfe3-652abf3d971b/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1813/prod/QC_ENRICHMENT/20260119/19/cd47a4ae-6170-3bfe-ac51-824cef9caf34/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1813/prod/QC_ENRICHMENT/20260119/19/b5a23e48-2bb9-3579-bede-b2dc4b7214ec/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1814/prod/QC_ENRICHMENT/20260119/19/44f23414-2d28-38ca-99a3-84248b39bd8f/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1812/prod/QC_ENRICHMENT/20260119/19/a4292ff3-9427-392a-9297-f7f0b1576373/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670579",
    "description": "Dekoratif Batmayan Gemi Şişe Akvaryum – Masaüstü Deniz Temalı Hediye, şeffaf akrilik gövdesi içindeki özel yoğunluklu mavi/yeşil sıvı dengesi sayesinde ne kadar sallanırsa sallansın asla batmayan büyüleyici bir dekorasyon objesidir. Ofis masasında stres giderici ve şık bir hediye arayanlar için mükemmel bir tercihtir.",
    "material": "Yüksek Şeffaflıkta Akrilik Gövde, Reçine Figür & Özel Sıvı",
    "dimensions": "Yaklaşık 14,5 × 5 × 5,2 cm",
    "usage": "Ofis Masası, Çalışma Odası & Stres Giderici Dekor"
  },
  {
    "id": 4,
    "name": "Dekoratif Batmayan Gemi Akvaryum Şişe – Kalemlikli Yeşil Sıvı Yıldızlı Masaüstü Deniz Temalı Hediye",
    "brand": "STAR CAST",
    "categorySlug": "batmayan-gemi",
    "category": "Batmayan Gemiler & Akvaryum",
    "price": 299.9,
    "oldPrice": 429.9,
    "discountPercent": 30,
    "badge": "%30 İndirim",
    "rating": "4.8",
    "reviews": 47,
    "image": "https://cdn.dsmcdn.com/ty1814/prod/QC_ENRICHMENT/20260120/12/42e193f2-0438-320d-993d-8278982225be/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1814/prod/QC_ENRICHMENT/20260120/12/42e193f2-0438-320d-993d-8278982225be/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1814/prod/QC_ENRICHMENT/20260120/12/00ba4a4c-b883-33d9-b371-4dd80060a528/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1812/prod/QC_ENRICHMENT/20260120/12/2c07a2cb-d126-3697-91ed-27f63a885550/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1814/prod/QC_ENRICHMENT/20260120/12/96cafba5-1960-3481-9b04-599a604bc3cf/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1814/prod/QC_ENRICHMENT/20260120/12/0e3bfcb0-bd8a-387a-af45-398a7135f899/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670575",
    "description": "Dekoratif Batmayan Gemi Akvaryum Şişe – Kalemlikli Yeşil Sıvı Yıldızlı Masaüstü Deniz Temalı Hediye, şeffaf akrilik gövdesi içindeki özel yoğunluklu mavi/yeşil sıvı dengesi sayesinde ne kadar sallanırsa sallansın asla batmayan büyüleyici bir dekorasyon objesidir. Ofis masasında stres giderici ve şık bir hediye arayanlar için mükemmel bir tercihtir.",
    "material": "Yüksek Şeffaflıkta Akrilik Gövde, Reçine Figür & Özel Sıvı",
    "dimensions": "Yaklaşık 14,5 × 5 × 5,2 cm",
    "usage": "Ofis Masası, Çalışma Odası & Stres Giderici Dekor"
  },
  {
    "id": 5,
    "name": "İnci Kolye – Gerçek İstiridye İçinden Çıkan Sürpriz İnci Taşlı Kolye | Özel Gün Hediyesi",
    "brand": "STAR CAST",
    "categorySlug": "taki-mucevher",
    "category": "Takı & Sürpriz İnci Kolye",
    "price": 199.9,
    "oldPrice": 289.9,
    "discountPercent": 31,
    "badge": "Çok Satan",
    "rating": "4.9",
    "reviews": 83,
    "image": "https://cdn.dsmcdn.com/ty1814/prod/QC_ENRICHMENT/20260118/15/5606e78b-91d7-342e-a709-c9fd8dae787a/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1814/prod/QC_ENRICHMENT/20260118/15/5606e78b-91d7-342e-a709-c9fd8dae787a/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1813/prod/QC_ENRICHMENT/20260118/15/d82890a7-5bfa-3b22-b6a5-9ca0af7c47b5/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1812/prod/QC_ENRICHMENT/20260118/15/f49aceb3-8b01-39ac-8e9f-eb7a5b4ad173/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1814/prod/QC_ENRICHMENT/20260118/15/3b779c08-745a-3591-ad7d-38be0d4911a7/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1814/prod/QC_ENRICHMENT/20260118/15/f9792704-7e14-31d5-87ac-71499d8d6e7e/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1814/prod/QC_ENRICHMENT/20260118/15/0ca6f677-0881-38b9-9317-d00b54f005e8/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670574",
    "description": "İnci Kolye – Gerçek İstiridye İçinden Çıkan Sürpriz İnci Taşlı Kolye | Özel Gün Hediyesi, gerçek istiridye kabuğu içerisinden kendi incinizi çıkararak kolyenize yerleştirme heyecanını yaşatan unutulmaz bir sürpriz hediye setidir. Özel hediye kutusu, zarif zinciri ve kafes kolye ucuyla birlikte gönderilir.",
    "material": "Gerçek Kültür İncisi, Antialerjik Rodyum Kaplama Zincir & Kolye Kafesi",
    "dimensions": "Zincir Uzunluğu: 45 cm • Hediye Kutusu: 18 × 10 × 3 cm",
    "usage": "Sevgililer Günü, Yıldönümü & Doğum Günü Sürpriz Hediyesi"
  },
  {
    "id": 6,
    "name": "Yıldız Çiçeği Dekoratif Yapı Blok Çiçek – Saksı Çiçek Hediye Seti",
    "brand": "STAR CAST",
    "categorySlug": "cicek-buket",
    "category": "Çiçek & Buket Koleksiyonu",
    "price": 699.9,
    "oldPrice": 979.9,
    "discountPercent": 29,
    "badge": "Yeni",
    "rating": "4.8",
    "reviews": 22,
    "image": "https://cdn.dsmcdn.com/ty1814/prod/QC_PREP/20260118/14/657a76c6-1bd1-3820-8b5f-3601ed4f977e/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1814/prod/QC_PREP/20260118/14/657a76c6-1bd1-3820-8b5f-3601ed4f977e/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1812/prod/QC_PREP/20260118/14/3f1e33b4-721b-3383-a881-122ecfd6fc8a/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670573",
    "description": "Yıldız Çiçeği Dekoratif Yapı Blok Çiçek – Saksı Çiçek Hediye Seti, solmayan canlı renkleri ve özenli sunumuyla sevdiklerinize yıllarca saklayabilecekleri zarif bir hatıra sunar. Özel tasarım saksı/buket formu sayesinde ev ve ofis dekorasyonunda ilk günkü tazeliğini korur.",
    "material": "Premium Dekoratif Çiçek / Yapı Bloğu & Özel Sunum Ambalajı",
    "dimensions": "Masaüstü ve Vitrin Sergilemeye Uygun Standart Boy",
    "usage": "Özel Gün Hediyesi, Salon & Ofis Masa Dekoru"
  },
  {
    "id": 7,
    "name": "Örümcek Zambağı Dekoratif Yapı Blok Çiçek – Saksı Çiçek Hediye Seti",
    "brand": "STAR CAST",
    "categorySlug": "cicek-buket",
    "category": "Çiçek & Buket Koleksiyonu",
    "price": 599.9,
    "oldPrice": 849.9,
    "discountPercent": 29,
    "badge": "%29 İndirim",
    "rating": "4.7",
    "reviews": 15,
    "image": "https://cdn.dsmcdn.com/ty1813/prod/QC_PREP/20260118/14/d264612a-c4a5-32bf-8e19-45e235a4d386/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1813/prod/QC_PREP/20260118/14/d264612a-c4a5-32bf-8e19-45e235a4d386/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1814/prod/QC_PREP/20260118/14/8a5b1e99-27f7-3bbb-bd5d-8a9943732129/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1812/prod/QC_PREP/20260118/14/d16b76ee-7563-3b70-93b7-3ba9fee78499/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670572",
    "description": "Örümcek Zambağı Dekoratif Yapı Blok Çiçek – Saksı Çiçek Hediye Seti, solmayan canlı renkleri ve özenli sunumuyla sevdiklerinize yıllarca saklayabilecekleri zarif bir hatıra sunar. Özel tasarım saksı/buket formu sayesinde ev ve ofis dekorasyonunda ilk günkü tazeliğini korur.",
    "material": "Premium Dekoratif Çiçek / Yapı Bloğu & Özel Sunum Ambalajı",
    "dimensions": "Masaüstü ve Vitrin Sergilemeye Uygun Standart Boy",
    "usage": "Özel Gün Hediyesi, Salon & Ofis Masa Dekoru"
  },
  {
    "id": 8,
    "name": "Mor Orkide Dekoratif Yapı Blok Çiçek – Saksı Çiçek Hediye Seti",
    "brand": "STAR CAST",
    "categorySlug": "cicek-buket",
    "category": "Çiçek & Buket Koleksiyonu",
    "price": 599.9,
    "oldPrice": 849.9,
    "discountPercent": 29,
    "badge": "%29 İndirim",
    "rating": "4.9",
    "reviews": 41,
    "image": "https://cdn.dsmcdn.com/ty1812/prod/QC_ENRICHMENT/20260118/14/e0b5807a-38a2-3922-b29a-fd8c01acc8e0/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1812/prod/QC_ENRICHMENT/20260118/14/e0b5807a-38a2-3922-b29a-fd8c01acc8e0/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1812/prod/QC_ENRICHMENT/20260118/14/3b9c40a1-557f-328b-8f3c-cdae1d5dfdb5/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1812/prod/QC_ENRICHMENT/20260118/14/58eb8c57-6995-3590-9ab2-1e05e495327f/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670570",
    "description": "Mor Orkide Dekoratif Yapı Blok Çiçek – Saksı Çiçek Hediye Seti, solmayan canlı renkleri ve özenli sunumuyla sevdiklerinize yıllarca saklayabilecekleri zarif bir hatıra sunar. Özel tasarım saksı/buket formu sayesinde ev ve ofis dekorasyonunda ilk günkü tazeliğini korur.",
    "material": "Premium Dekoratif Çiçek / Yapı Bloğu & Özel Sunum Ambalajı",
    "dimensions": "Masaüstü ve Vitrin Sergilemeye Uygun Standart Boy",
    "usage": "Özel Gün Hediyesi, Salon & Ofis Masa Dekoru"
  },
  {
    "id": 9,
    "name": "Beyaz Orkide Dekoratif Yapı Blok Çiçek – Saksı Çiçek Hediye Seti",
    "brand": "STAR CAST",
    "categorySlug": "cicek-buket",
    "category": "Çiçek & Buket Koleksiyonu",
    "price": 599.9,
    "oldPrice": 849.9,
    "discountPercent": 29,
    "badge": "%29 İndirim",
    "rating": "4.8",
    "reviews": 29,
    "image": "https://cdn.dsmcdn.com/ty1812/prod/QC_PREP/20260117/23/21f3db01-32a5-3238-92dd-197f7ff89b97/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1812/prod/QC_PREP/20260117/23/21f3db01-32a5-3238-92dd-197f7ff89b97/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1812/prod/QC_PREP/20260117/23/a2a6b91a-123d-3fb6-8c23-211f7201e362/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1814/prod/QC_PREP/20260117/23/b82f5b72-c3c9-304b-8535-649f1e01a261/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670569",
    "description": "Beyaz Orkide Dekoratif Yapı Blok Çiçek – Saksı Çiçek Hediye Seti, solmayan canlı renkleri ve özenli sunumuyla sevdiklerinize yıllarca saklayabilecekleri zarif bir hatıra sunar. Özel tasarım saksı/buket formu sayesinde ev ve ofis dekorasyonunda ilk günkü tazeliğini korur.",
    "material": "Premium Dekoratif Çiçek / Yapı Bloğu & Özel Sunum Ambalajı",
    "dimensions": "Masaüstü ve Vitrin Sergilemeye Uygun Standart Boy",
    "usage": "Özel Gün Hediyesi, Salon & Ofis Masa Dekoru"
  },
  {
    "id": 10,
    "name": "Love Flowers Mini Çiçek Buketi – Özel Gün Hediyesi - Beyaz Çiçek Buketi",
    "brand": "STAR CAST",
    "categorySlug": "cicek-buket",
    "category": "Çiçek & Buket Koleksiyonu",
    "price": 149.9,
    "oldPrice": 219.9,
    "discountPercent": 32,
    "badge": "%32 İndirim",
    "rating": "4.7",
    "reviews": 53,
    "image": "https://cdn.dsmcdn.com/ty1814/prod/QC_PREP/20260117/23/a7a00816-8657-3855-8ec0-3916053dbf46/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1814/prod/QC_PREP/20260117/23/a7a00816-8657-3855-8ec0-3916053dbf46/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1813/prod/QC_PREP/20260117/23/2c3c9df7-4ad4-36c3-88fa-156d6a6d6bda/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1812/prod/QC_PREP/20260117/23/f62fe53e-2c0e-3c96-aeaa-d9e8c928bd35/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670568",
    "description": "Love Flowers Mini Çiçek Buketi – Özel Gün Hediyesi - Beyaz Çiçek Buketi, solmayan canlı renkleri ve özenli sunumuyla sevdiklerinize yıllarca saklayabilecekleri zarif bir hatıra sunar. Özel tasarım saksı/buket formu sayesinde ev ve ofis dekorasyonunda ilk günkü tazeliğini korur.",
    "material": "Premium Dekoratif Çiçek / Yapı Bloğu & Özel Sunum Ambalajı",
    "dimensions": "Masaüstü ve Vitrin Sergilemeye Uygun Standart Boy",
    "usage": "Özel Gün Hediyesi, Salon & Ofis Masa Dekoru"
  },
  {
    "id": 11,
    "name": "Love Flowers Mini Çiçek Buketi – Özel Gün Hediyesi - Siyah Çiçek Buketi",
    "brand": "STAR CAST",
    "categorySlug": "cicek-buket",
    "category": "Çiçek & Buket Koleksiyonu",
    "price": 149.9,
    "oldPrice": 219.9,
    "discountPercent": 32,
    "badge": "%32 İndirim",
    "rating": "4.6",
    "reviews": 18,
    "image": "https://cdn.dsmcdn.com/ty1812/prod/QC_PREP/20260117/23/bba41897-6e44-3394-9743-9bc33cec5995/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1812/prod/QC_PREP/20260117/23/bba41897-6e44-3394-9743-9bc33cec5995/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1812/prod/QC_PREP/20260117/23/016f1baf-86ad-3761-9978-cd41f22c744d/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1813/prod/QC_PREP/20260117/23/73d306bb-f8cd-3815-8559-db161b11aacc/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670566",
    "description": "Love Flowers Mini Çiçek Buketi – Özel Gün Hediyesi - Siyah Çiçek Buketi, solmayan canlı renkleri ve özenli sunumuyla sevdiklerinize yıllarca saklayabilecekleri zarif bir hatıra sunar. Özel tasarım saksı/buket formu sayesinde ev ve ofis dekorasyonunda ilk günkü tazeliğini korur.",
    "material": "Premium Dekoratif Çiçek / Yapı Bloğu & Özel Sunum Ambalajı",
    "dimensions": "Masaüstü ve Vitrin Sergilemeye Uygun Standart Boy",
    "usage": "Özel Gün Hediyesi, Salon & Ofis Masa Dekoru"
  },
  {
    "id": 12,
    "name": "Love Flowers Mini Çiçek Buketi – Özel Gün Hediyesi - Pembe Çiçek Buketi",
    "brand": "STAR CAST",
    "categorySlug": "cicek-buket",
    "category": "Çiçek & Buket Koleksiyonu",
    "price": 149.9,
    "oldPrice": 219.9,
    "discountPercent": 32,
    "badge": "%32 İndirim",
    "rating": "4.8",
    "reviews": 37,
    "image": "https://cdn.dsmcdn.com/ty1813/prod/QC_PREP/20260117/23/2c580f7f-4a0c-3234-b4dc-6e0b87f6af4d/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1813/prod/QC_PREP/20260117/23/2c580f7f-4a0c-3234-b4dc-6e0b87f6af4d/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1812/prod/QC_PREP/20260117/23/09b23d9c-82ac-3084-9ca5-524cdcbf90c2/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1813/prod/QC_PREP/20260117/23/efb5cd99-540b-32d9-8203-bede9edfad2a/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670567",
    "description": "Love Flowers Mini Çiçek Buketi – Özel Gün Hediyesi - Pembe Çiçek Buketi, solmayan canlı renkleri ve özenli sunumuyla sevdiklerinize yıllarca saklayabilecekleri zarif bir hatıra sunar. Özel tasarım saksı/buket formu sayesinde ev ve ofis dekorasyonunda ilk günkü tazeliğini korur.",
    "material": "Premium Dekoratif Çiçek / Yapı Bloğu & Özel Sunum Ambalajı",
    "dimensions": "Masaüstü ve Vitrin Sergilemeye Uygun Standart Boy",
    "usage": "Özel Gün Hediyesi, Salon & Ofis Masa Dekoru"
  },
  {
    "id": 13,
    "name": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Love Gül)",
    "brand": "STAR CAST",
    "categorySlug": "kar-kureleri",
    "category": "Kar Küreleri & 3D Cam Küreler",
    "price": 299.9,
    "oldPrice": 429.9,
    "discountPercent": 30,
    "badge": "%30 İndirim",
    "rating": "4.9",
    "reviews": 62,
    "image": "https://cdn.dsmcdn.com/ty1806/prod/QC_PREP/20260102/16/2fb09ce2-e7d0-324d-9091-a07efdaf72b4/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1806/prod/QC_PREP/20260102/16/2fb09ce2-e7d0-324d-9091-a07efdaf72b4/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1808/prod/QC_PREP/20260102/16/4a09528e-7532-3240-b9a0-1cbdcd5e8f89/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1807/prod/QC_PREP/20260102/16/37340ea4-8507-3d29-bfe9-a277c47dfac1/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1808/prod/QC_PREP/20260102/16/bb361c1b-60e6-36a6-9af0-244fa9b7aed5/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1808/prod/QC_PREP/20260102/16/dec10278-4936-3b75-b157-3cb3dac92886/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1806/prod/QC_PREP/20260102/16/3866a318-6ee7-3fd0-94bf-b5cd3e4e94fc/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670545",
    "description": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Love Gül), yüksek berraklıktaki kristal cam gövdesi ve sıcak tonlu LED aydınlatmasıyla yaşam alanlarınıza huzurlu ve romantik bir atmosfer katar. USB veya pil ile pratik şekilde kullanılabilir; doğum günü, yıl dönümü ve sevgililer günü için kalıcı ve etkileyici bir hediye seçeneğidir.",
    "material": "K9 Kristal Cam Küre, Doğal Ahşap / Sert Reçine LED Stand",
    "dimensions": "Küre Çapı: 6-8 cm • Toplam Yükseklik: 9-13 cm",
    "usage": "Başucu Gece Lambası, Masaüstü & Kitaplık Dekoru"
  },
  {
    "id": 14,
    "name": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Şemsiyeli Çocuk)",
    "brand": "STAR CAST",
    "categorySlug": "kar-kureleri",
    "category": "Kar Küreleri & 3D Cam Küreler",
    "price": 299.9,
    "oldPrice": 429.9,
    "discountPercent": 30,
    "badge": "%30 İndirim",
    "rating": "4.8",
    "reviews": 26,
    "image": "https://cdn.dsmcdn.com/ty1809/prod/QC_ENRICHMENT/20260110/19/94cc25dc-bdaa-32bf-b58f-57be0cf3503d/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1809/prod/QC_ENRICHMENT/20260110/19/94cc25dc-bdaa-32bf-b58f-57be0cf3503d/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1810/prod/QC_ENRICHMENT/20260110/19/0cca3aef-2491-3ea6-a621-e4b6da15d938/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1809/prod/QC_ENRICHMENT/20260110/19/6540493a-6ad3-3226-9474-0b5d49dbf19a/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1811/prod/QC_ENRICHMENT/20260110/19/488b6390-d519-393b-9326-4b25e43e1a95/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1809/prod/QC_ENRICHMENT/20260110/19/805c0cc9-acd7-3883-870b-8d2b2d8a9023/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1811/prod/QC_ENRICHMENT/20260110/19/6805abdc-066c-3bfe-834d-257573b58d5c/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670562",
    "description": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Şemsiyeli Çocuk), yüksek berraklıktaki kristal cam gövdesi ve sıcak tonlu LED aydınlatmasıyla yaşam alanlarınıza huzurlu ve romantik bir atmosfer katar. USB veya pil ile pratik şekilde kullanılabilir; doğum günü, yıl dönümü ve sevgililer günü için kalıcı ve etkileyici bir hediye seçeneğidir.",
    "material": "K9 Kristal Cam Küre, Doğal Ahşap / Sert Reçine LED Stand",
    "dimensions": "Küre Çapı: 6-8 cm • Toplam Yükseklik: 9-13 cm",
    "usage": "Başucu Gece Lambası, Masaüstü & Kitaplık Dekoru"
  },
  {
    "id": 15,
    "name": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Şemsiyeli Adam)",
    "brand": "STAR CAST",
    "categorySlug": "kar-kureleri",
    "category": "Kar Küreleri & 3D Cam Küreler",
    "price": 299.9,
    "oldPrice": 429.9,
    "discountPercent": 30,
    "badge": "%30 İndirim",
    "rating": "4.7",
    "reviews": 14,
    "image": "https://cdn.dsmcdn.com/ty1806/prod/QC_PREP/20260102/16/51b232fe-9013-31b3-8f79-fc6033454d49/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1806/prod/QC_PREP/20260102/16/51b232fe-9013-31b3-8f79-fc6033454d49/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1807/prod/QC_PREP/20260102/16/aad1a5f4-23f3-385c-8cb7-567ed06985d1/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670561",
    "description": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Şemsiyeli Adam), yüksek berraklıktaki kristal cam gövdesi ve sıcak tonlu LED aydınlatmasıyla yaşam alanlarınıza huzurlu ve romantik bir atmosfer katar. USB veya pil ile pratik şekilde kullanılabilir; doğum günü, yıl dönümü ve sevgililer günü için kalıcı ve etkileyici bir hediye seçeneğidir.",
    "material": "K9 Kristal Cam Küre, Doğal Ahşap / Sert Reçine LED Stand",
    "dimensions": "Küre Çapı: 6-8 cm • Toplam Yükseklik: 9-13 cm",
    "usage": "Başucu Gece Lambası, Masaüstü & Kitaplık Dekoru"
  },
  {
    "id": 16,
    "name": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Hogwarts)",
    "brand": "STAR CAST",
    "categorySlug": "kar-kureleri",
    "category": "Kar Küreleri & 3D Cam Küreler",
    "price": 299.9,
    "oldPrice": 429.9,
    "discountPercent": 30,
    "badge": "Çok Satan",
    "rating": "5.0",
    "reviews": 91,
    "image": "https://cdn.dsmcdn.com/ty1809/prod/QC_ENRICHMENT/20260110/19/f9c9e720-d31e-30e4-be88-cdd3405d5b7c/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1809/prod/QC_ENRICHMENT/20260110/19/f9c9e720-d31e-30e4-be88-cdd3405d5b7c/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1809/prod/QC_ENRICHMENT/20260110/19/41ef15e6-3a67-3cae-82e5-4fec94c773cd/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1811/prod/QC_ENRICHMENT/20260110/19/91155b58-a6d9-3a2a-b8c8-eef082898cc0/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1811/prod/QC_ENRICHMENT/20260110/19/3632c30d-d445-36b5-8dad-fc492e8462d0/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1810/prod/QC_ENRICHMENT/20260110/19/acc57e1f-ef02-3900-ab3a-4a6e8ece8294/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1809/prod/QC_ENRICHMENT/20260110/19/2af5a874-ba6e-33f5-a51e-f928333ae891/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670560",
    "description": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Hogwarts), yüksek berraklıktaki kristal cam gövdesi ve sıcak tonlu LED aydınlatmasıyla yaşam alanlarınıza huzurlu ve romantik bir atmosfer katar. USB veya pil ile pratik şekilde kullanılabilir; doğum günü, yıl dönümü ve sevgililer günü için kalıcı ve etkileyici bir hediye seçeneğidir.",
    "material": "K9 Kristal Cam Küre, Doğal Ahşap / Sert Reçine LED Stand",
    "dimensions": "Küre Çapı: 6-8 cm • Toplam Yükseklik: 9-13 cm",
    "usage": "Başucu Gece Lambası, Masaüstü & Kitaplık Dekoru"
  },
  {
    "id": 17,
    "name": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Karahindiba)",
    "brand": "STAR CAST",
    "categorySlug": "kar-kureleri",
    "category": "Kar Küreleri & 3D Cam Küreler",
    "price": 299.9,
    "oldPrice": 429.9,
    "discountPercent": 30,
    "badge": "%30 İndirim",
    "rating": "4.8",
    "reviews": 44,
    "image": "https://cdn.dsmcdn.com/ty1809/prod/QC_ENRICHMENT/20260110/19/1f6a9fb6-e348-3c2e-85ac-551994c7f216/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1809/prod/QC_ENRICHMENT/20260110/19/1f6a9fb6-e348-3c2e-85ac-551994c7f216/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1811/prod/QC_ENRICHMENT/20260110/19/8a8ae822-bd4f-3142-93b3-0f1434976a3a/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1809/prod/QC_ENRICHMENT/20260110/19/39a9a3b2-46fa-3759-8fef-70047e9d40cb/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1810/prod/QC_ENRICHMENT/20260110/19/4e9dbfe8-5371-365d-8a3a-06e929360fb1/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1811/prod/QC_ENRICHMENT/20260110/19/b59ea705-d8b5-3373-aa09-d7ebbd2c0fbb/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1809/prod/QC_ENRICHMENT/20260110/19/df4ef41d-554b-3da3-af67-8e146f4e6510/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670564",
    "description": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Karahindiba), yüksek berraklıktaki kristal cam gövdesi ve sıcak tonlu LED aydınlatmasıyla yaşam alanlarınıza huzurlu ve romantik bir atmosfer katar. USB veya pil ile pratik şekilde kullanılabilir; doğum günü, yıl dönümü ve sevgililer günü için kalıcı ve etkileyici bir hediye seçeneğidir.",
    "material": "K9 Kristal Cam Küre, Doğal Ahşap / Sert Reçine LED Stand",
    "dimensions": "Küre Çapı: 6-8 cm • Toplam Yükseklik: 9-13 cm",
    "usage": "Başucu Gece Lambası, Masaüstü & Kitaplık Dekoru"
  },
  {
    "id": 18,
    "name": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Dünya)",
    "brand": "STAR CAST",
    "categorySlug": "kar-kureleri",
    "category": "Kar Küreleri & 3D Cam Küreler",
    "price": 299.9,
    "oldPrice": 429.9,
    "discountPercent": 30,
    "badge": "%30 İndirim",
    "rating": "4.9",
    "reviews": 73,
    "image": "https://cdn.dsmcdn.com/ty1810/prod/QC_ENRICHMENT/20260110/19/12102ddd-f21b-3194-8c72-cde59b37debd/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1810/prod/QC_ENRICHMENT/20260110/19/12102ddd-f21b-3194-8c72-cde59b37debd/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1810/prod/QC_ENRICHMENT/20260110/19/3f155bdb-8e3f-35bf-953d-a8cfb7d0fc71/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1811/prod/QC_ENRICHMENT/20260110/19/c5cefc36-68a4-3d0e-abab-09ed6c5f256d/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1809/prod/QC_ENRICHMENT/20260110/19/26757998-28d9-3eaa-a627-8bdc01f537a4/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1809/prod/QC_ENRICHMENT/20260110/19/9cdf4b79-949c-3e9c-8e41-4dcdf4d108be/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1809/prod/QC_ENRICHMENT/20260110/19/fd91d750-c4f1-3678-84a3-f2ea2c4a17bd/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670559",
    "description": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Dünya), yüksek berraklıktaki kristal cam gövdesi ve sıcak tonlu LED aydınlatmasıyla yaşam alanlarınıza huzurlu ve romantik bir atmosfer katar. USB veya pil ile pratik şekilde kullanılabilir; doğum günü, yıl dönümü ve sevgililer günü için kalıcı ve etkileyici bir hediye seçeneğidir.",
    "material": "K9 Kristal Cam Küre, Doğal Ahşap / Sert Reçine LED Stand",
    "dimensions": "Küre Çapı: 6-8 cm • Toplam Yükseklik: 9-13 cm",
    "usage": "Başucu Gece Lambası, Masaüstü & Kitaplık Dekoru"
  },
  {
    "id": 19,
    "name": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Astronot)",
    "brand": "STAR CAST",
    "categorySlug": "kar-kureleri",
    "category": "Kar Küreleri & 3D Cam Küreler",
    "price": 299.9,
    "oldPrice": 429.9,
    "discountPercent": 30,
    "badge": "%30 İndirim",
    "rating": "4.8",
    "reviews": 31,
    "image": "https://cdn.dsmcdn.com/ty1808/prod/QC_ENRICHMENT/20260102/22/f05ec402-8d6c-395f-8932-749f84e32aed/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1808/prod/QC_ENRICHMENT/20260102/22/f05ec402-8d6c-395f-8932-749f84e32aed/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1806/prod/QC_ENRICHMENT/20260102/22/001b31e7-9db2-3ac0-bdb8-3a46b1affa7c/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1806/prod/QC_ENRICHMENT/20260102/22/14a23ee4-04ef-3ddb-a0ca-903008642897/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1808/prod/QC_ENRICHMENT/20260102/22/0157ae1f-a5e7-34f1-a5a6-30586b5f406e/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1807/prod/QC_ENRICHMENT/20260102/22/baa5bbde-7f14-3147-af18-00f3cc12de6d/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1806/prod/QC_PREP/20260102/16/f9137cef-bfe7-3031-a936-96d3d7c6fbf5/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670558",
    "description": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Astronot), yüksek berraklıktaki kristal cam gövdesi ve sıcak tonlu LED aydınlatmasıyla yaşam alanlarınıza huzurlu ve romantik bir atmosfer katar. USB veya pil ile pratik şekilde kullanılabilir; doğum günü, yıl dönümü ve sevgililer günü için kalıcı ve etkileyici bir hediye seçeneğidir.",
    "material": "K9 Kristal Cam Küre, Doğal Ahşap / Sert Reçine LED Stand",
    "dimensions": "Küre Çapı: 6-8 cm • Toplam Yükseklik: 9-13 cm",
    "usage": "Başucu Gece Lambası, Masaüstü & Kitaplık Dekoru"
  },
  {
    "id": 20,
    "name": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Unicorn)",
    "brand": "STAR CAST",
    "categorySlug": "kar-kureleri",
    "category": "Kar Küreleri & 3D Cam Küreler",
    "price": 299.9,
    "oldPrice": 429.9,
    "discountPercent": 30,
    "badge": "%30 İndirim",
    "rating": "4.7",
    "reviews": 24,
    "image": "https://cdn.dsmcdn.com/ty1808/prod/QC_PREP/20260102/16/192c3b16-6edc-3f70-bf28-00f86f659628/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1808/prod/QC_PREP/20260102/16/192c3b16-6edc-3f70-bf28-00f86f659628/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1807/prod/QC_PREP/20260102/16/f40a6a54-e11a-3c2e-8dd5-81eebe1b86f1/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1806/prod/QC_PREP/20260102/16/54071c80-7b41-38c2-8f50-229773dfa2f0/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1807/prod/QC_PREP/20260102/16/bafc067b-0618-3c99-965a-fd5796dcefac/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1806/prod/QC_PREP/20260102/16/18a627a1-3d48-3ef6-973f-a7da37faf7d2/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1808/prod/QC_PREP/20260102/16/cac8f683-de91-37cf-ae55-2fde80310bfd/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670555",
    "description": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Unicorn), yüksek berraklıktaki kristal cam gövdesi ve sıcak tonlu LED aydınlatmasıyla yaşam alanlarınıza huzurlu ve romantik bir atmosfer katar. USB veya pil ile pratik şekilde kullanılabilir; doğum günü, yıl dönümü ve sevgililer günü için kalıcı ve etkileyici bir hediye seçeneğidir.",
    "material": "K9 Kristal Cam Küre, Doğal Ahşap / Sert Reçine LED Stand",
    "dimensions": "Küre Çapı: 6-8 cm • Toplam Yükseklik: 9-13 cm",
    "usage": "Başucu Gece Lambası, Masaüstü & Kitaplık Dekoru"
  },
  {
    "id": 21,
    "name": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Geyik)",
    "brand": "STAR CAST",
    "categorySlug": "kar-kureleri",
    "category": "Kar Küreleri & 3D Cam Küreler",
    "price": 299.9,
    "oldPrice": 429.9,
    "discountPercent": 30,
    "badge": "%30 İndirim",
    "rating": "4.8",
    "reviews": 17,
    "image": "https://cdn.dsmcdn.com/ty1807/prod/QC_PREP/20260102/16/7d230cdd-3827-33a0-98ab-c3b9abca46cf/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1807/prod/QC_PREP/20260102/16/7d230cdd-3827-33a0-98ab-c3b9abca46cf/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1806/prod/QC_PREP/20260102/16/ff3f2087-8fa2-34b5-ad9c-0876314aa353/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1806/prod/QC_PREP/20260102/16/1fbd396d-ec1d-3c98-84d4-ea205a730d51/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1808/prod/QC_PREP/20260102/16/10f6a2b1-7479-3b16-a512-ed3f369dc65d/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1808/prod/QC_PREP/20260102/16/d4704c7c-878d-3ad8-8660-a992b54708bf/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1808/prod/QC_PREP/20260102/16/b866dd8a-625a-34cd-b4c7-e1d130993bea/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670553",
    "description": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Geyik), yüksek berraklıktaki kristal cam gövdesi ve sıcak tonlu LED aydınlatmasıyla yaşam alanlarınıza huzurlu ve romantik bir atmosfer katar. USB veya pil ile pratik şekilde kullanılabilir; doğum günü, yıl dönümü ve sevgililer günü için kalıcı ve etkileyici bir hediye seçeneğidir.",
    "material": "K9 Kristal Cam Küre, Doğal Ahşap / Sert Reçine LED Stand",
    "dimensions": "Küre Çapı: 6-8 cm • Toplam Yükseklik: 9-13 cm",
    "usage": "Başucu Gece Lambası, Masaüstü & Kitaplık Dekoru"
  },
  {
    "id": 22,
    "name": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Bulut)",
    "brand": "STAR CAST",
    "categorySlug": "kar-kureleri",
    "category": "Kar Küreleri & 3D Cam Küreler",
    "price": 299.9,
    "oldPrice": 429.9,
    "discountPercent": 30,
    "badge": "%30 İndirim",
    "rating": "4.7",
    "reviews": 39,
    "image": "https://cdn.dsmcdn.com/ty1808/prod/QC_PREP/20260102/16/642f3b09-054c-3b0e-9ca2-ae31f52f00c9/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1808/prod/QC_PREP/20260102/16/642f3b09-054c-3b0e-9ca2-ae31f52f00c9/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1806/prod/QC_PREP/20260102/16/4da99d6d-313c-385b-b6e1-60b63198ad34/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1807/prod/QC_PREP/20260102/16/5fd0a6eb-d9cd-362e-af90-01ed4bc3239c/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1806/prod/QC_PREP/20260102/16/07331c0a-4b56-3c6a-a369-c0524039cc83/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1808/prod/QC_PREP/20260102/16/a28d632f-8cb5-3080-b0c9-4a3644d77a86/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1806/prod/QC_PREP/20260102/16/6273edc2-6011-3e8b-8d4f-a4adad22b03c/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670550",
    "description": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Bulut), yüksek berraklıktaki kristal cam gövdesi ve sıcak tonlu LED aydınlatmasıyla yaşam alanlarınıza huzurlu ve romantik bir atmosfer katar. USB veya pil ile pratik şekilde kullanılabilir; doğum günü, yıl dönümü ve sevgililer günü için kalıcı ve etkileyici bir hediye seçeneğidir.",
    "material": "K9 Kristal Cam Küre, Doğal Ahşap / Sert Reçine LED Stand",
    "dimensions": "Küre Çapı: 6-8 cm • Toplam Yükseklik: 9-13 cm",
    "usage": "Başucu Gece Lambası, Masaüstü & Kitaplık Dekoru"
  },
  {
    "id": 23,
    "name": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Samanyolu)",
    "brand": "STAR CAST",
    "categorySlug": "kar-kureleri",
    "category": "Kar Küreleri & 3D Cam Küreler",
    "price": 299.9,
    "oldPrice": 429.9,
    "discountPercent": 30,
    "badge": "%30 İndirim",
    "rating": "4.9",
    "reviews": 58,
    "image": "https://cdn.dsmcdn.com/ty1806/prod/QC_PREP/20260102/16/46139f60-c2d9-340b-9fdc-b0d9aa567048/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1806/prod/QC_PREP/20260102/16/46139f60-c2d9-340b-9fdc-b0d9aa567048/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1807/prod/QC_PREP/20260102/16/5fa025b6-4c98-3e7c-bb69-608a5f74c7c4/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1805/prod/QC_PREP/20251227/00/ca4e7da9-1008-3c17-be07-4996286805c0/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1805/prod/QC_PREP/20251227/00/4288e070-6645-3455-8bac-ce5e5393dc5e/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1805/prod/QC_PREP/20251227/00/38281393-c813-3d1b-8145-3f5158741d3c/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1805/prod/QC_PREP/20251227/00/a63635a7-1e77-3b3a-8eae-ee478d5b0074/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670541",
    "description": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Samanyolu), yüksek berraklıktaki kristal cam gövdesi ve sıcak tonlu LED aydınlatmasıyla yaşam alanlarınıza huzurlu ve romantik bir atmosfer katar. USB veya pil ile pratik şekilde kullanılabilir; doğum günü, yıl dönümü ve sevgililer günü için kalıcı ve etkileyici bir hediye seçeneğidir.",
    "material": "K9 Kristal Cam Küre, Doğal Ahşap / Sert Reçine LED Stand",
    "dimensions": "Küre Çapı: 6-8 cm • Toplam Yükseklik: 9-13 cm",
    "usage": "Başucu Gece Lambası, Masaüstü & Kitaplık Dekoru"
  },
  {
    "id": 24,
    "name": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Şemsiyeli Gül)",
    "brand": "STAR CAST",
    "categorySlug": "kar-kureleri",
    "category": "Kar Küreleri & 3D Cam Küreler",
    "price": 299.9,
    "oldPrice": 429.9,
    "discountPercent": 30,
    "badge": "%30 İndirim",
    "rating": "4.6",
    "reviews": 12,
    "image": "https://cdn.dsmcdn.com/ty1807/prod/QC_PREP/20260102/16/3625f711-d226-3960-9a9d-f63e341e31dd/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1807/prod/QC_PREP/20260102/16/3625f711-d226-3960-9a9d-f63e341e31dd/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1808/prod/QC_PREP/20260102/16/d65276b7-c576-308b-a046-626b377b215c/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670548",
    "description": "3D Işıklı Cam Küre – Renk Değiştiren LED Gece Lambası (Şemsiyeli Gül), yüksek berraklıktaki kristal cam gövdesi ve sıcak tonlu LED aydınlatmasıyla yaşam alanlarınıza huzurlu ve romantik bir atmosfer katar. USB veya pil ile pratik şekilde kullanılabilir; doğum günü, yıl dönümü ve sevgililer günü için kalıcı ve etkileyici bir hediye seçeneğidir.",
    "material": "K9 Kristal Cam Küre, Doğal Ahşap / Sert Reçine LED Stand",
    "dimensions": "Küre Çapı: 6-8 cm • Toplam Yükseklik: 9-13 cm",
    "usage": "Başucu Gece Lambası, Masaüstü & Kitaplık Dekoru"
  },
  {
    "id": 25,
    "name": "Romantik Gül Buketi – Sevgililer Günü, Anneler Günü İçin İdeal",
    "brand": "STAR CAST",
    "categorySlug": "cicek-buket",
    "category": "Çiçek & Buket Koleksiyonu",
    "price": 129.99,
    "oldPrice": 199.9,
    "discountPercent": 35,
    "badge": "%35 İndirim",
    "rating": "4.8",
    "reviews": 49,
    "image": "https://cdn.dsmcdn.com/ty1805/prod/QC_PREP/20251226/17/6f9be172-781a-3ee4-97c7-126f552dbe2f/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1805/prod/QC_PREP/20251226/17/6f9be172-781a-3ee4-97c7-126f552dbe2f/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1804/prod/QC_PREP/20251226/17/0e43f1bf-5525-38a0-a875-1acc5c1ca3de/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1805/prod/QC_PREP/20251226/17/e4380654-6797-30ad-8131-de3a62e96f4c/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1804/prod/QC_PREP/20251226/17/1cdd2edf-5566-3d2f-a35e-76a8f651add6/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1804/prod/QC_PREP/20251226/17/fdc79de8-9ede-3933-b971-e4769672c9e0/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1805/prod/QC_PREP/20251226/17/08e84554-7ede-361c-84b9-50459fa0429e/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670535",
    "description": "Romantik Gül Buketi – Sevgililer Günü, Anneler Günü İçin İdeal, solmayan canlı renkleri ve özenli sunumuyla sevdiklerinize yıllarca saklayabilecekleri zarif bir hatıra sunar. Özel tasarım saksı/buket formu sayesinde ev ve ofis dekorasyonunda ilk günkü tazeliğini korur.",
    "material": "Premium Dekoratif Çiçek / Yapı Bloğu & Özel Sunum Ambalajı",
    "dimensions": "Masaüstü ve Vitrin Sergilemeye Uygun Standart Boy",
    "usage": "Özel Gün Hediyesi, Salon & Ofis Masa Dekoru"
  },
  {
    "id": 26,
    "name": "Yapay Ayı Gül Buketi – Sevgililer Günü Özel Tasarım | Dekoratif Çiçek & Hediye",
    "brand": "STAR CAST",
    "categorySlug": "cicek-buket",
    "category": "Çiçek & Buket Koleksiyonu",
    "price": 129.99,
    "oldPrice": 199.9,
    "discountPercent": 35,
    "badge": "%35 İndirim",
    "rating": "4.7",
    "reviews": 27,
    "image": "https://cdn.dsmcdn.com/ty1804/prod/QC_PREP/20251226/17/ce00e7ae-e6ba-36ae-8e0b-41a7bc1422ce/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1804/prod/QC_PREP/20251226/17/ce00e7ae-e6ba-36ae-8e0b-41a7bc1422ce/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1804/prod/QC_PREP/20251226/17/b7b33a76-6c77-3038-8dc9-991df6ed9ee7/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1805/prod/QC_PREP/20251226/17/42b6c594-fb3a-33a5-9163-69b557e91a66/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1804/prod/QC_PREP/20251226/17/c076651b-0ec3-3a95-b309-e0e930dbab57/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1805/prod/QC_PREP/20251226/17/13e5abc8-aa9b-3c11-8b70-fbdbcb323947/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1805/prod/QC_PREP/20251226/17/94ffd1e2-125b-312f-8903-e47caae0c565/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670534",
    "description": "Yapay Ayı Gül Buketi – Sevgililer Günü Özel Tasarım | Dekoratif Çiçek & Hediye, solmayan canlı renkleri ve özenli sunumuyla sevdiklerinize yıllarca saklayabilecekleri zarif bir hatıra sunar. Özel tasarım saksı/buket formu sayesinde ev ve ofis dekorasyonunda ilk günkü tazeliğini korur.",
    "material": "Premium Dekoratif Çiçek / Yapı Bloğu & Özel Sunum Ambalajı",
    "dimensions": "Masaüstü ve Vitrin Sergilemeye Uygun Standart Boy",
    "usage": "Özel Gün Hediyesi, Salon & Ofis Masa Dekoru"
  },
  {
    "id": 27,
    "name": "İstiridye İçinde İnci Kolye - Sürpriz İnci Kolye Set",
    "brand": "Sarmal Collection",
    "categorySlug": "taki-mucevher",
    "category": "Takı & Sürpriz İnci Kolye",
    "price": 299,
    "oldPrice": 429.9,
    "discountPercent": 30,
    "badge": "%30 İndirim",
    "rating": "4.9",
    "reviews": 64,
    "image": "https://cdn.dsmcdn.com/ty1814/prod/QC_ENRICHMENT/20260118/14/c0256451-186a-32ab-bcec-710e22522b0b/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1814/prod/QC_ENRICHMENT/20260118/14/c0256451-186a-32ab-bcec-710e22522b0b/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1813/prod/QC_ENRICHMENT/20260118/14/f35559a2-589d-320b-8919-9bd46ee741b6/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1797/prod/QC_PREP/20251211/05/eff9dadb-3a20-3cd0-907e-b000e7313d16/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1813/prod/QC_ENRICHMENT/20260118/14/1624c08a-fe8d-3654-9507-d667fb573469/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "30122424052",
    "description": "İstiridye İçinde İnci Kolye - Sürpriz İnci Kolye Set, gerçek istiridye kabuğu içerisinden kendi incinizi çıkararak kolyenize yerleştirme heyecanını yaşatan unutulmaz bir sürpriz hediye setidir. Özel hediye kutusu, zarif zinciri ve kafes kolye ucuyla birlikte gönderilir.",
    "material": "Gerçek Kültür İncisi, Antialerjik Rodyum Kaplama Zincir & Kolye Kafesi",
    "dimensions": "Zincir Uzunluğu: 45 cm • Hediye Kutusu: 18 × 10 × 3 cm",
    "usage": "Sevgililer Günü, Yıldönümü & Doğum Günü Sürpriz Hediyesi"
  },
  {
    "id": 28,
    "name": "El Yapımı Büyük Boy Bulut Gece Lambası",
    "brand": "STAR CAST",
    "categorySlug": "gece-lambalari",
    "category": "Dekoratif Gece Lambaları & Not Panosu",
    "price": 799.9,
    "oldPrice": 1129.9,
    "discountPercent": 29,
    "badge": "Yeni",
    "rating": "4.9",
    "reviews": 33,
    "image": "https://cdn.dsmcdn.com/ty1822/prod/QC_ENRICHMENT/20260207/14/912a9395-3d4b-338c-8771-d6d1003321e5/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1822/prod/QC_ENRICHMENT/20260207/14/912a9395-3d4b-338c-8771-d6d1003321e5/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1822/prod/QC_ENRICHMENT/20260207/14/64913060-2ce3-393b-93e4-1d46e4baf482/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670516",
    "description": "El Yapımı Büyük Boy Bulut Gece Lambası, yumuşak göz yormayan LED ışığı ve özgün dekoratif tasarımıyla yatak odası ve çalışma masalarına modern bir dokunuş katar. Düşük enerji tüketimi ve uzun ömürlü LED modülü ile güvenle kullanılabilir.",
    "material": "Akrilik Panel / El Yapımı Dekoratif Gövde & Uzun Ömürlü LED",
    "dimensions": "Yaklaşık 15 × 15 – 22 × 18 cm (Modele Göre)",
    "usage": "Yatak Odası Gece Lambası, Not Panosu & Masaüstü Aydınlatma"
  },
  {
    "id": 29,
    "name": "Romantik Metal Kalp Kutu – Ayıcık ve Güllerle Dolu Sevgiliye Hediye Seti | Özel Gün Hediyesi",
    "brand": "STAR CAST",
    "categorySlug": "ozel-hediyelikler",
    "category": "Özel Hediye & Müzik Kutuları",
    "price": 299.9,
    "oldPrice": 429.9,
    "discountPercent": 30,
    "badge": "%30 İndirim",
    "rating": "4.8",
    "reviews": 46,
    "image": "https://cdn.dsmcdn.com/ty1783/prod/QC_PREP/20251030/23/1dfb1d73-933e-3a7e-a128-8f80cb739fc8/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1783/prod/QC_PREP/20251030/23/1dfb1d73-933e-3a7e-a128-8f80cb739fc8/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1783/prod/QC_PREP/20251030/23/4175f467-d998-35ee-a33c-df743d9e85ab/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1782/prod/QC_PREP/20251030/23/ac08e576-5602-3fdb-9dd3-5087dce62887/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670515",
    "description": "Romantik Metal Kalp Kutu – Ayıcık ve Güllerle Dolu Sevgiliye Hediye Seti | Özel Gün Hediyesi, romantik detayları ve şık hediye sunumuyla özel anları unutulmaz kılmak için özenle hazırlandı. Koruyucu hediye kutusu içerisinde, doğrudan hediye etmeye hazır şekilde kargolanır.",
    "material": "Özel Tasarım Metal / Ahşap Kutu & Dekoratif Detaylar",
    "dimensions": "Standart Koleksiyon Hediyelik Boyut",
    "usage": "Sevgiliye Hediye, Yıldönümü, Doğum Günü & Özel Kutlamalar"
  },
  {
    "id": 30,
    "name": "El Yapımı Sonsuz Gül Bulutu Gece Lambası - Masaüstü Dekoru Demonte",
    "brand": "STAR CAST",
    "categorySlug": "gece-lambalari",
    "category": "Dekoratif Gece Lambaları & Not Panosu",
    "price": 599.99,
    "oldPrice": 849.9,
    "discountPercent": 29,
    "badge": "%29 İndirim",
    "rating": "4.8",
    "reviews": 21,
    "image": "https://cdn.dsmcdn.com/ty1769/prod/QC_PREP/20251009/13/f46e45ba-a4d4-3a4f-904f-9e1a6775e8fc/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1769/prod/QC_PREP/20251009/13/f46e45ba-a4d4-3a4f-904f-9e1a6775e8fc/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1767/prod/QC_PREP/20251009/13/911bb563-c5eb-390a-a4a1-56864a7241b6/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1767/prod/QC_PREP/20251009/13/10d516d7-ac2c-3ead-96ff-d296b4c100f4/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1768/prod/QC_PREP/20251009/13/7d396d27-c58d-34b5-9c96-2547b3b66b70/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1768/prod/QC_PREP/20251009/13/84a42160-4174-3c59-991b-fd270c78f31e/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670513",
    "description": "El Yapımı Sonsuz Gül Bulutu Gece Lambası - Masaüstü Dekoru Demonte, yumuşak göz yormayan LED ışığı ve özgün dekoratif tasarımıyla yatak odası ve çalışma masalarına modern bir dokunuş katar. Düşük enerji tüketimi ve uzun ömürlü LED modülü ile güvenle kullanılabilir.",
    "material": "Akrilik Panel / El Yapımı Dekoratif Gövde & Uzun Ömürlü LED",
    "dimensions": "Yaklaşık 15 × 15 – 22 × 18 cm (Modele Göre)",
    "usage": "Yatak Odası Gece Lambası, Not Panosu & Masaüstü Aydınlatma"
  },
  {
    "id": 31,
    "name": "Led Yazı Tahtası Gece Lambası - Not Panosu",
    "brand": "STAR CAST",
    "categorySlug": "gece-lambalari",
    "category": "Dekoratif Gece Lambaları & Not Panosu",
    "price": 299.9,
    "oldPrice": 429.9,
    "discountPercent": 30,
    "badge": "%30 İndirim",
    "rating": "4.7",
    "reviews": 38,
    "image": "https://cdn.dsmcdn.com/ty1769/prod/QC_PREP/20251009/12/017073c1-ad11-3efd-8734-1a64322eb928/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1769/prod/QC_PREP/20251009/12/017073c1-ad11-3efd-8734-1a64322eb928/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1768/prod/QC_PREP/20251009/12/5c917f91-b197-38ae-b0ef-16e488ddc4e2/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1767/prod/QC_PREP/20251009/12/dae3b743-fc34-363a-bd87-f337a9b404ad/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1767/prod/QC_PREP/20251009/12/07802090-4bb9-33fe-859d-72ae3a434854/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670512",
    "description": "Led Yazı Tahtası Gece Lambası - Not Panosu, yumuşak göz yormayan LED ışığı ve özgün dekoratif tasarımıyla yatak odası ve çalışma masalarına modern bir dokunuş katar. Düşük enerji tüketimi ve uzun ömürlü LED modülü ile güvenle kullanılabilir.",
    "material": "Akrilik Panel / El Yapımı Dekoratif Gövde & Uzun Ömürlü LED",
    "dimensions": "Yaklaşık 15 × 15 – 22 × 18 cm (Modele Göre)",
    "usage": "Yatak Odası Gece Lambası, Not Panosu & Masaüstü Aydınlatma"
  },
  {
    "id": 32,
    "name": "Nostaljik Atlı Karınca Müzik Kutusu",
    "brand": "STAR CAST",
    "categorySlug": "ozel-hediyelikler",
    "category": "Özel Hediye & Müzik Kutuları",
    "price": 299.9,
    "oldPrice": 429.9,
    "discountPercent": 30,
    "badge": "%30 İndirim",
    "rating": "4.9",
    "reviews": 52,
    "image": "https://cdn.dsmcdn.com/ty1766/prod/QC_PREP/20250928/01/cff8795e-e841-384b-94f0-104cefbcfaef/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1766/prod/QC_PREP/20250928/01/cff8795e-e841-384b-94f0-104cefbcfaef/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1764/prod/QC_PREP/20250928/01/a0395b22-69ee-32b6-998c-3717e617744a/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1765/prod/QC_PREP/20250928/01/1fea8de6-408f-3250-b2df-de53c631f10e/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1765/prod/QC_PREP/20250928/01/5ccebafa-5c64-35e7-b312-de60dd2d57e1/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1766/prod/QC_PREP/20250928/01/8a794e92-c0f0-3153-bcd2-1ecaaaeb6cbd/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670506",
    "description": "Nostaljik Atlı Karınca Müzik Kutusu, romantik detayları ve şık hediye sunumuyla özel anları unutulmaz kılmak için özenle hazırlandı. Koruyucu hediye kutusu içerisinde, doğrudan hediye etmeye hazır şekilde kargolanır.",
    "material": "Özel Tasarım Metal / Ahşap Kutu & Dekoratif Detaylar",
    "dimensions": "Standart Koleksiyon Hediyelik Boyut",
    "usage": "Sevgiliye Hediye, Yıldönümü, Doğum Günü & Özel Kutlamalar"
  },
  {
    "id": 33,
    "name": "Elmas Tasarımlı Sıvı Kum Saati – Masaüstü Dekor & Stres Giderici",
    "brand": "STAR CAST",
    "categorySlug": "batmayan-gemi",
    "category": "Batmayan Gemiler & Akvaryum",
    "price": 299.9,
    "oldPrice": 429.9,
    "discountPercent": 30,
    "badge": "%30 İndirim",
    "rating": "4.8",
    "reviews": 25,
    "image": "https://cdn.dsmcdn.com/ty1765/prod/QC_PREP/20250928/00/884e6435-b13d-35ec-85c3-2fd5d209681a/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1765/prod/QC_PREP/20250928/00/884e6435-b13d-35ec-85c3-2fd5d209681a/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1765/prod/QC_PREP/20250928/00/31b779b5-8e5f-302c-aec2-63b0b35c7dd7/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1765/prod/QC_PREP/20250928/00/da7ba194-ef3f-33cd-8748-274d961c346a/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670505",
    "description": "Elmas Tasarımlı Sıvı Kum Saati – Masaüstü Dekor & Stres Giderici, şeffaf akrilik gövdesi içindeki özel yoğunluklu mavi/yeşil sıvı dengesi sayesinde ne kadar sallanırsa sallansın asla batmayan büyüleyici bir dekorasyon objesidir. Ofis masasında stres giderici ve şık bir hediye arayanlar için mükemmel bir tercihtir.",
    "material": "Yüksek Şeffaflıkta Akrilik Gövde, Reçine Figür & Özel Sıvı",
    "dimensions": "Yaklaşık 14,5 × 5 × 5,2 cm",
    "usage": "Ofis Masası, Çalışma Odası & Stres Giderici Dekor"
  },
  {
    "id": 34,
    "name": "Renkli Sulu Kum Saati - Stres Giderici Masaüstü Dekor ve Hediyelik",
    "brand": "STAR CAST",
    "categorySlug": "batmayan-gemi",
    "category": "Batmayan Gemiler & Akvaryum",
    "price": 199.9,
    "oldPrice": 289.9,
    "discountPercent": 31,
    "badge": "%31 İndirim",
    "rating": "4.7",
    "reviews": 16,
    "image": "https://cdn.dsmcdn.com/ty1765/prod/QC_PREP/20250927/22/cd9f85c8-465d-3de0-acb9-438473c1e078/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1765/prod/QC_PREP/20250927/22/cd9f85c8-465d-3de0-acb9-438473c1e078/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1765/prod/QC_PREP/20250927/22/00780230-bae0-3f7e-94c9-ff24d5c73822/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1765/prod/QC_PREP/20250927/22/b5699482-15c5-3594-8dd5-1a4b01ed70c3/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1766/prod/QC_PREP/20250927/22/f125d448-1149-35d3-b35d-3766ab35cf27/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "450670503",
    "description": "Renkli Sulu Kum Saati - Stres Giderici Masaüstü Dekor ve Hediyelik, şeffaf akrilik gövdesi içindeki özel yoğunluklu mavi/yeşil sıvı dengesi sayesinde ne kadar sallanırsa sallansın asla batmayan büyüleyici bir dekorasyon objesidir. Ofis masasında stres giderici ve şık bir hediye arayanlar için mükemmel bir tercihtir.",
    "material": "Yüksek Şeffaflıkta Akrilik Gövde, Reçine Figür & Özel Sıvı",
    "dimensions": "Yaklaşık 14,5 × 5 × 5,2 cm",
    "usage": "Ofis Masası, Çalışma Odası & Stres Giderici Dekor"
  },
  {
    "id": 35,
    "name": "Romantik Yapay Gül Buketi ve Peluş Ayı - Pembe",
    "brand": "Sarmal Collection",
    "categorySlug": "cicek-buket",
    "category": "Çiçek & Buket Koleksiyonu",
    "price": 129.9,
    "oldPrice": 199.9,
    "discountPercent": 35,
    "badge": "%35 İndirim",
    "rating": "4.8",
    "reviews": 43,
    "image": "https://cdn.dsmcdn.com/ty1669/prod/QC/20250426/12/fba38fff-71e5-34ea-9f94-03fbe69abb4c/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1669/prod/QC/20250426/12/fba38fff-71e5-34ea-9f94-03fbe69abb4c/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1670/prod/QC/20250426/12/333664ad-7e26-365f-a82d-892bf12eba76/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1668/prod/QC/20250426/12/773116a7-4869-31f4-bf87-523c5dae8be6/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "30122424161",
    "description": "Romantik Yapay Gül Buketi ve Peluş Ayı - Pembe, solmayan canlı renkleri ve özenli sunumuyla sevdiklerinize yıllarca saklayabilecekleri zarif bir hatıra sunar. Özel tasarım saksı/buket formu sayesinde ev ve ofis dekorasyonunda ilk günkü tazeliğini korur.",
    "material": "Premium Dekoratif Çiçek / Yapı Bloğu & Özel Sunum Ambalajı",
    "dimensions": "Masaüstü ve Vitrin Sergilemeye Uygun Standart Boy",
    "usage": "Özel Gün Hediyesi, Salon & Ofis Masa Dekoru"
  },
  {
    "id": 36,
    "name": "Romantik Yapay Gül Buketi ve Peluş Ayı - Kırmızı",
    "brand": "Sarmal Collection",
    "categorySlug": "cicek-buket",
    "category": "Çiçek & Buket Koleksiyonu",
    "price": 129.9,
    "oldPrice": 199.9,
    "discountPercent": 35,
    "badge": "%35 İndirim",
    "rating": "4.9",
    "reviews": 28,
    "image": "https://cdn.dsmcdn.com/ty1666/prod/QC/20250423/15/60e20008-ff62-3515-803a-64c22c7cd4f8/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1666/prod/QC/20250423/15/60e20008-ff62-3515-803a-64c22c7cd4f8/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1666/prod/QC/20250423/15/3ba76f0b-f3ff-3b3e-b47c-af82787145eb/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1666/prod/QC/20250423/15/66720087-9bb8-31be-b80d-eaabc8bafe59/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "30122424157",
    "description": "Romantik Yapay Gül Buketi ve Peluş Ayı - Kırmızı, solmayan canlı renkleri ve özenli sunumuyla sevdiklerinize yıllarca saklayabilecekleri zarif bir hatıra sunar. Özel tasarım saksı/buket formu sayesinde ev ve ofis dekorasyonunda ilk günkü tazeliğini korur.",
    "material": "Premium Dekoratif Çiçek / Yapı Bloğu & Özel Sunum Ambalajı",
    "dimensions": "Masaüstü ve Vitrin Sergilemeye Uygun Standart Boy",
    "usage": "Özel Gün Hediyesi, Salon & Ofis Masa Dekoru"
  },
  {
    "id": 37,
    "name": "Led Çizim Tableti Gece Lambası - Beyaz",
    "brand": "Sarmal Collection",
    "categorySlug": "gece-lambalari",
    "category": "Dekoratif Gece Lambaları & Not Panosu",
    "price": 299.9,
    "oldPrice": 429.9,
    "discountPercent": 30,
    "badge": "%30 İndirim",
    "rating": "4.7",
    "reviews": 35,
    "image": "https://cdn.dsmcdn.com/ty1663/prod/QC/20250417/02/4c6a8b5b-4139-3dce-8f58-b7c610e83291/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1663/prod/QC/20250417/02/4c6a8b5b-4139-3dce-8f58-b7c610e83291/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1663/prod/QC/20250417/02/81938044-2632-3b47-85a0-e33087ece4a2/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1664/prod/QC/20250417/02/f00acfca-d3fd-3cfb-b8c9-458b8cab5ddf/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1663/prod/QC/20250417/02/b342caf3-393c-339d-b506-bcd2fdef2a34/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1651/prod/QC/20250317/01/ed683b76-b345-3d0f-884f-4174f500f91d/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1651/prod/QC/20250317/01/e8e01340-7fb3-3f57-857c-209f9de33ab3/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "30122424156",
    "description": "Led Çizim Tableti Gece Lambası - Beyaz, yumuşak göz yormayan LED ışığı ve özgün dekoratif tasarımıyla yatak odası ve çalışma masalarına modern bir dokunuş katar. Düşük enerji tüketimi ve uzun ömürlü LED modülü ile güvenle kullanılabilir.",
    "material": "Akrilik Panel / El Yapımı Dekoratif Gövde & Uzun Ömürlü LED",
    "dimensions": "Yaklaşık 15 × 15 – 22 × 18 cm (Modele Göre)",
    "usage": "Yatak Odası Gece Lambası, Not Panosu & Masaüstü Aydınlatma"
  },
  {
    "id": 38,
    "name": "El Yapımı Büyük Boy Bulut Gece Lambası Lale Desenli",
    "brand": "Sarmal Collection",
    "categorySlug": "gece-lambalari",
    "category": "Dekoratif Gece Lambaları & Not Panosu",
    "price": 639.99,
    "oldPrice": 899.9,
    "discountPercent": 29,
    "badge": "%29 İndirim",
    "rating": "4.8",
    "reviews": 19,
    "image": "https://cdn.dsmcdn.com/ty1823/prod/QC_ENRICHMENT/20260207/15/e2ce0565-4cc5-3cf6-9243-834c3241c598/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1823/prod/QC_ENRICHMENT/20260207/15/e2ce0565-4cc5-3cf6-9243-834c3241c598/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1838/prod/QC_ENRICHMENT/20260313/04/e0b371e7-a624-3ec5-8b30-a4844802fd19/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1843/prod/QC_ENRICHMENT/20260323/18/2308b329-a2ca-32e6-8929-2a1f2f1cd637/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "30122424098",
    "description": "El Yapımı Büyük Boy Bulut Gece Lambası Lale Desenli, yumuşak göz yormayan LED ışığı ve özgün dekoratif tasarımıyla yatak odası ve çalışma masalarına modern bir dokunuş katar. Düşük enerji tüketimi ve uzun ömürlü LED modülü ile güvenle kullanılabilir.",
    "material": "Akrilik Panel / El Yapımı Dekoratif Gövde & Uzun Ömürlü LED",
    "dimensions": "Yaklaşık 15 × 15 – 22 × 18 cm (Modele Göre)",
    "usage": "Yatak Odası Gece Lambası, Not Panosu & Masaüstü Aydınlatma"
  },
  {
    "id": 39,
    "name": "Led Çizim Tableti Gece Lambası Not Panosu",
    "brand": "Onigonline",
    "categorySlug": "gece-lambalari",
    "category": "Dekoratif Gece Lambaları & Not Panosu",
    "price": 299.9,
    "oldPrice": 429.9,
    "discountPercent": 30,
    "badge": "%30 İndirim",
    "rating": "4.7",
    "reviews": 23,
    "image": "https://cdn.dsmcdn.com/ty1623/prod/QC/20250117/00/bf9da4e7-9310-3ab2-85d0-b4eb28e6c6ff/1_org_zoom.jpg",
    "images": [
      "https://cdn.dsmcdn.com/ty1623/prod/QC/20250117/00/bf9da4e7-9310-3ab2-85d0-b4eb28e6c6ff/1_org_zoom.jpg",
      "https://cdn.dsmcdn.com/ty1624/prod/QC/20250117/00/b89e7c54-9005-39ae-845e-2a091cfe9ea2/1_org_zoom.jpg"
    ],
    "inStock": true,
    "barcode": "30122424061",
    "description": "Led Çizim Tableti Gece Lambası Not Panosu, yumuşak göz yormayan LED ışığı ve özgün dekoratif tasarımıyla yatak odası ve çalışma masalarına modern bir dokunuş katar. Düşük enerji tüketimi ve uzun ömürlü LED modülü ile güvenle kullanılabilir.",
    "material": "Akrilik Panel / El Yapımı Dekoratif Gövde & Uzun Ömürlü LED",
    "dimensions": "Yaklaşık 15 × 15 – 22 × 18 cm (Modele Göre)",
    "usage": "Yatak Odası Gece Lambası, Not Panosu & Masaüstü Aydınlatma"
  }
];

const FREE_SHIPPING_THRESHOLD = 500;
const STANDARD_SHIPPING_FEE = 49.9;

const AVAILABLE_COUPONS = {
  "SARMAL10": { type: "percent", value: 10, desc: "%10 Sepet İndirimi" },
  "HOSGELDIN": { type: "fixed", value: 25, minSpend: 150, desc: "150 TL Üzerine 25 TL İndirim" },
  "HEDIYE50": { type: "fixed", value: 50, minSpend: 300, desc: "300 TL Üzerine 50 TL İndirim" }
};

// --- 2. GÜVENLİK VE FORMAT YARDIMCILARI ---
function escapeHTML(str) {
  if (typeof str !== "string") return String(str || "");
  return str.replace(/[&<>'"]/g, function (tag) {
    const chars = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    };
    return chars[tag] || tag;
  });
}

function normalizeTr(str) {
  return String(str || "")
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/İ/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c");
}

function safeLocalStorageGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed !== null ? parsed : fallback;
  } catch (err) {
    console.warn("Storage okuma hatası:", err);
    return fallback;
  }
}

function safeLocalStorageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn("Storage yazma hatası:", err);
  }
}

function formatPrice(num) {
  const safeNum = typeof num === "number" && !isNaN(num) ? num : 0;
  return safeNum.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " TL";
}

// --- 3. DURUM YÖNETİMİ (STATE) ---
function reconcileCart(rawCart) {
  if (!Array.isArray(rawCart)) return [];
  const clean = [];
  rawCart.forEach(item => {
    if (!item || !item.product) return;
    const matched =
      PRODUCTS_DATA.find(p => p.id === item.product.id) ||
      PRODUCTS_DATA.find(p => item.product.barcode && p.barcode === item.product.barcode);
    if (matched) {
      const qty = Math.max(1, Math.min(99, parseInt(item.quantity, 10) || 1));
      const existing = clean.find(c => c.product.id === matched.id);
      if (existing) existing.quantity += qty;
      else clean.push({ product: matched, quantity: qty });
    }
  });
  return clean;
}

let cart = reconcileCart(safeLocalStorageGet("sarmal_cart", []));
let wishlist = (safeLocalStorageGet("sarmal_wishlist", []) || []).filter(id =>
  PRODUCTS_DATA.some(p => p.id === id)
);
let userOrders = safeLocalStorageGet("sarmal_orders", []);
let currentUser = safeLocalStorageGet("sarmal_user", null);
let activeCoupon = safeLocalStorageGet("sarmal_coupon", null);
if (activeCoupon && !AVAILABLE_COUPONS[activeCoupon]) activeCoupon = null;

let giftOptions = safeLocalStorageGet("sarmal_gift_options", { wrapping: false, note: "" });
if (!giftOptions || typeof giftOptions !== "object") {
  giftOptions = { wrapping: false, note: "" };
}

// Kategori Filtre Durumu
let currentCategorySlug = null;
let catSortBy = "recommended";
let catMinPrice = null;
let catMaxPrice = null;
let catOnlyDiscount = false;

// Aktif Görünüm ve Zamanlayıcılar
let HOME_VIEW_HTML = "";
let currentRouteState = { view: "home" };
let currentPdpProduct = null;
let currentSlide = 0;
let slideInterval = null;
let pdpViewerInterval = null;

// --- 4. DOĞAL & TUTARLI SOSYAL KANIT HESAPLAYICILARI ---
function deterministicHash(seed) {
  let x = (seed * 2654435761) >>> 0;
  x = ((x ^ (x >>> 16)) * 2246822507) >>> 0;
  x = ((x ^ (x >>> 13)) * 3266489909) >>> 0;
  return (x ^ (x >>> 16)) >>> 0;
}

function getBaseLiveViewers(productId) {
  // Ürün ID'sine bağlı tutarlı ve gerçekçi aralık: 5 - 18 kişi
  return 5 + (deterministicHash(productId * 17 + 3) % 14);
}

function getRecentOrdersCount(productId) {
  // Ürün ID'sine bağlı tutarlı son 24 saat sipariş sayısı: 2 - 11 adet
  return 2 + (deterministicHash(productId * 31 + 7) % 10);
}

const REVIEW_POOL_BY_CATEGORY = {
  "kar-kureleri": [
    { author: "Selin Y.", city: "İstanbul", rating: 5, text: "Işığı loş ortamda harika bir atmosfer oluşturuyor. Kristal camı çok berrak, patpatlı koruyucu ambalajla sapasağlam ulaştı." },
    { author: "Burak T.", city: "Ankara", rating: 5, text: "Sevgilime doğum günü hediyesi aldım, bayıldı. Hediye paketi ve not kartı çok özenli hazırlanmıştı." },
    { author: "Zeynep K.", city: "İzmir", rating: 5, text: "Fotoğraflardakinden bile güzel duruyor. Gece lambası olarak masamın baş köşesinde kullanıyorum." },
    { author: "Mert A.", city: "Bursa", rating: 4, text: "Kargo ertesi gün elime geçti. Malzeme kalitesi ve ışık tonu gayet başarılı, tavsiye ederim." }
  ],
  "batmayan-gemi": [
    { author: "Murat D.", city: "Ankara", rating: 5, text: "Ofis masasında gerçekten çok dikkat çekiyor. Ne kadar sallarsanız sallayın gemi asla batmıyor, izlemesi çok rahatlatıcı." },
    { author: "Deniz E.", city: "İstanbul", rating: 5, text: "Sıvı dengesi kusursuz, akma sızma kesinlikle yok. Paketleme çok sağlam yapılmış." },
    { author: "Kaan Ö.", city: "Antalya", rating: 5, text: "Arkadaşıma yeni iş hediyesi olarak aldım, masasına çok yakıştı. Hızlı teslimat için teşekkürler." },
    { author: "Gizem S.", city: "Eskişehir", rating: 4, text: "Beklediğimden daha kaliteli bir akrilik gövdesi var, ışık altında harika parlıyor." }
  ],
  "cicek-buket": [
    { author: "Elif N.", city: "İzmir", rating: 5, text: "Renkleri canlı ve hiç solmayacak olması harika. Salonda çok zarif duruyor." },
    { author: "Emre B.", city: "İstanbul", rating: 5, text: "Yıldönümü için hediye paketiyle sipariş verdim, not kartı çok şık yazılmıştı. Eşimi çok mutlu etti." },
    { author: "Ceren M.", city: "Kocaeli", rating: 5, text: "Yapı bloğu parçaları eksiksiz çıktı, yaparken çok keyif aldık. Dekor olarak muhteşem." },
    { author: "Tuğba K.", city: "Adana", rating: 5, text: "Fiyatına göre kalitesi gerçekten çok iyi, hızlı kargo için teşekkürler Sarmal Ticaret." }
  ],
  "taki-mucevher": [
    { author: "Emre S.", city: "İzmir", rating: 5, text: "İstiridyeyi açıp içinden gerçek inciyi çıkarmak unutulmaz bir sürpriz oldu. Kutusu çok şık." },
    { author: "Buse Ç.", city: "İstanbul", rating: 5, text: "Zinciri ve kafes kolye ucu çok zarif, kararma yapmadı. SARMAL10 kuponuyla indirimli aldım." },
    { author: "Oğuzhan Y.", city: "Ankara", rating: 5, text: "Sevgililer günü için aldım, ertesi gün teslim edildi. Hem anlamlı hem de çok şık bir hediye." }
  ],
  "gece-lambalari": [
    { author: "İrem A.", city: "İstanbul", rating: 5, text: "Göz yormayan sıcak ışığı sayesinde odamın havası tamamen değişti. Çok beğenerek kullanıyorum." },
    { author: "Hakan V.", city: "Bursa", rating: 5, text: "Not panosu kalemiyle birlikte geldi, yazıp silmesi çok kolay. Hediye olarak da harika bir fikir." },
    { author: "Derya P.", city: "Konya", rating: 5, text: "El işçiliği ve paketleme kalitesi çok başarılı, hiç hasarsız geldi." }
  ],
  "ozel-hediyelikler": [
    { author: "Ayşe K.", city: "İstanbul", rating: 5, text: "Atlı karıncanın melodisi ve detayları çok nostaljik. Özel hediye kutusunda eksiksiz ulaştı." },
    { author: "Furkan G.", city: "Ankara", rating: 5, text: "Kalp kutu içeriği dolu dolu ve çok romantik. Aynı gün kargoya verildi." },
    { author: "Melis T.", city: "İzmir", rating: 5, text: "Hediye notu isteğime tam uyulmuş, paketleme çok şıktı. Tekrar alışveriş yapacağım." }
  ]
};

function getProductReviews(product) {
  const pool = REVIEW_POOL_BY_CATEGORY[product.categorySlug] || REVIEW_POOL_BY_CATEGORY["ozel-hediyelikler"];
  const start = product.id % pool.length;
  const result = [];
  for (let i = 0; i < Math.min(3, pool.length); i++) {
    result.push(pool[(start + i) % pool.length]);
  }
  return result;
}

// --- 5. ROUTING (HISTORY API + HASH UYUMLULUĞU, TEKİL GÖRÜNÜM) ---
function parseCurrentRoute() {
  const rawHash = window.location.hash.replace(/^#/, "").trim();
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";

  // 1) Öncelik: Hash linkleri (eski yer imleri / doğrudan hash bağlantıları)
  if (rawHash) {
    if (rawHash.startsWith("kategori=")) {
      return { view: "category", slug: decodeURIComponent(rawHash.split("=")[1] || "") };
    }
    if (rawHash.startsWith("urun=")) {
      return { view: "product", id: parseInt(rawHash.split("=")[1], 10) };
    }
    if (rawHash === "sepet") return { view: "cart" };
    if (rawHash === "favoriler") return { view: "wishlist" };
    if (rawHash === "giris") return { view: "auth", tab: "login" };
    if (rawHash === "kayit") return { view: "auth", tab: "register" };
    if (rawHash === "hesabim") return { view: "profile" };
    if (rawHash === "siparis-takip") return { view: "tracking" };
  }

  // 2) History API temiz URL yolları
  if (pathname === "/" || pathname === "/index.html") {
    return { view: "home" };
  }
  if (pathname.startsWith("/kategori/")) {
    return { view: "category", slug: decodeURIComponent(pathname.slice("/kategori/".length)) };
  }
  if (pathname.startsWith("/urun/")) {
    return { view: "product", id: parseInt(pathname.slice("/urun/".length), 10) };
  }
  if (pathname === "/sepet") return { view: "cart" };
  if (pathname === "/favoriler") return { view: "wishlist" };
  if (pathname === "/giris") return { view: "auth", tab: "login" };
  if (pathname === "/kayit") return { view: "auth", tab: "register" };
  if (pathname === "/hesabim") return { view: "profile" };
  if (pathname === "/siparis-takip") return { view: "tracking" };

  return { view: "not-found" };
}

function pushCleanUrl(path) {
  if (window.history && window.history.pushState) {
    if (window.location.pathname + window.location.hash !== path) {
      window.history.pushState({ path }, "", path);
    }
  } else {
    window.location.hash = path.replace(/^\//, "");
  }
  renderRoute();
}

function navigateToHome() {
  closeAllModals();
  closeCartDrawer();
  pushCleanUrl("/");
}

function navigateToCategory(slug) {
  closeAllModals();
  closeCartDrawer();
  closeSearch();
  if (currentCategorySlug !== slug) {
    catMinPrice = null;
    catMaxPrice = null;
    catOnlyDiscount = false;
    catSortBy = "recommended";
  }
  pushCleanUrl("/kategori/" + encodeURIComponent(slug));
}

function navigateToProduct(productId) {
  closeAllModals();
  closeCartDrawer();
  closeSearch();
  pushCleanUrl("/urun/" + productId);
}

function navigateToPage(pageName) {
  closeAllModals();
  closeCartDrawer();
  closeSearch();
  const clean = String(pageName || "").replace(/^\/+/, "");
  if (!clean) {
    pushCleanUrl("/");
    return;
  }
  pushCleanUrl("/" + clean);
}

function cleanupActiveViewTimers() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
  if (pdpViewerInterval) {
    clearInterval(pdpViewerInterval);
    pdpViewerInterval = null;
  }
}

function updateMobileBottomNavUI(activeTab) {
  const tabs = {
    home: document.getElementById("bottomNavHome"),
    categories: document.getElementById("bottomNavCategories"),
    cart: document.getElementById("bottomNavCart"),
    wishlist: document.getElementById("bottomNavWishlist"),
    auth: document.getElementById("bottomNavAuth")
  };
  Object.values(tabs).forEach(el => el && el.classList.remove("active"));
  if (tabs[activeTab]) tabs[activeTab].classList.add("active");
}

function renderRoute() {
  const appMain = document.getElementById("appMain");
  if (!appMain) return;

  cleanupActiveViewTimers();
  const route = parseCurrentRoute();
  currentRouteState = route;

  // Ana Sayfa
  if (route.view === "home") {
    currentCategorySlug = null;
    currentPdpProduct = null;
    document.title = "Sarmal Ticaret | Hediyelik Eşya & Özel Tasarım Ürünler - PayTR Güvenli Ödeme";
    appMain.innerHTML = HOME_VIEW_HTML;
    renderProductGrids();
    setupHeroSlider();
    bindNewsletterForm();
    updateMobileBottomNavUI("home");
    window.scrollTo({ top: 0, behavior: "instant" });
    return;
  }

  // Kategori Sayfası (Reyon)
  if (route.view === "category") {
    const category = CATEGORIES_DATA.find(c => c.slug === route.slug);
    if (category) {
      currentCategorySlug = category.slug;
      currentPdpProduct = null;
      document.title = category.name + " | Sarmal Ticaret";
      mountCategoryView(appMain, category);
      updateMobileBottomNavUI("categories");
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
  }

  // Ürün Detay Sayfası (PDP)
  if (route.view === "product") {
    const product = PRODUCTS_DATA.find(p => p.id === route.id);
    if (product) {
      currentPdpProduct = product;
      document.title = product.name + " | Sarmal Ticaret";
      mountProductDetailView(appMain, product);
      updateMobileBottomNavUI("categories");
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
  }

  // Tam Sayfa Sepet
  if (route.view === "cart") {
    currentPdpProduct = null;
    document.title = "Alışveriş Sepetim | Sarmal Ticaret";
    mountCartPageView(appMain);
    updateMobileBottomNavUI("cart");
    window.scrollTo({ top: 0, behavior: "instant" });
    return;
  }

  // Favorilerim
  if (route.view === "wishlist") {
    currentPdpProduct = null;
    document.title = "Favori Ürünlerim | Sarmal Ticaret";
    mountWishlistPageView(appMain);
    updateMobileBottomNavUI("wishlist");
    window.scrollTo({ top: 0, behavior: "instant" });
    return;
  }

  // Giriş / Kayıt
  if (route.view === "auth") {
    currentPdpProduct = null;
    document.title = (route.tab === "register" ? "Kayıt Ol" : "Giriş Yap") + " | Sarmal Ticaret";
    mountAuthPageView(appMain, route.tab || "login");
    updateMobileBottomNavUI("auth");
    window.scrollTo({ top: 0, behavior: "instant" });
    return;
  }

  // Hesabım / Profil
  if (route.view === "profile") {
    if (!currentUser) {
      pushCleanUrl("/giris");
      return;
    }
    currentPdpProduct = null;
    document.title = "Hesabım & Siparişlerim | Sarmal Ticaret";
    mountProfilePageView(appMain);
    updateMobileBottomNavUI("auth");
    window.scrollTo({ top: 0, behavior: "instant" });
    return;
  }

  // Sipariş Takibi
  if (route.view === "tracking") {
    currentPdpProduct = null;
    document.title = "Sipariş & Kargo Takibi | Sarmal Ticaret";
    mountTrackingPageView(appMain);
    updateMobileBottomNavUI("");
    window.scrollTo({ top: 0, behavior: "instant" });
    return;
  }

  // Fallback -> Ana Sayfa
  if (window.history && window.history.replaceState) {
    window.history.replaceState({}, "", "/");
  }
  currentRouteState = { view: "home" };
  document.title = "Sarmal Ticaret | Hediyelik Eşya & Özel Tasarım Ürünler - PayTR Güvenli Ödeme";
  appMain.innerHTML = HOME_VIEW_HTML;
  renderProductGrids();
  setupHeroSlider();
  bindNewsletterForm();
  updateMobileBottomNavUI("home");
}

// --- 6. ÜRÜN KARTI & ANA SAYFA GRIDLERİ ---
function createProductCardHTML(product) {
  const isWishlisted = wishlist.includes(product.id);
  const badgeClass = product.badge.includes("İndirim")
    ? "badge-discount"
    : product.badge.includes("Yeni")
      ? "badge-new"
      : "badge-deal";
  const badgeHTML = product.badge
    ? '<div class="product-badges"><span class="badge ' + badgeClass + '">' + escapeHTML(product.badge) + '</span></div>'
    : "";

  const safeName = escapeHTML(product.name);
  const safeBrand = escapeHTML(product.brand);
  const safeImg = escapeHTML(product.image);

  return (
    '<div class="product-card" data-id="' + product.id + '">' +
      badgeHTML +
      '<button type="button" class="product-wishlist-btn ' + (isWishlisted ? 'active' : '') + '" onclick="toggleWishlist(' + product.id + ', event)" title="Favorilere Ekle" aria-label="Favorilere Ekle">' +
        (isWishlisted ? '❤️' : '🤍') +
      '</button>' +
      '<div class="product-img-wrap" onclick="navigateToProduct(' + product.id + ')">' +
        '<img class="product-img" src="' + safeImg + '" alt="' + safeName + '" loading="lazy" onerror="this.src=\'/sarmalticaretlogo.jpg\'" />' +
        '<button class="quick-view-overlay-btn" type="button" onclick="navigateToProduct(' + product.id + '); event.stopPropagation();">Ürünü İncele</button>' +
      '</div>' +
      '<div class="product-content">' +
        '<span class="product-brand">' + safeBrand + '</span>' +
        '<h3 class="product-title" onclick="navigateToProduct(' + product.id + ')" title="' + safeName + '">' + safeName + '</h3>' +
        '<div class="product-rating">' +
          '<span>★★★★★</span>' +
          '<span class="rating-count">' + escapeHTML(product.rating) + ' (' + product.reviews + ')</span>' +
        '</div>' +
        '<div class="product-price-box">' +
          '<div class="old-price">' + formatPrice(product.oldPrice) + '</div>' +
          '<div class="current-price">' + formatPrice(product.price) + '</div>' +
        '</div>' +
        '<button type="button" class="add-to-cart-btn" onclick="addToCart(' + product.id + ', 1, event)">' +
          '<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>' +
          'Sepete Ekle' +
        '</button>' +
      '</div>' +
    '</div>'
  );
}

function renderProductGrids() {
  const dealsGrid = document.getElementById("dealsProductsGrid");
  const curatedGrid = document.getElementById("curatedProductsGrid");
  if (!dealsGrid || !curatedGrid) return;

  // Fırsatlar: En yüksek indirimli ve çeşitli kategorilerden 8 seçkin ürün
  const dealsList = [
    PRODUCTS_DATA[0],  // Sokak Lambalı Kar Küresi
    PRODUCTS_DATA[4],  // İstiridye İnci Kolye
    PRODUCTS_DATA[1],  // Batmayan Gemi
    PRODUCTS_DATA[15], // 3D Cam Küre Hogwarts
    PRODUCTS_DATA[9],  // Love Flowers Mini Buket
    PRODUCTS_DATA[27], // El Yapımı Bulut Gece Lambası
    PRODUCTS_DATA[28], // Romantik Metal Kalp Kutu
    PRODUCTS_DATA[31]  // Nostaljik Atlı Karınca Müzik Kutusu
  ].filter(Boolean);
  dealsGrid.innerHTML = dealsList.map(createProductCardHTML).join("");

  // Sizin İçin Seçtiklerimiz: Kalan benzersiz ürünlerden 16 seçkin ürün
  const dealIds = new Set(dealsList.map(p => p.id));
  const curatedList = PRODUCTS_DATA.filter(p => !dealIds.has(p.id)).slice(0, 16);
  curatedGrid.innerHTML = curatedList.map(createProductCardHTML).join("");
}

// --- 7. KATEGORİ SAYFASI (REYON) DİNAMİK MOUNT & AKILLI FİLTRELER ---
function getFilteredCategoryProducts(slug) {
  let list = PRODUCTS_DATA.filter(p => p.categorySlug === slug);

  if (catMinPrice !== null && !isNaN(catMinPrice)) {
    list = list.filter(p => p.price >= catMinPrice);
  }
  if (catMaxPrice !== null && !isNaN(catMaxPrice)) {
    list = list.filter(p => p.price <= catMaxPrice);
  }
  if (catOnlyDiscount) {
    list = list.filter(p => p.discountPercent >= 30);
  }

  if (catSortBy === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (catSortBy === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  } else if (catSortBy === "discount") {
    list.sort((a, b) => b.discountPercent - a.discountPercent);
  } else if (catSortBy === "reviews") {
    list.sort((a, b) => b.reviews - a.reviews);
  } else if (catSortBy === "name-asc") {
    list.sort((a, b) => a.name.localeCompare(b.name, "tr"));
  }
  return list;
}

function mountCategoryView(appMain, category) {
  const sidebarItemsHTML = CATEGORIES_DATA.map(c => {
    const count = PRODUCTS_DATA.filter(p => p.categorySlug === c.slug).length;
    const isActive = c.slug === category.slug;
    return (
      '<li class="cat-sidebar-item ' + (isActive ? 'active' : '') + '" onclick="navigateToCategory(\'' + c.slug + '\')">' +
        '<span>' + c.icon + ' ' + escapeHTML(c.shortName) + '</span>' +
        '<span class="cat-sidebar-badge">' + count + '</span>' +
      '</li>'
    );
  }).join("");

  const priceRanges = [
    { label: "0 - 250 TL", min: 0, max: 250 },
    { label: "250 - 500 TL", min: 250, max: 500 },
    { label: "500 - 1000 TL", min: 500, max: 1000 },
    { label: "1000 TL ve Üzeri", min: 1000, max: "" }
  ];

  const chipsHTML = priceRanges.map(r => {
    const isChipActive =
      catMinPrice === r.min &&
      ((r.max === "" && catMaxPrice === null) || catMaxPrice === r.max);
    return (
      '<button type="button" class="filter-chip-btn ' + (isChipActive ? 'active' : '') + '" data-min="' + r.min + '" data-max="' + r.max + '">' +
        r.label +
      '</button>'
    );
  }).join("");

  const filtered = getFilteredCategoryProducts(category.slug);

  appMain.innerHTML =
    '<div id="categoryView" class="active">' +
      '<div class="container">' +
        '<nav class="breadcrumb-nav" aria-label="Sayfa Yolu">' +
          '<a href="/" class="breadcrumb-link" onclick="event.preventDefault(); navigateToHome()">Ana Sayfa</a>' +
          '<span class="breadcrumb-sep">/</span>' +
          '<span id="catBreadcrumbCurrent" class="breadcrumb-current">' + escapeHTML(category.name) + '</span>' +
        '</nav>' +
        '<div class="cat-page-banner">' +
          '<div class="cat-banner-inner">' +
            '<span id="catBannerBadge" class="cat-banner-badge">REYON: ' + escapeHTML(category.shortName.toUpperCase()) + '</span>' +
            '<h1 class="cat-banner-title">' +
              '<span id="catBannerIcon">' + category.icon + '</span> ' +
              '<span id="catBannerTitle">' + escapeHTML(category.name) + '</span>' +
            '</h1>' +
            '<p id="catBannerDesc" class="cat-banner-desc">' + escapeHTML(category.description) + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="cat-page-layout">' +
          '<aside class="cat-sidebar">' +
            '<div class="cat-sidebar-block">' +
              '<h4>Kategoriler</h4>' +
              '<ul id="catSidebarList" class="cat-sidebar-list">' + sidebarItemsHTML + '</ul>' +
            '</div>' +
            '<div class="cat-sidebar-block">' +
              '<h4>Fiyat Aralığı (TL)</h4>' +
              '<div class="sidebar-price-inputs">' +
                '<input id="catMinPriceInput" type="number" min="0" class="price-box-input" placeholder="Min" value="' + (catMinPrice !== null ? catMinPrice : '') + '" />' +
                '<span>-</span>' +
                '<input id="catMaxPriceInput" type="number" min="0" class="price-box-input" placeholder="Max" value="' + (catMaxPrice !== null ? catMaxPrice : '') + '" />' +
              '</div>' +
              '<button id="catApplyPriceBtn" type="button" class="sidebar-apply-btn">Fiyat Filtrele</button>' +
              '<div class="sidebar-filter-chips">' + chipsHTML + '</div>' +
            '</div>' +
            '<div class="cat-sidebar-block">' +
              '<h4>Özel Seçenekler</h4>' +
              '<label class="sidebar-checkbox-label">' +
                '<input id="catDiscountCb" type="checkbox" ' + (catOnlyDiscount ? 'checked' : '') + ' />' +
                '<span>%30 ve Üzeri İndirimdekiler</span>' +
              '</label>' +
            '</div>' +
            '<button type="button" class="clear-filters-btn" onclick="resetCategoryFilters()">' +
              '🔄 Filtreleri Temizle' +
            '</button>' +
          '</aside>' +
          '<section class="cat-products-main">' +
            '<div class="cat-top-bar">' +
              '<span id="catProductCount" class="cat-product-count">' + filtered.length + ' Ürün Listeleniyor</span>' +
              '<select id="catSortSelect" class="sort-select" aria-label="Sıralama">' +
                '<option value="recommended" ' + (catSortBy === 'recommended' ? 'selected' : '') + '>Önerilen Sıralama</option>' +
                '<option value="price-asc" ' + (catSortBy === 'price-asc' ? 'selected' : '') + '>Fiyat: Düşükten Yükseğe</option>' +
                '<option value="price-desc" ' + (catSortBy === 'price-desc' ? 'selected' : '') + '>Fiyat: Yüksekten Düşüğe</option>' +
                '<option value="discount" ' + (catSortBy === 'discount' ? 'selected' : '') + '>En Çok İndirim Alanlar</option>' +
                '<option value="reviews" ' + (catSortBy === 'reviews' ? 'selected' : '') + '>En Çok Değerlendirilenler</option>' +
                '<option value="name-asc" ' + (catSortBy === 'name-asc' ? 'selected' : '') + '>İsim: A\'dan Z\'ye</option>' +
              '</select>' +
            '</div>' +
            '<div id="catProductsGrid" class="cat-products-grid"></div>' +
          '</section>' +
        '</div>' +
      '</div>' +
    '</div>';

  bindCategoryFilterEvents();
  applyCategoryFiltersAndRender();
}

function bindCategoryFilterEvents() {
  const catSortSelect = document.getElementById("catSortSelect");
  if (catSortSelect) {
    catSortSelect.addEventListener("change", (e) => {
      catSortBy = e.target.value;
      applyCategoryFiltersAndRender();
    });
  }

  const catApplyBtn = document.getElementById("catApplyPriceBtn");
  if (catApplyBtn) {
    catApplyBtn.addEventListener("click", () => {
      const minRaw = document.getElementById("catMinPriceInput")?.value;
      const maxRaw = document.getElementById("catMaxPriceInput")?.value;
      catMinPrice = minRaw !== "" && minRaw !== undefined ? parseFloat(minRaw) : null;
      catMaxPrice = maxRaw !== "" && maxRaw !== undefined ? parseFloat(maxRaw) : null;
      syncPriceChipActiveState();
      applyCategoryFiltersAndRender();
    });
  }

  const catDiscountCb = document.getElementById("catDiscountCb");
  if (catDiscountCb) {
    catDiscountCb.addEventListener("change", (e) => {
      catOnlyDiscount = e.target.checked;
      applyCategoryFiltersAndRender();
    });
  }

  document.querySelectorAll("#categoryView .filter-chip-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const minAttr = btn.getAttribute("data-min");
      const maxAttr = btn.getAttribute("data-max");
      const nextMin = minAttr !== "" && minAttr !== null ? parseFloat(minAttr) : null;
      const nextMax = maxAttr !== "" && maxAttr !== null ? parseFloat(maxAttr) : null;

      // Aktif chip'e tekrar tıklanırsa filtreyi kaldır
      if (catMinPrice === nextMin && catMaxPrice === nextMax) {
        catMinPrice = null;
        catMaxPrice = null;
      } else {
        catMinPrice = nextMin;
        catMaxPrice = nextMax;
      }

      const minInput = document.getElementById("catMinPriceInput");
      const maxInput = document.getElementById("catMaxPriceInput");
      if (minInput) minInput.value = catMinPrice !== null ? String(catMinPrice) : "";
      if (maxInput) maxInput.value = catMaxPrice !== null ? String(catMaxPrice) : "";

      syncPriceChipActiveState();
      applyCategoryFiltersAndRender();
    });
  });
}

function syncPriceChipActiveState() {
  document.querySelectorAll("#categoryView .filter-chip-btn").forEach(btn => {
    const minAttr = btn.getAttribute("data-min");
    const maxAttr = btn.getAttribute("data-max");
    const bMin = minAttr !== "" && minAttr !== null ? parseFloat(minAttr) : null;
    const bMax = maxAttr !== "" && maxAttr !== null ? parseFloat(maxAttr) : null;
    btn.classList.toggle("active", catMinPrice === bMin && catMaxPrice === bMax);
  });
}

function applyCategoryFiltersAndRender() {
  if (!currentCategorySlug) return;
  const grid = document.getElementById("catProductsGrid");
  const countEl = document.getElementById("catProductCount");
  if (!grid) return;

  const list = getFilteredCategoryProducts(currentCategorySlug);
  if (countEl) countEl.textContent = list.length + " Ürün Listeleniyor";

  if (list.length === 0) {
    grid.innerHTML =
      '<div style="grid-column: 1 / -1; padding: 3.5rem 1.5rem; text-align: center; background: #ffffff; border-radius: 12px; border: 1px dashed var(--border); color: var(--text-muted);">' +
        '<div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>' +
        '<h3 style="font-size: 1.15rem; color: var(--primary-deep); margin-bottom: 0.4rem; font-weight: 800;">Bu Kriterlere Uygun Ürün Bulunamadı</h3>' +
        '<p style="font-size: 0.88rem; margin-bottom: 1rem;">Farklı bir fiyat aralığı seçebilir veya filtreleri temizleyerek tüm ürünleri görebilirsiniz.</p>' +
        '<button type="button" class="sidebar-apply-btn" style="max-width: 200px; margin: 0 auto;" onclick="resetCategoryFilters()">Filtreleri Temizle</button>' +
      '</div>';
  } else {
    grid.innerHTML = list.map(createProductCardHTML).join("");
  }
}

function resetCategoryFilters() {
  catMinPrice = null;
  catMaxPrice = null;
  catOnlyDiscount = false;
  catSortBy = "recommended";

  const minInput = document.getElementById("catMinPriceInput");
  const maxInput = document.getElementById("catMaxPriceInput");
  const discountCb = document.getElementById("catDiscountCb");
  const sortSelect = document.getElementById("catSortSelect");

  if (minInput) minInput.value = "";
  if (maxInput) maxInput.value = "";
  if (discountCb) discountCb.checked = false;
  if (sortSelect) sortSelect.value = "recommended";

  syncPriceChipActiveState();
  applyCategoryFiltersAndRender();
}

// --- 8. ÜRÜN DETAY SAYFASI (PDP) DİNAMİK MOUNT ---
function mountProductDetailView(appMain, product) {
  const galleryImages = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product.image];

  const isW = wishlist.includes(product.id);
  const diff = Math.max(0, product.oldPrice - product.price);
  const baseViewers = getBaseLiveViewers(product.id);
  const recentOrdersCount = getRecentOrdersCount(product.id);
  const productReviews = getProductReviews(product);

  const thumbsHTML = galleryImages.map((imgUrl, idx) => (
    '<button type="button" class="pdp-thumb-item ' + (idx === 0 ? 'active' : '') + '" data-img="' + escapeHTML(imgUrl) + '" onclick="selectPdpImage(this)" aria-label="' + escapeHTML(product.name) + ' görsel ' + (idx + 1) + '">' +
      '<img src="' + escapeHTML(imgUrl) + '" alt="' + escapeHTML(product.name) + ' - Görsel ' + (idx + 1) + '" loading="lazy" />' +
    '</button>'
  )).join("");

  const reviewsHTML = productReviews.map(rev => (
    '<div style="border-bottom: 1px solid var(--border-light); padding-bottom: 0.85rem;">' +
      '<div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 0.9rem;">' +
        '<span>' + escapeHTML(rev.author) + ' <span style="font-weight: 500; color: var(--text-muted);">(' + escapeHTML(rev.city) + ')</span></span>' +
        '<span style="color: #16a34a; font-size: 0.8rem;">✓ Onaylı Alıcı</span>' +
      '</div>' +
      '<div style="color: #f59e0b; font-size: 0.85rem; margin: 2px 0;">' + '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating) + '</div>' +
      '<p style="font-size: 0.88rem; color: var(--text-main); margin-top: 4px;">' + escapeHTML(rev.text) + '</p>' +
    '</div>'
  )).join("");

  let relatedList = PRODUCTS_DATA
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);
  if (relatedList.length < 4) {
    const existingIds = new Set([product.id, ...relatedList.map(p => p.id)]);
    const extras = PRODUCTS_DATA.filter(p => !existingIds.has(p.id)).slice(0, 4 - relatedList.length);
    relatedList = relatedList.concat(extras);
  }

  appMain.innerHTML =
    '<div id="productDetailPageView" class="page-view-section active">' +
      '<div class="container pdp-section">' +
        '<nav class="breadcrumb-nav" style="margin-bottom: 1.5rem;" aria-label="Sayfa Yolu">' +
          '<a href="/" class="breadcrumb-link" onclick="event.preventDefault(); navigateToHome()">Ana Sayfa</a>' +
          '<span class="breadcrumb-sep">/</span>' +
          '<a href="/kategori/' + encodeURIComponent(product.categorySlug) + '" class="breadcrumb-link" id="pdpBreadcrumbCategory" onclick="event.preventDefault(); navigateToCategory(\'' + product.categorySlug + '\')">' + escapeHTML(product.category) + '</a>' +
          '<span class="breadcrumb-sep">/</span>' +
          '<span class="breadcrumb-current" id="pdpBreadcrumbTitle">' + escapeHTML(product.name) + '</span>' +
        '</nav>' +
        '<div class="pdp-grid">' +
          '<div class="pdp-gallery-box">' +
            '<div class="pdp-main-image-wrap">' +
              (product.badge ? '<span id="pdpBadgeTag" class="pdp-badge-tag">' + escapeHTML(product.badge) + '</span>' : '') +
              '<img id="pdpMainImg" class="pdp-main-image" src="' + escapeHTML(galleryImages[0]) + '" alt="' + escapeHTML(product.name) + '" onerror="this.src=\'/sarmalticaretlogo.jpg\'" />' +
            '</div>' +
            '<div class="pdp-thumbs-row" id="pdpThumbsRow">' + thumbsHTML + '</div>' +
          '</div>' +
          '<div class="pdp-info-box">' +
            '<span id="pdpCategoryTag" class="pdp-category-link" onclick="navigateToCategory(\'' + product.categorySlug + '\')">' + escapeHTML(product.category) + '</span>' +
            '<h1 id="pdpTitle" class="pdp-title">' + escapeHTML(product.name) + '</h1>' +
            '<div class="pdp-meta-row">' +
              '<div class="pdp-stars">★★★★★</div>' +
              '<span id="pdpReviewsText" style="font-weight: 600; color: var(--text-muted);">' + escapeHTML(product.rating) + ' (' + product.reviews + ' Değerlendirme)</span>' +
              '<span style="color: var(--border);">|</span>' +
              '<span id="pdpBarcodeText" style="color: var(--text-muted); font-size: 0.8rem;">Barkod: ' + escapeHTML(product.barcode) + '</span>' +
              '<span style="color: var(--border);">|</span>' +
              '<span style="color: #16a34a; font-weight: 700;">✓ Orijinal Garantili Ürün</span>' +
            '</div>' +
            '<div class="pdp-price-card">' +
              '<div id="pdpOldPrice" class="pdp-old-price">' + formatPrice(product.oldPrice) + '</div>' +
              '<div class="pdp-price-row">' +
                '<span id="pdpCurrentPrice" class="pdp-current-price">' + formatPrice(product.price) + '</span>' +
                '<span id="pdpDiscountBadge" class="pdp-discount-tag">%' + product.discountPercent + ' İndirim (' + formatPrice(diff) + ' Kazanç)</span>' +
              '</div>' +
              '<div class="pdp-stock-status">' +
                '<span>✓</span>' +
                '<span>Stokta Var • Saat 16:00 Öncesi Siparişlerde AYNI GÜN KARGODA</span>' +
              '</div>' +
            '</div>' +
            '<div class="quickview-social-proof" style="margin: 0 0 1.5rem 0;">' +
              '<div class="social-proof-line">' +
                '<span class="live-pulse-green"></span>' +
                '<span id="pdpLiveViewers">Bu ürünü şu an <strong>' + baseViewers + ' kişi</strong> inceliyor.</span>' +
              '</div>' +
              '<div class="social-proof-line">' +
                '<span>🔥</span>' +
                '<span id="pdpRecentOrders">Son 24 saatte <strong>' + recentOrdersCount + ' adet</strong> sipariş verildi.</span>' +
              '</div>' +
              '<div class="social-proof-line">' +
                '<span>⚡</span>' +
                '<span>500 TL ve üzerine <strong>Ücretsiz Kargo</strong> • <strong>SARMAL10</strong> ile %10 Ek İndirim</span>' +
              '</div>' +
            '</div>' +
            '<div class="pdp-actions-row">' +
              '<div class="pdp-qty-selector">' +
                '<button type="button" class="pdp-qty-btn" onclick="changePdpQty(-1)" aria-label="Adet Azalt">−</button>' +
                '<input id="pdpQtyInput" type="number" class="pdp-qty-input" value="1" min="1" max="99" readonly aria-label="Adet" />' +
                '<button type="button" class="pdp-qty-btn" onclick="changePdpQty(1)" aria-label="Adet Artır">+</button>' +
              '</div>' +
              '<button id="pdpAddToCartBtn" type="button" class="pdp-add-cart-btn" onclick="handlePdpAddToCart()">' +
                '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>' +
                '<span>Sepete Ekle</span>' +
              '</button>' +
              '<button id="pdpBuyNowBtn" type="button" class="pdp-buy-now-btn" onclick="handlePdpBuyNow()">' +
                '<span>⚡ Hemen Al</span>' +
              '</button>' +
              '<button id="pdpWishlistBtn" type="button" class="pdp-wishlist-btn ' + (isW ? 'active' : '') + '" onclick="handlePdpWishlist()" title="Favorilere Ekle" aria-label="Favorilere Ekle">' +
                (isW ? '❤️' : '🤍') +
              '</button>' +
            '</div>' +
            '<div class="pdp-trust-list">' +
              '<div class="pdp-trust-item">' +
                '<span style="font-size: 1.3rem;">🔒</span>' +
                '<div><strong>PayTR 256-Bit SSL</strong><span>3D Secure ile korumalı güvenli taksitli ödeme</span></div>' +
              '</div>' +
              '<div class="pdp-trust-item">' +
                '<span style="font-size: 1.3rem;">🎁</span>' +
                '<div><strong>Özel Hediye Paketi</strong><span>Saten kurdeleli hediye kutusu & kişisel not kartı</span></div>' +
              '</div>' +
              '<div class="pdp-trust-item">' +
                '<span style="font-size: 1.3rem;">🚚</span>' +
                '<div><strong>Aynı Gün Kargo</strong><span>Yurtiçi Kargo güvencesiyle hızlı ve sigortalı teslimat</span></div>' +
              '</div>' +
              '<div class="pdp-trust-item">' +
                '<span style="font-size: 1.3rem;">🔄</span>' +
                '<div><strong>14 Gün İade Garantisi</strong><span>Yurtiçi Kargo anlaşma kodu (540912) ile ücretsiz iade</span></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="pdp-tabs-container">' +
          '<div class="pdp-tabs-nav">' +
            '<button type="button" class="pdp-tab-btn active" id="tabBtnDesc" onclick="switchPdpTab(\'desc\')">Ürün Açıklaması</button>' +
            '<button type="button" class="pdp-tab-btn" id="tabBtnSpecs" onclick="switchPdpTab(\'specs\')">Özellikler & Boyut</button>' +
            '<button type="button" class="pdp-tab-btn" id="tabBtnShipping" onclick="switchPdpTab(\'shipping\')">Teslimat & İade</button>' +
            '<button type="button" class="pdp-tab-btn" id="tabBtnReviews" onclick="switchPdpTab(\'reviews\')">Müşteri Yorumları (<span id="pdpTabReviewCount">' + product.reviews + '</span>)</button>' +
          '</div>' +
          '<div id="pdpTabDesc" class="pdp-tab-content active">' +
            '<h3 style="font-size: 1.15rem; font-weight: 800; color: var(--primary-deep); margin-bottom: 0.75rem;">' + escapeHTML(product.name) + '</h3>' +
            '<p id="pdpLongDescription" style="margin-bottom: 1rem;">' + escapeHTML(product.description) + '</p>' +
            '<div style="background: var(--bg-page); padding: 1rem; border-radius: 8px; border: 1px solid var(--border);">' +
              '<strong>💡 Ücretsiz Hediye Paketi & Kart Notu:</strong> Sepet çekmecesinde <em>"Özel Hediye Paketi İstiyorum"</em> kutucuğunu işaretleyerek kişisel hediye notunuzu ekleyebilirsiniz.' +
            '</div>' +
          '</div>' +
          '<div id="pdpTabSpecs" class="pdp-tab-content">' +
            '<table class="pdp-spec-table"><tbody>' +
              '<tr><th>Marka / Seri</th><td>' + escapeHTML(product.brand) + '</td></tr>' +
              '<tr><th>Kategori</th><td id="pdpSpecCategory">' + escapeHTML(product.category) + '</td></tr>' +
              '<tr><th>Ürün Kodu / Barkod</th><td id="pdpSpecBarcode">' + escapeHTML(product.barcode) + '</td></tr>' +
              '<tr><th>Malzeme Yapısı</th><td>' + escapeHTML(product.material) + '</td></tr>' +
              '<tr><th>Boyut / Ölçü</th><td>' + escapeHTML(product.dimensions) + '</td></tr>' +
              '<tr><th>Kullanım Alanı</th><td>' + escapeHTML(product.usage) + '</td></tr>' +
              '<tr><th>Garanti Durumu</th><td>2 Yıl Sarmal Ticaret Garantili</td></tr>' +
            '</tbody></table>' +
          '</div>' +
          '<div id="pdpTabShipping" class="pdp-tab-content">' +
            '<h4 style="font-weight: 800; color: var(--primary-deep); margin-bottom: 0.5rem;">Kargo ve Teslimat Süreci</h4>' +
            '<p>Hafta içi saat 16:00\'a kadar verilen tüm siparişler aynı gün <strong>Yurtiçi Kargo</strong>\'ya teslim edilir. Kargonuz yola çıktığında SMS ve e-posta ile takip numaranız iletilir. 500 TL ve üzeri tüm siparişlerde kargo tamamen ücretsizdir (500 TL altı siparişlerde 49,90 TL).</p>' +
            '<h4 style="font-weight: 800; color: var(--primary-deep); margin: 1rem 0 0.5rem;">14 Gün Koşulsuz İade</h4>' +
            '<p>Teslimat tarihinden itibaren 14 gün içerisinde herhangi bir gerekçe göstermeksizin Yurtiçi Kargo anlaşma kodumuz (<strong>540912</strong>) ile ücretsiz iade edebilirsiniz.</p>' +
          '</div>' +
          '<div id="pdpTabReviews" class="pdp-tab-content">' +
            '<div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; background: var(--bg-page); padding: 1.25rem; border-radius: 8px;">' +
              '<div style="font-size: 2.5rem; font-weight: 900; color: var(--primary-deep);">' + escapeHTML(product.rating) + '</div>' +
              '<div>' +
                '<div style="color: #f59e0b; font-size: 1.1rem;">★★★★★</div>' +
                '<div style="font-size: 0.85rem; color: var(--text-muted);">' + product.reviews + ' doğrulanmış müşteri değerlendirmesi</div>' +
              '</div>' +
            '</div>' +
            '<div style="display: flex; flex-direction: column; gap: 1rem;">' + reviewsHTML + '</div>' +
          '</div>' +
        '</div>' +
        '<div style="margin-top: 3rem;">' +
          '<div class="products-section-header" style="margin-bottom: 1.5rem;">' +
            '<div class="section-title-wrap">' +
              '<span class="section-title-icon">✨</span>' +
              '<h2 class="section-title">Bu Hediyeyi İnceleyenler Bunlara da Baktı</h2>' +
            '</div>' +
          '</div>' +
          '<div id="pdpRelatedProductsGrid" class="products-grid">' + relatedList.map(createProductCardHTML).join("") + '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  // Ürün ID'sine bağlı tutarlı ve gerçekçi canlı izleyici salınımı (±1 kişi)
  let currentViewerCount = baseViewers;
  let stepDir = 1;
  pdpViewerInterval = setInterval(() => {
    const el = document.getElementById("pdpLiveViewers");
    if (!el) return;
    currentViewerCount += stepDir;
    if (currentViewerCount >= baseViewers + 2 || currentViewerCount <= Math.max(3, baseViewers - 1)) {
      stepDir *= -1;
    }
    el.innerHTML = 'Bu ürünü şu an <strong>' + currentViewerCount + ' kişi</strong> inceliyor.';
  }, 14000);
}

function selectPdpImage(btnEl) {
  const mainImg = document.getElementById("pdpMainImg");
  const nextSrc = btnEl?.getAttribute("data-img");
  if (mainImg && nextSrc) {
    mainImg.src = nextSrc;
  }
  document.querySelectorAll("#pdpThumbsRow .pdp-thumb-item").forEach(el => el.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
}

function changePdpQty(delta) {
  const qtyInput = document.getElementById("pdpQtyInput");
  if (!qtyInput) return;
  let val = parseInt(qtyInput.value, 10) || 1;
  val = Math.max(1, Math.min(99, val + delta));
  qtyInput.value = val;
}

function handlePdpAddToCart() {
  if (!currentPdpProduct) return;
  const qty = parseInt(document.getElementById("pdpQtyInput")?.value || "1", 10) || 1;
  addToCart(currentPdpProduct.id, qty);
  openCartDrawer();
}

function handlePdpBuyNow() {
  if (!currentPdpProduct) return;
  const qty = parseInt(document.getElementById("pdpQtyInput")?.value || "1", 10) || 1;
  addToCart(currentPdpProduct.id, qty);
  openCheckoutModal();
}

function handlePdpWishlist() {
  if (!currentPdpProduct) return;
  toggleWishlist(currentPdpProduct.id);
  const wishlistBtn = document.getElementById("pdpWishlistBtn");
  if (wishlistBtn) {
    const isW = wishlist.includes(currentPdpProduct.id);
    wishlistBtn.innerHTML = isW ? "❤️" : "🤍";
    wishlistBtn.classList.toggle("active", isW);
  }
}

function switchPdpTab(tabName) {
  const tabs = ["desc", "specs", "shipping", "reviews"];
  tabs.forEach(t => {
    const btn = document.getElementById("tabBtn" + t.charAt(0).toUpperCase() + t.slice(1));
    const content = document.getElementById("pdpTab" + t.charAt(0).toUpperCase() + t.slice(1));
    if (btn) btn.classList.toggle("active", t === tabName);
    if (content) content.classList.toggle("active", t === tabName);
  });
}

// --- 9. SLIDE-OVER SEPET ÇEKMECESİ & TAM SAYFA SEPET ---
function calculateCartTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  let discount = 0;

  if (activeCoupon && AVAILABLE_COUPONS[activeCoupon]) {
    const c = AVAILABLE_COUPONS[activeCoupon];
    if (!c.minSpend || subtotal >= c.minSpend) {
      if (c.type === "percent") {
        discount = (subtotal * c.value) / 100;
      } else if (c.type === "fixed") {
        discount = Math.min(subtotal, c.value);
      }
    } else {
      activeCoupon = null;
      safeLocalStorageSet("sarmal_coupon", null);
    }
  }

  const discountedSubtotal = Math.max(0, subtotal - discount);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const grandTotal = discountedSubtotal + shipping;
  return { subtotal, discount, shipping, grandTotal };
}

function openCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartDrawerOverlay");
  if (!drawer || !overlay) return;
  renderCartDrawer();
  drawer.classList.add("active");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartDrawerOverlay");
  if (drawer) drawer.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "";
}

function renderCartDrawer() {
  const titleEl = document.getElementById("drawerCartTitle");
  const itemsEl = document.getElementById("drawerCartItems");
  const shippingWrap = document.getElementById("drawerShippingBarWrap");
  const shippingText = document.getElementById("drawerFreeShippingText");
  const shippingFill = document.getElementById("drawerShippingFill");
  const giftSection = document.getElementById("drawerGiftSection");
  const couponWrap = document.getElementById("drawerCouponWrap");
  const couponApplied = document.getElementById("drawerCouponApplied");
  const footer = document.getElementById("drawerCartFooter");
  const subtotalEl = document.getElementById("drawerSubtotal");
  const discountRow = document.getElementById("drawerDiscountRow");
  const discountEl = document.getElementById("drawerDiscount");
  const shippingCostEl = document.getElementById("drawerShippingCost");
  const grandTotalEl = document.getElementById("drawerGrandTotal");

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const { subtotal, discount, shipping, grandTotal } = calculateCartTotals();

  if (titleEl) titleEl.textContent = "Sepetim (" + totalCount + " Ürün)";

  if (cart.length === 0) {
    if (shippingWrap) shippingWrap.style.display = "block";
    if (shippingText) {
      shippingText.innerHTML = 'Ücretsiz Kargo için <strong>' + formatPrice(FREE_SHIPPING_THRESHOLD) + '</strong> tutarında ürün ekleyin!';
    }
    if (shippingFill) shippingFill.style.width = "0%";
    if (giftSection) giftSection.style.display = "none";
    if (couponWrap) couponWrap.style.display = "none";
    if (footer) footer.style.display = "none";
    if (itemsEl) {
      itemsEl.innerHTML =
        '<div class="empty-cart-msg">' +
          '<div class="empty-cart-icon">🛒</div>' +
          '<h4 style="color: var(--primary-deep); font-weight: 800; margin-bottom: 0.4rem;">Sepetiniz Şu An Boş</h4>' +
          '<p style="font-size: 0.85rem; margin-bottom: 1.25rem;">Özel tasarım kar küreleri, batmayan gemiler ve hediyelikler sizi bekliyor.</p>' +
          '<button type="button" class="sidebar-apply-btn" style="max-width: 220px; margin: 0 auto;" onclick="closeCartDrawer(); navigateToCategory(\'kar-kureleri\')">Alışverişe Başla</button>' +
        '</div>';
    }
    return;
  }

  // Kargo İlerleme Çubuğu
  if (shippingWrap) shippingWrap.style.display = "block";
  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    if (shippingText) shippingText.innerHTML = "🎉 <strong>Tebrikler!</strong> 500 TL barajını aştınız, kargonuz <strong>ÜCRETSİZ</strong>!";
    if (shippingFill) shippingFill.style.width = "100%";
  } else {
    const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
    const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
    if (shippingText) shippingText.innerHTML = 'Ücretsiz Kargo için <strong>' + formatPrice(remaining) + '</strong> daha ekleyin!';
    if (shippingFill) shippingFill.style.width = pct + "%";
  }

  // Ürün Listesi
  if (itemsEl) {
    itemsEl.innerHTML = cart.map(item => (
      '<div class="cart-item">' +
        '<img class="cart-item-img" src="' + escapeHTML(item.product.image) + '" alt="' + escapeHTML(item.product.name) + '" onclick="closeCartDrawer(); navigateToProduct(' + item.product.id + ')" style="cursor:pointer;" />' +
        '<div class="cart-item-info">' +
          '<div class="cart-item-name" onclick="closeCartDrawer(); navigateToProduct(' + item.product.id + ')" style="cursor:pointer;">' + escapeHTML(item.product.name) + '</div>' +
          '<div class="cart-item-price">' + formatPrice(item.product.price * item.quantity) + '</div>' +
          '<div class="cart-item-controls">' +
            '<button type="button" class="qty-btn" onclick="changeQuantity(' + item.product.id + ', -1)" aria-label="Azalt">−</button>' +
            '<span class="qty-value">' + item.quantity + '</span>' +
            '<button type="button" class="qty-btn" onclick="changeQuantity(' + item.product.id + ', 1)" aria-label="Artır">+</button>' +
            '<button type="button" class="remove-item-btn" onclick="removeFromCart(' + item.product.id + ')" title="Ürünü Kaldır">Sil</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    )).join("");
  }

  // Hediye Paketi & Not Senkronizasyonu
  if (giftSection) giftSection.style.display = "block";
  syncGiftInputsUI();

  // Kupon Rozeti
  if (couponWrap) couponWrap.style.display = "block";
  if (couponApplied) {
    if (activeCoupon && AVAILABLE_COUPONS[activeCoupon]) {
      couponApplied.innerHTML =
        '<div class="coupon-applied-badge">' +
          '<span>✓ ' + escapeHTML(activeCoupon) + ' (' + escapeHTML(AVAILABLE_COUPONS[activeCoupon].desc) + ')</span>' +
          '<button type="button" style="color: #b91c1c; font-weight: 800; cursor: pointer; border: none; background: none;" onclick="removeCoupon()" aria-label="Kuponu Kaldır">✕</button>' +
        '</div>';
    } else {
      couponApplied.innerHTML = "";
    }
  }

  // Tutar Özeti
  if (footer) footer.style.display = "block";
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (discountRow && discountEl) {
    if (discount > 0) {
      discountRow.style.display = "flex";
      discountEl.textContent = "- " + formatPrice(discount);
    } else {
      discountRow.style.display = "none";
    }
  }
  if (shippingCostEl) {
    if (shipping === 0) {
      shippingCostEl.textContent = "ÜCRETSİZ";
      shippingCostEl.style.color = "var(--success)";
    } else {
      shippingCostEl.textContent = formatPrice(shipping);
      shippingCostEl.style.color = "var(--text-main)";
    }
  }
  if (grandTotalEl) grandTotalEl.textContent = formatPrice(grandTotal);
}

function mountCartPageView(appMain) {
  appMain.innerHTML =
    '<div id="cartPageView" class="page-view-section active">' +
      '<div class="container">' +
        '<nav class="breadcrumb-nav">' +
          '<a href="/" class="breadcrumb-link" onclick="event.preventDefault(); navigateToHome()">Ana Sayfa</a>' +
          '<span class="breadcrumb-sep">/</span>' +
          '<span class="breadcrumb-current">Alışveriş Sepeti</span>' +
        '</nav>' +
        '<div class="page-header-box">' +
          '<h1 id="cartPageCountTitle" class="page-main-title"><span>🛒</span> Alışveriş Sepetim</h1>' +
          '<p class="page-subtitle">Siparişinizi PayTR altyapısıyla 256-Bit SSL güvencesinde kredi kartı veya havale ile anında tamamlayın.</p>' +
        '</div>' +
        '<div class="free-shipping-bar-wrap" id="cartPageShippingBarWrap" style="margin-bottom: 2rem; border-radius: 10px;">' +
          '<div id="cartPageFreeShippingText" class="free-shipping-text"></div>' +
          '<div class="shipping-progress-bg"><div id="cartPageShippingFill" class="shipping-progress-fill"></div></div>' +
        '</div>' +
        '<div id="cartPageEmptyState" class="page-empty-state" style="display: none;">' +
          '<div class="page-empty-icon">🛒</div>' +
          '<h3 class="page-empty-title">Sepetinizde Henüz Ürün Bulunmuyor</h3>' +
          '<p class="page-empty-desc">Büyüleyici hediye koleksiyonumuzu ve fırsatları hemen keşfetmeye başlayın.</p>' +
          '<button type="button" class="slide-btn" style="display: inline-flex; margin: 0 auto;" onclick="navigateToHome()">Alışverişe Başla</button>' +
        '</div>' +
        '<div id="cartPageLayout" class="cart-page-layout">' +
          '<div class="cart-page-items-box">' +
            '<div class="cart-table-header">' +
              '<span>ÜRÜN BİLGİSİ</span><span>BİRİM FİYAT</span><span style="text-align: center;">ADET</span><span style="text-align: right;">TOPLAM</span><span></span>' +
            '</div>' +
            '<div id="cartPageItemsList"></div>' +
            '<div style="padding: 1rem 1.5rem; background: var(--bg-page); display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-light); flex-wrap: wrap; gap: 1rem;">' +
              '<button type="button" class="action-btn" style="border: 1px solid var(--border);" onclick="navigateToHome()">← Alışverişe Devam Et</button>' +
              '<button type="button" class="remove-item-btn" style="color: #b91c1c; font-size: 0.85rem; font-weight: 700; width: auto; height: auto; padding: 0.4rem 0.75rem;" onclick="clearCart()">🗑️ Sepeti Temizle</button>' +
            '</div>' +
          '</div>' +
          '<div class="cart-summary-box">' +
            '<h3 class="cart-summary-title">Sipariş Özeti</h3>' +
            '<div class="gift-options-box">' +
              '<div class="gift-options-header">' +
                '<span>🎁</span><span>Bu Sipariş Bir Hediye mi?</span><span class="gift-badge-free">ÜCRETSİZ</span>' +
              '</div>' +
              '<div class="gift-options-checkbox-group">' +
                '<label class="gift-checkbox-label">' +
                  '<input type="checkbox" id="giftWrappingCb" onchange="toggleGiftWrapping(this.checked)" />' +
                  '<span>Özel Hediye Paketi İstiyorum</span>' +
                '</label>' +
              '</div>' +
              '<div class="gift-note-wrapper" id="giftNoteWrapper">' +
                '<label for="giftNoteText" style="display:block; font-size:0.8rem; font-weight:700; color:#92400e; margin-bottom:0.35rem;">Hediye Kartı Notunuz:</label>' +
                '<textarea id="giftNoteText" class="gift-note-textarea" placeholder="Sevdiklerinize iletmek istediğiniz özel mesajı buraya yazın..." maxlength="250" oninput="updateGiftNoteCount(this.value)"></textarea>' +
                '<div class="gift-note-meta"><span>✉️ Kart faturadan ayrı özel zarfta iletilir.</span><span id="giftNoteCharCount">0 / 250</span></div>' +
              '</div>' +
            '</div>' +
            '<form id="cartPageCouponForm" class="coupon-form">' +
              '<input id="cartPageCouponInput" type="text" class="coupon-input" placeholder="Kupon (SARMAL10)" maxlength="20" />' +
              '<button type="submit" class="coupon-btn">Uygula</button>' +
            '</form>' +
            '<div id="cartPageCouponApplied"></div>' +
            '<div class="cart-subtotal-row"><span>Ara Toplam:</span><strong id="cartPageSubtotal">0,00 TL</strong></div>' +
            '<div id="cartPageDiscountRow" class="cart-discount-row" style="display: none;"><span>Kupon İndirimi:</span><strong id="cartPageDiscount" style="color: var(--success);">- 0,00 TL</strong></div>' +
            '<div class="cart-subtotal-row"><span>Kargo:</span><strong id="cartPageShippingCost" style="color: var(--success);">ÜCRETSİZ</strong></div>' +
            '<div class="cart-total-row" style="border-top: 1px solid var(--border); padding-top: 1rem; margin-top: 0.5rem;"><span>Ödenecek Tutar:</span><span id="cartPageGrandTotal" style="color: var(--primary); font-size: 1.5rem; font-weight: 800;">0,00 TL</span></div>' +
            '<button type="button" class="checkout-btn" onclick="openCheckoutModal()"><span>Siparişi Tamamla</span><span>→</span></button>' +
            '<div style="background: var(--primary-subtle); border: 1px solid var(--primary-border); border-radius: 8px; padding: 0.85rem; font-size: 0.8rem; line-height: 1.5; color: var(--primary-deep); text-align: center; margin-top: 0.75rem;">' +
              '🔒 <strong>PayTR 256-Bit SSL Güvenliği</strong><br>💳 <strong>Tüm Banka Kartlarına</strong> Taksit İmkanı' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  const form = document.getElementById("cartPageCouponForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("cartPageCouponInput");
      if (input) {
        applyCoupon(input.value);
        input.value = "";
      }
    });
  }
  renderCartPage();
}

function renderCartPage() {
  const itemsContainer = document.getElementById("cartPageItemsList");
  const emptyContainer = document.getElementById("cartPageEmptyState");
  const contentLayout = document.getElementById("cartPageLayout");
  const countTitle = document.getElementById("cartPageCountTitle");
  const shippingWrap = document.getElementById("cartPageShippingBarWrap");
  const freeShippingText = document.getElementById("cartPageFreeShippingText");
  const shippingProgressFill = document.getElementById("cartPageShippingFill");
  const subtotalEl = document.getElementById("cartPageSubtotal");
  const discountRow = document.getElementById("cartPageDiscountRow");
  const discountEl = document.getElementById("cartPageDiscount");
  const shippingCostEl = document.getElementById("cartPageShippingCost");
  const grandTotalEl = document.getElementById("cartPageGrandTotal");
  const couponBadge = document.getElementById("cartPageCouponApplied");

  if (!itemsContainer) return;

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const { subtotal, discount, shipping, grandTotal } = calculateCartTotals();

  if (countTitle) countTitle.textContent = "Alışveriş Sepetim (" + totalCount + " Ürün)";

  if (cart.length === 0) {
    if (contentLayout) contentLayout.style.display = "none";
    if (shippingWrap) shippingWrap.style.display = "none";
    if (emptyContainer) emptyContainer.style.display = "block";
    return;
  }

  if (shippingWrap) shippingWrap.style.display = "block";
  if (emptyContainer) emptyContainer.style.display = "none";
  if (contentLayout) contentLayout.style.display = "grid";

  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    if (freeShippingText) freeShippingText.innerHTML = "🎉 <strong>Tebrikler!</strong> Kargonuz ÜCRETSİZ!";
    if (shippingProgressFill) shippingProgressFill.style.width = "100%";
  } else {
    const diff = FREE_SHIPPING_THRESHOLD - subtotal;
    if (freeShippingText) freeShippingText.innerHTML = 'Ücretsiz Kargo için <strong>' + formatPrice(diff) + '</strong> daha ekleyin!';
    const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
    if (shippingProgressFill) shippingProgressFill.style.width = pct + "%";
  }

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (grandTotalEl) grandTotalEl.textContent = formatPrice(grandTotal);
  if (shippingCostEl) {
    shippingCostEl.textContent = shipping === 0 ? "ÜCRETSİZ" : formatPrice(shipping);
    shippingCostEl.style.color = shipping === 0 ? "var(--success)" : "var(--text-main)";
  }

  if (discountRow && discountEl) {
    if (discount > 0) {
      discountRow.style.display = "flex";
      discountEl.textContent = "- " + formatPrice(discount);
    } else {
      discountRow.style.display = "none";
    }
  }

  if (couponBadge) {
    if (activeCoupon && AVAILABLE_COUPONS[activeCoupon]) {
      couponBadge.innerHTML =
        '<div class="coupon-applied-badge">' +
          '<span>✓ ' + escapeHTML(activeCoupon) + ' uygulandı (' + escapeHTML(AVAILABLE_COUPONS[activeCoupon].desc) + ')</span>' +
          '<button type="button" style="color: #b91c1c; font-weight: 800; cursor: pointer; border: none; background: none;" onclick="removeCoupon()">✕</button>' +
        '</div>';
    } else {
      couponBadge.innerHTML = "";
    }
  }

  syncGiftInputsUI();

  itemsContainer.innerHTML = cart.map(item => (
    '<div class="cart-page-item-row">' +
      '<div class="cart-item-product-cell">' +
        '<img class="cart-page-img" src="' + escapeHTML(item.product.image) + '" alt="' + escapeHTML(item.product.name) + '" />' +
        '<div class="cart-page-prod-info">' +
          '<span class="cart-page-prod-brand">' + escapeHTML(item.product.brand) + '</span>' +
          '<a href="/urun/' + item.product.id + '" onclick="event.preventDefault(); navigateToProduct(' + item.product.id + ')" class="cart-page-prod-title">' + escapeHTML(item.product.name) + '</a>' +
          '<span class="cart-mobile-unit-price">' + formatPrice(item.product.price) + ' / adet</span>' +
        '</div>' +
      '</div>' +
      '<div class="cart-col-price" style="font-weight: 700; color: var(--text-muted);">' + formatPrice(item.product.price) + '</div>' +
      '<div class="cart-col-qty">' +
        '<div class="cart-item-controls" style="margin: 0;">' +
          '<button class="qty-btn" type="button" onclick="changeQuantity(' + item.product.id + ', -1)">−</button>' +
          '<span class="qty-value">' + item.quantity + '</span>' +
          '<button class="qty-btn" type="button" onclick="changeQuantity(' + item.product.id + ', 1)">+</button>' +
        '</div>' +
      '</div>' +
      '<div class="cart-col-total" style="font-weight: 800; color: var(--primary);">' + formatPrice(item.product.price * item.quantity) + '</div>' +
      '<div class="cart-col-actions">' +
        '<button type="button" class="remove-item-btn" onclick="removeFromCart(' + item.product.id + ')" title="Ürünü Sil">🗑️</button>' +
      '</div>' +
    '</div>'
  )).join("");
}

function syncGiftInputsUI() {
  const pairs = [
    { cb: "drawerGiftWrapCb", wrap: "drawerGiftNoteWrapper", text: "drawerGiftNoteText", count: "drawerGiftNoteCharCount" },
    { cb: "giftWrappingCb", wrap: "giftNoteWrapper", text: "giftNoteText", count: "giftNoteCharCount" }
  ];
  pairs.forEach(p => {
    const cb = document.getElementById(p.cb);
    const wrap = document.getElementById(p.wrap);
    const textarea = document.getElementById(p.text);
    const counter = document.getElementById(p.count);
    if (cb) cb.checked = !!giftOptions.wrapping;
    if (wrap) wrap.classList.toggle("active", !!giftOptions.wrapping);
    if (textarea && textarea.value !== (giftOptions.note || "")) {
      textarea.value = giftOptions.note || "";
    }
    if (counter) counter.textContent = (giftOptions.note || "").length + " / 250";
  });
}

function toggleGiftWrapping(checked) {
  giftOptions.wrapping = !!checked;
  if (!checked) giftOptions.note = "";
  safeLocalStorageSet("sarmal_gift_options", giftOptions);
  syncGiftInputsUI();
  if (checked) {
    const activeTa = document.getElementById("drawerGiftNoteText") || document.getElementById("giftNoteText");
    if (activeTa && document.getElementById("cartDrawer")?.classList.contains("active")) {
      document.getElementById("drawerGiftNoteText")?.focus();
    } else if (document.getElementById("giftNoteText")) {
      document.getElementById("giftNoteText")?.focus();
    }
  }
}

function updateGiftNoteCount(text) {
  giftOptions.note = String(text || "");
  safeLocalStorageSet("sarmal_gift_options", giftOptions);
  syncGiftInputsUI();
}

function saveCart() {
  safeLocalStorageSet("sarmal_cart", cart);
  updateCartUI();
  renderCartDrawer();
  if (currentRouteState.view === "cart") {
    renderCartPage();
  }
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const { grandTotal } = calculateCartTotals();

  const cartBadge = document.getElementById("cartBadge");
  const bottomNavCartBadge = document.getElementById("bottomNavCartBadge");
  const cartTotalText = document.getElementById("cartTotalText");

  if (cartBadge) {
    cartBadge.textContent = totalCount;
    cartBadge.style.display = totalCount > 0 ? "flex" : "none";
  }
  if (bottomNavCartBadge) {
    bottomNavCartBadge.textContent = totalCount;
    bottomNavCartBadge.style.display = totalCount > 0 ? "inline-flex" : "none";
  }
  if (cartTotalText) cartTotalText.textContent = formatPrice(grandTotal);
}

function addToCart(productId, quantity = 1, event = null) {
  if (event) event.stopPropagation();
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.product.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  saveCart();
  showToast('"' + product.name.substring(0, 32) + '..." sepete eklendi!');

  if (event && event.currentTarget) {
    const btn = event.currentTarget;
    const oldHTML = btn.innerHTML;
    btn.innerHTML = "✓ Eklendi";
    btn.classList.add("added");
    setTimeout(() => {
      btn.innerHTML = oldHTML;
      btn.classList.remove("added");
    }, 1100);
  }
}

function changeQuantity(productId, delta) {
  const itemIndex = cart.findIndex(item => item.product.id === productId);
  if (itemIndex > -1) {
    cart[itemIndex].quantity += delta;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
    saveCart();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.product.id !== productId);
  saveCart();
  showToast("Ürün sepetten kaldırıldı.");
}

function clearCart() {
  if (cart.length === 0) return;
  if (confirm("Sepetinizdeki tüm ürünleri silmek istediğinize emin misiniz?")) {
    cart = [];
    activeCoupon = null;
    safeLocalStorageSet("sarmal_coupon", null);
    saveCart();
    showToast("Sepet temizlendi.");
  }
}

function applyCoupon(code) {
  const cleanCode = (code || "").trim().toUpperCase();
  if (!cleanCode) {
    showToast("Lütfen bir kupon kodu girin (örn: SARMAL10).");
    return;
  }

  const coupon = AVAILABLE_COUPONS[cleanCode];
  if (!coupon) {
    showToast("Geçersiz kupon kodu! Geçerli kod: SARMAL10 (%10 İndirim)");
    return;
  }

  const { subtotal } = calculateCartTotals();
  if (coupon.minSpend && subtotal < coupon.minSpend) {
    showToast("Bu kupon için sepet tutarınız en az " + formatPrice(coupon.minSpend) + " olmalıdır.");
    return;
  }

  activeCoupon = cleanCode;
  safeLocalStorageSet("sarmal_coupon", activeCoupon);
  saveCart();
  showToast(cleanCode + " kuponu uygulandı! (" + coupon.desc + ") 🎉");
}

function removeCoupon() {
  activeCoupon = null;
  safeLocalStorageSet("sarmal_coupon", null);
  saveCart();
  showToast("Kupon kaldırıldı.");
}

// --- 10. FAVORİLER, ÜYELİK, PROFİL & SİPARİŞ TAKİP SAYFALARI ---
function mountWishlistPageView(appMain) {
  const wishlistedProducts = PRODUCTS_DATA.filter(p => wishlist.includes(p.id));
  appMain.innerHTML =
    '<div id="wishlistPageView" class="page-view-section active">' +
      '<div class="container">' +
        '<nav class="breadcrumb-nav">' +
          '<a href="/" class="breadcrumb-link" onclick="event.preventDefault(); navigateToHome()">Ana Sayfa</a>' +
          '<span class="breadcrumb-sep">/</span>' +
          '<span class="breadcrumb-current">Favorilerim</span>' +
        '</nav>' +
        '<div class="page-header-box">' +
          '<h1 class="page-main-title"><span>❤️</span> Favori Ürünlerim (' + wishlistedProducts.length + ' Ürün)</h1>' +
          '<p class="page-subtitle">Beğendiğiniz ve daha sonra satın almak istediğiniz tüm ürünler burada listelenir.</p>' +
        '</div>' +
        (wishlistedProducts.length === 0
          ? '<div class="page-empty-state">' +
              '<div class="page-empty-icon">🤍</div>' +
              '<h3 class="page-empty-title">Henüz Favori Ürününüz Yok</h3>' +
              '<p class="page-empty-desc">Ürünlerin üzerindeki kalp ikonuna tıklayarak beğendiğiniz ürünleri bu listeye ekleyebilirsiniz.</p>' +
              '<button type="button" class="slide-btn" style="display: inline-flex; margin: 0 auto;" onclick="navigateToHome()">Ürünleri Keşfet</button>' +
            '</div>'
          : '<div id="wishlistPageGrid" class="wishlist-page-grid">' + wishlistedProducts.map(createProductCardHTML).join("") + '</div>') +
      '</div>' +
    '</div>';
}

function toggleWishlist(productId, event) {
  if (event) event.stopPropagation();
  const index = wishlist.indexOf(productId);
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast("Ürün favorilerden çıkarıldı.");
  } else {
    wishlist.push(productId);
    showToast("Ürün favorilere eklendi! ❤️");
  }
  safeLocalStorageSet("sarmal_wishlist", wishlist);
  updateWishlistUI();

  if (currentRouteState.view === "home") renderProductGrids();
  else if (currentRouteState.view === "category") applyCategoryFiltersAndRender();
  else if (currentRouteState.view === "wishlist") mountWishlistPageView(document.getElementById("appMain"));
}

function updateWishlistUI() {
  const wishlistBadge = document.getElementById("wishlistBadge");
  const bottomNavWishlistBadge = document.getElementById("bottomNavWishlistBadge");
  if (wishlistBadge) {
    wishlistBadge.textContent = wishlist.length;
    wishlistBadge.style.display = wishlist.length > 0 ? "flex" : "none";
  }
  if (bottomNavWishlistBadge) {
    bottomNavWishlistBadge.textContent = wishlist.length;
    bottomNavWishlistBadge.style.display = wishlist.length > 0 ? "inline-flex" : "none";
  }
}

function mountAuthPageView(appMain, initialTab = "login") {
  appMain.innerHTML =
    '<div id="authPageView" class="page-view-section active">' +
      '<div class="container">' +
        '<nav class="breadcrumb-nav">' +
          '<a href="/" class="breadcrumb-link" onclick="event.preventDefault(); navigateToHome()">Ana Sayfa</a>' +
          '<span class="breadcrumb-sep">/</span>' +
          '<span class="breadcrumb-current">Üyelik & Giriş</span>' +
        '</nav>' +
        '<div class="auth-page-wrap">' +
          '<div class="auth-card-box">' +
            '<div class="auth-nav-tabs">' +
              '<button id="authTabLoginBtn" type="button" class="auth-nav-tab-btn ' + (initialTab !== 'register' ? 'active' : '') + '" onclick="switchAuthTab(\'login\')">Giriş Yap</button>' +
              '<button id="authTabRegisterBtn" type="button" class="auth-nav-tab-btn ' + (initialTab === 'register' ? 'active' : '') + '" onclick="switchAuthTab(\'register\')">Kayıt Ol</button>' +
            '</div>' +
            '<div id="authLoginContent" class="auth-form-content ' + (initialTab !== 'register' ? 'active' : '') + '">' +
              '<div style="text-align: center; margin-bottom: 1.5rem;">' +
                '<div style="font-size: 2.2rem; margin-bottom: 0.35rem;">👤</div>' +
                '<h2 style="font-size: 1.4rem; font-weight: 800; color: var(--primary-deep);">Sarmal Ticaret\'e Giriş Yap</h2>' +
                '<p style="font-size: 0.85rem; color: var(--text-muted);">Siparişlerinizi ve kargo durumunuzu kolayca takip edin.</p>' +
              '</div>' +
              '<form id="pageAuthLoginForm" style="display: flex; flex-direction: column; gap: 1.1rem;">' +
                '<div><label class="checkout-label">E-Posta Adresi</label><input id="pageAuthEmail" type="email" class="checkout-input" style="width:100%;" placeholder="ornek@email.com" required maxlength="80" /></div>' +
                '<div><label class="checkout-label">Şifre</label><input id="pageAuthPassword" type="password" class="checkout-input" style="width:100%;" placeholder="••••••••" required minlength="6" maxlength="40" /></div>' +
                '<button type="submit" class="checkout-btn" style="margin-top: 0.5rem;">Giriş Yap →</button>' +
                '<div style="text-align: center; font-size: 0.85rem; color: var(--text-muted);">Hesabınız yok mu? <a href="javascript:void(0)" onclick="switchAuthTab(\'register\')" style="color: var(--primary); font-weight: 700; text-decoration: underline;">Anında Kayıt Olun</a></div>' +
              '</form>' +
            '</div>' +
            '<div id="authRegisterContent" class="auth-form-content ' + (initialTab === 'register' ? 'active' : '') + '">' +
              '<div style="text-align: center; margin-bottom: 1.5rem;">' +
                '<div style="font-size: 2.2rem; margin-bottom: 0.35rem;">✨</div>' +
                '<h2 style="font-size: 1.4rem; font-weight: 800; color: var(--primary-deep);">Yeni Hesap Oluştur</h2>' +
                '<p style="font-size: 0.85rem; color: var(--text-muted);">Özel hediyelik fırsatlarından ve kuponlardan anında faydalanın.</p>' +
              '</div>' +
              '<form id="pageAuthRegisterForm" style="display: flex; flex-direction: column; gap: 1.1rem;">' +
                '<div><label class="checkout-label">Adınız ve Soyadınız *</label><input id="regName" type="text" class="checkout-input" style="width:100%;" placeholder="Adınız Soyadınız" required maxlength="60" /></div>' +
                '<div><label class="checkout-label">E-Posta Adresi *</label><input id="regEmail" type="email" class="checkout-input" style="width:100%;" placeholder="ornek@email.com" required maxlength="80" /></div>' +
                '<div><label class="checkout-label">Telefon Numarası (Opsiyonel)</label><input id="regPhone" type="tel" class="checkout-input" style="width:100%;" placeholder="05XX XXX XX XX" maxlength="15" /></div>' +
                '<div><label class="checkout-label">Şifre Belirleyin *</label><input id="regPassword" type="password" class="checkout-input" style="width:100%;" placeholder="En az 6 karakter" required minlength="6" maxlength="40" /></div>' +
                '<label class="sidebar-checkbox-label" style="font-size: 0.8rem; margin: 0;"><input type="checkbox" required checked /><span><a href="javascript:void(0)" onclick="openPolicyModal(\'kvkk-privacy\')" style="color: var(--primary); text-decoration: underline;">KVKK Aydınlatma Metni ve Gizlilik Politikası</a>\'nı kabul ediyorum.</span></label>' +
                '<button type="submit" class="checkout-btn" style="margin-top: 0.5rem;">Hesap Oluştur ✓</button>' +
                '<div style="text-align: center; font-size: 0.85rem; color: var(--text-muted);">Zaten hesabınız var mı? <a href="javascript:void(0)" onclick="switchAuthTab(\'login\')" style="color: var(--primary); font-weight: 700; text-decoration: underline;">Giriş Yapın</a></div>' +
              '</form>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  document.getElementById("pageAuthLoginForm")?.addEventListener("submit", handleLoginSubmit);
  document.getElementById("pageAuthRegisterForm")?.addEventListener("submit", handleRegisterSubmit);
}

function switchAuthTab(tab) {
  document.getElementById("authTabLoginBtn")?.classList.toggle("active", tab !== "register");
  document.getElementById("authTabRegisterBtn")?.classList.toggle("active", tab === "register");
  document.getElementById("authLoginContent")?.classList.toggle("active", tab !== "register");
  document.getElementById("authRegisterContent")?.classList.toggle("active", tab === "register");
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById("pageAuthEmail")?.value.trim();
  if (!email) return;
  currentUser = {
    name: email.split("@")[0] || "Üye",
    email,
    joinDate: new Date().toLocaleDateString("tr-TR")
  };
  safeLocalStorageSet("sarmal_user", currentUser);
  updateAuthUI();
  showToast("Hoş geldiniz, " + currentUser.name + "!");
  navigateToPage("hesabim");
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("regName")?.value.trim();
  const email = document.getElementById("regEmail")?.value.trim();
  const phone = document.getElementById("regPhone")?.value.trim();
  if (!name || !email) {
    showToast("Lütfen zorunlu alanları doldurun.");
    return;
  }
  currentUser = { name, email, phone, joinDate: new Date().toLocaleDateString("tr-TR") };
  safeLocalStorageSet("sarmal_user", currentUser);
  updateAuthUI();
  showToast("Hesabınız oluşturuldu! Hoş geldiniz, " + currentUser.name + "!");
  navigateToPage("hesabim");
}

function handleLogout() {
  currentUser = null;
  safeLocalStorageSet("sarmal_user", null);
  updateAuthUI();
  showToast("Oturum kapatıldı.");
  navigateToHome();
}

function updateAuthUI() {
  const authTitle = document.getElementById("headerAuthTitle");
  const bottomNavAuthLabel = document.getElementById("bottomNavAuthLabel");
  if (currentUser) {
    if (authTitle) authTitle.textContent = currentUser.name.substring(0, 12);
    if (bottomNavAuthLabel) bottomNavAuthLabel.textContent = "Hesabım";
  } else {
    if (authTitle) authTitle.textContent = "Giriş Yap";
    if (bottomNavAuthLabel) bottomNavAuthLabel.textContent = "Giriş Yap";
  }
}

function mountProfilePageView(appMain) {
  const ordersHTML = userOrders.length === 0
    ? '<div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">' +
        '<div style="font-size: 2.2rem; margin-bottom: 0.5rem;">📦</div>' +
        '<strong>Henüz Bir Siparişiniz Bulunmuyor</strong>' +
        '<p style="font-size: 0.85rem; margin-top: 0.35rem;">Sarmal Ticaret hediyelik koleksiyonumuzdan hemen ilk siparişinizi oluşturabilirsiniz.</p>' +
        '<button type="button" class="sidebar-apply-btn" style="max-width: 200px; margin: 1rem auto 0;" onclick="navigateToHome()">Alışverişe Başla</button>' +
      '</div>'
    : userOrders.map(order => (
        '<div style="background: var(--bg-page); border: 1px solid var(--border); border-radius: 10px; padding: 1.25rem; margin-bottom: 1rem;">' +
          '<div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 0.65rem; margin-bottom: 0.75rem;">' +
            '<div><strong style="color: var(--primary-deep); font-size: 0.95rem;">' + escapeHTML(order.orderNumber) + '</strong><span style="font-size: 0.78rem; color: var(--text-muted); display: block;">' + escapeHTML(order.date) + '</span></div>' +
            '<span style="background: #dcfce7; color: #166534; font-size: 0.75rem; font-weight: 800; padding: 3px 8px; border-radius: 4px;">● ' + escapeHTML(order.status) + '</span>' +
          '</div>' +
          '<div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.88rem;">' +
            '<div><span>Ödeme: <strong>' + escapeHTML(order.paymentMethod) + '</strong></span><span style="display: block; font-size: 0.78rem; color: var(--text-muted);">' + order.items.length + ' Ürün (' + escapeHTML(order.customer.city) + ')</span></div>' +
            '<div style="text-align: right;"><strong style="color: var(--primary); font-size: 1.1rem; display: block;">' + formatPrice(order.total) + '</strong>' +
            '<button type="button" style="color: var(--primary); font-weight: 700; font-size: 0.82rem; text-decoration: underline; background: none; border: none; cursor: pointer; padding: 0;" onclick="navigateToPage(\'siparis-takip\'); setTimeout(() => renderTrackingResult(\'' + escapeHTML(order.orderNumber) + '\', \'pageTrackingResult\'), 80);">Kargoyu Takip Et →</button></div>' +
          '</div>' +
        '</div>'
      )).join("");

  appMain.innerHTML =
    '<div id="profilePageView" class="page-view-section active">' +
      '<div class="container">' +
        '<nav class="breadcrumb-nav">' +
          '<a href="/" class="breadcrumb-link" onclick="event.preventDefault(); navigateToHome()">Ana Sayfa</a>' +
          '<span class="breadcrumb-sep">/</span>' +
          '<span class="breadcrumb-current">Hesabım & Siparişlerim</span>' +
        '</nav>' +
        '<div class="page-header-box">' +
          '<h1 class="page-main-title"><span>👤</span> Kullanıcı Paneli</h1>' +
          '<p class="page-subtitle">Hesap bilgilerinizi ve geçmiş siparişlerinizi yönetin.</p>' +
        '</div>' +
        '<div class="profile-page-layout">' +
          '<div class="profile-card-sidebar">' +
            '<div class="profile-avatar-circle">' + escapeHTML(currentUser.name.charAt(0).toUpperCase()) + '</div>' +
            '<h3 class="profile-user-name">' + escapeHTML(currentUser.name) + '</h3>' +
            '<p class="profile-user-email">' + escapeHTML(currentUser.email) + '</p>' +
            '<div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">' +
              '<button type="button" class="action-btn" style="width: 100%; border: 1px solid var(--border);" onclick="navigateToPage(\'favoriler\')">❤️ Favorilerim</button>' +
              '<button type="button" class="action-btn" style="width: 100%; border: 1px solid var(--border);" onclick="navigateToPage(\'siparis-takip\')">📦 Canlı Kargo Takibi</button>' +
              '<button type="button" class="remove-item-btn" style="width: 100%; border-radius: 8px; margin-top: 0.5rem; color: #b91c1c; font-weight: 700; padding: 0.5rem;" onclick="handleLogout()">🚪 Çıkış Yap</button>' +
            '</div>' +
          '</div>' +
          '<div class="profile-orders-box">' +
            '<h3 style="font-size: 1.25rem; font-weight: 800; color: var(--primary-deep); margin-bottom: 1.25rem; border-bottom: 1px solid var(--border); padding-bottom: 0.75rem;">📦 Geçmiş Siparişlerim</h3>' +
            '<div id="profileOrdersList">' + ordersHTML + '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
}

function mountTrackingPageView(appMain) {
  appMain.innerHTML =
    '<div id="trackingPageView" class="page-view-section active">' +
      '<div class="container" style="max-width: 680px;">' +
        '<nav class="breadcrumb-nav">' +
          '<a href="/" class="breadcrumb-link" onclick="event.preventDefault(); navigateToHome()">Ana Sayfa</a>' +
          '<span class="breadcrumb-sep">/</span>' +
          '<span class="breadcrumb-current">Sipariş & Kargo Takibi</span>' +
        '</nav>' +
        '<div class="page-header-box" style="text-align: center;">' +
          '<h1 class="page-main-title" style="justify-content: center;"><span>📦</span> Canlı Sipariş & Kargo Takibi</h1>' +
          '<p class="page-subtitle">Sipariş numaranızı girerek kargonuzun güncel durumunu anlık takip edin.</p>' +
        '</div>' +
        '<div style="background: #ffffff; border-radius: var(--radius-md); border: 1px solid var(--border); box-shadow: var(--shadow-card); padding: 2rem;">' +
          '<form id="pageTrackingForm" style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">' +
            '<input id="pageTrackingInput" type="text" placeholder="Örn: SRM-2026-981234" class="newsletter-input" style="border: 1px solid var(--border); font-size: 1rem;" required maxlength="30" />' +
            '<button type="submit" class="newsletter-btn" style="padding: 0 1.75rem;">Sorgula</button>' +
          '</form>' +
          '<div id="pageTrackingResult"></div>' +
        '</div>' +
      '</div>' +
    '</div>';

  const form = document.getElementById("pageTrackingForm");
  const input = document.getElementById("pageTrackingInput");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (input) renderTrackingResult(input.value, "pageTrackingResult");
    });
  }
  if (userOrders.length > 0 && input) {
    input.value = userOrders[0].orderNumber;
    renderTrackingResult(userOrders[0].orderNumber, "pageTrackingResult");
  }
}

function renderTrackingResult(code, targetId = "pageTrackingResult") {
  const resultDiv = document.getElementById(targetId);
  if (!resultDiv) return;
  const cleanCode = (code || "").trim().toUpperCase();
  const foundOrder = userOrders.find(o => o.orderNumber.toUpperCase() === cleanCode);

  if (foundOrder) {
    resultDiv.innerHTML =
      '<div style="background: var(--bg-page); padding: 1.5rem; border-radius: 12px; margin-top: 1.25rem; border: 1px solid var(--border); text-align: left;">' +
        '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">' +
          '<strong>Sipariş #' + escapeHTML(foundOrder.orderNumber) + '</strong>' +
          '<span style="color: var(--success); font-weight: 800; font-size: 0.85rem;">● ' + escapeHTML(foundOrder.status) + '</span>' +
        '</div>' +
        '<div class="tracking-stepper">' +
          '<div class="tracking-step done"><div class="tracking-step-dot">✓</div><span>Alındı</span></div>' +
          '<div class="tracking-step current"><div class="tracking-step-dot">📦</div><span>Hazırlanıyor</span></div>' +
          '<div class="tracking-step"><div class="tracking-step-dot">🚚</div><span>Kargoda</span></div>' +
          '<div class="tracking-step"><div class="tracking-step-dot">4</div><span>Teslimat</span></div>' +
        '</div>' +
        '<div style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.7; margin-top: 1rem; border-top: 1px dashed var(--border); padding-top: 1rem;">' +
          '<div>Alıcı: <strong>' + escapeHTML(foundOrder.customer.name) + '</strong> (' + escapeHTML(foundOrder.customer.phone) + ')</div>' +
          '<div>Ödeme Yöntemi: <strong>' + escapeHTML(foundOrder.paymentMethod) + '</strong></div>' +
          '<div>Toplam Tutar: <strong style="color: var(--primary);">' + formatPrice(foundOrder.total) + '</strong></div>' +
          '<div>Teslimat Adresi: <strong>' + escapeHTML(foundOrder.customer.address) + ', ' + escapeHTML(foundOrder.customer.district) + ' / ' + escapeHTML(foundOrder.customer.city) + '</strong></div>' +
          '<div>Kargo Firması: <strong>Yurtiçi Kargo (Tahmini Teslimat: 1-2 İş Günü)</strong></div>' +
        '</div>' +
      '</div>';
  } else {
    resultDiv.innerHTML =
      '<div style="background: var(--bg-page); padding: 1.5rem; border-radius: 12px; margin-top: 1.25rem; border: 1px solid var(--border); text-align: left;">' +
        '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">' +
          '<strong>Sipariş #' + escapeHTML(cleanCode) + '</strong>' +
          '<span style="color: var(--primary); font-weight: 800; font-size: 0.85rem;">● Yurtiçi Kargo Entegrasyonu</span>' +
        '</div>' +
        '<p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">' +
          'Bu tarayıcıda kayıtlı bu numaraya ait aktif sipariş bulunamadı. SMS ile iletilen kargo takip numaranız için <strong>0537 871 55 17</strong> WhatsApp destek hattımızdan anlık bilgi alabilirsiniz.' +
        '</p>' +
      '</div>';
  }
}

// --- 11. ÇOK ADIMLI CHECKOUT & PAYTR 3D SECURE ---
let checkoutFormData = {};
let paytr3dTimerInterval = null;

function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Sepetinizde ürün bulunmuyor!");
    return;
  }
  const modal = document.getElementById("checkoutModal");
  if (!modal) return;

  // Hediye notu varsa teslimat notuna önceden doldur
  const custNote = document.getElementById("custNote");
  if (custNote && !custNote.value && (giftOptions.wrapping || giftOptions.note)) {
    const parts = [];
    if (giftOptions.wrapping) parts.push("Özel Hediye Paketi");
    if (giftOptions.note) parts.push("Kart Notu: " + giftOptions.note);
    custNote.value = parts.join(" | ").slice(0, 250);
  }

  setCheckoutStep(1);
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function setCheckoutStep(step) {
  document.querySelectorAll(".checkout-step-item").forEach(item => {
    const s = Number(item.getAttribute("data-step"));
    item.classList.toggle("active", s === step);
    item.classList.toggle("completed", s < step);
  });

  const step1 = document.getElementById("checkoutStep1");
  const step2 = document.getElementById("checkoutStep2");
  const step3 = document.getElementById("checkoutStep3");
  if (step1) step1.style.display = step === 1 ? "block" : "none";
  if (step2) step2.style.display = step === 2 ? "block" : "none";
  if (step3) step3.style.display = step === 3 ? "block" : "none";

  const { grandTotal } = calculateCartTotals();
  const summaryTotalEl = document.getElementById("checkoutSummaryTotal");
  if (summaryTotalEl) summaryTotalEl.textContent = formatPrice(grandTotal);

  if (step === 2) {
    renderCheckoutInstallments();
  }
}

function renderCheckoutInstallments() {
  const container = document.getElementById("paytrInstallmentContainer");
  if (!container) return;

  const { grandTotal } = calculateCartTotals();
  const options = [
    { label: "Tek Çekim", monthly: grandTotal, total: grandTotal, note: "Peşin Fiyatına" },
    { label: "2 Taksit", monthly: grandTotal / 2, total: grandTotal, note: "Peşin Fiyatına" },
    { label: "3 Taksit", monthly: grandTotal / 3, total: grandTotal, note: "Peşin Fiyatına" },
    { label: "6 Taksit", monthly: (grandTotal * 1.045) / 6, total: grandTotal * 1.045, note: "+%4.5 Vade Farkı" },
    { label: "9 Taksit", monthly: (grandTotal * 1.085) / 9, total: grandTotal * 1.085, note: "+%8.5 Vade Farkı" },
    { label: "12 Taksit", monthly: (grandTotal * 1.125) / 12, total: grandTotal * 1.125, note: "+%12.5 Vade Farkı" }
  ];

  const currentVal = document.getElementById("creditCardInstallment")?.value || "Tek Çekim";

  let html =
    '<div style="background: #f8fafc; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; margin-top: 0.5rem;">' +
      '<div style="padding: 0.6rem 0.85rem; background: #f1f5f9; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; font-weight: 700; color: var(--primary-deep);">' +
        '<span>🔒 PayTR Altyapısı ile Taksit Tablosu</span>' +
        '<span style="color: var(--text-muted); font-size: 0.72rem;">Bonus, World, Axess, Maximum, Paraf, Troy</span>' +
      '</div>' +
      '<table class="installment-table" style="margin-top: 0; border: none; width: 100%;">' +
        '<thead><tr><th style="width: 40px; text-align: center;">Seç</th><th>Taksit</th><th style="text-align: right;">Aylık Tutar</th><th style="text-align: right;">Toplam Tutar</th></tr></thead><tbody>';

  options.forEach((opt, idx) => {
    const isChecked = currentVal === opt.label || (idx === 0 && currentVal === "Tek Çekim");
    html +=
      '<tr style="cursor: pointer;' + (isChecked ? ' background: #eff6ff;' : '') + '" onclick="selectPaytrInstallment(\'' + opt.label + '\')">' +
        '<td style="text-align: center;"><input type="radio" name="paytr_installment_radio" value="' + opt.label + '" ' + (isChecked ? 'checked' : '') + ' onchange="selectPaytrInstallment(\'' + opt.label + '\')" /></td>' +
        '<td><strong>' + opt.label + '</strong> <span style="font-size: 0.72rem; color: ' + (opt.note.includes("Peşin") ? '#16a34a' : 'var(--text-muted)') + '; font-weight: 600; margin-left: 4px;">(' + opt.note + ')</span></td>' +
        '<td style="text-align: right; font-weight: 700; color: var(--primary);">' + formatPrice(opt.monthly) + '</td>' +
        '<td style="text-align: right; font-weight: 800; color: var(--primary-deep);">' + formatPrice(opt.total) + '</td>' +
      '</tr>';
  });

  html += '</tbody></table></div>';
  container.innerHTML = html;
}

function selectPaytrInstallment(val) {
  const hiddenInput = document.getElementById("creditCardInstallment");
  if (hiddenInput) hiddenInput.value = val;
  document.querySelectorAll("input[name='paytr_installment_radio']").forEach(r => {
    const row = r.closest("tr");
    const matched = r.value === val;
    r.checked = matched;
    if (row) row.style.background = matched ? "#eff6ff" : "";
  });
}

function handleStep1Submit(e) {
  e.preventDefault();
  const name = document.getElementById("custName")?.value.trim();
  const phone = document.getElementById("custPhone")?.value.trim();
  const email = document.getElementById("custEmail")?.value.trim();
  const city = document.getElementById("custCity")?.value;
  const district = document.getElementById("custDistrict")?.value.trim();
  const address = document.getElementById("custAddress")?.value.trim();
  const note = document.getElementById("custNote")?.value.trim();

  if (!name || !phone || !city || !address) {
    showToast("Lütfen zorunlu teslimat alanlarını doldurun.");
    return;
  }

  checkoutFormData = { name, phone, email, city, district, address, note };
  setCheckoutStep(2);
}

function switchPaymentTab(tabName) {
  document.querySelectorAll(".payment-tab-btn").forEach(t => t.classList.toggle("active", t.getAttribute("data-tab") === tabName));
  document.querySelectorAll(".payment-tab-content").forEach(c => c.classList.toggle("active", c.getAttribute("data-tab") === tabName));
}

function validateLuhn(raw) {
  const digits = String(raw || "").replace(/[^0-9]/g, "");
  if (digits.length < 15 || digits.length > 19) return false;
  let sum = 0;
  let isEven = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}

function validateExpiry(raw) {
  if (!raw) return false;
  const parts = String(raw).trim().split("/");
  if (parts.length !== 2) return false;
  const month = parseInt(parts[0], 10);
  const yearStr = parts[1].trim();
  const year = parseInt(yearStr.length === 2 ? "20" + yearStr : yearStr, 10);
  if (isNaN(month) || isNaN(year) || month < 1 || month > 12) return false;
  const now = new Date();
  const curYear = now.getFullYear();
  const curMonth = now.getMonth() + 1;
  return !(year < curYear || (year === curYear && month < curMonth));
}

function handleFinalOrderSubmit(e) {
  e.preventDefault();
  const agreement = document.getElementById("checkoutAgreementCb");
  if (agreement && !agreement.checked) {
    showToast("Lütfen Mesafeli Satış Sözleşmesi onayını işaretleyin.");
    return;
  }

  const activeTab = document.querySelector(".payment-tab-btn.active")?.getAttribute("data-tab") || "creditcard";
  let paymentMethodName = "PayTR ile Kredi Kartı";
  let orderStatus = "Hazırlanıyor";

  if (activeTab === "creditcard") {
    const holder = document.getElementById("ccHolderName")?.value.trim() || "";
    const number = document.getElementById("ccNumber")?.value.trim() || "";
    const expiry = document.getElementById("ccExpiry")?.value.trim() || "";
    const cvc = document.getElementById("ccCvc")?.value.trim() || "";

    if (!holder || holder.length < 3) {
      showToast("Lütfen kart üzerindeki Ad ve Soyadı giriniz.");
      document.getElementById("ccHolderName")?.focus();
      return;
    }
    if (!validateLuhn(number)) {
      showToast("Geçersiz kredi kartı numarası! Lütfen 16 haneli kart numaranızı kontrol ediniz.");
      document.getElementById("ccNumber")?.focus();
      return;
    }
    if (!validateExpiry(expiry)) {
      showToast("Kartınızın son kullanma tarihi geçersiz veya süresi dolmuş (AA/YY).");
      document.getElementById("ccExpiry")?.focus();
      return;
    }
    if (!cvc || cvc.length < 3) {
      showToast("Lütfen 3 haneli güvenlik kodunu (CVV) giriniz.");
      document.getElementById("ccCvc")?.focus();
      return;
    }
    const installment = document.getElementById("creditCardInstallment")?.value || "Tek Çekim";
    paymentMethodName = "PayTR Kredi Kartı (" + installment + ") - 3D Secure Onaylı";
  } else {
    paymentMethodName = "Havale / EFT & Kapıda Nakit (Garanti BBVA)";
    orderStatus = "Ödeme Bekleniyor (Havale Bildirimi)";
  }

  const submitBtn = e.target.querySelector("button[type='submit']");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = "İşleniyor... ⏳";
  }

  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Siparişi Onayla ve Tamamla ✓";
    }
    if (activeTab === "creditcard") {
      showPaytr3dModal(checkoutFormData.phone, () => finalizeOrderCreation(paymentMethodName, orderStatus));
    } else {
      finalizeOrderCreation(paymentMethodName, orderStatus);
    }
  }, 500);
}

function showPaytr3dModal(phone, onConfirm) {
  const modal = document.getElementById("paytr3dModal");
  const phoneText = document.getElementById("paytr3dPhoneText");
  const timerText = document.getElementById("paytr3dTimer");
  const codeInput = document.getElementById("paytr3dCodeInput");
  if (!modal) {
    onConfirm();
    return;
  }

  const cleanPhone = String(phone || "05378715517").replace(/[^0-9]/g, "");
  const masked = cleanPhone.length >= 10
    ? cleanPhone.slice(0, 3) + "* *** ** " + cleanPhone.slice(-2)
    : "053* *** ** 17";
  if (phoneText) phoneText.textContent = masked;
  if (codeInput) codeInput.value = "849201";

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";

  let secondsLeft = 179;
  if (paytr3dTimerInterval) clearInterval(paytr3dTimerInterval);
  paytr3dTimerInterval = setInterval(() => {
    secondsLeft = Math.max(0, secondsLeft - 1);
    if (secondsLeft === 0) clearInterval(paytr3dTimerInterval);
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    if (timerText) timerText.textContent = String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  }, 1000);

  window._pendingPaytrConfirm = () => {
    clearInterval(paytr3dTimerInterval);
    modal.style.display = "none";
    document.body.style.overflow = "";
    onConfirm();
  };
}

function confirmPaytr3dOtp() {
  const code = (document.getElementById("paytr3dCodeInput")?.value || "").trim();
  if (code.length < 4) {
    showToast("Lütfen 6 haneli doğrulama kodunu giriniz.");
    return;
  }
  const btn = document.getElementById("paytr3dConfirmBtn");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "3D Secure Onaylandı! ✓";
  }
  setTimeout(() => {
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Ödemeyi Onayla ve Siparişi Tamamla ✓";
    }
    if (typeof window._pendingPaytrConfirm === "function") {
      window._pendingPaytrConfirm();
    }
  }, 600);
}

function finalizeOrderCreation(paymentMethodName, orderStatus) {
  const { subtotal, discount, shipping, grandTotal } = calculateCartTotals();
  const orderNumber = "SRM-2026-" + Math.floor(100000 + Math.random() * 900000);

  const orderRecord = {
    orderNumber,
    date: new Date().toLocaleDateString("tr-TR"),
    customer: checkoutFormData,
    paymentMethod: paymentMethodName,
    items: cart.map(i => ({ id: i.product.id, name: i.product.name, price: i.product.price, qty: i.quantity })),
    subtotal,
    discount,
    shipping,
    total: grandTotal,
    status: orderStatus,
    carrier: "Yurtiçi Kargo",
    gift: { ...giftOptions }
  };

  userOrders.unshift(orderRecord);
  safeLocalStorageSet("sarmal_orders", userOrders);

  const successOrderNum = document.getElementById("successOrderNumber");
  const successTotal = document.getElementById("successTotalAmount");
  const successPayment = document.getElementById("successPaymentMethod");
  const successAddress = document.getElementById("successDeliveryAddress");
  const successGiftWrap = document.getElementById("successGiftWrapPreview");
  const successGiftDetails = document.getElementById("successGiftWrapDetails");
  const successWa = document.getElementById("successWhatsappLink");

  if (successOrderNum) successOrderNum.textContent = orderNumber;
  if (successTotal) successTotal.textContent = formatPrice(grandTotal);
  if (successPayment) successPayment.textContent = paymentMethodName;
  if (successAddress) {
    successAddress.textContent = checkoutFormData.address + ", " + checkoutFormData.district + " / " + checkoutFormData.city;
  }

  if (successGiftWrap) {
    if (giftOptions.wrapping || giftOptions.note) {
      successGiftWrap.style.display = "block";
      let details = "";
      if (giftOptions.wrapping) details += "Özel Saten Kurdeleli Hediye Paketi seçildi. ";
      if (giftOptions.note) details += 'Hediye Kartı Notunuz: "' + giftOptions.note + '"';
      if (successGiftDetails) successGiftDetails.textContent = details;
    } else {
      successGiftWrap.style.display = "none";
    }
  }

  if (successWa) {
    const waMsg = encodeURIComponent(
      "Merhaba Sarmal Ticaret, " + orderNumber + " numaralı siparişim (" + formatPrice(grandTotal) + ") hakkında bilgi almak istiyorum."
    );
    successWa.href = "https://wa.me/905378715517?text=" + waMsg;
  }

  cart = [];
  activeCoupon = null;
  giftOptions = { wrapping: false, note: "" };
  safeLocalStorageSet("sarmal_coupon", null);
  safeLocalStorageSet("sarmal_gift_options", giftOptions);
  saveCart();

  showToast("Siparişiniz başarıyla oluşturuldu! 🎉");
  setCheckoutStep(3);
}

// --- 12. PAYTR & ETBİS YASAL MODALLARI ---
function openPolicyModal(rawType) {
  const modal = document.getElementById("policyModal");
  const titleEl = document.getElementById("policyModalTitle");
  const bodyEl = document.getElementById("policyModalBody");
  if (!modal || !titleEl || !bodyEl) return;

  const type = (rawType === "kvkk" || rawType === "privacy") ? "kvkk-privacy" : rawType;

  document.querySelectorAll("#policyModalTabs .policy-tab-pill").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-policy") === type);
  });

  if (type === "distance-contract") {
    titleEl.textContent = "Mesafeli Satış Sözleşmesi";
    bodyEl.innerHTML =
      '<h4>MADDE 1 – TARAFLAR</h4>' +
      '<p><strong>SATICI BİLGİLERİ:</strong><br>' +
      '<strong>Unvan:</strong> Sarmal Ticaret ve Hediyelik Eşya Hizmetleri<br>' +
      '<strong>Adres:</strong> İstanbul / Türkiye<br>' +
      '<strong>Telefon & WhatsApp Destek:</strong> 0537 871 55 17<br>' +
      '<strong>E-Posta:</strong> destek@sarmalticaret.com<br>' +
      '<strong>Web Sitesi:</strong> https://www.sarmalticaret.com</p>' +
      '<p><strong>ALICI (TÜKETİCİ) BİLGİLERİ:</strong><br>' +
      'www.sarmalticaret.com üzerinden sipariş oluştururken adı, soyadı, teslimat adresi, telefon numarası ve e-posta adresini beyan eden gerçek veya tüzel kişidir.</p>' +
      '<h4>MADDE 2 – SÖZLEŞMENİN KONUSU</h4>' +
      '<p>İşbu sözleşme, ALICI\'nın SATICI\'ya ait www.sarmalticaret.com internet sitesinden elektronik ortamda siparişini yaptığı aşağıda nitelikleri ve satış fiyatı belirtilen hediyelik eşya ve dekoratif ürünlerin satışı ve teslimi ile ilgili olarak <strong>6502 sayılı Tüketicinin Korunması Hakkında Kanun</strong> ve <strong>Mesafeli Sözleşmeler Yönetmeliği</strong> hükümleri gereğince tarafların hak ve yükümlülüklerini düzenler.</p>' +
      '<h4>MADDE 3 – SÖZLEŞME KONUSU ÜRÜN, FİYAT VE ÖDEME</h4>' +
      '<p>Ürünlerin cinsi, türü, miktarı, marka/modeli, tüm vergiler (KDV) dahil satış bedeli, kupon indirimi ve kargo ücreti sipariş özeti ekranında ve sipariş onay bildiriminde yer almaktadır. Ödemeler <strong>PayTR Ödeme ve Elektronik Para Kuruluşu A.Ş.</strong> 256-Bit SSL korumalı 3D Secure altyapısıyla kredi/banka kartı (tek çekim veya taksitli) ya da Havale/EFT yöntemleriyle gerçekleştirilir.</p>' +
      '<h4>MADDE 4 – TESLİMAT VE KARGO ŞARTLARI</h4>' +
      '<p>Siparişler yasal 30 günlük süreyi aşmamak kaydıyla, hafta içi saat 16:00\'a kadar verilen siparişlerde aynı gün, sonraki siparişlerde takip eden ilk iş günü anlaşmalı kargo firmamız <strong>Yurtiçi Kargo</strong>\'ya teslim edilir. 500 TL ve üzeri siparişlerde kargo ücreti SATICI tarafından karşılanır; 500 TL altındaki siparişlerde sabit 49,90 TL kargo bedeli uygulanır.</p>' +
      '<h4>MADDE 5 – CAYMA HAKKI (14 GÜN KOŞULSUZ İADE)</h4>' +
      '<p>ALICI, ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa tesliminden itibaren <strong>14 (on dört) gün</strong> içerisinde hiçbir hukuki ve cezai sorumluluk üstlenmeksizin ve hiçbir gerekçe göstermeksizin malı reddederek sözleşmeden cayma hakkına sahiptir. İade gönderileri Yurtiçi Kargo anlaşma kodumuz (<strong>540912</strong>) ile ücretsiz yapılır.</p>' +
      '<h4>MADDE 6 – YETKİLİ MERCİLER</h4>' +
      '<p>İşbu sözleşmeden doğabilecek uyuşmazlıklarda, T.C. Ticaret Bakanlığınca ilan edilen parasal sınırlar dahilinde ALICI\'nın mal veya hizmeti satın aldığı veya ikametgahının bulunduğu yerdeki İl/İlçe Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir.</p>';
  } else if (type === "returns") {
    titleEl.textContent = "İptal ve İade Koşulları (14 Gün Koşulsuz İade)";
    bodyEl.innerHTML =
      '<h4>1. 14 Gün Koşulsuz Cayma ve İade Hakkı</h4>' +
      '<p>6502 sayılı Tüketicinin Korunması Hakkında Kanun uyarınca, sitemizden satın aldığınız tüm ürünleri teslim aldığınız tarihten itibaren <strong>14 (on dört) gün</strong> içinde hiçbir gerekçe göstermeden ve cezai şart ödemeden iade edebilir veya değişim talep edebilirsiniz.</p>' +
      '<h4>2. Yurtiçi Kargo Anlaşması ile Ücretsiz İade Gönderimi</h4>' +
      '<p>İade ve değişim kargolarınız için herhangi bir kargo ücreti ödemezsiniz. Tüm Türkiye\'deki <strong>Yurtiçi Kargo</strong> şubelerine giderek anlaşma kodumuz olan <strong>540912</strong> numarasını ve <strong>Sarmal Ticaret</strong> alıcı adını iletmeniz yeterlidir. Kargonuz tarafımıza <strong>karşı ödemeli (ücretsiz)</strong> olarak ulaşır.</p>' +
      '<h4>3. İade Kabul Koşulları</h4>' +
      '<ul>' +
        '<li>İade edilecek ürünün kullanılmamış, tekrar satılabilir özelliğini kaybetmemiş, orijinal kutusu, faturası ve tüm aksesuarlarıyla eksiksiz gönderilmesi gerekir.</li>' +
        '<li>Kar küresi, 3D kristal cam küre, batmayan gemi ve gece lambası gibi hassas hediyeliklerin kargoda zarar görmemesi için teslim alındığı koruyucu strafor/patpat ambalajıyla paketlenmesi önemlidir.</li>' +
      '</ul>' +
      '<h4>4. Sipariş İptali & Ücret İadesi Süreci</h4>' +
      '<ul>' +
        '<li><strong>Kargoya Verilmeden Önce İptal:</strong> Siparişiniz kargoya teslim edilmeden önce 0537 871 55 17 WhatsApp hattımız veya destek@sarmalticaret.com üzerinden anında iptal edilebilir.</li>' +
        '<li><strong>Kredi Kartı İadeleri (PayTR):</strong> İade onayının ardından tutar aynı iş günü PayTR sisteminden bankanıza aktarılır. Bankanızın işlem süresine bağlı olarak ortalama 1-3 iş günü içerisinde kartınıza yansır.</li>' +
        '<li><strong>Havale / EFT İadeleri:</strong> İade onayından sonra en geç 24 saat içinde bildireceğiniz IBAN hesabına eksiksiz olarak iade edilir.</li>' +
      '</ul>' +
      '<h4>5. Kargoda Hasarlı / Kırık Teslimat</h4>' +
      '<p>Paketinizde dıştan fark edilen ezilme, ıslanma veya kırık şüphesi varsa teslimat anında kargo görevlisine <em>"Hasar Tespit Tutanağı"</em> düzenletip <strong>0537 871 55 17</strong> WhatsApp hattımıza görsel iletmeniz durumunda ücretsiz olarak yenisi aynı gün gönderilir.</p>';
  } else if (type === "kvkk-privacy") {
    titleEl.textContent = "KVKK Aydınlatma Metni ve Gizlilik Politikası";
    bodyEl.innerHTML =
      '<h4>1. Veri Sorumlusunun Kimliği (6698 Sayılı KVKK)</h4>' +
      '<p>6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca kişisel verileriniz, veri sorumlusu sıfatıyla <strong>Sarmal Ticaret ve Hediyelik Eşya Hizmetleri</strong> tarafından hukuka ve dürüstlük kurallarına uygun olarak işlenmektedir.</p>' +
      '<h4>2. İşlenen Kişisel Veriler ve İşleme Amaçları</h4>' +
      '<ul>' +
        '<li><strong>Kimlik & İletişim Verileri:</strong> Ad, soyad, teslimat/fatura adresi, telefon numarası, e-posta adresi.</li>' +
        '<li><strong>Sipariş & İşlem Verileri:</strong> Satın alınan ürünler, hediye kartı notları, fatura bilgileri ve talep/iade kayıtları.</li>' +
        '<li><strong>Amaçlar:</strong> Mesafeli satış sözleşmesinin kurulması ve ifası, ürünlerin hazırlanıp Yurtiçi Kargo ile teslim edilmesi, yasal faturalandırma, satış sonrası destek ve iade süreçlerinin yürütülmesi.</li>' +
      '</ul>' +
      '<h4>3. PayTR Ödeme Güvenliği ve 256-Bit SSL Gizlilik Politikası</h4>' +
      '<p>www.sarmalticaret.com üzerinden gerçekleştirdiğiniz kredi/banka kartı ödemeleri, Türkiye Cumhuriyet Merkez Bankası (TCMB) lisanslı ve PCI-DSS Seviye 1 sertifikalı <strong>PayTR Ödeme ve Elektronik Para Kuruluşu A.Ş.</strong> altyapısı üzerinden <strong>256-Bit SSL</strong> şifreleme ve <strong>3D Secure</strong> korumasıyla işlenir. Kart numaranız, son kullanma tarihiniz ve CVV kodunuz Sarmal Ticaret sunucularında asla kaydedilmez veya görüntülenmez.</p>' +
      '<h4>4. Verilerin Aktarılması & Çerezler (Cookies)</h4>' +
      '<p>Kişisel verileriniz yalnızca sipariş teslimatı için yetkili kargo kuruluşu (Yurtiçi Kargo), ödeme provizyonu için PayTR ve yasal zorunluluk halinde yetkili kamu kurumları ile paylaşılır; hiçbir koşulda üçüncü kişilere pazarlama amacıyla satılmaz. Sitemizde sepet ve oturum deneyimini sürdürmek amacıyla zorunlu işlevsel çerezler kullanılmaktadır.</p>' +
      '<h4>5. KVKK Madde 11 Kapsamındaki Haklarınız</h4>' +
      '<p>Verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini veya silinmesini isteme haklarınızı kullanmak için <strong>destek@sarmalticaret.com</strong> adresine veya <strong>0537 871 55 17</strong> numaralı hattımıza başvurabilirsiniz.</p>';
  } else if (type === "about-contact") {
    titleEl.textContent = "Hakkımızda & Kurumsal İletişim";
    bodyEl.innerHTML =
      '<h4>Sarmal Ticaret Hakkında</h4>' +
      '<p><strong>Sarmal Ticaret (sarmalticaret.com)</strong>, sevdiklerinize anlamlı, özgün ve kalıcı mutluluklar sunmak amacıyla kurulmuş Türkiye merkezli bir hediyelik eşya ve dekoratif tasarım e-ticaret mağazasıdır. Koleksiyonumuzdaki ışıklı kar küreleri, 3D kristal cam küreler, batmayan gemi akvaryumları, gerçek istiridye inci kolyeler ve dekoratif gece lambaları titiz kalite kontrol süreçlerinden geçirilerek, kırılmaya karşı güçlendirilmiş koruyucu ambalajlarla kapınıza ulaştırılır.</p>' +
      '<p>Müşteri memnuniyetini merkezine alan hizmet anlayışımızla; hafta içi saat 16:00\'a kadar aynı gün kargo, 500 TL üzeri ücretsiz teslimat, ücretsiz özel hediye paketi & kart notu, PayTR 256-Bit SSL güvenli ödeme ve 14 gün koşulsuz iade garantisi sunuyoruz.</p>' +
      '<h4>Kurumsal İletişim Bilgileri</h4>' +
      '<table class="corporate-info-table"><tbody>' +
        '<tr><th>Firma / Mağaza Adı</th><td>Sarmal Ticaret ve Hediyelik Eşya Hizmetleri</td></tr>' +
        '<tr><th>Konum</th><td>İstanbul / Türkiye</td></tr>' +
        '<tr><th>Web Sitesi</th><td><a href="https://www.sarmalticaret.com" style="color: var(--primary); font-weight: 700;">www.sarmalticaret.com</a></td></tr>' +
        '<tr><th>Telefon & Müşteri Hizmetleri</th><td><a href="tel:05378715517" style="color: var(--primary); font-weight: 700;">0537 871 55 17</a></td></tr>' +
        '<tr><th>WhatsApp Canlı Destek</th><td><a href="https://wa.me/905378715517?text=Merhaba%2C%20Sarmal%20Ticaret%20%C3%BCzerinden%20bir%20%C3%BCr%C3%BCn%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" style="color: #15803d; font-weight: 700;">0537 871 55 17 (Hemen Mesaj Gönder)</a></td></tr>' +
        '<tr><th>E-Posta Adresi</th><td><a href="mailto:destek@sarmalticaret.com" style="color: var(--primary); font-weight: 700;">destek@sarmalticaret.com</a></td></tr>' +
        '<tr><th>Anlaşmalı Kargo & İade Kodu</th><td>Yurtiçi Kargo • İade Anlaşma Kodu: <strong>540912</strong></td></tr>' +
        '<tr><th>Çalışma Saatleri</th><td>Pazartesi – Cumartesi: 09:00 – 19:00</td></tr>' +
      '</tbody></table>';
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// --- 13. CANLI ARAMA (LIVE SEARCH - ÜRÜN & KATEGORİ ANLIK SONUÇ) ---
function setupLiveSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchDropdown = document.getElementById("searchResultsDropdown");
  const searchCategorySelect = document.getElementById("searchCategorySelect");
  const searchClearBtn = document.getElementById("searchClearBtn");
  const searchForm = document.getElementById("headerSearchForm");

  if (!searchInput || !searchDropdown) return;

  function performLiveSearch() {
    const rawVal = searchInput.value.trim();
    const normQuery = normalizeTr(rawVal);
    const selectedCat = searchCategorySelect ? searchCategorySelect.value : "all";

    if (searchClearBtn) {
      searchClearBtn.style.display = rawVal.length > 0 ? "flex" : "none";
    }

    if (normQuery.length < 1) {
      searchDropdown.classList.remove("active");
      searchDropdown.innerHTML = "";
      return;
    }

    // Eşleşen kategoriler
    const matchedCats = CATEGORIES_DATA.filter(c => {
      if (selectedCat !== "all" && c.slug !== selectedCat) return false;
      return normalizeTr(c.name).includes(normQuery) || normalizeTr(c.shortName).includes(normQuery) || normalizeTr(c.description).includes(normQuery);
    });

    // Eşleşen ürünler (ad, kategori, marka)
    const matchedProducts = PRODUCTS_DATA.filter(p => {
      const matchCat = selectedCat === "all" || p.categorySlug === selectedCat;
      const matchText =
        normalizeTr(p.name).includes(normQuery) ||
        normalizeTr(p.category).includes(normQuery) ||
        normalizeTr(p.brand).includes(normQuery);
      return matchCat && matchText;
    });

    if (matchedProducts.length === 0 && matchedCats.length === 0) {
      searchDropdown.innerHTML =
        '<div style="padding: 1.25rem; text-align: center; color: var(--text-muted); font-size: 0.88rem;">' +
          '"<strong>' + escapeHTML(rawVal) + '</strong>" ile eşleşen ürün veya kategori bulunamadı.' +
        '</div>';
      searchDropdown.classList.add("active");
      return;
    }

    const catStripHTML = matchedCats.length > 0
      ? '<div class="search-categories-strip">' +
          matchedCats.map(c => (
            '<button type="button" class="search-category-pill" onclick="navigateToCategory(\'' + c.slug + '\'); closeSearch();">' +
              c.icon + ' ' + escapeHTML(c.shortName) + ' Reyonuna Git →' +
            '</button>'
          )).join("") +
        '</div>'
      : "";

    const topProducts = matchedProducts.slice(0, 6);
    searchDropdown.innerHTML =
      '<div class="search-dropdown-header">' +
        '<span>Arama Sonuçları (' + matchedProducts.length + ' ürün)</span>' +
        '<span>Sarmal Ticaret</span>' +
      '</div>' +
      catStripHTML +
      topProducts.map(p => (
        '<div class="search-result-item" role="option" onclick="navigateToProduct(' + p.id + '); closeSearch();">' +
          '<img class="search-result-img" src="' + escapeHTML(p.image) + '" alt="' + escapeHTML(p.name) + '" />' +
          '<div class="search-result-info">' +
            '<div class="search-result-category">' + escapeHTML(p.category) + '</div>' +
            '<div class="search-result-title">' + escapeHTML(p.name) + '</div>' +
            '<div class="search-result-prices">' +
              '<span class="search-result-price">' + formatPrice(p.price) + '</span>' +
              '<span class="search-result-old-price">' + formatPrice(p.oldPrice) + '</span>' +
            '</div>' +
          '</div>' +
        '</div>'
      )).join("");

    searchDropdown.classList.add("active");
  }

  searchInput.addEventListener("input", performLiveSearch);
  searchInput.addEventListener("focus", () => {
    if (searchInput.value.trim().length >= 1) performLiveSearch();
  });
  if (searchCategorySelect) {
    searchCategorySelect.addEventListener("change", () => {
      if (searchInput.value.trim().length >= 1) performLiveSearch();
    });
  }
  if (searchClearBtn) {
    searchClearBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchClearBtn.style.display = "none";
      closeSearch();
      searchInput.focus();
    });
  }
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const firstResult = searchDropdown.querySelector(".search-result-item");
      const firstCat = searchDropdown.querySelector(".search-category-pill");
      if (firstResult) firstResult.click();
      else if (firstCat) firstCat.click();
      else performLiveSearch();
    });
  }

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".header-search-area")) closeSearch();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeSearch();
      closeCartDrawer();
      toggleMobileMenu(false);
      closeAllModals();
    }
  });
}

function closeSearch() {
  const searchDropdown = document.getElementById("searchResultsDropdown");
  if (searchDropdown) searchDropdown.classList.remove("active");
}

// --- 14. HERO SLIDER ---
function setupHeroSlider() {
  const track = document.getElementById("sliderTrack");
  const slides = document.querySelectorAll(".slide-item");
  const dotsContainer = document.getElementById("sliderDots");
  const prevBtn = document.getElementById("sliderPrev");
  const nextBtn = document.getElementById("sliderNext");

  if (!track || slides.length === 0 || !dotsContainer) return;

  currentSlide = 0;
  dotsContainer.innerHTML = "";
  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "slider-dot " + (i === 0 ? "active" : "");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function updateSlider() {
    track.style.transform = "translateX(-" + currentSlide * 100 + "%)";
    dotsContainer.querySelectorAll(".slider-dot").forEach((d, i) => d.classList.toggle("active", i === currentSlide));
  }

  function goToSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    updateSlider();
    resetAutoSlide();
  }

  function startAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5500);
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  if (nextBtn) nextBtn.addEventListener("click", () => goToSlide(currentSlide + 1));
  if (prevBtn) prevBtn.addEventListener("click", () => goToSlide(currentSlide - 1));

  const container = document.querySelector(".hero-slider-container");
  if (container) {
    container.addEventListener("mouseenter", () => clearInterval(slideInterval));
    container.addEventListener("mouseleave", () => startAutoSlide());
  }

  updateSlider();
  startAutoSlide();
}

// --- 15. SENKRONİZE GERİ SAYIM SAYACI (ÜST BAR + GÜNÜN FIRSATLARI) ---
function setupCountdownTimer() {
  const cdHours = document.getElementById("cdHours");
  const cdMinutes = document.getElementById("cdMinutes");
  const cdSeconds = document.getElementById("cdSeconds");
  const timerHours = document.getElementById("timerHours");
  const timerMinutes = document.getElementById("timerMinutes");
  const timerSeconds = document.getElementById("timerSeconds");
  const sameDayLabel = document.getElementById("sameDayCountdownLabel");

  function updateTimers() {
    const now = new Date();
    const target = new Date(now);
    target.setHours(16, 0, 0, 0);

    let isNextDay = false;
    if (now >= target) {
      target.setDate(target.getDate() + 1);
      isNextDay = true;
    }

    const diff = Math.max(0, target.getTime() - now.getTime());
    const h = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
    const m = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
    const s = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

    if (cdHours) cdHours.textContent = h;
    if (cdMinutes) cdMinutes.textContent = m;
    if (cdSeconds) cdSeconds.textContent = s;

    // Günün Fırsatları bandındaki sayaçla birebir senkronize et
    if (timerHours) timerHours.textContent = h;
    if (timerMinutes) timerMinutes.textContent = m;
    if (timerSeconds) timerSeconds.textContent = s;

    if (sameDayLabel) {
      sameDayLabel.innerHTML = isNextDay
        ? "⚡ <strong>HIZLI KARGO:</strong> Yarın saat 16:00'a kadar verilen siparişler yarın Yurtiçi Kargo'da!"
        : "⚡ <strong>AYNI GÜN KARGO:</strong> Saat 16:00'a kadar verilen siparişler bugün Yurtiçi Kargo'da!";
    }
  }

  updateTimers();
  setInterval(updateTimers, 1000);
}

// --- 16. CANLI SATIŞ BİLDİRİMİ (FOMO) ---
const FOMO_SALES = [
  { id: 1, buyer: "Ayşe K.", city: "İzmir", time: "2 dakika önce" },
  { id: 2, buyer: "Murat B.", city: "Ankara", time: "5 dakika önce" },
  { id: 16, buyer: "Zeynep T.", city: "İstanbul", time: "7 dakika önce" },
  { id: 5, buyer: "Elif S.", city: "Bursa", time: "11 dakika önce" },
  { id: 29, buyer: "Emre D.", city: "Antalya", time: "14 dakika önce" }
];
let fomoIndex = 0;
let fomoTimeout = null;

function initLiveSalesFomo() {
  const toast = document.getElementById("liveSalesToast");
  if (!toast) return;

  function triggerNext() {
    const entry = FOMO_SALES[fomoIndex % FOMO_SALES.length];
    const prod = PRODUCTS_DATA.find(p => p.id === entry.id) || PRODUCTS_DATA[0];
    fomoIndex++;

    const img = document.getElementById("liveSalesImg");
    const buyer = document.getElementById("liveSalesBuyerName");
    const title = document.getElementById("liveSalesProductTitle");
    const time = document.getElementById("liveSalesTimeText");

    if (img) img.src = prod.image;
    if (buyer) buyer.textContent = entry.buyer + " (" + entry.city + ")";
    if (title) title.textContent = prod.name;
    if (time) time.textContent = "Az önce hediye siparişi verdi • " + entry.time;

    toast.onclick = (e) => {
      if (!e.target.closest(".live-sales-close")) navigateToProduct(prod.id);
    };
    toast.style.cursor = "pointer";
    toast.classList.add("show");

    setTimeout(() => toast.classList.remove("show"), 5500);
    fomoTimeout = setTimeout(triggerNext, 22000 + Math.random() * 8000);
  }

  fomoTimeout = setTimeout(triggerNext, 6000);
}

function closeLiveSalesToast() {
  if (fomoTimeout) clearTimeout(fomoTimeout);
  document.getElementById("liveSalesToast")?.classList.remove("show");
}

// --- 17. MODAL, MOBİL MENÜ, NEWSLETTER & TOAST ---
function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
  const paytr3d = document.getElementById("paytr3dModal");
  if (paytr3d) paytr3d.style.display = "none";
  document.body.style.overflow = "";
}

function toggleMobileMenu(open) {
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("mobileDrawerOverlay");
  if (!drawer || !overlay) return;
  drawer.classList.toggle("active", !!open);
  overlay.classList.toggle("active", !!open);
  document.body.style.overflow = open ? "hidden" : "";
}

let toastTimeout;
function showToast(message) {
  const toast = document.getElementById("toastNotice");
  const msgText = document.getElementById("toastMessage");
  if (!toast || !msgText) return;
  msgText.textContent = message;
  toast.classList.add("show", "success");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2800);
}

function bindNewsletterForm() {
  const newsletterForm = document.getElementById("newsletterForm");
  if (!newsletterForm) return;
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("newsletterEmail");
    if (input && input.value) {
      showToast("Tebrikler! E-bültene başarıyla kaydoldunuz. SARMAL10 kuponu aktif!");
      input.value = "";
    }
  });
}

// --- 18. GLOBAL WINDOW İHRACI ---
window.navigateToHome = navigateToHome;
window.navigateToCategory = navigateToCategory;
window.navigateToProduct = navigateToProduct;
window.navigateToPage = navigateToPage;
window.openCartDrawer = openCartDrawer;
window.closeCartDrawer = closeCartDrawer;
window.renderRoute = renderRoute;
window.renderCartPage = renderCartPage;
window.renderCartDrawer = renderCartDrawer;
window.renderTrackingResult = renderTrackingResult;
window.switchAuthTab = switchAuthTab;
window.handleLoginSubmit = handleLoginSubmit;
window.handleRegisterSubmit = handleRegisterSubmit;
window.handleLogout = handleLogout;
window.handleAuthClick = () => navigateToPage(currentUser ? "hesabim" : "giris");
window.selectPdpImage = selectPdpImage;
window.changePdpQty = changePdpQty;
window.handlePdpAddToCart = handlePdpAddToCart;
window.handlePdpBuyNow = handlePdpBuyNow;
window.handlePdpWishlist = handlePdpWishlist;
window.switchPdpTab = switchPdpTab;
window.toggleGiftWrapping = toggleGiftWrapping;
window.updateGiftNoteCount = updateGiftNoteCount;
window.confirmPaytr3dOtp = confirmPaytr3dOtp;
window.closeLiveSalesToast = closeLiveSalesToast;
window.addToCart = addToCart;
window.changeQuantity = changeQuantity;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.applyCoupon = applyCoupon;
window.removeCoupon = removeCoupon;
window.toggleWishlist = toggleWishlist;
window.openCheckoutModal = openCheckoutModal;
window.setCheckoutStep = setCheckoutStep;
window.switchPaymentTab = switchPaymentTab;
window.renderCheckoutInstallments = renderCheckoutInstallments;
window.selectPaytrInstallment = selectPaytrInstallment;
window.openPolicyModal = openPolicyModal;
window.openQuickView = navigateToProduct;
window.closeAllModals = closeAllModals;
window.toggleMobileMenu = toggleMobileMenu;
window.showToast = showToast;
window.resetCategoryFilters = resetCategoryFilters;
window.closeSearch = closeSearch;
window.openOrderTrackingModal = () => navigateToPage("siparis-takip");
window.openAuthModal = () => navigateToPage(currentUser ? "hesabim" : "giris");
window.openWishlistDrawer = () => navigateToPage("favoriler");

// --- 19. UYGULAMA BAŞLATICI ---
function initApp() {
  const appMain = document.getElementById("appMain");
  if (appMain) {
    HOME_VIEW_HTML = appMain.innerHTML;
  }

  renderRoute();
  updateCartUI();
  renderCartDrawer();
  updateWishlistUI();
  updateAuthUI();
  setupLiveSearch();
  setupCountdownTimer();
  initLiveSalesFomo();

  // Geri/İleri Tarayıcı Tuşları (History API + Hash)
  window.addEventListener("popstate", renderRoute);
  window.addEventListener("hashchange", renderRoute);

  // Sepet Çekmecesi Kupon Formu
  const drawerCouponForm = document.getElementById("drawerCouponForm");
  if (drawerCouponForm) {
    drawerCouponForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("drawerCouponInput");
      if (input) {
        applyCoupon(input.value);
        input.value = "";
      }
    });
  }

  // Checkout Formları
  document.getElementById("checkoutStep1Form")?.addEventListener("submit", handleStep1Submit);
  document.getElementById("checkoutStep2Form")?.addEventListener("submit", handleFinalOrderSubmit);

  // Modallar Kapatma
  document.querySelectorAll(".modal-close-btn").forEach(btn => {
    btn.addEventListener("click", closeAllModals);
  });
  document.querySelectorAll(".modal-overlay").forEach(m => {
    m.addEventListener("click", (e) => {
      if (e.target === m) closeAllModals();
    });
  });

  // Mobil Menü Butonu
  document.getElementById("mobileMenuBtn")?.addEventListener("click", () => toggleMobileMenu(true));

  // Yukarı Çık Butonu
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.classList.toggle("visible", window.scrollY > 300);
    });
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
