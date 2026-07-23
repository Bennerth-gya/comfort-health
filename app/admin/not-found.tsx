export default function AdminNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8faf8] px-4">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 bg-[#f0fdf4] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#15803d"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-[#0f2318] mb-2">
          Page not found
        </h1>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          The page you are looking for does not exist or is not available.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-[#15803d] text-white px-6 py-3 rounded-xl font-semibold text-sm"
        >
          Go to shop
        </a>
      </div>
    </div>
  )
}
