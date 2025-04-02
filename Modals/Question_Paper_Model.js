import Question1 from "./Question1";
import Question2 from "./Question2";
import Question3 from "./Question3";
import Question4 from "./Question4";
import Question5 from "./Question5";
import Question6 from "./Question6";
import Question7 from "./Question7";
import Question8 from "./Question8";

class Question_Paper_Model {
    constructor(data) {
        Object.assign(this, data);
        // this.Question1 = new Question1(data.Question1);
        this.Question1 = data.Question1 ? data.Question1.map(item => new Question1(item)) : [];
        this.Question2 = data.Question2 ? data.Question2.map(item => new Question2(item)) : [];
        this.Question3 = data.Question3 ? data.Question3.map(item => new Question3(item)) : [];
        this.Question4 = data.Question4 ? data.Question4.map(item => new Question4(item)) : [];
        this.Question5 = data.Question5 ? data.Question5.map(item => new Question5(item)) : [];
        this.Question6 = data.Question6 ? data.Question6.map(item => new Question6(item)) : [];
        this.Question7 = data.Question7 ? data.Question7.map(item => new Question7(item)) : [];
        this.Question8 = data.Question8 ? data.Question8.map(item => new Question8(item)) : [];

        this.Ans_Q1 = data.Ans_Q1;
        this.Ans_Q2 = data.Ans_Q2;
        this.Ans_Q3 = data.Ans_Q3;
        this.Ans_Q4 = data.Ans_Q4;
        this.Ans_Q5 = data.Ans_Q5;
        this.Ans_Q6 = data.Ans_Q6;
        this.Ans_Q7 = data.Ans_Q7;
        this.Ans_Q8 = data.Ans_Q8;

        this.Model_Ans_Q1 = data.Model_Ans_Q1;
        this.Model_Ans_Q2 = data.Model_Ans_Q2;
        this.Model_Ans_Q3 = data.Model_Ans_Q3;
        this.Model_Ans_Q4 = data.Model_Ans_Q4;
        this.Model_Ans_Q5 = data.Model_Ans_Q5;
        this.Model_Ans_Q6 = data.Model_Ans_Q6;
        this.Model_Ans_Q7 = data.Model_Ans_Q7;
        this.Model_Ans_Q8 = data.Model_Ans_Q8;

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
    }

 
}

export default Question_Paper_Model;
