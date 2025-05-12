export default function AuthSuspense() {
  return (
    <div className="flex flex-col min-h-screen bg-blue-500">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Left Section */}
        <div className="hidden md:flex md:w-1/2 relative bg-cover bg-center">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 flex flex-col mx-auto my-auto w-full p-8">
            <div className="w-full max-w-[430px] mx-auto h-[550px] bg-gray-300 animate-pulse rounded-xl" />
            <div className="flex flex-col gap-2 text-center mt-6">
              <div className="h-6 bg-gray-300 animate-pulse rounded w-1/2 mx-auto" />
              <div className="h-4 bg-gray-300 animate-pulse rounded w-2/3 mx-auto" />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full h-dvh md:w-1/2 bg-white p-6 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-6 flex flex-col gap-2">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-2/3 mx-auto" />
              <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4 mx-auto" />
            </div>

            <div className="flex flex-col gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-12 bg-gray-100 rounded-md animate-pulse" />
                </div>
              ))}

              <div className="text-center">
                <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse mx-auto" />
              </div>

              <div className="h-12 bg-blue-300 animate-pulse rounded-md" />
            </div>

            {/* Mobile Footer */}
            <div className="mt-5 pt-5 border-t border-gray-200 flex flex-col items-center md:hidden">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
