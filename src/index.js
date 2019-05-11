const express = require('express');
const app = express();
const db = require('./db')
const bodyParser = require('body-parser');
const Cors = require('cors')
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(Cors())

app.listen(port, () => {
  console.log(`Server Started on port : ${port}`)
})

app.get('/', (req, res) => {
  res.send(`<a href="http://localhost:4000/contacts" target="_blank">View Data</a>`)
})

app.get("/contacts", (req, res) => {

  const sql = 'SELECT * FROM contacts'
  db.all(sql, (err, data) => {
    if (err) throw err;
    console.log('data berhasil di ambil')
    res.json(data)
  });
})


app.get("/contacts/:id", (req, res) => {
  const sql = "SELECT * FROM contacts WHERE id = ?"
  const params = req.params.id

  db.get(sql, params, (err, data) => {
    if (err) throw err;
    console.log('data berhasil di ambil')
    res.json(data)
  })
})


app.post("/contacts", (req, res) => {
  const sql = "INSERT INTO contacts(fullName,phoneNumber,email,gender) values(?,?,?,?)"
  const params = [req.body.fullName, req.body.phoneNumber, req.body.email, req.body.gender]

  db.run(sql, params, (err, data) => {
    if (err) throw err;
    console.log('data berhasil di tambah')
    res.json(data)
  })
})

//edit data
app.put("/contacts/:id", (req, res, ) => {
  const sql = `UPDATE contacts SET 
    fullName = ?,
    phoneNumber = ?, 
    email = ?,
    gender = ?
    where id = ?`
  const params = [req.body.fullName, req.body.phoneNumber, req.body.email, req.body.gender, req.params.id]

  db.run(sql, params, (err, data) => {
    if (err) throw err;
    console.log('data berhasil di edit')
    res.json(data)
  })

})

// Delete data
app.delete("/contacts/:id", (req, res, ) => {
  const sql = "DELETE FROM contacts where id = ?"
  const params = req.params.id

  db.run(sql, params, (err, data) => {
    if (err) throw err;
    console.log('data berhasil di hapus')
    res.json(data)
  })
})



