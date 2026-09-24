import { Router } from "express";
import Category from "../models/Category.js";
import Brand from "../models/Brand.js";
import Product from "../models/Product.js";
import { protect, adminOnly } from "../middleware/auth.js";

const r = Router();
const slugify = (value) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

r.get("/categories", async (req, res, next) => {
  try { res.json({ categories: await Category.find().sort({ name: 1 }) }); } catch (e) { next(e); }
});
r.get("/brands", async (req, res, next) => {
  try { res.json({ brands: await Brand.find().sort({ name: 1 }) }); } catch (e) { next(e); }
});

r.use(protect, adminOnly);

r.post("/categories", async (req, res, next) => {
  try {
    const name = req.body.name?.trim();
    if (!name) return res.status(400).json({ message: "Category name is required." });
    const category = await Category.create({ name, slug: slugify(name) });
    res.status(201).json({ category });
  } catch (e) { next(e); }
});

r.put("/categories/:id", async (req, res, next) => {
  try {
    const name = req.body.name?.trim();
    if (!name) return res.status(400).json({ message: "Category name is required." });
    const old = await Category.findById(req.params.id);
    if (!old) return res.status(404).json({ message: "Category not found." });
    const category = await Category.findByIdAndUpdate(req.params.id, { name, slug: slugify(name) }, { new: true, runValidators: true });
    await Product.updateMany({ category: old.name }, { category: name });
    res.json({ category });
  } catch (e) { next(e); }
});

r.delete("/categories/:id", async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found." });
    const used = await Product.exists({ category: category.name });
    if (used) return res.status(400).json({ message: "This category is used by products. Reassign those products before deleting it." });
    await category.deleteOne();
    res.json({ message: "Category deleted." });
  } catch (e) { next(e); }
});

r.post("/brands", async (req, res, next) => {
  try {
    const name = req.body.name?.trim();
    if (!name) return res.status(400).json({ message: "Brand name is required." });
    const brand = await Brand.create({ name, slug: slugify(name) });
    res.status(201).json({ brand });
  } catch (e) { next(e); }
});

r.put("/brands/:id", async (req, res, next) => {
  try {
    const name = req.body.name?.trim();
    if (!name) return res.status(400).json({ message: "Brand name is required." });
    const old = await Brand.findById(req.params.id);
    if (!old) return res.status(404).json({ message: "Brand not found." });
    const brand = await Brand.findByIdAndUpdate(req.params.id, { name, slug: slugify(name) }, { new: true, runValidators: true });
    await Product.updateMany({ brand: old.name }, { brand: name });
    res.json({ brand });
  } catch (e) { next(e); }
});

r.delete("/brands/:id", async (req, res, next) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: "Brand not found." });
    const used = await Product.exists({ brand: brand.name });
    if (used) return res.status(400).json({ message: "This brand is used by products. Reassign those products before deleting it." });
    await brand.deleteOne();
    res.json({ message: "Brand deleted." });
  } catch (e) { next(e); }
});

export default r;
