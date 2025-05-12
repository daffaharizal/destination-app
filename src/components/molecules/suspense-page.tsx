export default function SuspensePage() {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        {/* Header: Title & Button */}
        <div className="flex justify-between items-center">
          <div className="h-6 w-40 bg-gray-300 rounded" />
          <div className="h-9 w-32 bg-gray-300 rounded" />
        </div>
  
        {/* Filter Bar */}
        <div className="h-10 w-full bg-gray-300 rounded" />
  
        {/* Table Header */}
        <div className="grid grid-cols-5 gap-4 px-4">
          <div className="h-4 bg-gray-300 rounded" />
          <div className="h-4 bg-gray-300 rounded" />
          <div className="h-4 bg-gray-300 rounded" />
          <div className="h-4 bg-gray-300 rounded" />
          <div className="h-4 bg-gray-300 rounded" />
        </div>
  
        {/* Table Rows Placeholder (3 rows) */}
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="grid grid-cols-5 gap-4 px-4 py-2 items-center"
          >
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-10 w-16 bg-gray-200 rounded" />
            <div className="flex gap-2 justify-end">
              <div className="h-8 w-8 bg-gray-200 rounded" />
              <div className="h-8 w-8 bg-gray-200 rounded" />
              <div className="h-8 w-8 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  