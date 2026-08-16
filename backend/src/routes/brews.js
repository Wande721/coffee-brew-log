const express = require('express');
const { eq, desc } = require('drizzle-orm');
const { db } = require('../db');
const { brews } = require('../db/schema');
const { validateBrew } = require('../middleware/validateBrew');

const router = express.Router();

// GET /api/brews?method=Espresso
// READ (list) — optionally filtered by brew method via a query string param.
router.get('/', async (req, res, next) => {
  try {
    const { method } = req.query;

    const rows = method
      ? await db.select().from(brews).where(eq(brews.method, method)).orderBy(desc(brews.createdAt))
      : await db.select().from(brews).orderBy(desc(brews.createdAt));

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
});

// GET /api/brews/:id
// READ (single) — used to pre-fill the edit form.
router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ errors: ['id must be a number'] });
    }

    const [brew] = await db.select().from(brews).where(eq(brews.id, id));

    if (!brew) {
      return res.status(404).json({ errors: ['Brew not found'] });
    }

    res.status(200).json(brew);
  } catch (err) {
    next(err);
  }
});

// POST /api/brews
// CREATE — validateBrew runs first and short-circuits on bad input.
router.post('/', validateBrew, async (req, res, next) => {
  try {
    const { coffeeName, method, roastLevel, grindSize, brewTime, rating, notes } = req.body;

    const [created] = await db
      .insert(brews)
      .values({
        coffeeName: coffeeName.trim(),
        method,
        roastLevel,
        grindSize,
        brewTime: String(brewTime).trim(),
        rating: Number(rating),
        notes: notes.trim(),
      })
      .returning();

    // 201 Created: a new resource now exists at /api/brews/:id
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

// PUT /api/brews/:id
// UPDATE — full replacement of an existing brew's fields.
router.put('/:id', validateBrew, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ errors: ['id must be a number'] });
    }

    const { coffeeName, method, roastLevel, grindSize, brewTime, rating, notes } = req.body;

    const [existing] = await db.select().from(brews).where(eq(brews.id, id));
    if (!existing) {
      return res.status(404).json({ errors: ['Brew not found'] });
    }

    const [updated] = await db
      .update(brews)
      .set({
        coffeeName: coffeeName.trim(),
        method,
        roastLevel,
        grindSize,
        brewTime: String(brewTime).trim(),
        rating: Number(rating),
        notes: notes.trim(),
      })
      .where(eq(brews.id, id))
      .returning();

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/brews/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ errors: ['id must be a number'] });
    }

    const [existing] = await db.select().from(brews).where(eq(brews.id, id));
    if (!existing) {
      return res.status(404).json({ errors: ['Brew not found'] });
    }

    await db.delete(brews).where(eq(brews.id, id));

    // 204 No Content: the delete succeeded, there's nothing to send back.
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;