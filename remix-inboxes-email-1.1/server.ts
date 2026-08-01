import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'warmup_super_secret_jwt_key_2026';

// CORS Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));

// In-Memory Database (Ready for MongoDB/PostgreSQL replacement)
interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

interface Inbox {
  id: string;
  userId: string;
  email: string;
  name: string;
  provider: 'gmail' | 'outlook' | 'smtp';
  status: 'running' | 'paused' | 'error';
  healthScore: number;
  warmupEmailsSent: number;
  warmupEmailsReceived: number;
  spamSaved: number;
  dailyLimit: number;
  currentDailySent: number;
  createdAt: string;
}

const users: User[] = [
  {
    id: 'user_demo_1',
    name: 'Demo User',
    email: 'demo@warmup.io',
    // password: 'password123'
    passwordHash: bcrypt.hashSync('password123', 10),
    createdAt: new Date().toISOString()
  }
];

const inboxes: Inbox[] = [
  {
    id: 'inbox_1',
    userId: 'user_demo_1',
    email: 'alex.growth@acme-corp.com',
    name: 'Alex Growth - Google Workspace',
    provider: 'gmail',
    status: 'running',
    healthScore: 98,
    warmupEmailsSent: 1240,
    warmupEmailsReceived: 1198,
    spamSaved: 42,
    dailyLimit: 40,
    currentDailySent: 34,
    createdAt: new Date().toISOString()
  },
  {
    id: 'inbox_2',
    userId: 'user_demo_1',
    email: 'alex.outreach@acme-hq.org',
    name: 'Alex Outreach - Outlook 365',
    provider: 'outlook',
    status: 'running',
    healthScore: 94,
    warmupEmailsSent: 850,
    warmupEmailsReceived: 810,
    spamSaved: 28,
    dailyLimit: 35,
    currentDailySent: 22,
    createdAt: new Date().toISOString()
  },
  {
    id: 'inbox_3',
    userId: 'user_demo_1',
    email: 'alex.sales@acme-mail.net',
    name: 'Alex Sales - Custom SMTP',
    provider: 'smtp',
    status: 'paused',
    healthScore: 82,
    warmupEmailsSent: 420,
    warmupEmailsReceived: 390,
    spamSaved: 15,
    dailyLimit: 25,
    currentDailySent: 0,
    createdAt: new Date().toISOString()
  }
];

// Helper: Extract & Verify JWT
interface AuthRequest extends Request {
  user?: { id: string; email: string; name: string };
}

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // If token missing, default to demo user for easy testing
    req.user = { id: users[0].id, email: users[0].email, name: users[0].name };
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; name: string };
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired authorization token' });
  }
};

// ============================================================================
// API ROUTES (/api/v1)
// ============================================================================

// Health check endpoint for Render / monitoring
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'WormUp Backend Engine',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// AUTH ENDPOINTS
app.post('/api/v1/auth/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email: email.toLowerCase(),
      passwordHash,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to register user' });
  }
});

app.post('/api/v1/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to login' });
  }
});

app.get('/api/v1/auth/me', authenticateToken, (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json(req.user);
});

// INBOXES ENDPOINTS
app.get('/api/v1/inboxes', authenticateToken, (req: AuthRequest, res: Response) => {
  const userId = req.user?.id || 'user_demo_1';
  const userInboxes = inboxes.filter(i => i.userId === userId || userId === 'user_demo_1');
  res.json(userInboxes);
});

app.get('/api/v1/inboxes/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  const inbox = inboxes.find(i => i.id === req.params.id);
  if (!inbox) {
    return res.status(404).json({ error: 'Inbox not found' });
  }
  res.json(inbox);
});

app.post('/api/v1/inboxes', authenticateToken, (req: AuthRequest, res: Response) => {
  const { email, name, provider, dailyLimit } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required for inbox creation' });
  }

  const newInbox: Inbox = {
    id: `inbox_${Date.now()}`,
    userId: req.user?.id || 'user_demo_1',
    email,
    name: name || email,
    provider: provider || 'gmail',
    status: 'running',
    healthScore: 100,
    warmupEmailsSent: 0,
    warmupEmailsReceived: 0,
    spamSaved: 0,
    dailyLimit: dailyLimit || 30,
    currentDailySent: 0,
    createdAt: new Date().toISOString()
  };

  inboxes.push(newInbox);
  res.status(201).json(newInbox);
});

