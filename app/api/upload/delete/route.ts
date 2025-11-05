import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { deleteFileFromS3, extractKeyFromUrl } from '@/lib/aws-s3';

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get('url');
    
    if (!fileUrl) {
      return NextResponse.json(
        { error: 'Se requiere la URL del archivo' },
        { status: 400 }
      );
    }

    const key = extractKeyFromUrl(fileUrl);
    
    if (!key) {
      return NextResponse.json(
        { error: 'URL de archivo inválida' },
        { status: 400 }
      );
    }
    
    if (!key.includes(session.user.id)) {
      return NextResponse.json(
        { error: 'No tienes permiso para eliminar este archivo' },
        { status: 403 }
      );
    }
    
    await deleteFileFromS3(key);
    
    return NextResponse.json({
      success: true,
      message: 'Archivo eliminado exitosamente',
    });
    
  } catch (error) {
    console.error('Error eliminando archivo:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Error eliminando archivo',
      },
      { status: 500 }
    );
  }
}
