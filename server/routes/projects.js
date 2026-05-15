import express from 'express';
import prisma from '../lib/prisma.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await prisma.projects.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get featured projects
router.get('/featured', async (req, res) => {
  try {
    const projects = await prisma.projects.findMany({
      where: { featured: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch featured projects' });
  }
});

// Create project
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, imageUrl, category, featured } = req.body;
    const project = await prisma.projects.create({
      data: { title, description, imageUrl, category, featured }
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl, category, featured } = req.body;
    const project = await prisma.projects.update({
      where: { id: Number(id) },
      data: { title, description, imageUrl, category, featured }
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.projects.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;
