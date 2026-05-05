import React, { useState, useEffect, useRef } from "react";
import Nav from "../components/Nav";
import Toast from "../components/Toast";
import { useSelector, useDispatch } from "react-redux";
import { getsImage, deleteImage } from "../slices/saveSlice";

function History() {
  const dispatch = useDispatch();
  const fetchedRef = useRef(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [toast, setToast] = useState(null);

  const { images = [], loading } = useSelector((state) => state.save);
  const { token } = useSelector((state) => state.auth);

  const handleDownload = () => {
    if (!selectedImage) return;
    const link = document.createElement('a');
    link.href = selectedImage.imageUrl;
    link.download = 'generated-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToast({ message: "Image downloaded!", type: "success" });
  };

  const handleDelete = () => {
    if (!selectedImage) return;
    dispatch(deleteImage({ imageId: selectedImage._id, token }));
    setSelectedImage(null);
    setToast({ message: "Image deleted!", type: "success" });
  };

  // Fetch images (only once per mount)
  useEffect(() => {
    if (token && !fetchedRef.current) {
      fetchedRef.current = true;
      dispatch(getsImage(token));
    }
  }, [dispatch, token]);

  return (
    <div className="min-h-screen bg-dark text-white pb-4">
      
      {/* Navbar */}
      <div className="px-3 sm:px-6 pt-4">
        <Nav />
      </div>

      <h1 className="text-center text-xl sm:text-2xl mt-6 text-accent drop-shadow-[0_0_6px_#22D3EE]">
        History
      </h1>

      {/* GRID */}
      <div className="max-w-6xl mx-auto mt-6 sm:mt-10 px-3 sm:px-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        
        {loading ? (
          <p className="col-span-full text-center">Loading...</p>
        ) : images.length === 0 ? (
          <p className="col-span-full text-center text-white/50">
            No images yet
          </p>
        ) : (
          images.map((img) => (
            <div
              key={img._id}
              className="group rounded-xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition duration-300"
            >
              {/* Image */}
              <img
                src={img.imageUrl}
                alt="generated"
                className="w-full h-40 object-cover"
              />

              {/* Actions */}
              <div className="p-3 flex justify-between">
                
                <a
                  href={img.imageUrl}
                  download
                  className="text-xs text-accent hover:drop-shadow-[0_0_6px_#22D3EE]"
                >
                  Download
                </a>
                
                <button
                  onClick={() => setSelectedImage(img)}
                  className="text-xs text-accent hover:drop-shadow-[0_0_6px_#22D3EE]"
                >
                  View
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          
          <div className="relative w-[95%] sm:w-[90%] max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-5 shadow-[0_0_40px_rgba(34,211,238,0.2)]">
            
            {/* Close */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 text-white/60 hover:text-white"
            >
              ✕
            </button>

            {/* Image */}
            <img
              src={selectedImage.imageUrl}
              alt="preview"
              className="w-full h-48 sm:h-64 object-cover rounded-xl"
            />

            {/* Prompt */}
            <p className="mt-4 text-white/80 text-sm">
              {selectedImage.prompt}
            </p>

            {/* Actions */}
            <div className="flex justify-between mt-3 sm:mt-5">

              <button
                  onClick={handleDownload}
                  className="px-4 py-2 rounded-lg bg-accent text-black text-sm shadow-[0_0_15px_rgba(34,211,238,0.6)] hover:shadow-[0_0_25px_rgba(34,211,238,0.9)] transition"
                >
                  Download
                </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg border border-red-500 text-red-500 text-sm hover:drop-shadow-[0_0_6px_#ef4444]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Background Glow */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[200px] h-[100px] sm:w-[300px] sm:h-[150px] md:w-[400px] md:h-[200px] bg-accent/20 blur-[120px] rounded-full"></div>

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

export default History;