console.log(`QnA - questions controller loaded`)

var Question = require('../models/question')

// Common Error logging function. Called from all functions in the controller to handle an error response from the DB
function dbError(action, error){
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  console.log(`Error in ** ${action} **`)
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  console.log(error)
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
}

module.exports = {
  getAll: function(req, res, next){
    Question.find({})
            .populate('answers')
            .sort({'createdAt': -1})
            .exec(function(err, allQuestions){
              if (!err){
                res.json(allQuestions)
              } else {
                dbError('Question:getAll', err)
                res.json({dbError: "Couldn't retrieve questions. Please try later."})
              }
            })
  },
  // ------------------------------------------------------------
  add: function(req, res, next){
    // validate the input - check for empty string
    if (!req.body['question']){
      res.json({error: "The question cannot be empty"})
    }

    // validate the input - check for short string
    if (req.body['question'].length < 10){
      res.json({error: "Too short to be considered a question. Must be atleast 10 characters long"})
    }

    var newQuestion      = new Question()
    newQuestion.question = req.body['question']
    newQuestion.desc     = req.body['desc']

    newQuestion.save(function(err, addedQuestion){
      if (!err){
        res.json(addedQuestion)
      } else {
        dbError('Question:add', err)
        res.json({dbErr: "Couldn't add question due to system problem. Please try again later"})
      }
    })
  },
  // ------------------------------------------------------------
  getOne: function(req, res, next){
    Question.find({_id:req.params['id']})
            .populate('answers')
            .exec(function(err, question){
              if (!err){
                res.json(question)
              } else {
                dbError('Question:getOne', err)
                res.json({dbErr: "Couldn't retrieve the question. Please try later."})
              }
            })
  }
}
