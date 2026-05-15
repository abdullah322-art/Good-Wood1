import express from 'express';
import prisma from '../lib/prisma.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await prisma.services.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Admin: Create service
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, icon } = req.body;
    const service = await prisma.services.create({
      data: { title, description, icon }
    });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// Admin: Update service
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, icon } = req.body;
    const service = await prisma.services.update({
      where: { id: Number(id) },
      data: { title, description, icon }
    });
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// Admin: Delete service
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.services.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

export default router;
