import { useState, useCallback } from 'react';

export type FileType = 'image' | 'video';

export interface UploadProgress {
  progress: number; // 0-100
  stage: 'idle' | 'preparing' | 'uploading' | 'completed' | 'error';
  error?: string;
}

export interface UseFileUploadOptions {
  onSuccess?: (fileUrl: string) => void;
  onError?: (error: string) => void;
  maxRetries?: number;
}

export interface UploadResult {
  success: boolean;
  fileUrl?: string;
  error?: string;
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const { onSuccess, onError, maxRetries = 3 } = options;
  
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    progress: 0,
    stage: 'idle',
  });
  
  const [isUploading, setIsUploading] = useState(false);
  
  /**
   * Obtiene una URL pre-firmada del servidor
   */
  const getPresignedUrl = async (
    fileType: FileType,
    fileName: string,
    fileSize: number,
    contentType: string
  ) => {
    const response = await fetch('/api/upload/presigned-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileType,
        fileName,
        fileSize,
        contentType,
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error obteniendo URL de subida');
    }
    
    const data = await response.json();
    return data.data;
  };
  
  /**
   * Sube el archivo a S3 usando la URL pre-firmada
   */
  const uploadToS3 = async (
    file: File,
    uploadUrl: string,
    onProgress?: (progress: number) => void
  ) => {
    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      // Configurar seguimiento de progreso
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          onProgress?.(progress);
        }
      });
      
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          resolve();
        } else {
          reject(new Error(`Error subiendo archivo: ${xhr.statusText}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Error de red al subir archivo'));
      });
      
      xhr.addEventListener('timeout', () => {
        reject(new Error('Tiempo de espera agotado'));
      });
      
      xhr.open('PUT', uploadUrl);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.timeout = 5 * 60 * 1000; // 5 minutos
      xhr.send(file);
    });
  };
  
  /**
   * Función principal para subir un archivo
   */
  const uploadFile = useCallback(
    async (file: File, fileType: FileType): Promise<UploadResult> => {
      setIsUploading(true);
      setUploadProgress({ progress: 0, stage: 'preparing' });
      
      let retries = 0;
      
      while (retries < maxRetries) {
        try {
          setUploadProgress({ progress: 10, stage: 'preparing' });
          
          const { uploadUrl, fileUrl } = await getPresignedUrl(
            fileType,
            file.name,
            file.size,
            file.type
          );
          
          setUploadProgress({ progress: 20, stage: 'uploading' });
          
          await uploadToS3(file, uploadUrl, (progress) => {
            const mappedProgress = 20 + (progress * 0.8);
            setUploadProgress({
              progress: Math.round(mappedProgress),
              stage: 'uploading',
            });
          });
          
          setUploadProgress({ progress: 100, stage: 'completed' });
          setIsUploading(false);
          
          onSuccess?.(fileUrl);
          
          return {
            success: true,
            fileUrl,
          };
          
        } catch (error) {
          retries++;
          console.error(`Error en intento ${retries}:`, error);
          
          if (retries >= maxRetries) {
            const errorMessage =
              error instanceof Error ? error.message : 'Error desconocido al subir archivo';
            
            setUploadProgress({
              progress: 0,
              stage: 'error',
              error: errorMessage,
            });
            setIsUploading(false);
            
            onError?.(errorMessage);
            
            return {
              success: false,
              error: errorMessage,
            };
          }
          
          await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, retries - 1)));
        }
      }

      const errorMessage = 'Error subiendo archivo después de múltiples intentos';
      setUploadProgress({ progress: 0, stage: 'error', error: errorMessage });
      setIsUploading(false);
      onError?.(errorMessage);
      
      return {
        success: false,
        error: errorMessage,
      };
    },
    [maxRetries, onSuccess, onError]
  );
  
  /**
   * Elimina un archivo de S3
   */
  const deleteFile = useCallback(async (fileUrl: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/upload/delete?url=${encodeURIComponent(fileUrl)}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error eliminando archivo');
      }
      
      return true;
    } catch (error) {
      console.error('Error eliminando archivo:', error);
      return false;
    }
  }, []);
  
  /**
   * Resetea el estado del upload
   */
  const reset = useCallback(() => {
    setUploadProgress({ progress: 0, stage: 'idle' });
    setIsUploading(false);
  }, []);
  
  return {
    uploadFile,
    deleteFile,
    uploadProgress,
    isUploading,
    reset,
  };
}
