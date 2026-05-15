import express from 'express';
import prisma from '../lib/prisma.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await prisma.products.findMany({
      include: { images: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Create product
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description, price, oldPrice, category, featured, available, images } = req.body;
    
    const product = await prisma.products.create({
      data: {
        name,
        description,
        price: price ? parseFloat(price) : null,
        oldPrice: oldPrice ? parseFloat(oldPrice) : null,
        category,
        featured: featured || false,
        available: available !== undefined ? available : true,
        images: {
          create: images && images.length > 0 ? images.map(url => ({ url })) : []
        }
      },
      include: { images: true }
    });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product', details: error.message });
  }
});

// Update product
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, oldPrice, category, featured, available, images } = req.body;
    
    // Using a transaction to delete old images and insert new ones
    const product = await prisma.$transaction(async (prisma) => {
      // First update basic product info
      const updated = await prisma.products.update({
        where: { id: Number(id) },
        data: {
          name,
          description,
          price: price ? parseFloat(price) : null,
          oldPrice: oldPrice ? parseFloat(oldPrice) : null,
          category,
          featured,
          available
        }
      });
      
      // If images array is provided, replace all images
      if (images && Array.isArray(images)) {
        await prisma.product_images.deleteMany({
          where: { productId: Number(id) }
        });
        
        if (images.length > 0) {
          await prisma.product_images.createMany({
            data: images.map(url => ({ url, productId: Number(id) }))
          });
        }
      }
      
      return prisma.products.findUnique({
        where: { id: Number(id) },
        include: { images: true }
      });
    });
    
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.products.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;
