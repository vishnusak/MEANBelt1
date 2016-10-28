console.log(`QnA - answers controller loaded`)

var Answer   = require('../models/answer'),
    Question = require('../models/question')

// Common Error logging function. Called from all functions in the controller to handle an error response from the DB
function dbError(action, error){
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  console.log(`Error in ** ${action} **`)
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  console.log(error)
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
}

module.exports = {
  getForId: function(req, res, next){
    Answer.find({qid: req.params['qid']})
            .sort({'likes': -1})
            .exec(function(err, allAnswers){
              if (!err){
                res.json(allAnswers)
              } else {
                dbError('Answer:getForId', err)
                res.json({dbErr: "Couldn't retrieve answers for this question. Please try later."})
              }
            })
  },
  // ------------------------------------------------------------
  add: function(req, res, next){
    // validate the input - check for empty string
    if (!req.body['answer']){
      res.json({error: "The answer cannot be empty"})
    }

    // validate the input - check for short string
    if (req.body['answer'].length < 5){
      res.json({error: "Too short to be considered an answer. Must be atleast 5 characters long"})
    }

    var newAnswer       = new Answer()
    newAnswer.answer    = req.body['answer']
    newAnswer.details   = req.body['details']
    newAnswer._question = req.body['qid']
    newAnswer.userName  = req.body['userName']

    Question.findOne({_id: req.body['qid']})
            .exec(function(err, question){
              question['answers'].push(newAnswer)
              newAnswer.save(function(err, addedAnswer){
                if (!err){
                  question.save(function(err, updatedQuestion){
                    if (!err){
                      res.json(updatedQuestion)
                    } else {
                      dbError('Answer:add-saveQuestion', err)
                      res.json({dbErr: "Couldn't add the answer to DB. Please try again later"})
                    }
                  })
                } else {
                  dbError('Answer:add-saveAnswer', err)
                  res.json({dbErr: "Couldn't add the answer to DB. Please try again later"})
                }
              })
            })
  },
  // ------------------------------------------------------------
  update: function(req, res, next){
    Answer.findOne({_id:req.params['id']})
          .exec(function(err, answer){
            if (!err){
              answer['likes'] += 1

              answer.save(function(err, updatedAnswer){
                if (!err){
                  res.json(updatedAnswer)
                } else {
                  dbError('Answer:update-save', err)
                  res.json({dbErr: "Couldn't update the likes for this answer. Please try later."})
                }
              })
            } else {
              dbError('Answer:update-find', err)
              res.json({dbErr: "Couldn't update the likes for this answer. Please try later."})
            }
          })
  }
}
