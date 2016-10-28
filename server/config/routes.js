console.log(`QnA - routes loaded`)

var questions = require('../controllers/questions'),
    answers   = require('../controllers/answers')

module.exports = function(app){
  app.get('/question', questions.getAll)
  app.post('/question', questions.add)
  app.get('/question/:id', questions.getOne)

  app.get('/answer/:qid', answers.getForId)
  app.post('/answer', answers.add)
  app.put('/answer/:id', answers.update)
}
