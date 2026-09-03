import fs from 'fs';
import path from 'path';

async function testApi() {
  const filePath = path.join(process.cwd(), 'src/app/favicon.ico'); // any file
  // Wait, I need a PNG or JPEG to trigger the sharp pipeline
  // Let's create a dummy PNG
  const buffer = Buffer.from('89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c63000100000500010d0a2db40000000049454e44ae426082', 'hex');
  
  const formData = new FormData();
  formData.append('file', new Blob([buffer], { type: 'image/png' }), 'test.png');
  formData.append('settings', JSON.stringify({ quality: 50 }));

  try {
    console.log('Fetching...');
    const result = await fetch('http://localhost:4000/api/resize-file', {
      method: 'POST',
      body: formData
    });
    
    console.log('Status:', result.status);
    console.log('Headers:');
    result.headers.forEach((v, k) => console.log(k, v));
    
    const arrayBuffer = await result.arrayBuffer();
    console.log('Response byte length:', arrayBuffer.byteLength);
  } catch (err) {
    console.error(err);
  }
}

testApi();
