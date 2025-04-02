// class Question1 {
//   constructor(data) {
//     this.ID = data.ID;
//     this.Index_No = data.Index_No;
//     this.Question_Type = data.Question_Type;
//     this.Class_Name = data.Class_Name;
//     this.Subject_Name = data.Subject_Name;
//     this.Chapter_Name = data.Chapter_Name;
//     this.Question = data.Question;
//     this.Option_1 = data.Option_1;
//     this.Option_2 = data.Option_2;
//     this.Option_3 = data.Option_3;
//     this.Option_4 = data.Option_4;
//     this.Option_5 = data.Option_5;
//     this.Option_6 = data.Option_6;
//     this.Correct_Answer = data.Correct_Answer;
//     this.Question_Format = data.Question_Format;
//     this.Date_Time = new Date(data.Date_Time); // Convert string date to a Date object
//     this.IP_Address = data.IP_Address;
//     this.Active = data.Active;
//   }
// }

// export default Question1;

class Question1 {
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
    //  Object.assign(this, data);
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

export default Question1;

