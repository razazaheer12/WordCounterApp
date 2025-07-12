import React, { useState, useEffect } from 'react';
import { Sun, Moon, Clipboard, Instagram, Facebook, Twitter, Linkedin, Trash2, AlertCircle } from 'lucide-react';

function App() {
  const [text, setText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [clipboardError, setClipboardError] = useState<string | null>(null);
  
  // Stats calculation
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const characters = text.length;
  const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
  const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(Boolean).length;
  const charactersNoSpaces = text.replace(/\s+/g, '').length;
  const readingTime = Math.ceil(words / 200); // Average reading speed of 200 words per minute

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Clear clipboard error after 5 seconds
  useEffect(() => {
    if (clipboardError) {
      const timer = setTimeout(() => {
        setClipboardError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [clipboardError]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setText(text);
      setClipboardError(null);
    } catch (err) {
      setClipboardError('Please use Ctrl+V or Cmd+V to paste text');
    }
  };

  const handleDelete = () => {
    if (text.trim() === '') return;
    if (dontShowAgain) {
      setText('');
    } else {
      setShowDeleteDialog(true);
    }
  };

  const confirmDelete = () => {
    setText('');
    setShowDeleteDialog(false);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark:bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold dark:text-white">Delete all text</h3>
              <button 
                onClick={() => setShowDeleteDialog(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You're about to delete all of the text
            </p>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="dontShowAgain"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 mr-2"
              />
              <label htmlFor="dontShowAgain" className="text-sm text-gray-600 dark:text-gray-300">
                Don't show again
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">Word Counter</h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-gray-200" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Text Input Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold dark:text-white">Enter or paste your text</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePaste}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
                    >
                      <Clipboard className="w-4 h-4" />
                      Paste Text
                    </button>
                    <button
                      onClick={handleDelete}
                      className={`p-2 rounded-md transition-colors ${
                        text.trim() 
                          ? 'text-gray-600 hover:bg-red-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-red-900/20 dark:hover:text-red-400' 
                          : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                      }`}
                      disabled={!text.trim()}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                {clipboardError && (
                  <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
                    <AlertCircle className="w-4 h-4" />
                    {clipboardError}
                  </div>
                )}
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-64 p-4 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 mt-4"
                placeholder="Start typing or paste your text here..."
              />
            </div>
          </div>

          {/* Stats Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{words}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Words</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{characters}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Characters</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{sentences}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Sentences</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{paragraphs}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Paragraphs</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Characters (no spaces)</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{charactersNoSpaces}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Reading time</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{readingTime} min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t dark:border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Word Counter. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;