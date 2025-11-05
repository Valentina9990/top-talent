import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { generatePresignedUploadUrl, type FileType, type PresignedUrlOptions } from '@/lib/aws-s3';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { fileType, fileName, fileSize, contentType } = body;
    
    if (!fileType || !fileName || !fileSize || !contentType) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: fileType, fileName, fileSize, contentType' },
        { status: 400 }
      );
    }
 
    if (!['image', 'video'].includes(fileType)) {
      return NextResponse.json(
        { error: 'Tipo de archivo inválido. Debe ser "image" o "video"' },
        { status: 400 }
      );
    }
    
    if (typeof fileSize !== 'number' || fileSize <= 0) {
      return NextResponse.json(
        { error: 'Tamaño de archivo inválido' },
        { status: 400 }
      );
    }

    const options: PresignedUrlOptions = {
      fileType: fileType as FileType,
      fileName,
      fileSize,
      contentType,
    };
    
    const result = await generatePresignedUploadUrl(options, session.user.id);
    
    return NextResponse.json({
      success: true,
      data: result,
    });
    
  } catch (error) {
    console.error('Error generando URL pre-firmada:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Error generando URL pre-firmada',
      },
      { status: 500 }
    );
  }
}
