import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';

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

// File upload handler
const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      const { category, template, idx } = req.params;
      const dir = path.join(CASE_ROOT, category, template);
      await fs.mkdir(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const { idx } = req.params;
      const ext = path.extname(file.originalname) || '.png';
      cb(null, `${idx}${ext}`);
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
    const imagePath = path.join(CASE_ROOT, category, template, `${idx}${path.extname(req.file.originalname)}`);

    // Update cases.json to mark this case as having an image
    const casesJsonPath = path.join(SITE_ROOT, 'src', 'data', 'cases.json');
    const casesData = JSON.parse(await fs.readFile(casesJsonPath, 'utf-8'));
    
    // Find the case and update
    let found = false;
    for (const cat of casesData.categories || []) {
      for (const c of cat.cases || []) {
        if (c.file === `${category}/${template}/${idx}.json`) {
          c.has_image = true;
          c.image = `${category}/${template}/${idx}${path.extname(req.file.originalname)}`;
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (!found) {
      // Try to find by iterating items structure
      for (const item of casesData.items || []) {
        for (const c of item.cases || []) {
          if (c.file === `${category}/${template}/${idx}.json`) {
            c.has_image = true;
            c.image = `${category}/${template}/${idx}${path.extname(req.file.originalname)}`;
            found = true;
            break;
          }
        }
        if (found) break;
      }
    }

    if (found) {
      await fs.writeFile(casesJsonPath, JSON.stringify(casesData, null, 2));
    }

    // Trigger rebuild
    try {
      await execAsync('cd ' + SITE_ROOT + ' && npm run build', { timeout: 60000 });
    } catch (e) {
      console.warn('Rebuild warning:', e.message);
    }

    res.json({
      success: true,
      path: imagePath,
      url: `/case/${category}/${template}/${idx}${path.extname(req.file.originalname)}`
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
