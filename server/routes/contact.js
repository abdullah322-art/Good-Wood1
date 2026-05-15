import express from 'express';
import prisma from '../lib/prisma.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Create new contact message
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    const newContact = await prisma.contact_messages.create({
      data: { name, phone, email, message }
    });
    res.status(201).json({ message: 'تم إرسال رسالتك بنجاح' });
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ أثناء إرسال الرسالة' });
  }
});

// Admin: Get all messages
router.get('/', authenticateToken, async (req, res) => {
  try {
    const messages = await prisma.contact_messages.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Admin: Update message status
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const message = await prisma.contact_messages.update({
      where: { id: Number(id) },
      data: { status }
    });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update message status' });
  }
});

// Admin: Delete message
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.contact_messages.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

export default router;
