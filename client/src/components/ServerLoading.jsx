function ServerLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1220] text-white px-4">
      <div className="bg-[#0f172a] border border-slate-700 rounded-2xl p-6 sm:p-8 w-full max-w-[380px] shadow-xl text-center">
        <div className="mx-auto mb-5 h-12 w-12 rounded-full border-4 border-cyan-400/20 border-t-cyan-400 animate-spin"></div>

        <h1 className="text-2xl font-bold mb-2">Server is Loading</h1>

        <p className="text-sm text-gray-400">
          The free Render server is waking up. Please wait a moment.
        </p>
      </div>
    </div>
  );
}

export default ServerLoading;
