import fs from 'fs';
import path from 'path';

// This is the Vercel-native Serverless Function equivalent of your Express endpoint
export default function handler(req: any, res: any) {
  const resumesDir = path.join(process.cwd(), 'public', 'resumes');
  
  if (!fs.existsSync(resumesDir)) {
    return res.json({ resumeUrl: null });
  }

  try {
    const files = fs.readdirSync(resumesDir);
    const pdfFiles = files.filter(f => f.toLowerCase().endsWith('.pdf'));

    if (pdfFiles.length === 0) {
      return res.json({ resumeUrl: null });
    }

    // Sort files by modified time (newest first)
    const sortedFiles = pdfFiles.sort((a, b) => {
      const statA = fs.statSync(path.join(resumesDir, a));
      const statB = fs.statSync(path.join(resumesDir, b));
      return statB.mtime.getTime() - statA.mtime.getTime();
    });

    const activeResume = sortedFiles[0];
    res.status(200).json({ resumeUrl: `/resumes/${activeResume}` });
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
}
