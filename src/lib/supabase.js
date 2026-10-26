import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export async function saveCustomerOrder({ customer, items, total, status = 'pending' }) {
  if (!supabase) {
    return { localOnly: true }
  }

  const { data: customerData, error: customerError } = await supabase
    .from('customers')
    .insert([
      {
        name: customer.name,
        phone: customer.phone,
        email: customer.email || null,
        notes: customer.notes || null,
      },
    ])
    .select()
    .single()

  if (customerError) {
    throw customerError
  }

  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert([
      {
        customer_id: customerData.id,
        items: items,
        total,
        status,
      },
    ])
    .select()
    .single()

  if (orderError) {
    throw orderError
  }

  return {
    localOnly: false,
    customer: customerData,
    order: orderData,
  }
}
