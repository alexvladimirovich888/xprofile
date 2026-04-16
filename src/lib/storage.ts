import { supabase } from './supabase';

/**
 * Uploads a file to Supabase Storage and returns the public URL.
 * @param file The file object to upload
 * @param bucket The name of the storage bucket
 * @returns The public URL of the uploaded file
 */
export async function uploadFile(file: File, bucket: string = 'project-assets'): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  console.log(`Starting upload to ${bucket}: ${fileName}`);
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (uploadError) {
    console.error('Supabase Storage Upload Error:', uploadError);
    throw new Error(`Storage error: ${uploadError.message} (Bucket: ${bucket})`);
  }

  console.log('Upload successful:', uploadData);

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  if (!data.publicUrl) {
    throw new Error('Failed to generate public URL for uploaded file');
  }

  return data.publicUrl;
}
