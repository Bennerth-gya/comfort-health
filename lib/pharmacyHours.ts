import 'server-only'

export function isPharmacyOpen(): boolean {
  // Ghana is GMT+0 (no daylight saving)
  const now = new Date()
  const ghanaTime = new Date(
    now.toLocaleString('en-US', { timeZone: 'Africa/Accra' })
  )

  const day = ghanaTime.getDay() // 0=Sun, 1=Mon...6=Sat
  const hour = ghanaTime.getHours()

  // Monday to Friday: 8am to 8pm
  if (day >= 1 && day <= 5) {
    return hour >= 8 && hour < 20
  }
  // Saturday: 9am to 6pm
  if (day === 6) {
    return hour >= 9 && hour < 18
  }
  // Sunday: 10am to 4pm
  if (day === 0) {
    return hour >= 10 && hour < 16
  }

  return false
}

export function getPharmacyStatus(): {
  isOpen: boolean
  message: string
  nextOpen?: string
} {
  const open = isPharmacyOpen()
  if (open) {
    return {
      isOpen: true,
      message: 'Pharmacist available now',
    }
  }
  return {
    isOpen: false,
    message: 'Pharmacist currently offline',
    nextOpen: 'Available Mon–Fri 8am–8pm Ghana time',
  }
}
