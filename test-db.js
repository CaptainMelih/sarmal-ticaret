import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: orders, error: ordersErr } = await supabase.from('orders').select('*');
  console.log('orders count:', orders?.length, ordersErr);

  const { data: products, error: prodErr } = await supabase.from('products').select('*');
  console.log('products count:', products?.length, 'sample stock:', products?.[0]?.stock, prodErr);

  const uniqueUsers = new Set(orders?.map(o => o.user_id).filter(id => id !== null)).size;
  console.log('unique order users count:', uniqueUsers);
}
run();
