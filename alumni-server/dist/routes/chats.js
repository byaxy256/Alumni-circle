// src/routes/chat.ts
import express from 'express';
import db from '../db.js';
import { authenticate } from '../middleware/auth.js';
const router = express.Router();
/**
 * Helper function to create a consistent, sorted conversation ID between two user UIDs.
 * This ensures that the conversation between User A and User B always has the same ID,
 * regardless of who initiated it.
 * @param uid1 The UID of the first user.
 * @param uid2 The UID of the second user.
 * @returns A sorted and joined string (e.g., "uid1--uid2").
 */
const getConversationId = (uid1, uid2) => {
    if (!uid1 || !uid2) {
        throw new Error("Both user UIDs are required to generate a conversation ID.");
    }
    return [uid1, uid2].sort().join('--');
};
/**
 * @route   GET /api/chat/:otherUserId
 * @desc    Fetch the chat history between the logged-in user and another user.
 * @access  Private (Requires authentication)
 */
router.get('/:otherUserId', authenticate, async (req, res) => {
    try {
        const myUid = req.user.uid;
        const otherUserId = req.params.otherUserId;
        // Validate that the otherUserId parameter is present
        if (!otherUserId) {
            return res.status(400).json({ error: "No conversation partner specified." });
        }
        const conversationId = getConversationId(myUid, otherUserId);
        const [messages] = await db.execute("SELECT id, sender_id, message_text, created_at FROM messages WHERE conversation_id = ? ORDER BY created_at ASC", [conversationId]);
        res.json(messages || []); // Always return an array, even if it's empty
    }
    catch (err) {
        console.error("Fetch chat error:", err);
        res.status(500).json({ error: "Server error while fetching chat history." });
    }
});
/**
 * @route   POST /api/chat
 * @desc    Send a new message to another user.
 * @access  Private (Requires authentication)
 */
router.post('/', authenticate, async (req, res) => {
    try {
        const myUid = req.user.uid;
        const { recipientId, message } = req.body;
        // --- Stricter Validation ---
        if (!recipientId || typeof recipientId !== 'string') {
            return res.status(400).json({ error: "A valid recipient ID is required." });
        }
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return res.status(400).json({ error: "A non-empty message is required." });
        }
        // --- Enhanced Security ---
        if (myUid === recipientId) {
            return res.status(400).json({ error: "You cannot send a message to yourself." });
        }
        const conversationId = getConversationId(myUid, recipientId);
        const trimmedMessage = message.trim();
        const [result] = await db.execute("INSERT INTO messages (conversation_id, sender_id, recipient_id, message_text) VALUES (?, ?, ?, ?)", [conversationId, myUid, recipientId, trimmedMessage]);
        // Return the ID of the newly created message, which is useful for the frontend UI.
        res.status(201).json({
            id: result.insertId,
            message: "Message sent successfully"
        });
    }
    catch (err) {
        console.error("Send message error:", err);
        res.status(500).json({ error: "Server error while sending message." });
    }
});
export default router;
