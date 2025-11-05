import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Configuración del cliente S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_BUCKET!;
const PRESIGNED_URL_EXPIRATION = 3600; // 1 hora en segundos

export type FileType = 'image' | 'video';

export interface PresignedUrlOptions {
  fileType: FileType;
  fileName: string;
  fileSize: number;
  contentType: string;
}

/**
 * Genera una ruta única para el archivo basada en el tipo y timestamp
 */
export function generateS3Key(fileType: FileType, fileName: string, userId?: string): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(7);
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  
  const folder = fileType === 'image' ? 'images' : 'videos';
  const userPath = userId ? `${userId}/` : '';
  
  return `${folder}/${userPath}${timestamp}-${randomStr}-${sanitizedFileName}`;
}

/**
 * Obtiene el Content-Type apropiado basado en la extensión del archivo
 */
export function getContentType(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  const mimeTypes: Record<string, string> = {
    // Images
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    
    // Videos
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'mov': 'video/quicktime',
    'avi': 'video/x-msvideo',
    'mkv': 'video/x-matroska',
  };
  
  return mimeTypes[extension || ''] || 'application/octet-stream';
}

/**
 * Valida el tipo de archivo y tamaño
 */
export function validateFile(
  fileType: FileType,
  fileName: string,
  fileSize: number
): { valid: boolean; error?: string } {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  // Validar extensión
  const allowedExtensions = {
    image: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    video: ['mp4', 'webm', 'mov', 'avi', 'mkv'],
  };
  
  if (!extension || !allowedExtensions[fileType].includes(extension)) {
    return {
      valid: false,
      error: `Extensión de archivo no permitida. Permitidas: ${allowedExtensions[fileType].join(', ')}`,
    };
  }
  
  // Validar tamaño (10MB para imágenes, 100MB para videos)
  const maxSize = fileType === 'image' ? 10 * 1024 * 1024 : 100 * 1024 * 1024;
  if (fileSize > maxSize) {
    const maxSizeMB = maxSize / (1024 * 1024);
    return {
      valid: false,
      error: `El archivo es demasiado grande. Tamaño máximo: ${maxSizeMB}MB`,
    };
  }
  
  return { valid: true };
}

/**
 * Genera una URL pre-firmada para subir un archivo a S3
 */
export async function generatePresignedUploadUrl(
  options: PresignedUrlOptions,
  userId?: string
): Promise<{ uploadUrl: string; fileUrl: string; key: string }> {
  const { fileType, fileName, fileSize, contentType } = options;
  
  // Validar archivo
  const validation = validateFile(fileType, fileName, fileSize);
  if (!validation.valid) {
    throw new Error(validation.error);
  }
  
  // Generar key único
  const key = generateS3Key(fileType, fileName, userId);
  
  // Crear comando para subir el archivo
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
    ContentLength: fileSize,

    Metadata: {
      'uploaded-by': userId || 'anonymous',
      'upload-date': new Date().toISOString(),
      'original-filename': fileName,
    },
  });
  
  // Generar URL pre-firmada
  const uploadUrl = await getSignedUrl(s3Client, command, {
    expiresIn: PRESIGNED_URL_EXPIRATION,
  });
  
  // URL pública del archivo (después de subirlo)
  const fileUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  
  return {
    uploadUrl,
    fileUrl,
    key,
  };
}

/**
 * Genera una URL pre-firmada para descargar/ver un archivo de S3
 */
export async function generatePresignedDownloadUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });
  
  return await getSignedUrl(s3Client, command, { expiresIn });
}

/**
 * Elimina un archivo de S3
 */
export async function deleteFileFromS3(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });
  
  await s3Client.send(command);
}

/**
 * Extrae el key de una URL de S3
 */
export function extractKeyFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    
    // Formato: https://bucket.s3.region.amazonaws.com/key
    if (urlObj.hostname.includes('s3.amazonaws.com') || urlObj.hostname.includes('s3.')) {
      return urlObj.pathname.substring(1); // Remover el "/" inicial
    }
    
    return null;
  } catch {
    return null;
  }
}


export function getS3Config() {
  return {
    bucket: BUCKET_NAME,
    region: process.env.AWS_REGION,
    maxImageSize: 10 * 1024 * 1024, // 10MB
    maxVideoSize: 100 * 1024 * 1024, // 100MB
  };
}
