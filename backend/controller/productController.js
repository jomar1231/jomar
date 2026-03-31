import db from '../config/database.js';
import { addToProduct } from '../models/userModels.js';

export const getAllProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching products', error: err });
    }
    res.json(results);
  });
};


export const addProduct = (req, res) => {
    const { img, name, stars, ratings, price, quantity } = req.body;
    addToProduct({img, name, stars, ratings, price, quantity}, (err,result)=>{
        if (err) {
        return res.status(500).json({ message: 'Error adding product', error: err });
        }
        res.status(201).json({ message: 'Product added successfully', id: result.insertId });
    });
};

export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { img, name, stars, ratings, price, quantity } = req.body;
  db.query('UPDATE products SET img = ?, name = ?, stars = ?, ratings = ?, price = ?, quantity = ? WHERE id = ?',
    [img, name, stars, ratings, price, quantity, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating product', error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product updated successfully' });
    }
  );
};

export const deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting product', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  });
};
