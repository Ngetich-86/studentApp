import sql from 'mssql'
import config from '../Db/config.js'

// Getting all students
export const getStudents = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        let users = await pool.request().query('SELECT * FROM students');
        res.json(users.recordset);
    } catch (error) {
        res.status(500).json({message: `Something went wrong. ${error}`});
    } finally {
        sql.close();
    }
}

// Adding a new student
export const addStudent = async (req, res) => {
    const { name, email } = req.body;
    try {
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input('name', sql.VarChar, name)
            .input('email', sql.VarChar, email)
            .query('INSERT INTO students (name, email) VALUES (@name, @email)');
        res.status(200).json({message: 'Student added successfully!'});
    } catch (error) {
        res.status(404).json({ Message: `Failed to add Student. ${error.message}` });
    } finally {
        sql.close();
    }
}

// Getting a single student
export const getStudent = async (req, res) => {
    const { id } = req.params;
    try {
        let pool = await sql.connect(config.sql);
        let user = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM students WHERE id = @id');
        res.json(user.recordset);
    } catch (error) {
        res.status(404).json({ Message: `No Student with the id: ${id}. ${error.message}` });
    } finally {
        sql.close();
    }
}

// Updating a student
export const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.VarChar, name)
            .input('email', sql.VarChar, email)
            .query('UPDATE students SET name = @name, email = @email WHERE id = @id');
            res.status(200).json({message: 'Student updated successfully!'});
    } catch (error) {
        res.status(500).json({message: `Something went wrong. ${error}`});
    } finally {
        sql.close();
    }
}

// Deleting a student
export const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM students WHERE id = @id');
            res.status(200).json({message: 'Student deleted  successfully!'});
    } catch (error) {
        res.status(500).json({message: `Something went wrong. ${error}`});
    } finally {
        sql.close();
    }
}