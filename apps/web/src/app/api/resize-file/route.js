import sharp from "sharp";
import { PDFDocument } from "pdf-lib";

export async function POST(request) {
  try {
    const url = new URL(request.url);
    const isPreview = url.searchParams.get("preview") === "true";

    const formData = await request.formData();
    const file = formData.get("file");
    const settings = JSON.parse(formData.get("settings") || "{}");

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    // Get file details
    const fileName = file.name;
    const fileExtension = fileName.slice(fileName.lastIndexOf("."));
    const fileNameWithoutExt = fileName.slice(0, fileName.lastIndexOf("."));
    const backupFileName = `${fileNameWithoutExt}_old${fileExtension}`;

    const originalSize = file.size;

    if (file.type.startsWith("image/")) {
      // Process images with sharp for real compression
      const result = await processImageFile(file, settings);
      const savings = originalSize - result.size;

      if (isPreview) {
        return Response.json({ compressedSize: result.size, savings });
      }

      return new Response(result.buffer, {
        status: 200,
        headers: {
          "Content-Type": result.contentType || file.type,
          "Content-Disposition": `attachment; filename="${fileName}"`,
          "Content-Length": result.buffer.byteLength.toString(),
          "X-Original-Size": originalSize.toString(),
          "X-New-Size": result.size.toString(),
          "X-Savings": savings.toString(),
          "X-Backup-Name": backupFileName,
        },
      });
    } else if (file.type === "application/pdf") {
      // Process PDFs
      try {
        const result = await processPDFFile(file, settings);
        const savings = originalSize - result.size;

        if (isPreview) {
          return Response.json({ compressedSize: result.size, savings });
        }

        return new Response(result.buffer, {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${fileName}"`,
            "Content-Length": result.buffer.byteLength.toString(),
            "X-Original-Size": originalSize.toString(),
            "X-New-Size": result.size.toString(),
            "X-Savings": savings.toString(),
            "X-Backup-Name": backupFileName,
            "X-Compression-Applied": result.compressionApplied
              ? "true"
              : "false",
          },
        });
      } catch (pdfError) {
        console.error("PDF processing error:", pdfError);
        throw new Error(`PDF compression failed: ${pdfError.message}`);
      }
    } else {
      return Response.json({ error: "Unsupported file type" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing file:", error);
    return Response.json(
      {
        error: `Failed to process file: ${error.message}`,
      },
      { status: 500 },
    );
  }
}

async function processImageFile(file, settings) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    const quality = settings.quality || 80;
    const isAuto = settings.autoOptimize === true;
    
    // Auto mode forces original dimensions, manual mode uses settings
    const maxWidth = isAuto ? undefined : (settings.maxWidth || 1920);
    const maxHeight = isAuto ? undefined : (settings.maxHeight || 1080);

    // Determine output format from the file type
    const mimeType = file.type.toLowerCase();

    // Start with sharp pipeline: resize within max dimensions (no upscaling)
    let pipeline = sharp(inputBuffer);
    
    if (maxWidth || maxHeight) {
      pipeline = pipeline.resize(maxWidth, maxHeight, {
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    let contentType = file.type;

    // Apply format-specific compression
    if (mimeType === "image/jpeg" || mimeType === "image/jpg") {
      if (isAuto) {
        pipeline = pipeline.jpeg({ quality: 75, mozjpeg: true, trellisQuantisation: true, overshootDeringing: true });
      } else {
        pipeline = pipeline.jpeg({ quality, mozjpeg: true });
      }
      contentType = "image/jpeg";
    } else if (mimeType === "image/png") {
      if (isAuto) {
        pipeline = pipeline.png({ palette: true, quality: 80, effort: 10 });
      } else {
        const compressionLevel = Math.round(9 - (quality / 100) * 6);
        pipeline = pipeline.png({ compressionLevel, effort: 8 });
      }
      contentType = "image/png";
    } else if (mimeType === "image/webp") {
      if (isAuto) {
        pipeline = pipeline.webp({ quality: 80, smartSubsample: true, effort: 6 });
      } else {
        pipeline = pipeline.webp({ quality });
      }
      contentType = "image/webp";
    } else if (mimeType === "image/tiff") {
      pipeline = pipeline.tiff({ quality: isAuto ? 80 : quality, compression: "lzw" });
      contentType = "image/tiff";
    } else {
      if (isAuto) {
        pipeline = pipeline.jpeg({ quality: 75, mozjpeg: true, trellisQuantisation: true });
      } else {
        pipeline = pipeline.jpeg({ quality, mozjpeg: true });
      }
      contentType = "image/jpeg";
    }

    const outputBuffer = await pipeline.toBuffer();

    let finalBuffer = outputBuffer;
    let finalType = contentType;

    // Fix: Never allow the size to increase. Always fallback to original.
    if (outputBuffer.byteLength >= inputBuffer.byteLength) {
      console.log(`Compression increased size. Falling back to original.`);
      finalBuffer = inputBuffer;
      finalType = file.type;
    }

    console.log(
      `Image processed: ${file.name} | ${inputBuffer.byteLength} -> ${finalBuffer.byteLength} bytes (${(((inputBuffer.byteLength - finalBuffer.byteLength) / inputBuffer.byteLength) * 100).toFixed(1)}% reduction)`,
    );

    return {
      buffer: finalBuffer,
      size: finalBuffer.byteLength,
      contentType: finalType,
    };
  } catch (error) {
    throw new Error(`Image processing failed: ${error.message}`);
  }
}

async function processPDFFile(file, settings) {
  try {
    const originalSize = file.size;
    console.log(`Processing PDF: ${file.name} (${originalSize} bytes)`);

    // Validate PDF header
    const headerCheck = await validatePDFHeader(file);
    if (!headerCheck.valid) {
      throw new Error(`Invalid PDF file: ${headerCheck.error}`);
    }

    // Local PDF compression fallback using pdf-lib
    const arrayBuffer = await file.arrayBuffer();
    
    // Create a new PDF to strip unused objects and metadata
    const srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const newDoc = await PDFDocument.create();
    
    // Set metadata to minimal to save bytes
    newDoc.setTitle(file.name);
    newDoc.setProducer('File Resizer Pro');
    newDoc.setCreator('File Resizer Pro');

    // Copy all pages
    const pages = await newDoc.copyPages(srcDoc, srcDoc.getPageIndices());
    pages.forEach((page) => newDoc.addPage(page));

    // Save with useObjectStreams for better internal compression
    const compressedPdfBytes = await newDoc.save({ useObjectStreams: true });
    
    let finalBuffer = Buffer.from(compressedPdfBytes);
    
    // Fix: Never allow the size to increase. Always fallback to original.
    if (finalBuffer.byteLength >= originalSize) {
      console.log(`PDF structural compression increased size or did nothing. Falling back to original.`);
      finalBuffer = Buffer.from(arrayBuffer);
    }

    console.log(
      `PDF processing: ${originalSize} bytes -> ${finalBuffer.byteLength} bytes`,
    );

    return {
      buffer: finalBuffer,
      size: finalBuffer.byteLength,
      compressionApplied: finalBuffer.byteLength < originalSize,
      originalSize: originalSize,
    };
  } catch (error) {
    throw new Error(`PDF processing failed: ${error.message}`);
  }
}

// Utility function to validate PDF header
async function validatePDFHeader(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const header = new Uint8Array(arrayBuffer, 0, 8);
    const headerString = String.fromCharCode.apply(null, header);

    if (!headerString.startsWith("%PDF-")) {
      return { valid: false, error: "Missing PDF header signature" };
    }

    return { valid: true };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// Utility function to validate PDF buffer integrity
async function validatePDFBuffer(buffer) {
  try {
    // Check PDF header
    const header = buffer.slice(0, 8);
    const headerString = header.toString("ascii");

    if (!headerString.startsWith("%PDF-")) {
      return false;
    }

    // Check for EOF marker
    const footer = buffer.slice(-10);
    const footerString = footer.toString("ascii");

    if (!footerString.includes("EOF")) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}
