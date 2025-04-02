class Question {
    constructor(data) {
        this.active = data.Active || null;
        this.chapterName = data.Chapter_Name || null;
        this.className = data.Class_Name || null;
        this.correctAnswer = data.Correct_Answer || null;
        this.dateTime = data.Date_Time || null;
        this.id = data.ID || 0;
        this.ipAddress = data.IP_Address || null;
        this.indexNo = data.Index_No || null;
        this.option1 = data.Option_1 || null;
        this.option2 = data.Option_2 || null;
        this.option3 = data.Option_3 || null;
        this.option4 = data.Option_4 || null;
        this.option5 = data.Option_5 || null;
        this.option6 = data.Option_6 || null;
        this.questionText = data.Question || null;
        this.questionFormat = data.Question_Format || null;
        this.questionType = data.Question_Type || null;
        this.subjectName = data.Subject_Name || null;
    }
}

export default Question;