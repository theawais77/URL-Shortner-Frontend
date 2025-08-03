import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Url_form = () => {
  const [url, setUrl] = useState("https://www.google.com");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  // const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/create", {
        url,
      });
      console.log(response);
      setShortUrl(response.data);
    } catch (error) {
      console.error("Error shortening URL:", error);
      // Optionally show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  const query = useQuery({ queryKey: ["todos"], queryFn: handleSubmit });

  const mutation = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });


  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
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
              type="button"
              onClick={copyToClipboard}
              className={`px-4 py-2 ${
                isCopied ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
              } text-white text-sm rounded transition duration-200`}
            >
              {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default Url_form;
