import axios from 'axios';

// This is a placeholder for the actual API service
// In a real application, you would connect to your backend API

const API_URL = 'https://api.example.com'; // Replace with your actual API URL

export const translateVideo = async (
  videoFile: File,
  sourceLanguage: string,
  targetLanguage: string,
  onProgress: (progress: number) => void
): Promise<string> => {
  // Create form data
  const formData = new FormData();
  formData.append('video', videoFile);
  formData.append('sourceLanguage', sourceLanguage);
  formData.append('targetLanguage', targetLanguage);

  try {
    // In a real implementation, you would use axios to upload the file
    // and track progress
    /*
    const response = await axios.post(`${API_URL}/translate`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 100)
        );
        onProgress(percentCompleted);
      },
    });
    
    return response.data.translatedVideoUrl;
    */

    // For now, we'll simulate the API call
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        onProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          resolve(URL.createObjectURL(videoFile)); // In a real app, this would be the URL from the API
        }
      }, 500);
    });
  } catch (error) {
    console.error('Error translating video:', error);
    throw error;
  }
};

export const getAvailableLanguages = async (): Promise<Array<{ code: string; name: string }>> => {
  try {
    // In a real implementation, you would fetch this from your API
    /*
    const response = await axios.get(`${API_URL}/languages`);
    return response.data;
    */

    // For now, we'll return a static list
    return [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Spanish' },
      { code: 'fr', name: 'French' },
      { code: 'de', name: 'German' },
      { code: 'it', name: 'Italian' },
      { code: 'pt', name: 'Portuguese' },
      { code: 'ru', name: 'Russian' },
      { code: 'zh', name: 'Chinese' },
      { code: 'ja', name: 'Japanese' },
      { code: 'ko', name: 'Korean' },
      { code: 'ar', name: 'Arabic' },
      { code: 'hi', name: 'Hindi' }
    ];
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
};