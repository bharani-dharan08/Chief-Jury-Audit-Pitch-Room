import JSZip from 'jszip';

export interface ParsedFileResult {
  fileName: string;
  fileSize: number;
  mimeType: string;
  extractedText: string;
  base64?: string;
  slideCount?: number;
}

/**
 * Extracts text from PPTX files by parsing the slide XML nodes inside the zip container.
 */
export async function extractTextFromPptx(file: File): Promise<ParsedFileResult> {
  const zip = new JSZip();
  const zipContent = await zip.loadAsync(file);
  const slideFiles = Object.keys(zipContent.files).filter((fileName) =>
    fileName.startsWith('ppt/slides/slide') && fileName.endsWith('.xml')
  );

  // Sort slides in natural order: slide1.xml, slide2.xml, ...
  slideFiles.sort((a, b) => {
    const numA = parseInt(a.replace(/[^0-9]/g, ''), 10) || 0;
    const numB = parseInt(b.replace(/[^0-9]/g, ''), 10) || 0;
    return numA - numB;
  });

  const slideTexts: string[] = [];

  for (let i = 0; i < slideFiles.length; i++) {
    const slideFile = zipContent.files[slideFiles[i]];
    const xmlText = await slideFile.async('text');
    // Extract text inside <a:t>...</a:t> tags in PPTX OpenXML
    const textMatches = xmlText.match(/<a:t[^>]*>([^<]+)<\/a:t>/g);
    let slideContent = '';
    if (textMatches && textMatches.length > 0) {
      slideContent = textMatches
        .map((m) => m.replace(/<[^>]+>/g, '').trim())
        .filter((t) => t.length > 0)
        .join(' ');
    }
    slideTexts.push(`SLIDE ${i + 1}:\n${slideContent || '(No text content detected)'}`);
  }

  const base64 = await fileToBase64(file);

  return {
    fileName: file.name,
    fileSize: file.size,
    mimeType: file.type || 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    extractedText: slideTexts.join('\n\n'),
    base64,
    slideCount: slideFiles.length || 1,
  };
}

/**
 * Handles PDF files by converting to base64 for direct Gemini native PDF multimodal analysis,
 * plus optional text extraction.
 */
export async function extractTextFromPdf(file: File): Promise<ParsedFileResult> {
  const base64 = await fileToBase64(file);
  return {
    fileName: file.name,
    fileSize: file.size,
    mimeType: 'application/pdf',
    extractedText: `[PDF Presentation Document: "${file.name}" (${(file.size / 1024).toFixed(1)} KB) uploaded for Chief Jury multimodal audit.]`,
    base64,
  };
}

/**
 * Handles Plain Text / Markdown / Presentation Notes
 */
export async function extractTextFromTextFile(file: File): Promise<ParsedFileResult> {
  const text = await file.text();
  return {
    fileName: file.name,
    fileSize: file.size,
    mimeType: file.type || 'text/plain',
    extractedText: text,
  };
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Strip data URL prefix like "data:application/pdf;base64,"
      const base64Only = result.split(',')[1] || result;
      resolve(base64Only);
    };
    reader.onerror = (error) => reject(error);
  });
}
