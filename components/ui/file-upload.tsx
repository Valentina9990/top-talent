import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useFileUpload, type FileType } from '@/hooks/use-file-upload';
import { Button } from './button';
import { Upload, X, Check, AlertCircle, Loader2, FileIcon, ImageIcon, VideoIcon } from 'lucide-react';

interface FileUploadProps {
  fileType: FileType;
  accept?: string;
  maxSizeMB?: number;
  onUploadComplete: (fileUrl: string) => void;
  onUploadError?: (error: string) => void;
  disabled?: boolean;
  existingFileUrl?: string;
  className?: string;
}

export function FileUpload({
  fileType,
  accept,
  maxSizeMB,
  onUploadComplete,
  onUploadError,
  disabled = false,
  existingFileUrl,
  className = '',
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(existingFileUrl || null);
  
  const { uploadFile, deleteFile, uploadProgress, isUploading, reset } = useFileUpload({
    onSuccess: (fileUrl) => {
      onUploadComplete(fileUrl);
      setSelectedFile(null);
    },
    onError: (error) => {
      onUploadError?.(error);
      setSelectedFile(null);
      setPreviewUrl(existingFileUrl || null);
    },
  });
  
  const defaultAccept = fileType === 'image' 
    ? 'image/jpeg,image/png,image/gif,image/webp'
    : 'video/mp4,video/webm,video/quicktime';
  
  const acceptAttr = accept || defaultAccept;

  const defaultMaxSize = fileType === 'image' ? 10 : 100;
  const maxSize = maxSizeMB || defaultMaxSize;
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;
    
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      onUploadError?.(`El archivo es demasiado grande. Máximo: ${maxSize}MB`);
      return;
    }
    
    setSelectedFile(file);
    
    if (fileType === 'image') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  
  const handleUpload = async () => {
    if (!selectedFile) return;
    
    await uploadFile(selectedFile, fileType);
  };
  
  const handleRemove = async () => {
    if (previewUrl && previewUrl.startsWith('http')) {
      await deleteFile(previewUrl);
    }
    
    setSelectedFile(null);
    setPreviewUrl(null);
    reset();
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(existingFileUrl || null);
    reset();
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const getFileIcon = () => {
    if (fileType === 'image') return <ImageIcon className="w-8 h-8" />;
    if (fileType === 'video') return <VideoIcon className="w-8 h-8" />;
    return <FileIcon className="w-8 h-8" />;
  };
  
  return (
    <div className={`space-y-4 ${className}`}>
      {previewUrl ? (
        <div className="relative rounded-lg border-2 border-gray-200 overflow-hidden bg-gray-50">
          {fileType === 'image' ? (
            <div className="relative w-full h-64">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <video
              src={previewUrl}
              controls
              className="w-full h-64"
            />
          )}
          
          {!isUploading && !selectedFile && (
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              aria-label="Eliminar archivo"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
          <div className="flex flex-col items-center space-y-3 text-gray-500">
            {getFileIcon()}
            <div>
              <p className="font-medium">
                {fileType === 'image' ? 'Subir imagen' : 'Subir video'}
              </p>
              <p className="text-sm">
                {fileType === 'image' 
                  ? 'JPG, PNG, GIF, WEBP' 
                  : 'MP4, WEBM, MOV'}
                {' '}
                (máx. {maxSize}MB)
              </p>
            </div>
          </div>
        </div>
      )}
      
      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {uploadProgress.stage === 'preparing' && 'Preparando...'}
              {uploadProgress.stage === 'uploading' && 'Subiendo...'}
              {uploadProgress.stage === 'completed' && 'Completado'}
            </span>
            <span className="font-medium">{uploadProgress.progress}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-300"
              style={{ width: `${uploadProgress.progress}%` }}
            />
          </div>
        </div>
      )}
      
      {uploadProgress.stage === 'error' && uploadProgress.error && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{uploadProgress.error}</p>
        </div>
      )}
      
      {uploadProgress.stage === 'completed' && (
        <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
          <Check className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">Archivo subido exitosamente</p>
        </div>
      )}
      
      <div className="flex space-x-3">
        {!selectedFile && !isUploading && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptAttr}
              onChange={handleFileSelect}
              className="hidden"
              disabled={disabled}
            />
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className="flex-1"
            >
              <Upload className="w-4 h-4 mr-2" />
              Seleccionar archivo
            </Button>
          </>
        )}
        
        {selectedFile && !isUploading && uploadProgress.stage !== 'completed' && (
          <>
            <Button
              type="button"
              onClick={handleUpload}
              disabled={disabled}
              className="flex-1"
            >
              <Upload className="w-4 h-4 mr-2" />
              Subir
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              variant="outline"
              disabled={disabled}
            >
              Cancelar
            </Button>
          </>
        )}
        
        {isUploading && (
          <Button
            type="button"
            disabled
            className="flex-1"
          >
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Subiendo...
          </Button>
        )}
      </div>
      
      {/* File Info */}
      {selectedFile && (
        <div className="text-sm text-gray-500">
          <p>
            <span className="font-medium">Archivo:</span> {selectedFile.name}
          </p>
          <p>
            <span className="font-medium">Tamaño:</span>{' '}
            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>
      )}
    </div>
  );
}
