import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const newProducts = [
  { title: "Premium Erkek Kol Saati", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d", description: "Zarif tasarımlı, suya dayanıklı premium erkek kol saati." },
  { title: "Seramik Kahve Kupası", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d", description: "El yapımı, dayanıklı ve şık seramik kahve kupası." },
  { title: "Hakiki Deri Cüzdan", image: "https://images.unsplash.com/photo-1627123424574-724758594e93", description: "%100 hakiki derinden üretilmiş kartlık ve bozuk para bölmeli cüzdan." },
  { title: "Polarize Güneş Gözlüğü", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083", description: "UV400 korumalı, hafif ve trend polarize güneş gözlüğü." },
  { title: "Kablosuz Bluetooth Kulaklık", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", description: "Yüksek ses kalitesi ve uzun pil ömrü sunan kablosuz kulaklık." },
  { title: "Günlük Spor Ayakkabı", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", description: "Nefes alabilen file yüzey ve konforlu tabana sahip spor ayakkabı." },
  { title: "Klasik Kadın El Çantası", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809", description: "Geniş iç hacimli, şık tasarımlı klasik deri el çantası." },
  { title: "Odunsu Erkek Parfümü", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f", description: "Kalıcı ve etkileyici odunsu notalara sahip premium erkek parfümü." },
  { title: "Minimalist Masa Lambası", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c", description: "Okuma ve çalışma masaları için ayarlanabilir başlıklı lamba." },
  { title: "Dijital Kamera", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32", description: "Yüksek çözünürlüklü lens ve profesyonel çekim modları." },
  { title: "Analog Duvar Saati", image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c", description: "Sessiz çalışan mekanizmalı, modern tasarımlı duvar saati." },
  { title: "Organik Pamuklu Tişört", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", description: "%100 pamuklu, nefes alan ve terletmeyen günlük tişört." },
  { title: "Çelik Termos Kupa", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8", description: "Sıcaklığı 12 saat koruyan paslanmaz çelik seyahat termosu." },
  { title: "Seyahat Çantası", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62", description: "Su geçirmez kumaşlı, geniş hacimli sırt veya el çantası." },
  { title: "Retro Daktilo", image: "https://images.unsplash.com/photo-1518082697078-d4fa23126ed6", description: "Koleksiyonluk, aktif çalışan nostaljik klavye tasarımı." },
  { title: "Keten Yastık Kılıfı", image: "https://images.unsplash.com/photo-1584100936595-c0654b355040", description: "Dekoratif, kolay yıkanabilir ve ferah dokulu kırlent kılıfı." }
]

async function run() {
  const { data: dbProducts, error } = await supabase.from('products').select('*').order('id', { ascending: true });
  if (error) { console.error("Error fetching", error); return; }
  
  for (let i = 0; i < dbProducts.length; i++) {
    const newData = newProducts[i % newProducts.length];
    const { error: updateError } = await supabase
      .from('products')
      .update({ title: newData.title, image: newData.image, description: newData.description })
      .eq('id', dbProducts[i].id);
    if (updateError) { console.error("Update error for id", dbProducts[i].id, updateError); }
  }
  console.log("Updated", dbProducts.length, "products in Supabase!");
}
run();
