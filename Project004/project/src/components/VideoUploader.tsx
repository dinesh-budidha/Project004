import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileVideo } from 'lucide-react';

interface VideoUploaderProps {
  onFileUpload: (file: File) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type.startsWith('video/')) {
        onFileUpload(file);
      }
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.webm']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        {isDragActive ? (
          <>
            <Upload className="h-12 w-12 text-indigo-500 mb-4" />
            <p className="text-indigo-600 font-medium">Drop the video here...</p>
          </>
        ) : (
          <>
            <FileVideo className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 font-medium mb-2">Drag & drop a video file here, or click to select</p>
            <p className="text-gray-500 text-sm">Supports MP4, MOV, AVI, WEBM (max 500MB)</p>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoUploader;