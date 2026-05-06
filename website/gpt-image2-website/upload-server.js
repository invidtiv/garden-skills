import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import sharp from 'sharp';

const execAsync = promisify(exec);
const app = express();
const PORT = process.env.UPLOAD_PORT || 3002;

// Case root where images should be saved
const CASE_ROOT = '/root/.openclaw/workspace/garden-skills/website/gpt-image2-website/public/case';
const SITE_ROOT = '/root/.openclaw/workspace/garden-skills/website/gpt-image2-website';

// Enable CORS for the frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// File upload handler - store temporarily
const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      const dir = path.join(SITE_ROOT, 'tmp-uploads');
      await fs.mkdir(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, `upload-${Date.now()}${path.extname(file.originalname)}`);
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PNG, JPG, WebP images allowed'));
    }
  }
});

// Upload endpoint: POST /upload/:category/:template/:idx
app.post('/upload/:category/:template/:idx', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const { category, template, idx } = req.params;
    const targetDir = path.join(CASE_ROOT, category, template);
    await fs.mkdir(targetDir, { recursive: true });

    const pngPath = path.join(targetDir, `${idx}.png`);
    const thumbPath = path.join(targetDir, `${idx}-thumb.webp`);

    // Convert to PNG (max 1600px width to keep files reasonable)
    await sharp(req.file.path, { failOn: 'none' })
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .png({ compressionLevel: 6 })
      .toFile(pngPath);

    // Generate thumbnail
    await sharp(pngPath, { failOn: 'none' })
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 78, effort: 4 })
      .toFile(thumbPath);

    // Clean up temp file
    await fs.unlink(req.file.path).catch(() => {});

    // Update _mapping.json to mark as having image
    const mappingPath = path.join(CASE_ROOT, '_mapping.json');
    const mapping = JSON.parse(await fs.readFile(mappingPath, 'utf-8'));
    
    let mappingUpdated = false;
    for (const item of mapping.items || []) {
      if (item.category !== category || item.template_basename !== template) continue;
      for (const c of item.cases || []) {
        if (String(c.idx) === String(idx)) {
          c.has_image = true;
          mappingUpdated = true;
          break;
        }
      }
    }
    
    if (mappingUpdated) {
      await fs.writeFile(mappingPath, JSON.stringify(mapping, null, 2));
    }

    // Rebuild cases.json and site
    try {
      await execAsync('cd ' + SITE_ROOT + ' && npm run build:data', { timeout: 60000 });
      await execAsync('cd ' + SITE_ROOT + ' && npm run build', { timeout: 60000 });
    } catch (e) {
      console.warn('Rebuild warning:', e.message);
    }

    res.json({
      success: true,
      path: pngPath,
      thumb: thumbPath,
      url: `/case/${category}/${template}/${idx}.png`,
      thumb_url: `/case/${category}/${template}/${idx}-thumb.webp`
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Upload server running on http://0.0.0.0:${PORT}`);
  console.log(`Tailscale: http://100.84.218.5:${PORT}`);
});
