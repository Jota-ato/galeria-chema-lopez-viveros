import imageCompression, { type Options } from 'browser-image-compression';

interface CompressionOptions {
    maxSizeMB?: number;
    maxWidthOrHeight?: number;
    useWebWorker?: boolean;
}

/**
 * Compress an image file in the browser (client-side).
 * @param file The original File to compress.
 * @param options Optional compression settings.
 * @returns A promise that resolves to a new compressed File.
 */
export async function compressImage(
    file: File,
    options: CompressionOptions = {}
): Promise<File> {
    const defaultOptions: Options = {
        maxSizeMB: options.maxSizeMB ?? 1,
        maxWidthOrHeight: options.maxWidthOrHeight ?? 1920,
        useWebWorker: options.useWebWorker ?? true,
    };

    try {
        const compressedBlob = await imageCompression(file, defaultOptions);

        return new File([compressedBlob], file.name, {
            type: file.type,
            lastModified: Date.now(),
        });
    } catch (error) {
        console.error('Error compressing image:', error);
        throw new Error('Failed to compress image');
    }
}