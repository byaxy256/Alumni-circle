// src/routes/content.ts
import express from 'express';
import db from '../db.js';
import { authenticate, authorize } from '../middleware/auth.js'; // We'll create this middleware
const router = express.Router();
// --- PUBLIC ROUTES (for students/alumni to view) ---
// GET /api/content/news
router.get('/news', async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM news WHERE status = 'published' ORDER BY created_at DESC");
        res.json(rows);
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});
// GET /api/content/events
router.get('/events', async (req, res) => {
    try {
        // Fetches upcoming events
        const [rows] = await db.execute("SELECT * FROM events WHERE event_date >= NOW() ORDER BY event_date ASC");
        res.json(rows);
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});
// --- PROTECTED ROUTES (for Alumni Office staff) ---
// POST /api/content/news
router.post('/news', authenticate, authorize(['admin', 'alumni_office']), async (req, res) => {
    try {
        const { title, content, target_audience } = req.body;
        const author_id = req.user.uid; // Get UID from the authenticated user
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }
        const [result] = await db.execute('INSERT INTO news (title, content, author_id, target_audience) VALUES (?, ?, ?, ?)', [title, content, author_id, target_audience || 'all']);
        res.status(201).json({ id: result.insertId, message: 'News article created successfully.' });
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});
// POST /api/content/events
router.post('/events', authenticate, authorize(['admin', 'alumni_office']), async (req, res) => {
    // You can build this route similar to the POST /news route
    res.status(501).json({ message: 'Event creation not implemented yet.' });
});
export default router;