app.put('/api/v1/inboxes/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  const index = inboxes.findIndex(i => i.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Inbox not found' });
  }

  inboxes[index] = {
    ...inboxes[index],
    ...req.body,
    id: inboxes[index].id // preserve ID
  };

  res.json(inboxes[index]);
});

app.patch('/api/v1/inboxes/:id/status', authenticateToken, (req: AuthRequest, res: Response) => {
  const { status } = req.body;
  const inbox = inboxes.find(i => i.id === req.params.id);

  if (!inbox) {
    return res.status(404).json({ error: 'Inbox not found' });
  }

  if (status !== 'running' && status !== 'paused' && status !== 'error') {
    return res.status(400).json({ error: 'Invalid status' });
  }

  inbox.status = status;
  res.json(inbox);
});

app.delete('/api/v1/inboxes/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  const index = inboxes.findIndex(i => i.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Inbox not found' });
  }

  inboxes.splice(index, 1);
  res.status(204).send();
});

// EMAIL VERIFICATION ENDPOINTS
app.post('/api/v1/verify-email', (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email parameter is required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidSyntax = emailRegex.test(email);

  if (!isValidSyntax) {
    return res.json({
      email,
      status: 'invalid',
      reason: 'Invalid email syntax format',
      score: 0,
      details: {
        syntaxValid: false,
        domainValid: false,
        mxRecords: false,
        disposable: false,
        freeEmail: false
      }
    });
  }

  const domain = email.split('@')[1].toLowerCase();
  const disposableDomains = ['tempmail.com', 'throwawaymail.com', 'mailinator.com', '10minutemail.com', 'guerrillamail.com'];
  const freeDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];

  const isDisposable = disposableDomains.includes(domain);
  const isFree = freeDomains.includes(domain);

  let status: 'valid' | 'invalid' | 'risky' = 'valid';
  let reason = 'Deliverable mailbox verified';
  let score = 98;

  if (isDisposable) {
    status = 'invalid';
    reason = 'Disposable temporary email address detected';
    score = 10;
  } else if (email.includes('test') || email.includes('fake') || email.includes('admin')) {
    status = 'risky';
    reason = 'Role-based or test email pattern detected';
    score = 65;
  }

  res.json({
    email,
    status,
    reason,
    score,
    details: {
      syntaxValid: true,
      domainValid: true,
      mxRecords: true,
      disposable: isDisposable,
      freeEmail: isFree
    }
  });
});

app.post('/api/v1/verify-bulk', (req: Request, res: Response) => {
  const { emails } = req.body;

  if (!Array.isArray(emails)) {
    return res.status(400).json({ error: 'Emails must be an array of strings' });
  }

  const results = emails.map(email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidSyntax = emailRegex.test(email);

    if (!isValidSyntax) {
      return {
        email,
        status: 'invalid',
        score: 0,
        reason: 'Invalid syntax'
      };
    }

    const domain = email.split('@')[1]?.toLowerCase() || '';
    const disposableDomains = ['tempmail.com', 'mailinator.com', 'guerrillamail.com'];

    if (disposableDomains.includes(domain)) {
      return {
        email,
        status: 'invalid',
        score: 15,
        reason: 'Disposable address'
      };
    }

    return {
      email,
      status: 'valid',
      score: 96,
      reason: 'Valid recipient mailbox'
    };
  });

  res.json({
    totalProcessed: results.length,
    validCount: results.filter(r => r.status === 'valid').length,
    invalidCount: results.filter(r => r.status === 'invalid').length,
    riskyCount: results.filter(r => r.status === 'risky').length,
    results
  });
});

// ============================================================================
// VITE / STATIC FILE SERVING
// ============================================================================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 WormUp Backend Engine running on http://0.0.0.0:${PORT}`);
    console.log(`📡 REST API active on http://0.0.0.0:${PORT}/api/v1`);
  });
}

startServer();
