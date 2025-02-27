import React, { useState } from 'react';
import { Upload, Globe, Video, Languages, Mic, Volume2 } from 'lucide-react';
import VideoUploader from './components/VideoUploader';
import VideoPlayer from './components/VideoPlayer';
import LanguageSelector from './components/LanguageSelector';
import TranslationStatus from './components/TranslationStatus';

function App() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [sourceLanguage, setSourceLanguage] = useState<string>('en');
  const [targetLanguage, setTargetLanguage] = useState<string>('es');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [translationProgress, setTranslationProgress] = useState<number>(0);
  const [translatedVideoUrl, setTranslatedVideoUrl] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    setVideoFile(file);
    setVideoUrl(URL.createObjectURL(file));
    setTranslatedVideoUrl(null);
  };

  const handleTranslate = () => {
    if (!videoFile) return;
    
    setIsTranslating(true);
    setTranslationProgress(0);
    
    // Simulate translation process
    const interval = setInterval(() => {
      setTranslationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTranslating(false);
          // In a real app, this would be the URL returned from the backend
          setTranslatedVideoUrl(videoUrl);
          return 100;
        }
        return prev + 10;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-800">Video Translator</h1>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="text-gray-600 hover:text-indigo-600 flex items-center">
                    <Video className="h-5 w-5 mr-1" />
                    <span>Translate</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-indigo-600 flex items-center">
                    <Languages className="h-5 w-5 mr-1" />
                    <span>Languages</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-indigo-600 flex items-center">
                    <Mic className="h-5 w-5 mr-1" />
                    <span>Voices</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Upload className="h-5 w-5 mr-2 text-indigo-600" />
              Upload Video
            </h2>
            
            <VideoUploader onFileUpload={handleFileUpload} />
            
            {videoUrl && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Source Video</h3>
                <VideoPlayer url={videoUrl} />
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-indigo-600" />
              Translation Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <LanguageSelector 
                label="Source Language"
                value={sourceLanguage}
                onChange={setSourceLanguage}
              />
              
              <LanguageSelector 
                label="Target Language"
                value={targetLanguage}
                onChange={setTargetLanguage}
              />
            </div>
            
            <button
              onClick={handleTranslate}
              disabled={!videoFile || isTranslating}
              className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                !videoFile || isTranslating
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <Volume2 className="h-5 w-5 mr-2" />
              {isTranslating ? 'Translating...' : 'Translate Video'}
            </button>
            
            {isTranslating && (
              <TranslationStatus progress={translationProgress} />
            )}
            
            {translatedVideoUrl && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Translated Video</h3>
                <VideoPlayer url={translatedVideoUrl} />
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <Globe className="h-6 w-6 mr-2 text-indigo-400" />
                <span className="text-xl font-bold">Video Translator</span>
              </div>
              <p className="text-gray-400 mt-2">Translate videos to any language with AI</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                About
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Video Translator. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;