import React, { useState } from "react";  
const Url_form = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    // Simulate API call - replace with actual API
    setTimeout(() => {
      setShortUrl(
        `https://short.ly/${Math.random().toString(36).substr(2, 8)}`
      );
      setIsLoading(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Enter your URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
      >
        {isLoading ? "Shortening..." : "Shorten URL"}
      </button>
      {shortUrl && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <label className="block text-sm font-medium text-green-800 mb-2">
            Your shortened URL:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-white border border-green-300 rounded text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition duration-200"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default Url_form;
