// class Question3 {
//     constructor(active, chapterName, className, correctAnswer, dateTime, id, ipAddress, indexNo, option1, option2, option3, option4, option5, option6, question, questionFormat, questionType, subjectName) {
//         this.active = active;
//         this.chapterName = chapterName;
//         this.className = className;
//         this.correctAnswer = correctAnswer;
//         this.dateTime = dateTime;
//         this.id = id;
//         this.ipAddress = ipAddress;
//         this.indexNo = indexNo;
//         this.option1 = option1;
//         this.option2 = option2;
//         this.option3 = option3;
//         this.option4 = option4;
//         this.option5 = option5;
//         this.option6 = option6;
//         this.question = question;
//         this.questionFormat = questionFormat;
//         this.questionType = questionType;
//         this.subjectName = subjectName;
//     }
// }

// export default Question3;


class Question3 {
    constructor({
        ID,
        Index_No,
        Question_Type,
        Class_Name,
        Subject_Name,
        Chapter_Name,
        Question,
        Option_1,
        Option_2,
        Option_3,
        Option_4,
        Option_5,
        Option_6,
        Correct_Answer,
        Question_Format,
        Date_Time,
        IP_Address,
        Active
    }) {
        this.ID = ID;
        this.Index_No = Index_No;
        this.Question_Type = Question_Type;
        this.Class_Name = Class_Name;
        this.Subject_Name = Subject_Name;
        this.Chapter_Name = Chapter_Name;
        this.Question = Question;
        this.Option_1 = Option_1;
        this.Option_2 = Option_2;
        this.Option_3 = Option_3;
        this.Option_4 = Option_4;
        this.Option_5 = Option_5;
        this.Option_6 = Option_6;
        this.Correct_Answer = Correct_Answer;
        this.Question_Format = Question_Format;
        this.Date_Time = Date_Time; // Make sure this is a valid date object
        this.IP_Address = IP_Address;
        this.Active = Active;
    }
  }
  
  export default Question3;
  
  