console.log(`QnA - answer model loaded`)

var mg = require('mongoose'),
    schema = mg.Schema

var AnswerSchema = new schema({
  _question: {type: schema.Types.ObjectId, ref:"Question"},
  userName: {type: String, required: true},
  answer: {type: String, required: true},
  likes: {type: Number, default: 0},
  details: String
},
{
  timestamps: true
})

var Answers = mg.model("Answer", AnswerSchema)

module.exports = Answers
