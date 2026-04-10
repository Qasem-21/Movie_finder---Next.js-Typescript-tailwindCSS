export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 animate-fade-in">
      {/* Animated spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-primary-500 border-r-secondary-500 border-b-primary-500 border-l-secondary-500 rounded-full animate-spin"></div>
        
        {/* Inner pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse"></div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 font-medium text-base">
        Searching for movies...
      </p>
      
      {/* Loading dots animation */}
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
}