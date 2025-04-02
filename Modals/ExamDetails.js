// import Question from "./Question";
import Question1 from "./Question1";
import Question2 from "./Question2";
import Question3 from "./Question3";
import Question4 from "./Question4";
import Question5 from "./Question5";
import Question6 from "./Question6";
import Question7 from "./Question7";
import Question8 from "./Question8";
class ExamDetails {
    constructor(data) {
    

        this.ID = data.ID;
        this.Index_No = data.Index_No;
        this.Class_Name = data.Class_Name;
        this.Subject_Name = data.Subject_Name;
        this.Seat_No = data.Seat_No;
        this.Name = data.Name;
        this.Mother_Name = data.Mother_Name;
        this.Email_Id = data.Email_Id;
        this.Mobile_No = data.Mobile_No;
        this.Date_Of_Birth = data.Date_Of_Birth;
        this.Date_Time = data.Date_Time;
        this.IP_Address = data.IP_Address;
        this.Active = data.Active;
        this.Paper_Name = data.Paper_Name;
        this.Password = data.Password;
        this.Duration = data.Duration;
        this.Exam_Screen = data.Exam_Screen;
        this.Time = data.Time;

        // this.Question1 = 
        this.Question1 = new Question1(data.Question1);
        this.Question2 = new Question2(data.Question2);
        this.Question3 = new Question3(data.Question3);
        this.Question4 = new Question4(data.Question4);
        this.Question5 = new Question5(data.Question5);
        this.Question6 = new Question6(data.Question6);
        this.Question7 = new Question7(data.Question7);
        this.Question8 = new Question8(data.Question8);

        // this.Question1 = (data.Question1).map(q => new Question1(q));
        // this.Question2 = (data.Question2).map(q => new Question(q));
        // this.Question3 = (data.Question3).map(q => new Question(q));
        // this.Question4 = (data.Question4).map(q => new Question(q));
        // this.Question5 = (data.Question5).map(q => new Question(q));
        // this.Question6 = (data.Question6).map(q => new Question(q));
        // this.Question7 = (data.Question7).map(q => new Question(q));
        // this.Question8 = (data.Question8).map(q => new Question(q));
    }
}


export default ExamDetails;