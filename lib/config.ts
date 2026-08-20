const PRIMARY_PHARMACY_PHONE =
  process.env.NEXT_PUBLIC_PHARMACY_PHONE?.trim() || '0537355068'

const SECONDARY_PHARMACY_PHONE =
  process.env.NEXT_PUBLIC_PHARMACY_SECONDARY_PHONE?.trim() || '0205295130'

function formatPhoneForDisplay(phone: string) {
  const digits = phone.replace(/\D/g, '')

  if (digits.length === 10) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
  }

  if (digits.startsWith('233') && digits.length === 12) {
    return `0${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`
  }

  return phone
}

export const PHARMACY_PHONE_NUMBERS = [
  {
    label: 'Line 1',
    phone: PRIMARY_PHARMACY_PHONE,
    display: formatPhoneForDisplay(PRIMARY_PHARMACY_PHONE),
  },
  {
    label: 'Line 2',
    phone: SECONDARY_PHARMACY_PHONE,
    display: formatPhoneForDisplay(SECONDARY_PHARMACY_PHONE),
  },
] as const

export const PHARMACY_CONFIG = {
  phoneNumbers: PHARMACY_PHONE_NUMBERS,

  // Primary fallback for older call links.
  phone: PRIMARY_PHARMACY_PHONE,

  // This is what shows as display text in links
  phoneDisplay: PHARMACY_PHONE_NUMBERS[0].display,

  // WhatsApp link (same number)
  whatsappLink: 'https://wa.me/233537355068',

  name: 'Comfort Health Pharmacy',
  address: 'UMaT Campus, Tarkwa, Ghana',

  // Operating hours to show users
  hours: 'Mon – Sat: 8:00 AM – 8:00 PM',
  hoursShort: 'Open 8AM – 8PM',
}
