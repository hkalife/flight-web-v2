const express = require('express')
const app = express()
const port = 3000
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const Cors = require("cors");
var bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
app.use(Cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.get('/aeroportos', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')

  let aeroportos = []
  db.collection('aeroporto').get().then(snapshot => {
    snapshot.forEach((doc) => {
      aeroportos.push(doc.data());
    })
    res.send(aeroportos);
  }).catch(error => {
    res.status(500).send(error);
  })
})

app.get('/aeroportos/:id', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  db.collection('aeroporto').doc(req.params.id).get().then((response) => {
    res.send(response.data())
  }).catch(error => {
    res.status(500).send(error);
  })
})

app.post('/aeroportos', jsonParser, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')

  let newDoc = db.collection('aeroporto').doc()
  const newAirport = {
    id: newDoc.id,
    ...req.body
  }
  newDoc.set(newAirport).then(() => {
    res.send(newAirport)
  }).catch(error => {
    res.status(500).send(error);
  })
})

app.put('/aeroportos/:id', jsonParser, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  db.collection('aeroporto').doc(req.params.id).update(req.body).then(() => {
    res.send(req.body)
  }).catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/aeroportos/:id', jsonParser, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  db.collection('aeroporto').doc(req.params.id).delete().then(() => {
    res.send(req.body)
  }).catch(error => {
    res.status(500).send(error);
  })
})

app.listen(3000);