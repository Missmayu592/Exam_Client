class ModelQuestionAnswer {
    constructor(answers = [], questionType = '') {
        this.answers = answers; // Array of QuestionAnswer objects
        this.questionType = questionType; // String
    }
}

export default ModelQuestionAnswer;