import React from 'react';

// This test ensures:
// 1. Flexbox & Centering (flex, items-center)
// 2. Custom Colors & Gradients (from-indigo-500)
// 3. Hover effects (hover:shadow-2xl)
// 4. Responsive design (hidden vs block)
// 5. Typography (font-bold, tracking-tight)

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        
        {/* Animated Gradient Header */}
        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-center">
          <div className="inline-flex p-3 bg-white/20 backdrop-blur-md rounded-2xl mb-4">
            <span className="text-3xl">✨</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Tailwind Check
          </h1>
        </div>

        {/* Content Body */}
        <div className="p-8">
          <p className="text-slate-600 leading-relaxed mb-6">
            If this looks like a <span className="font-bold text-indigo-600">stylish card</span> and not a wall of plain text, your Tailwind v3 installation is active.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-slate-700 font-mono italic">
                Vite 7 + React 19 detected
              </span>
            </div>
            
            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-200">
              Interaction Test
            </button>
          </div>
        </div>

        {/* Responsive Legend */}
        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Screen: <span className="text-indigo-500 sm:hidden underline decoration-indigo-500">Mobile</span>
            <span className="hidden sm:inline text-indigo-500 underline decoration-indigo-500 font-bold">Tablet/Desktop</span>
          </span>
        </div>
      </div>
      
      <p className="mt-8 text-slate-400 text-sm italic">
        Check your terminal to ensure Vite is watching for changes.
      </p>
    </div>
  );
};

export default App;