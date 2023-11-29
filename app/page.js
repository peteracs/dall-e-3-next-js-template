"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrls, setImageUrls] = useState([]); // Change to an array to store multiple URLs

  function handleDeleteImage(index) {
    setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const prompt = formData.get("prompt");
    const quality = formData.get("quality");
    const style = formData.get("style");
    const size = formData.get("size");

    try {
      const response = await fetch("/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, quality, style, size }),
      });

      console.log(response);
      if (!response.ok) {
        // Attempt to parse the error message from the server's response
        const errorData = await response.json();
        const errorMessage =
          errorData.error || `HTTP error! status: ${response.status}`;
        setError(errorMessage);
      } else {
        const data = await response.json();
        console.log(data);
        setImageUrls((prevUrls) => [...prevUrls, data.image]); // Append the new image URL
      }
    } catch (error) {
      console.error(error);
      setError("Unknown error!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold text-green-600">
          DALL-E 3 Image Generator
        </h1>
        <nav aria-label="Main navigation">
          <ul className="flex space-x-4">
            <li>
              <a
                href="#home"
                className="text-base text-yellow-600 hover:text-yellow-700"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-base text-yellow-600 hover:text-yellow-700"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-base text-yellow-600 hover:text-yellow-700"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <section aria-labelledby="create-image-heading">
        <h2 id="create-image-heading" className="text-2xl font-semibold mb-4">
          Create Your Image
        </h2>
        {error && (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span class="font-medium">Error!</span> {error}
          </div>
        )}
        <form noValidate onSubmit={onSubmit}>
          <div className="mb-6">
            <label
              htmlFor="prompt"
              className="block mb-2 text-lg text-green-600"
            >
              Enter a prompt for the AI:
            </label>
            <input
              type="text"
              id="prompt"
              name="prompt"
              placeholder="Describe the image you want to generate"
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
              aria-describedby="prompt-help"
              required
            />
            <p id="prompt-help" className="mt-1 text-sm text-gray-400">
              Be as descriptive as possible for the best results.
            </p>
          </div>
          <div className="mb-6">
            <label
              htmlFor="quality"
              className="block mb-2 text-lg text-green-600"
            >
              Quality:
            </label>
            <select
              id="quality"
              name="quality"
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            >
              <option value="hd">HD</option>
              <option value="standard">Standard</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="style"
              className="block mb-2 text-lg text-green-600"
            >
              Style:
            </label>
            <select
              id="style"
              name="style"
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            >
              <option value="vivid">Vivid</option>
              <option value="natural">Natural</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="size" className="block mb-2 text-lg text-green-600">
              Size:
            </label>
            <select
              id="size"
              name="size"
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            >
              <option value="1024x1024">1024x1024</option>
              <option value="1792x1024">1792x1024</option>
              <option value="1024x1792">1024x1792</option>
            </select>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="px-6 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-bold focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="spinner w-5 h-5"></div>
                <span className="ml-2">Generating... </span>
              </div>
            ) : (
              "Generate Image"
            )}
          </button>
        </form>
      </section>

      <section aria-labelledby="generated-images-heading" className="mt-12">
        <h3
          id="generated-images-heading"
          className="text-xl font-semibold mb-3"
        >
          Generated Images
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {imageUrls.map((imageUrl, index) => (
            <figure
              key={index}
              className="bg-gray-700 p-4 rounded flex flex-col justify-center items-center"
            >
              <Image
                width={1024}
                height={1024}
                src={imageUrl}
                alt="Generated Image"
                className="max-w-full h-auto mb-4"
              />
              <figcaption className="sr-only">
                Generated image from AI
              </figcaption>
              <div className="flex justify-center items-center space-x-2">
                {/* Download button */}
                <a
                  target="_blank"
                  href={imageUrl}
                  download={`generated-image-${index}.jpg`}
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  title="Download Image"
                >
                  <span>Download ⬇️</span>
                </a>
                {/* Delete button */}
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="px-4 py-2 rounded bg-red-900 hover:bg-red-700 text-white font-bold focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  title="Delete Image"
                >
                  <span>Delete ❌</span>
                </button>
              </div>
            </figure>
          ))}

          {imageUrls.length === 0 && (
            <figure className="bg-gray-700 p-4 rounded flex justify-center items-center">
              <span className="text-6xl text-yellow-600" aria-hidden="true">
                🖼️
              </span>
              <figcaption className="sr-only">
                Placeholder for generated image
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      <footer className="text-center py-8">
        <p className="text-sm text-yellow-600">
          &copy; 2023 Image Generator with DALL-E 3. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
