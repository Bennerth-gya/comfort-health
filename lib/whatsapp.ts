import 'server-only'

import { sendWhatsApp } from '@/lib/notifications'

export async function sendWhatsAppNotification(message: string): Promise<void> {
  const phone = process.env.ADMIN_WHATSAPP
  const apiKey = process.env.CALLMEBOT_API_KEY

  if (!phone || !apiKey) {
    console.info('WhatsApp not configured (ADMIN_WHATSAPP or CALLMEBOT_API_KEY missing); skipping notification.')
    return
  }

  try {
    await sendWhatsApp(phone, apiKey, message)
  } catch (error) {
    console.error('WhatsApp notification error:', error)
  }
}
