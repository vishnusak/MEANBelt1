console.log(`QnA - question model loaded`)

var mg = require('mongoose'),
    schema = mg.Schema

var QuestionSchema = new schema({
  question: {type: String, unique: true},
  desc: String,
  answers: [{type: schema.Types.ObjectId, ref: 'Answer'}]
},
{
  timestamps: true
})

var Questions = mg.model("Question", QuestionSchema)

module.exports = Questions
