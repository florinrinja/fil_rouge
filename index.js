const express = require('express');
const app = express();
const port = 8080;
const connection = require('./conf.js');
const bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/api/movies', (req, res) => {
  connection.query('SELECT * FROM movie', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des movies');
    } else {
      res.json(results);
    }
  })
})

app.get('/api/movies/name', (req, res) => {
  connection.query('SELECT name, release_year, poster FROM movie ORDER BY release_year ASC', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des movies');
    } else {
      res.json(results);
    }
  })
})

app.get('/api/movies/', (req, res) => {
  const name = req.query.name;
  connection.query(`SELECT name FROM movie WHERE name like '%${name}%' ORDER BY name ASC`, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des movies');
    } else {
      res.json(results);
    }
  })
})

app.get('/api/movies/', (req, res) => {
  const name = req.query.name;
  connection.query(`SELECT name FROM movie WHERE name like '${name}%' ORDER BY name ASC`, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des movies');
    } else {
      res.json(results);
    }
  })
})

app.get('/api/movies/', (req, res) => {
  const date = req.query.date;
  connection.query(`SELECT name, date FROM movie WHERE date >= '${date}' ORDER BY date ASC`, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des movies');
    } else {
      res.json(results);
    }
  })
})

app.get('/api/movies/', (req, res) => {
  const text = req.query.text;
  connection.query(`SELECT * FROM movie ORDER BY '${text}' ASC`, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des movies');
    } else {
      res.json(results);
    }
  })
})

app.get('/api/movies/', (req, res) => {
  const text = req.query.text;
  connection.query(`SELECT * FROM movie ORDER BY '${text}' DESC`, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des movies');
    } else {
      res.json(results);
    }
  })
})

app.post('/api/movies', (req, res) => {

  const formData = req.body;
  console.log(formData);

  connection.query('INSERT INTO movie SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un movie");
    } else {
      res.status(200).send({ id: results.insertId });
      console.log(`added id: ${results.insertId}`);
    }
  });
});

app.put('/api/movies/color/:id', (req, res) => {

  const idMovie = req.params.id;
  const color = req.query.color;
  const formData = req.body;
  console.log(formData);


  if (color) {
    connection.query('UPDATE movie SET ? WHERE id=?', [color, idMovie], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un movie");
      } else {
        res.status(200).send({ id: idMovie });
        console.log(`modified id: ${idMovie}`);
      }
    });
  } else {
    connection.query('UPDATE movie SET ? WHERE id=?', [formData, idMovie], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un movie");
      } else {
        res.status(200).send({ id: idMovie });
        console.log(`modified id: ${idMovie}`);
      }
    });
  }
});


app.delete('/api/movies/delete/:id', (req, res) => {

  const idMovie = req.params.id;

  connection.query('DELETE FROM movie WHERE id=?', [idMovie], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un movie");
    } else {
      res.status(200).send({ id: idMovie });
      console.log(`movie id: ${idMovie} deleted`)
    }
  })
})


api.delete('/api/movies/delete/color/:id', (req, res) => {
  const idMovie = req.params.id;
  connection.query(`DELETE FROM movie WHERE color = 1`, idMovie, (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la suppression d'un movie");
    } else {
      res.status(200).send({ id: idMovie });
    }
  });
})



app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${port}`);
});