import React, { useState } from "react";
import Nav from "../components/Nav";
import Toast from "../components/Toast";
import { useDispatch, useSelector } from "react-redux";
import { generate } from "../slices/imageSlice";
import { savesImage } from "../slices/saveSlice";

function Chat() {
  const dispatch = useDispatch();
  const { image, loading } = useSelector((state) => state.image);
  const { token } = useSelector((state) => state.auth);
  const { loading: saveLoading, error: saveError } = useSelector((state) => state.save);

  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("anime");
  const [toast, setToast] = useState(null);
  const [isSaved, setIsSaved] = useState(false);


  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = 'generated-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToast({ message: "Image downloaded!", type: "success" });
  };

  const handleGenerate = () => {
    if (!prompt) return;
    setIsSaved(false);
    dispatch(generate({ prompt, style }));
  };

  const handleSave = async () => {
    if (!token) {
      setToast({ message: "Please login first", type: "error" });
      return;
    }
    if (saveLoading || isSaved) return; // Prevent double submissions
    
    setToast({ message: "Saving image to history...", type: "success" });
    try {
      await dispatch(
        savesImage({
          imageUrl: image,
          prompt,
          style,
          token,
        }),
      ).unwrap();
      setIsSaved(true);
      setToast({ message: "Saved to history successfully!", type: "success" });
    } catch (err) {
      setToast({ message: "Failed to save: " + err, type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white overflow-hidden relative">
      {/* Navbar */}
      <div className="px-3 sm:px-6 pt-4">
        <Nav />
      </div>

      {/* Main Layout */}
      <div className="flex justify-center items-start mt-6 sm:mt-10 px-3 sm:px-6 pb-10">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT SIDE (FORM) */}
          <div
            className="
                        bg-white/5 border border-white/10
                        backdrop-blur-xl rounded-2xl
                        p-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]
                    "
          >
            <h1 className="text-xl font-semibold mb-2">
              Generate Image with prompt
            </h1>
            <p className="text-white/50 text-sm mb-6">
              Write your prompt according to the image you want to generate!
            </p>

            {/* Prompt Input */}
            <div className="mb-4">
              <label className="text-sm text-white/60">IMAGE PROMPT</label>
              <textarea
                rows="5"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Write your prompt..."
                className="w-full mt-1 px-4 py-3 bg-black/40 border border-white/10 rounded-lg outline-none resize-none"
              ></textarea>
            </div>

            {/* Style Selector */}
            <div className="flex flex-wrap gap-2 mb-4">
              {["anime", "3D", "pixar", "realistic"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    style === s ? "bg-accent text-black" : "bg-white/10"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <p className="text-xs text-white/40 mb-4">
              ⚠️ Please generate only legal and appropriate images — harmful,
              explicit, or offensive content is strictly prohibited.
            </p>

            {/* Button */}
            <div className="flex gap-3 flex-col">
              <button
                onClick={handleGenerate}
                className="
                                flex-1 py-2 rounded-lg
                                bg-blue-500 hover:bg-blue-600
                                transition
                            "
              >
                ✨ Generate Image
              </button>
              {image ? ( 
              <div className="flex gap-2">
                <button
                  onClick={handleDownload}
                  disabled={saveLoading}
                  className="flex-1 py-2 rounded-lg bg-blue-700 hover:bg-blue-900 transition text-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Download
                </button>
                <button
                  onClick={handleSave}
                  disabled={saveLoading || isSaved}
                  className="
                                flex-1 py-2 rounded-lg
                                bg-green-600 hover:bg-green-800
                                transition disabled:opacity-50 disabled:cursor-not-allowed
                            "
                >
                  {saveLoading ? "Saving..." : isSaved ? "Saved!" : "Save to History"}
                </button>
              </div>
              ): null}
            </div>
          </div>

          {/* RIGHT SIDE (IMAGE PREVIEW) */}
          <div
            className="
                        relative border-2 border-dashed border-yellow-400/40
                        rounded-2xl flex items-center justify-center
                        bg-black/40 backdrop-blur-xl
                        h-[300px] sm:h-[400px] md:h-[500px]
                    "
          >
            {loading ? (
              <p className="text-white/40">Generating...</p>
            ) : image ? (
              <img
                src={image}
                alt="generated"
                className="rounded-xl max-h-full object-contain"
              />
            ) : (
              <p className="text-white/40">Write a prompt to generate image</p>
            )}
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div
        className="
                absolute top-40 left-1/2 -translate-x-1/2
                w-[200px] h-[100px] sm:w-[300px] sm:h-[150px] md:w-[400px] md:h-[200px]
                bg-accent/20 blur-[120px] rounded-full
            "
      ></div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default Chat;
