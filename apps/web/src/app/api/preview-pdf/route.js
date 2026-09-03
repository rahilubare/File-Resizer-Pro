import { PDFDocument } from "pdf-lib";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || file.type !== "application/pdf") {
      return Response.json({ error: "No valid PDF provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    
    // Create a new PDF to strip unused objects and metadata
    const srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const newDoc = await PDFDocument.create();
    
    newDoc.setTitle(file.name);
    newDoc.setProducer('File Resizer Pro');
    newDoc.setCreator('File Resizer Pro');

    const pages = await newDoc.copyPages(srcDoc, srcDoc.getPageIndices());
    pages.forEach((page) => newDoc.addPage(page));

    const compressedPdfBytes = await newDoc.save({ useObjectStreams: true });
    
    return Response.json({
      originalSize: file.size,
      compressedSize: compressedPdfBytes.length
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
