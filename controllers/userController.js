import pool from '../config/db.js';

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM students');
    res.status(200).json({users: rows});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export const getUserById = async (req, res) => {
  const {id} = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [
      id
    ]);

    if (rows.length === 0) {
      return res.status(404).json({error: 'User not found'});
    }

    res.status(200).json({user: rows[0]});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export const createUser = async (req, res) => {
  const {firstName, lastName, age, course} = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO students (firstName, lastName, age, course) VALUES (?, ?, ?, ?)',
      [firstName, lastName, age, course]
    );

    res
      .status(201)
      .json({id: result.insertId, firstName, lastName, age, course});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export const updateUser = async (req, res) => {
  const {id} = req.params;
  const {firstName, lastName, age, course} = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE students SET firstName = ?, lastName = ?, age = ?, course = ? WHERE id = ?',
      [firstName, lastName, age, course, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({error: 'User not found'});
    }

    res.status(200).json({message: 'User updated successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export const patchUser = async (req, res) => {
  const {id} = req.params;
  const {firstName, lastName, age, course} = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE students SET firstName = COALESCE(?, firstName), lastName = COALESCE(?, lastName), age = COALESCE(?, age), course = COALESCE(?, course) WHERE id = ?',
      [firstName, lastName, age, course, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({error: 'User not found'});
    }

    res.status(200).json({message: 'User updated successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export const deleteUser = async (req, res) => {
  const {id} = req.params;

  try {
    const [result] = await pool.query('DELETE FROM students WHERE id = ?', [
      id
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({error: 'User not found'});
    }

    res.status(200).json({message: 'User deleted successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
