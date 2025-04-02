import React, { useState, useEffect, useMemo } from "react";
import { View, ScrollView, ExamStylesheet, Image, Text, Dimensions, TouchableOpacity, Alert, BackHandler, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Details from "../Modals/Details";
import Question_Paper_Model from "../Modals/Question_Paper_Model";
import Question1 from "../Modals/Question1";
import Question2 from "../Modals/Question2";
import Question3 from "../Modals/Question3";
import Question4 from "../Modals/Question4";
import Question5 from "../Modals/Question5";
import Question6 from "../Modals/Question6";
import QuestionAnswer from "../Modals/QuestionAnswer";
import Question7 from "../Modals/Question7";
import Question8 from "../Modals/Question8";
import HTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import ModelAllAnswer from "../Modals/ModelAllAnswer";
import CustomDrop from "./CustomDrop";
import ModelQuestionAnswer from "../Modals/ModelQuestionAnswer";
import ExamStyles from "../Helper/ExamStyles";


const { JSDOM } = require("jsdom");
function Exam({ route }) {
    const { width: contentWidth } = useWindowDimensions();
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [seatNumber, setSeatNumber] = useState(null);
    const [status, setStatus] = useState(null);
    const [isInputEnabled, setIsInputEnabled] = useState(false);
    const [question, setQuestion] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
    const [isRendered, setIsRendered] = useState(false);
    const [questions1, setQuestions1] = useState([]);
    const [myArray, setMyArray] = useState([])
    const [updatedArray, setUpdatedArray] = useState([])
    const [questionC, setQuestionC] = useState([]);
    const [timeLeft, setTimeLeft] = useState("");
    const [examDetails, setExamDetails] = useState(null);
    const { examDetailsInstance } = route.params;
    const [apiData, setApiData] = useState([]);
    const [questionPaperModel, setQuestionPaperModel] = useState(null);
    const [selectedQuestions, setSelectedQuestions] = useState([]); 
    const [inputValues, setInputValues] = useState({});
    const [inputValues2, setInputValues2] = useState([]);
    const [inputValues3, setInputValues3] = useState([]);
    const [inputValues4, setInputValues4] = useState([]);
    const studentLogin = new Details(examDetailsInstance);
    const [data1, setData1] = useState([]);
    const questionData = [];
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [singleSelectedAnswers, setSingleSelectedAnswers] = useState({})
    const [doubleSelectedAnswers, setDoubleSelectedAnswers] = useState({})
    const [threeSelectedAnswers, setThreeSelectedAnswers] = useState({})
    const [answers, setAnswers] = useState([])
    const [viewColors, setViewColors] = useState([]);
    const [questionType, setQuestionType] = useState();
    const [modelValue, setModelvalue] = useState([])
    const [trueFalse, setTrueFalse] = useState([])
    const [singleCorrect, setSingleCorrect] = useState([]);
    const [doubleCorrect, setDoubleCorrect] = useState([])
    const [tripleCorrect, setTripleCorrect] = useState([]);
    const [shortAns, setShortAns] = useState([]);
    const [longAns, setLongAns] = useState([]);
    const [matchFollowing, setMatchFollowing] = useState([]);
    const [questionanswer1, setQuestionAnswer1] = useState({})
    const [questionanswer2, setQuestionAnswer2] = useState({})
    const [questionanswer3, setQuestionAnswer3] = useState({});
    const [questionanswer4, setQuestionAnswer4] = useState({});
    const [questionanswer5, setQuestionAnswer5] = useState({});
    const [questionanswer6, setQuestionAnswer6] = useState({});
    const [questionanswer7, setQuestionAnswer7] = useState({});
    const [questionanswer8, setQuestionAnswer8] = useState({});
    const [allAnswersModel, setAllAnswersModel] = useState(new ModelAllAnswer());
    const [questionAnswerModel, setQuestionAnswerModel] = useState(new ModelQuestionAnswer);
    


    const callAPI = async (qNum, qId, answers, type) => {
        const Seat_No = examDetailsInstance.Seat_No;
        const Index = examDetailsInstance.Index_No;
        const exam_id = examDetailsInstance.Exam_ID;
        const paper_name = examDetailsInstance.Paper_Name;
        Alert.alert("DataType: ", type)

        const serializedAnswers = answers.answers.map((answer) => ({
            Answer: answer.Answer,
            QuestionNumber: answer.QuestionNumber,
            Question_ID: parseInt(answer.Question_ID), // Ensure IDs are integers if needed
        }));


        const dataToSend = {
            Answers: serializedAnswers,
            Question_Type: type,
            Index: Index,
            Seat_No: Seat_No,
            exam_id: exam_id,
            paper_name: paper_name,
        };
      
        const newAnswerSet = {
            answers: serializedAnswers,
            questionType: type,  // This is the type for the current question set
        };
    
     
        const dataString = JSON.stringify(dataToSend, null, 2);
        setQuestionAnswerModel((prevModel)=>{
            return new ModelQuestionAnswer([...prevModel.answers, newAnswerSet ], // Merge the answers correctly
                 )
        })

        // Display the JSON string in an alert
        Alert.alert("Sending Data", dataString);
        try {
            const response = await fetch("https://test.mh-ssc.ac.in/Exam/Moblie_Api/Save_Answer_On_Submit", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(dataToSend),

            })

            const contentType = response.headers.get("Content-Type");
            console.log("Content type: ", contentType);


            const responseData = await response.json();
            // console.log("Dta:", responseData)
            Alert.alert("Success", JSON.stringify(responseData.Response));


        } catch (error) {
            console.error("Failed")
        }
    }
    const getAPIData = async () => {
        try {
            const response = await fetch("https://test.mh-ssc.ac.in/Exam/Moblie_Api/Exam_Home1", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(studentLogin),
            });
            const contentType = response.headers.get("Content-Type");
            console.log("Content type: ", contentType);

            const responseData = await response.json();
            let responseObject;
            try {
                responseObject = JSON.parse(responseData?.Response);
                // Alert.alert("success", responseData)
            } catch (error) {
                console.error("Error parsing the Response JSON:", error);
                // Alert.alert("success", error)
                return;
            }
            if (!responseObject?.Question1 || responseObject.Question1.length === 0) {
                console.error("Question1 data is missing or empty");
                return;
            }


            const question1Objects = responseObject.Question1.map(questionData => {
                const strippedQuestion = { ...questionData, Question: questionData.Question };

                return new Question1(strippedQuestion);
            });
            const question2Objects = responseObject.Question2.map(questionData => {
                const strippedQuestion = { ...questionData, Question: questionData.Question };
                return new Question2(strippedQuestion);
            });
            const question3Objects = responseObject.Question3.map(questionData => {
                const strippedQuestion = { ...questionData, Question: questionData.Question };
                return new Question3(strippedQuestion);
            });
            const question4Objects = responseObject.Question4.map(questionData => {
                const strippedQuestion = { ...questionData, Question: questionData.Question };
                return new Question4(strippedQuestion);
            });
            const question5Objects = responseObject.Question5.map(questionData => {
                const strippedQuestion = { ...questionData, Question: questionData.Question };
                return new Question5(strippedQuestion);
            });
            const question6Objects = responseObject.Question6.map(questionData => {
                const strippedQuestion = { ...questionData, Question: questionData.Question };
                return new Question6(strippedQuestion);
            });
            const question7Objects = responseObject.Question7.map(questionData => {
                const strippedQuestion = { ...questionData, Question: questionData.Question };
                return new Question7(strippedQuestion)
            });
            const question8Objects = responseObject.Question8.map(questionData => {
                const strippedQuestion = { ...questionData, Question: questionData.Question };
                return new Question8(strippedQuestion);
            });

            const questionPaperData = {
                Question1: question1Objects,
                Question2: question2Objects,
                Question3: question3Objects,
                Question4: question4Objects,
                Question5: question5Objects,
                Question6: question6Objects,
                Question7: question7Objects,
                Question8: question8Objects,
            };

            const questionPaperModel = new Question_Paper_Model(questionPaperData);
            setQuestionPaperModel(questionPaperModel); // Set state
            setMyArray((prevArray) => [
                ...prevArray,
                questionPaperModel.Question1[0]?.Question_Type,
                questionPaperModel.Question2[0]?.Question_Type,
                questionPaperModel.Question3[0]?.Question_Type,
                questionPaperModel.Question4[0]?.Question_Type,
                questionPaperModel.Question5[0]?.Question_Type,
                questionPaperModel.Question6[0]?.Question_Type,
                questionPaperModel.Question7[0]?.Question_Type,
                questionPaperModel.Question8[0]?.Question_Type,
            ]);
            const getFilteredQuestionLength = (question) => {
                if (!question || question.length === 0) {
                    return 0;
                }
                return question.filter(q => q !== undefined && q !== null).length;
            };

            const updatedArray = [
                getFilteredQuestionLength(questionPaperModel.Question1),
                getFilteredQuestionLength(questionPaperModel.Question2),
                getFilteredQuestionLength(questionPaperModel.Question3),
                getFilteredQuestionLength(questionPaperModel.Question4),
                getFilteredQuestionLength(questionPaperModel.Question5),
                getFilteredQuestionLength(questionPaperModel.Question6),
                getFilteredQuestionLength(questionPaperModel.Question7),
                getFilteredQuestionLength(questionPaperModel.Question8),
            ];
            setQuestionC((prevArray) => [
                ...prevArray,
                ...updatedArray
            ]);

            updatedArray.forEach((_, index) => {
                const questionKey = `Question${index + 1}`;
                if (Object.keys(questionPaperModel[questionKey]).length !== 0) {
                    setData1(prevData => [...prevData, index + 1]);
                }
            });

            setUpdatedArray(updatedArray);
            setSelectedQuestions(questionPaperModel.Question1);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    const handleInputChange = (p, ID, Index_No, Question_Type, Class_Name, Subject_Name, Chapter_Name, Question, Option_1, Option_2, Option_3, Option_4, Option_5, Option_6, text, Question_Format, Date_Time, IP_Address,
        Active) => {

            const isQuestionSelected = (ID) => {
                return inputValues[ID] ? 1 : 0; // Returns 1 if question is selected, otherwise 0
            };
       
        setInputValues((prev) => ({
            ...prev,
            [ID]: text,
            "Answer": text,
            "QuestionNumber": p,
            "Question_ID": ID,
        }));

        const newViewColors = [...viewColors];
        newViewColors[ID] = text ? '#e0e9dc' : 'transparent';
        setViewColors(newViewColors);
        setModelvalue((prev) => ({
            ...prev,
            answers: [
                ...(prev.answers?.filter((ans) => ans.Question_ID !== ID) || []),
                new QuestionAnswer(ID, p, text),
            ],
        }));
        setQuestionAnswer1((prev) => ({
            ...prev,
            answers: [
                ...(prev.answers?.filter((ans) => ans.ID !== ID) || []),  // Ensure the previous answers are not duplicated
                new Question1({
                    ID: ID,
                    Index_No: Index_No,
                    Question_Type: Question_Type,
                    Class_Name: Class_Name,
                    Subject_Name: Subject_Name,
                    Chapter_Name: Chapter_Name,
                    Question: Question,
                    Option_1: Option_1,
                    Option_2: Option_2,
                    Option_3: Option_3,
                    Option_4: Option_4,
                    Option_5: Option_5,
                    Option_6: Option_6,
                    Correct_Answer: text,
                    Question_Format: Question_Format,
                    Date_Time: Date_Time,
                    IP_Address: IP_Address,
                    Active: Active,
                }),
            ],
        }));
    };

    // console.log("***** model value ***** ", questionanswer1)
    const handleShortAnswer = (p, ID, Index_No, Question_Type, Class_Name, Subject_Name, Chapter_Name, Question, Option_1, Option_2, Option_3, Option_4, Option_5, Option_6, text, Question_Format, Date_Time, IP_Address,
        Active) => {
        setInputValues2((prev) => ({
            ...prev,
            [ID]: text,
            "Answer": text,
            "QuestionNumber": p,
            "Question_ID": ID,

        }));
        const newViewColors = [...viewColors];
        newViewColors[ID] = text ? '#e0e9dc' : 'transparent';
        setViewColors(newViewColors);
        setShortAns((prev) => ({
            ...prev,
            answers: [
                ...(prev.answers?.filter((ans) => ans.Question_ID !== ID) || []), // Remove previous entry for this question
                new QuestionAnswer(ID, p, text ), // Add updated answer
            ],
        }));

        setQuestionAnswer6((prev) => ({
            ...prev,
            answers: [
                ...(prev.answers?.filter((ans) => ans.ID !== ID) || []),  // Ensure the previous answers are not duplicated
                new Question6({
                    ID: ID,
                    Index_No: Index_No,
                    Question_Type: Question_Type,
                    Class_Name: Class_Name,
                    Subject_Name: Subject_Name,
                    Chapter_Name: Chapter_Name,
                    Question: Question,
                    Option_1: Option_1,
                    Option_2: Option_2,
                    Option_3: Option_3,
                    Option_4: Option_4,
                    Option_5: Option_5,
                    Option_6: Option_6,
                    Correct_Answer: text,
                    Question_Format: Question_Format,
                    Date_Time: Date_Time,
                    IP_Address: IP_Address,
                    Active: Active,
                }),
            ],
        }));
    };

    //  console.log("***** model value Question6 ***** ", questionanswer6)
    const handleLongAnswer = (p, ID, Index_No, Question_Type, Class_Name, Subject_Name, Chapter_Name, Question, Option_1, Option_2, Option_3, Option_4, Option_5, Option_6, text, Question_Format, Date_Time, IP_Address,
        Active) => {

        setInputValues3((prev) => ({
            ...prev,
            "Answer": text,
            "QuestionNumber": p,
            "Question_ID": ID,

        }));
        const newViewColors = [...viewColors];
        newViewColors[ID] = text ? '#e0e9dc' : 'transparent';
        setViewColors(newViewColors);
        setLongAns((prev) => ({
            ...prev,
            answers: [
                ...(prev.answers?.filter((ans) => ans.Question_ID !== ID) || []), // Remove previous entry for this question
                new QuestionAnswer(ID, p, text), // Add updated answer
            ],
        }));

        setQuestionAnswer7((prev) => ({
            ...prev,
            answers: [
                ...(prev.answers?.filter((ans) => ans.ID !== ID) || []),  // Ensure the previous answers are not duplicated
                new Question7({
                    ID: ID,
                    Index_No: Index_No,
                    Question_Type: Question_Type,
                    Class_Name: Class_Name,
                    Subject_Name: Subject_Name,
                    Chapter_Name: Chapter_Name,
                    Question: Question,
                    Option_1: Option_1,
                    Option_2: Option_2,
                    Option_3: Option_3,
                    Option_4: Option_4,
                    Option_5: Option_5,
                    Option_6: Option_6,
                    Correct_Answer: text,
                    Question_Format: Question_Format,
                    Date_Time: Date_Time,
                    IP_Address: IP_Address,
                    Active: Active,
                }),
            ],
        }));
    };

    // console.log("***** model value Question7 ***** ", questionanswer7)
    const handleInputChangeMatch = (
        p,
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
        text,
        Question_Format,
        Date_Time,
        IP_Address,
        Active
    ) => {
        setInputValues4((prev) => {
            const currentAnswers = prev[ID]?.Answer || [];
    
            // Append the new answer to the existing answers
            const updatedAnswers = [...currentAnswers, text];
    
            return {
                ...prev,
                [ID]: {
                    Answer: updatedAnswers,
                    QuestionNumber: p,
                    Question_ID: ID,
                },
            };
        });
    
        const newViewColors = [...viewColors];
        newViewColors[ID] = text ? '#e0e9dc' : 'transparent';
        setViewColors(newViewColors);
    
        setMatchFollowing((prev) => {
            const existingAnswers = prev.answers?.filter((ans) => ans.Question_ID !== ID) || [];
            const existingAnswer = prev.answers?.find((ans) => ans.Question_ID === ID);
            const newAnswerText = existingAnswer ? `${existingAnswer.Answer}${text}` : text;
            const newAnswer = new QuestionAnswer(ID, p, newAnswerText);
    
            return {
                ...prev,
                answers: [...existingAnswers, newAnswer],
            };
        });
    
        setQuestionAnswer8((prev) => {
            const existingAnswers = prev.answers?.filter((ans) => ans.ID !== ID) || [];
            const existingQuestion = prev.answers?.find((ans) => ans.ID === ID);
            const newCorrectAnswer = existingQuestion ? `${existingQuestion.Correct_Answer}${text}` : text;
            const newQuestion = new Question8({
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
                Correct_Answer: newCorrectAnswer,
                Question_Format,
                Date_Time,
                IP_Address,
                Active,
            });
    
            return {
                ...prev,
                answers: [...existingAnswers, newQuestion],
            };
        });
    };

    // console.log("***** Question8 ****", questionanswer8)
    const handleQuestionSelection = (index) => {
        setIsClicked(true);
        setSelectedQuestionIndex(index);
        if (questionPaperModel) {
            switch (index) {
                case 1:
                    // setSelectedQuestions(questionPaperModel.Question1);
                    const questionKey1 = `Question${index}`;
                    setSelectedQuestions(questionPaperModel[questionKey1]);
                    break;
                case 2:
                    // setSelectedQuestions(questionPaperModel.Question2);
                    const questionKey2 = `Question${index}`;
                    setSelectedQuestions(questionPaperModel[questionKey2] || []);
                    break;
                case 3:
                    // setSelectedQuestions(questionPaperModel.Question3);
                    const questionKey3 = `Question${index}`;
                    setSelectedQuestions(questionPaperModel[questionKey3] || []);
                    break;
                case 4:
                    // setSelectedQuestions(questionPaperModel.Question4);
                    const questionKey4 = `Question${index}`;
                    setSelectedQuestions(questionPaperModel[questionKey4] || []);
                    break;
                case 5:
                    // setSelectedQuestions(questionPaperModel.Question5);
                    const questionKey5 = `Question${index}`;
                    setSelectedQuestions(questionPaperModel[questionKey5] || []);

                    break;
                case 6:
                    // setSelectedQuestions(questionPaperModel.Question6);
                    const questionKey6 = `Question${index}`;
                    setSelectedQuestions(questionPaperModel[questionKey6] || []);
                    break;
                case 7:
                    // setSelectedQuestions(questionPaperModel.Question7);
                    const questionKey7 = `Question${index}`;
                    setSelectedQuestions(questionPaperModel[questionKey7] || []);
                    break;
                case 8:
                    // setSelectedQuestions(questionPaperModel.Question8);
                    const questionKey8 = `Question${index}`;
                    setSelectedQuestions(questionPaperModel[questionKey8] || []);
                    break;
                default:
                    setSelectedQuestions([]);
                    break;
            }
        }
    };

    useEffect(() => {
        getAPIData();
    }, []);

    const handleButtonPress = () => {
        setIsClicked((prevState) => !prevState);
        getAPIData();
    };

    useEffect(() => {

        const endTime = new Date(examDetailsInstance.EndTime);

        const updateTimeLeft = () => {
            const currentTime = new Date(); // Current time
            const timeDifference = endTime - currentTime; // Difference in milliseconds

            if (timeDifference > 0) {
                // Calculate hours, minutes, and seconds
                const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
                const seconds = Math.floor((timeDifference / 1000) % 60);

                // Format the remaining time as a string
                setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
            } else {
                // If the time is up, clear the interval and update the state
                setTimeLeft("The exam time has ended.");
                clearInterval(intervalId);
                BackHandler.exitApp();


            }
        };


        const intervalId = setInterval(updateTimeLeft, 1000);

        updateTimeLeft();

        return () => clearInterval(intervalId);
    }, [examDetailsInstance.EndTime]);

    const handleSelect = (p, ID, Index_No, Question_Type, Class_Name, Subject_Name, Chapter_Name, Question, Option_1, Option_2, Option_3, Option_4, Option_5, Option_6, text, Question_Format, Date_Time, IP_Address,
        Active) => {
        console.log(p, ID, Index_No, Question_Type, Class_Name, Subject_Name, Chapter_Name, Question, Option_1, Option_2, Option_3, Option_4, Option_5, Option_6, text, Question_Format, Date_Time, IP_Address,
            Active)
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            "Answer": text,
            "QuestionNumber": p,
            "Question_ID": ID,
            [ID]: text,
        }));
        const newViewColors = [...viewColors];
        console.log(newViewColors[ID])
        newViewColors[ID] = text ? '#e0e9dc' : 'transparent'; // Green if text is entered, transparent if not
        setViewColors(newViewColors);
        setTrueFalse((prev) => ({
            ...prev,
            answers: [...(prev.answers || []), new QuestionAnswer(ID, p, text)]
        }));
        // console.log("Model:", trueFalse)
        setQuestionAnswer2((prev) => ({
            ...prev,
            answers: [
                ...(prev.answers?.filter((ans) => ans.ID !== ID) || []),  // Ensure the previous answers are not duplicated
                new Question2({
                    ID: ID,
                    Index_No: Index_No,
                    Question_Type: Question_Type,
                    Class_Name: Class_Name,
                    Subject_Name: Subject_Name,
                    Chapter_Name: Chapter_Name,
                    Question: Question,
                    Option_1: Option_1,
                    Option_2: Option_2,
                    Option_3: Option_3,
                    Option_4: Option_4,
                    Option_5: Option_5,
                    Option_6: Option_6,
                    Correct_Answer: text,
                    Question_Format: Question_Format,
                    Date_Time: Date_Time,
                    IP_Address: IP_Address,
                    Active: Active,
                }),
            ],
        }));
    };
    const handleSelectForSingle = (p, ID, Index_No, Question_Type, Class_Name, Subject_Name, Chapter_Name, Question, Option_1, Option_2, Option_3, Option_4, Option_5, Option_6, text, Question_Format, Date_Time, IP_Address,
        Active) => {
        setSingleSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            // [questionId]: option, // Update the selected option for this specific question
            "Answer": text,
            "QuestionNumber": p,
            "Question_ID": ID,
            [ID]: text,
        }));
        const newViewColors = [...viewColors];
        newViewColors[ID] = text ? '#e0e9dc' : 'transparent'; // Green if text is entered, transparent if not
        setViewColors(newViewColors);
        setSingleCorrect((prev) => ({
            ...prev,
            answers: [...(prev.answers || []), new QuestionAnswer(ID, p, text)]
        }))

        setQuestionAnswer3((prev) => ({
            ...prev,
            answers: [
                ...(prev.answers?.filter((ans) => ans.ID !== ID) || []),  // Ensure the previous answers are not duplicated
                new Question3({
                    ID: ID,
                    Index_No: Index_No,
                    Question_Type: Question_Type,
                    Class_Name: Class_Name,
                    Subject_Name: Subject_Name,
                    Chapter_Name: Chapter_Name,
                    Question: Question,
                    Option_1: Option_1,
                    Option_2: Option_2,
                    Option_3: Option_3,
                    Option_4: Option_4,
                    Option_5: Option_5,
                    Option_6: Option_6,
                    Correct_Answer: text,
                    Question_Format: Question_Format,
                    Date_Time: Date_Time,
                    IP_Address: IP_Address,
                    Active: Active,
                }),
            ],
        }));
    };
    const handleSelectForDouble = (
        p,
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
        text,
        Question_Format,
        Date_Time,
        IP_Address,
        Active
    ) => {
       const newViewColors = [...viewColors];
        newViewColors[ID] = text ? '#e0e9dc' : 'transparent'; // Green if text is entered, transparent if not
        setViewColors(newViewColors);

        setDoubleSelectedAnswers((prevAnswers) => {
            const currentSelections = prevAnswers[ID] || [];
            const isOptionSelected = currentSelections.includes(text);
        
            let updatedSelections;
            if (isOptionSelected) {
                // Remove selected option
                updatedSelections = currentSelections.filter((item) => item !== text);
            } else {
                // Add the new option if less than 3 selections
                if (currentSelections.length < 2) {
                    updatedSelections = [...currentSelections, text];
                } else {
                    updatedSelections = currentSelections;
                }
            }
        
            // ** Fix: Call setDoubleCorrect immediately after updating selections **
            const updatedState = {
                ...prevAnswers,
                [ID]: updatedSelections,
            };
        
            updateDoubleCorrect(ID, p, updatedSelections); // Call helper function to update answers
        
            return updatedState;
        });
        
        // ** Helper function to update doubleCorrect ** 
        const updateDoubleCorrect = (ID, p, selectedOptions) => {
            setDoubleCorrect((prev) => {
                const existingAnswers = prev.answers?.filter((ans) => ans.Question_ID !== ID) || [];
                
                let combinedAnswer = "~~~~".split(""); // 5 options, all initially unselected
        
                selectedOptions.forEach((option) => {
                    const index = parseInt(option) - 1; // Convert to zero-based index
                    if (index >= 0 && index < combinedAnswer.length) {
                        combinedAnswer[index] = "1"; // Mark selection
                    }
                });
        
                combinedAnswer = combinedAnswer.join(""); // Convert array back to string
        
                const newAnswer = new QuestionAnswer(ID, p, combinedAnswer);
        
                return {
                    ...prev,
                    answers: [...existingAnswers, newAnswer],
                };
            });
        };
        
        
        setQuestionAnswer4((prev) => {
            const existingAnswers = prev.answers?.filter((ans) => ans.ID !== ID) || [];
    
            const newQuestion = new Question4({
                ID: ID,
                Index_No: Index_No,
                Question_Type: Question_Type,
                Class_Name: Class_Name,
                Subject_Name: Subject_Name,
                Chapter_Name: Chapter_Name,
                Question: Question,
                Option_1: Option_1,
                Option_2: Option_2,
                Option_3: Option_3,
                Option_4: Option_4,
                Option_5: Option_5,
                Option_6: Option_6,
                Correct_Answer: doubleSelectedAnswers[ID] || [],
                Question_Format: Question_Format,
                Date_Time: Date_Time,
                IP_Address: IP_Address,
                Active: Active,
            });
    
            return {
                ...prev,
                answers: [...existingAnswers, newQuestion],
            };
        });
    };
    
    console.log("***** model of Question4:", questionanswer4)
    const handleSelectForTriple = (p, ID, Index_No, Question_Type, Class_Name, Subject_Name, Chapter_Name, Question, Option_1, Option_2, Option_3, Option_4, Option_5, Option_6, text, Question_Format, Date_Time, IP_Address,
        Active) => {
            const newViewColors = [...viewColors];
            newViewColors[ID] = text ? '#e0e9dc' : 'transparent'; // Green if text is entered, transparent if not
            setViewColors(newViewColors);
    
        setThreeSelectedAnswers((prevAnswers) => {
            const currentSelections = prevAnswers[ID] || [];
            const isOptionSelected = currentSelections.includes(text);


            if (isOptionSelected) {
                // Remove selected option
                updatedSelections = currentSelections.filter((item) => item !== text);
            } else {
                // Add the new option if less than 3 selections
                if (currentSelections.length < 3) {
                    updatedSelections = [...currentSelections, text];
                } else {
                    updatedSelections = currentSelections;
                }
            }


            const updatedState = {
                ...prevAnswers,
                [ID]: updatedSelections,
            };
        
            updateTrippleCorrect(ID, p, updatedSelections); // Call helper function to update answers
        
            return updatedState;
            // if (isOptionSelected) {
            //     return {
            //         ...prevAnswers,
            //         "Answer": currentSelections.filter((item) => item !== text),
            //         "QuestionNumber": p,
            //         "Question_ID": ID,
            //         [ID]: currentSelections.filter((item) => item !== text)
            //     };
            // } else {
            //     if (currentSelections.length < 3) {
            //         return {
            //             ...prevAnswers,
            //             "Answer": [...currentSelections, text],
            //             "QuestionNumber": p,
            //             "Question_ID": ID,
            //             [ID]: [...currentSelections, text]
            //         };

            //     } else {
            //         return prevAnswers;
            //     }
            // }
        });

        const updateTrippleCorrect = (ID, p, selectedOptions) => {
            setTripleCorrect((prev) => {
                const existingAnswers = prev.answers?.filter((ans) => ans.Question_ID !== ID) || [];
                
                let combinedAnswer = "~~~~~~".split(""); 
        
                selectedOptions.forEach((option) => {
                    const index = parseInt(option) - 1; // Convert to zero-based index
                    if (index >= 0 && index < combinedAnswer.length) {
                        combinedAnswer[index] = "1"; // Mark selection
                    }
                });
        
                combinedAnswer = combinedAnswer.join(""); // Convert array back to string
        
                const newAnswer = new QuestionAnswer(ID, p, combinedAnswer);
        
                return {
                    ...prev,
                    answers: [...existingAnswers, newAnswer],
                };
            });
        };
   
        setQuestionAnswer5((prev) => {
            const existingAnswers = prev.answers?.filter((ans) => ans.ID !== ID) || [];
    
            const newQuestion = new Question5({
                ID: ID,
                Index_No: Index_No,
                Question_Type: Question_Type,
                Class_Name: Class_Name,
                Subject_Name: Subject_Name,
                Chapter_Name: Chapter_Name,
                Question: Question,
                Option_1: Option_1,
                Option_2: Option_2,
                Option_3: Option_3,
                Option_4: Option_4,
                Option_5: Option_5,
                Option_6: Option_6,
                Correct_Answer: threeSelectedAnswers[ID] || [],
                Question_Format: Question_Format,
                Date_Time: Date_Time,
                IP_Address: IP_Address,
                Active: Active,
            });
    
            return {
                ...prev,
                answers: [...existingAnswers, newQuestion],
            };
        });
    };
    useEffect(() => {
        if (timeLeft.includes("ended")) {
            Alert.alert("Please submit answer!");
            BackHandler.exitApp()
        }
    }, [timeLeft]);

    return (
        <View style={ExamStyles.main}>

            <View style={ExamStyles.container}>
                <Text style={ExamStyles.endT}>Time Left : <Text style={ExamStyles.time}>{timeLeft}</Text></Text>
            </View>

            <ScrollView horizontal={false}
                nestedScrollEnabled={true}
                contentContainerStyle={{ flexGrow: 1 }}>

                <View style={ExamStyles.action}>
                    <View style={ExamStyles.drop2}>
                        <Dropdown
                            style={[ExamStyles.inputBox, ExamStyles.valueStyle]}
                            placeholderStyle={ExamStyles.placeholderStyle}
                            inputSearchStyle={ExamStyles.inputSearchStyle}
                            placeholder={`Seat Number.: ${examDetailsInstance.Seat_No}`}
                            labelField="label"
                            data={[
                                { label: `Seat Number.: ${examDetailsInstance.Index_No}`, value: <Text style={{ fontWeight: 'bold' }}>` ${examDetailsInstance.Index_No}`</Text> },
                                { label: `Paper Name: ${examDetailsInstance.Paper_Name}`, value: examDetailsInstance.Paper_Name },
                                { label: `Subject Name: ${examDetailsInstance.Subject_Name}`, value: examDetailsInstance.Subject_Name },
                                { label: `Name: ${examDetailsInstance.Name}`, value: examDetailsInstance.Name },
                            ]}
                            value={examDetailsInstance.Index_No}
                            disabled={true}
                            onChange={() => {}}
                            onFocus={() => setIsInputEnabled(false)}
                            onBlur={() => setIsInputEnabled(true)}
                        />
                    </View>

                    <CustomDrop myArray={myArray} questionC={updatedArray} answer={questionAnswerModel}  />
                </View>
                <View style={ExamStyles.containerN}>
                    <ScrollView horizontal={true}>
                        {Object.values(data1).map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={selectedQuestionIndex === item ? ExamStyles.clickedButton : ExamStyles.defaultButton}
                                onPress={() => handleQuestionSelection(item)}
                            >
                                <Text style={selectedQuestionIndex === item ? ExamStyles.clickedText : ExamStyles.defaultText}>
                                    Q{item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={ExamStyles.tableContainer}>
                    <ScrollView
                        style={ExamStyles.table}
                        nestedScrollEnabled={true}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={true}
                        showsHorizontalScrollIndicator={true}>
                        {selectedQuestions.map((question, index) => (
                            <View key={question.ID || index}>
                                <View style={[ExamStyles.tableRow,]}>
                                    <View style={ExamStyles.tableCell1}>
                                        <Text style={ExamStyles.tableCellText}>Q{index + 1}</Text>
                                    </View>

                                    <View style={ExamStyles.tableCell}>
                                        <HTML
                                            source={{ html: question.Question }}
                                            contentWidth={contentWidth * 0.9}
                                            style={[ExamStyles.tableCellText, { minHeight: 20 }]}
                                        />
                                    </View>
                                    {selectedQuestions === questionPaperModel?.Question2 && (

                                        <View style={[ExamStyles.tableCellO, { backgroundColor: viewColors[question.ID] }]}>
                                            <TouchableOpacity onPress={() => handleSelect(index + 1, question.ID,
                                                question.Index_No,
                                                question.Question_Type,
                                                question.Class_Name,
                                                question.Subject_Name,
                                                question.Chapter_Name,
                                                question.Question,
                                                question.Option_1,
                                                question.Option_2,
                                                question.Option_3,
                                                question.Option_4,
                                                question.Option_5,
                                                question.Option_6,
                                                "True",
                                                question.Question_Format,
                                                question.Date_Time,
                                                question.IP_Address,
                                                question.Active)}>
                                                <View style={ExamStyles.radioTextContainer}>
                                                    <View style={[
                                                        ExamStyles.radio,
                                                        selectedAnswers[question.ID] === "True" && ExamStyles.selectedRadio
                                                    ]} />
                                                    <Text style={ExamStyles.radioText}>True</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleSelect(index + 1, question.ID,
                                                question.Index_No,
                                                question.Question_Type,
                                                question.Class_Name,
                                                question.Subject_Name,
                                                question.Chapter_Name,
                                                question.Question,
                                                question.Option_1,
                                                question.Option_2,
                                                question.Option_3,
                                                question.Option_4,
                                                question.Option_5,
                                                question.Option_6,
                                                "False",
                                                question.Question_Format,
                                                question.Date_Time,
                                                question.IP_Address,
                                                question.Active)}>
                                                <View style={ExamStyles.radioTextContainer}>
                                                    <View style={[
                                                        ExamStyles.radio,
                                                        selectedAnswers[question.ID] === "False" && ExamStyles.selectedRadio
                                                    ]} />
                                                    <Text style={ExamStyles.radioText}>False</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                                {selectedQuestions === questionPaperModel?.Question1 && (

                                    <View style={[ExamStyles.tableRow, { backgroundColor: viewColors[question.ID] }]}>
                                        <View style={ExamStyles.tableCellS}>
                                            <Text style={ExamStyles.tableCellTextA}> Ans:- </Text>
                                        </View>
                                        <View style={ExamStyles.tableCellA}>
                                            <TextInput
                                                style={ExamStyles.inputField}
                                                placeholder="Enter text here"
                                                keyboardShouldPersistTaps="handled"
                                                value={inputValues || ""}
                                                onChangeText={(text) => handleInputChange(index + 1, question.ID,
                                                    question.Index_No,
                                                    question.Question_Type,
                                                    question.Class_Name,
                                                    question.Subject_Name,
                                                    question.Chapter_Name,
                                                    question.Question,
                                                    question.Option_1,
                                                    question.Option_2,
                                                    question.Option_3,
                                                    question.Option_4,
                                                    question.Option_5,
                                                    question.Option_6,
                                                    text,
                                                    question.Question_Format,
                                                    question.Date_Time,
                                                    question.IP_Address,
                                                    question.Active)}
                                            />
                                        </View>
                                    </View>
                                )}
                                {selectedQuestions === questionPaperModel?.Question7 && (

                                    <View style={[ExamStyles.tableRow, { backgroundColor: viewColors[question.ID] }]}>
                                        <View style={ExamStyles.tableCellS}>
                                            <Text style={ExamStyles.tableCellTextA}> Ans:- </Text>
                                        </View>
                                        <View style={ExamStyles.tableCellA}>
                                            <TextInput
                                                style={ExamStyles.inputFieldL}
                                                placeholder="Enter text here"
                                                value={inputValues3 || ""}
                                                multiline={true}  // Allows multiple lines
                                                keyboardShouldPersistTaps="handled"
                                                textAlignVertical="top"  // Aligns text to the top
                                                onChangeText={(text) => handleLongAnswer(index + 1, question.ID,
                                                    question.Index_No,
                                                    question.Question_Type,
                                                    question.Class_Name,
                                                    question.Subject_Name,
                                                    question.Chapter_Name,
                                                    question.Question,
                                                    question.Option_1,
                                                    question.Option_2,
                                                    question.Option_3,
                                                    question.Option_4,
                                                    question.Option_5,
                                                    question.Option_6,
                                                    text,
                                                    question.Question_Format,
                                                    question.Date_Time,
                                                    question.IP_Address,
                                                    question.Active)}
                                            />
                                        </View>
                                    </View>
                                )}
                                {selectedQuestions === questionPaperModel?.Question6 && (

                                    <View style={[ExamStyles.tableRow, { backgroundColor: viewColors[question.ID] }]}>
                                        <View style={ExamStyles.tableCellS}>
                                            <Text style={ExamStyles.tableCellTextA}> Ans:- </Text>
                                        </View>
                                        <View style={ExamStyles.tableCellA}>
                                            <TextInput
                                                style={ExamStyles.inputFieldL}
                                                placeholder="Enter text here"
                                                value={inputValues2 || ""}
                                                multiline={true}  // Allows multiple lines
                                                keyboardShouldPersistTaps="handled"
                                                textAlignVertical="top"  // Aligns text to the top
                                                onChangeText={(text) => handleShortAnswer(index + 1, question.ID,
                                                    question.Index_No,
                                                    question.Question_Type,
                                                    question.Class_Name,
                                                    question.Subject_Name,
                                                    question.Chapter_Name,
                                                    question.Question,
                                                    question.Option_1,
                                                    question.Option_2,
                                                    question.Option_3,
                                                    question.Option_4,
                                                    question.Option_5,
                                                    question.Option_6,
                                                    text,
                                                    question.Question_Format,
                                                    question.Date_Time,
                                                    question.IP_Address,
                                                    question.Active)}
                                            />
                                        </View>
                                    </View>
                                )}
                                {selectedQuestions === questionPaperModel?.Question8 && (

                                    <View style={[ExamStyles.tableRow, { backgroundColor: viewColors[question.ID] }]}>
                                        <View style={ExamStyles.tableCellS}>
                                            <Text style={ExamStyles.tableCellTextA}> Ans:- </Text>
                                        </View>
                                        <View style={ExamStyles.tableCellA}>
                                            <Text>1.</Text>
                                            <TextInput
                                                style={ExamStyles.inputField}
                                                placeholder="Enter text here"
                                                // value={inputValues[question.ID] || ""}
                                                keyboardShouldPersistTaps="handled"
                                                value={inputValues4 || ""}
                                                onChangeText={(text) => handleInputChangeMatch(index + 1, question.ID,
                                                    question.Index_No,
                                                    question.Question_Type,
                                                    question.Class_Name,
                                                    question.Subject_Name,
                                                    question.Chapter_Name,
                                                    question.Question,
                                                    question.Option_1,
                                                    question.Option_2,
                                                    question.Option_3,
                                                    question.Option_4,
                                                    question.Option_5,
                                                    question.Option_6,
                                                    text,
                                                    question.Question_Format,
                                                    question.Date_Time,
                                                    question.IP_Address,
                                                    question.Active)}
                                            />
                                            <Text>2.</Text>
                                            <TextInput
                                                style={ExamStyles.inputField}
                                                placeholder="Enter text here"
                                                keyboardShouldPersistTaps="handled"
                                                // value={inputValues[question.ID] || ""}
                                                value={inputValues4 || ""}
                                                onChangeText={(text) => handleInputChangeMatch(index + 1, question.ID,
                                                    question.Index_No,
                                                    question.Question_Type,
                                                    question.Class_Name,
                                                    question.Subject_Name,
                                                    question.Chapter_Name,
                                                    question.Question,
                                                    question.Option_1,
                                                    question.Option_2,
                                                    question.Option_3,
                                                    question.Option_4,
                                                    question.Option_5,
                                                    question.Option_6,
                                                    text,
                                                    question.Question_Format,
                                                    question.Date_Time,
                                                    question.IP_Address,
                                                    question.Active)}
                                            />
                                            <Text>3.</Text>
                                            <TextInput
                                                style={ExamStyles.inputField}
                                                placeholder="Enter text here"
                                                keyboardShouldPersistTaps="handled"
                                                // value={inputValues[question.ID] || ""}
                                                value={inputValues4 || ""}
                                                onChangeText={(text) => handleInputChangeMatch(index + 1, question.ID,
                                                    question.Index_No,
                                                    question.Question_Type,
                                                    question.Class_Name,
                                                    question.Subject_Name,
                                                    question.Chapter_Name,
                                                    question.Question,
                                                    question.Option_1,
                                                    question.Option_2,
                                                    question.Option_3,
                                                    question.Option_4,
                                                    question.Option_5,
                                                    question.Option_6,
                                                    text,
                                                    question.Question_Format,
                                                    question.Date_Time,
                                                    question.IP_Address,
                                                    question.Active)}
                                            />
                                            <Text>4.</Text>
                                            <TextInput
                                                style={ExamStyles.inputField}
                                                placeholder="Enter text here"
                                                keyboardShouldPersistTaps="handled"
                                                // value={inputValues[question.ID] || ""}
                                                value={inputValues4 || ""}
                                                onChangeText={(text) => handleInputChangeMatch(index + 1, question.ID,
                                                    question.Index_No,
                                                    question.Question_Type,
                                                    question.Class_Name,
                                                    question.Subject_Name,
                                                    question.Chapter_Name,
                                                    question.Question,
                                                    question.Option_1,
                                                    question.Option_2,
                                                    question.Option_3,
                                                    question.Option_4,
                                                    question.Option_5,
                                                    question.Option_6,
                                                    text,
                                                    question.Question_Format,
                                                    question.Date_Time,
                                                    question.IP_Address,
                                                    question.Active)}
                                            />
                                        </View>
                                    </View>
                                )}
                                {selectedQuestions === questionPaperModel?.Question3 && (

                                    <View style={[ExamStyles.tableRow, { backgroundColor: viewColors[question.ID] }]}>
                                        <View style={ExamStyles.tableCellS}>

                                            <Text style={ExamStyles.tableCellTextA}> Ans:- </Text>
                                        </View>
                                        <View style={ExamStyles.tableCellA}>
                                            <TouchableOpacity onPress={() => handleSelectForSingle(index + 1, question.ID,
                                                question.Index_No,
                                                question.Question_Type,
                                                question.Class_Name,
                                                question.Subject_Name,
                                                question.Chapter_Name,
                                                question.Question,
                                                question.Option_1,
                                                question.Option_2,
                                                question.Option_3,
                                                question.Option_4,
                                                question.Option_5,
                                                question.Option_6,
                                                "1~~~",
                                                question.Question_Format,
                                                question.Date_Time,
                                                question.IP_Address,
                                                question.Active)}>
                                                <View style={ExamStyles.radioTextContainer}>
                                                    {/* <View style={[
                                                        ExamStyles.radio,
                                                        singleSelectedAnswers[question.ID] === "1~~~" && ExamStyles.selectedRadio, // Highlight if selected
                                                    ]} /> */}
                                                    <View style={[
                                                        ExamStyles.radio,
                                                        singleSelectedAnswers[question.ID] === "1~~~" && ExamStyles.selectedRadio
                                                    ]} />
                                                    <HTML
                                                        source={{ html: question.Option_1 }}
                                                        contentWidth={contentWidth}
                                                        style={ExamStyles.tableCellText}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleSelectForSingle(index + 1, question.ID,
                                                question.Index_No,
                                                question.Question_Type,
                                                question.Class_Name,
                                                question.Subject_Name,
                                                question.Chapter_Name,
                                                question.Question,
                                                question.Option_1,
                                                question.Option_2,
                                                question.Option_3,
                                                question.Option_4,
                                                question.Option_5,
                                                question.Option_6,
                                                "~1~~",
                                                question.Question_Format,
                                                question.Date_Time,
                                                question.IP_Address,
                                                question.Active)}>
                                                <View style={ExamStyles.radioTextContainer}>
                                                    {/* <View style={[
                                                        ExamStyles.radio,
                                                        singleSelectedAnswers[question.ID] === "~1~~" && ExamStyles.selectedRadio, // Highlight if selected
                                                    ]} /> */}
                                                    <View style={[
                                                        ExamStyles.radio,
                                                        singleSelectedAnswers[question.ID] === "~1~~" && ExamStyles.selectedRadio
                                                    ]} />
                                                    <HTML
                                                        source={{ html: question.Option_2 }}
                                                        contentWidth={contentWidth}
                                                        style={ExamStyles.tableCellText}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleSelectForSingle(index + 1, question.ID,
                                                question.Index_No,
                                                question.Question_Type,
                                                question.Class_Name,
                                                question.Subject_Name,
                                                question.Chapter_Name,
                                                question.Question,
                                                question.Option_1,
                                                question.Option_2,
                                                question.Option_3,
                                                question.Option_4,
                                                question.Option_5,
                                                question.Option_6,
                                                "~~1~",
                                                question.Question_Format,
                                                question.Date_Time,
                                                question.IP_Address,
                                                question.Active)}>
                                                <View style={ExamStyles.radioTextContainer}>
                                                    {/* <View style={[
                                                        ExamStyles.radio,
                                                        singleSelectedAnswers[question.ID] === "~~1~" && ExamStyles.selectedRadio, // Highlight if selected
                                                    ]} /> */}
                                                    <View style={[
                                                        ExamStyles.radio,
                                                        singleSelectedAnswers[question.ID] === "~~1~" && ExamStyles.selectedRadio
                                                    ]} />
                                                    <HTML
                                                        source={{ html: question.Option_3 }}
                                                        contentWidth={contentWidth}
                                                        style={ExamStyles.tableCellText}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleSelectForSingle(index + 1, question.ID,
                                                question.Index_No,
                                                question.Question_Type,
                                                question.Class_Name,
                                                question.Subject_Name,
                                                question.Chapter_Name,
                                                question.Question,
                                                question.Option_1,
                                                question.Option_2,
                                                question.Option_3,
                                                question.Option_4,
                                                question.Option_5,
                                                question.Option_6,
                                                "~~~1",
                                                question.Question_Format,
                                                question.Date_Time,
                                                question.IP_Address,
                                                question.Active)}>
                                                <View style={ExamStyles.radioTextContainer}>
                                                    {/* <View style={[
                                                        ExamStyles.radio,
                                                        singleSelectedAnswers[question.ID] === "~~~1" && ExamStyles.selectedRadio, // Highlight if selected
                                                    ]} /> */}
                                                    <View style={[
                                                        ExamStyles.radio,
                                                        singleSelectedAnswers[question.ID] === "~~~1" && ExamStyles.selectedRadio
                                                    ]} />
                                                    <HTML
                                                        source={{ html: question.Option_4 }}
                                                        contentWidth={contentWidth}
                                                        style={ExamStyles.tableCellText}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                                {selectedQuestions === questionPaperModel?.Question4 && (

                                    <View style={[ExamStyles.tableRow, { backgroundColor: viewColors[question.ID] }]}>

                                        <View style={ExamStyles.tableCellS}>
                                            <Text style={ExamStyles.tableCellTextA}> Ans:- </Text>
                                        </View>

                                        <View style={ExamStyles.tableCellA}>
                                            <TouchableOpacity
                                                onPress={() => handleSelectForDouble(index + 1, question.ID,
                                                    question.Index_No,
                                                    question.Question_Type,
                                                    question.Class_Name,
                                                    question.Subject_Name,
                                                    question.Chapter_Name,
                                                    question.Question,
                                                    question.Option_1,
                                                    question.Option_2,
                                                    question.Option_3,
                                                    question.Option_4,
                                                    question.Option_5,
                                                    question.Option_6,
                                                    "1",
                                                    question.Question_Format,
                                                    question.Date_Time,
                                                    question.IP_Address,
                                                    question.Active)} >
                                                <View style={ExamStyles.radioTextContainer}>
                                                    <View style={[
                                                        ExamStyles.radio1,
                                                        doubleSelectedAnswers[question.ID]?.includes("1") &&
                                                        ExamStyles.selectedRadio1,
                                                    ]} />
                                                    <HTML
                                                        source={{ html: question.Option_1 }}
                                                        contentWidth={contentWidth}
                                                        style={ExamStyles.tableCellText}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => handleSelectForDouble(index + 1, question.ID,
                                                    question.Index_No,
                                                    question.Question_Type,
                                                    question.Class_Name,
                                                    question.Subject_Name,
                                                    question.Chapter_Name,
                                                    question.Question,
                                                    question.Option_1,
                                                    question.Option_2,
                                                    question.Option_3,
                                                    question.Option_4,
                                                    question.Option_5,
                                                    question.Option_6,
                                                    "2",
                                                    question.Question_Format,
                                                    question.Date_Time,
                                                    question.IP_Address,
                                                    question.Active)}
                                            >
                                                <View style={ExamStyles.radioTextContainer}>
                                                    <View style={[
                                                        ExamStyles.radio1,
                                                        doubleSelectedAnswers[question.ID]?.includes("2") &&
                                                        ExamStyles.selectedRadio1,
                                                    ]} />
                                                    <HTML
                                                        source={{ html: question.Option_2 }}
                                                        contentWidth={contentWidth}
                                                        style={ExamStyles.tableCellText}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => handleSelectForDouble(index + 1, question.ID,
                                                    question.Index_No,
                                                    question.Question_Type,
                                                    question.Class_Name,
                                                    question.Subject_Name,
                                                    question.Chapter_Name,
                                                    question.Question,
                                                    question.Option_1,
                                                    question.Option_2,
                                                    question.Option_3,
                                                    question.Option_4,
                                                    question.Option_5,
                                                    question.Option_6,
                                                    "3",
                                                    question.Question_Format,
                                                    question.Date_Time,
                                                    question.IP_Address,
                                                    question.Active)}
                                            >
                                                <View style={ExamStyles.radioTextContainer}>
                                                    <View style={[
                                                        ExamStyles.radio1,
                                                        doubleSelectedAnswers[question.ID]?.includes("3") &&
                                                        ExamStyles.selectedRadio1,
                                                    ]} />
                                                    <HTML
                                                        source={{ html: question.Option_3 }}
                                                        contentWidth={contentWidth}
                                                        style={ExamStyles.tableCellText}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => handleSelectForDouble(index + 1, question.ID,
                                                    question.Index_No,
                                                    question.Question_Type,
                                                    question.Class_Name,
                                                    question.Subject_Name,
                                                    question.Chapter_Name,
                                                    question.Question,
                                                    question.Option_1,
                                                    question.Option_2,
                                                    question.Option_3,
                                                    question.Option_4,
                                                    question.Option_5,
                                                    question.Option_6,
                                                    "4",
                                                    question.Question_Format,
                                                    question.Date_Time,
                                                    question.IP_Address,
                                                    question.Active)}
                                            >
                                                <View style={ExamStyles.radioTextContainer}>
                                                    <View style={[
                                                        ExamStyles.radio1,
                                                        doubleSelectedAnswers[question.ID]?.includes("4") &&
                                                        ExamStyles.selectedRadio1,
                                                    ]} />
                                                    <HTML
                                                        source={{ html: question.Option_4 }}
                                                        contentWidth={contentWidth}
                                                        style={ExamStyles.tableCellText}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => handleSelectForDouble(index + 1, question.ID,
                                                    question.Index_No,
                                                    question.Question_Type,
                                                    question.Class_Name,
                                                    question.Subject_Name,
                                                    question.Chapter_Name,
                                                    question.Question,
                                                    question.Option_1,
                                                    question.Option_2,
                                                    question.Option_3,
                                                    question.Option_4,
                                                    question.Option_5,
                                                    question.Option_6,
                                                    "5",
                                                    question.Question_Format,
                                                    question.Date_Time,
                                                    question.IP_Address,
                                                    question.Active)}
                                            >
                                                <View style={ExamStyles.radioTextContainer}>
                                                    <View style={[
                                                        ExamStyles.radio1,
                                                        doubleSelectedAnswers[question.ID]?.includes("5") &&
                                                        ExamStyles.selectedRadio1,
                                                    ]} />
                                                    <HTML
                                                        source={{ html: question.Option_5 }}
                                                        contentWidth={contentWidth}
                                                        style={ExamStyles.tableCellText}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                                {selectedQuestions === questionPaperModel?.Question5 && (

                                    <View style={[ExamStyles.tableRow, { backgroundColor: viewColors[question.ID] }]}>
                                        <View style={ExamStyles.tableCellS}>
                                            <Text style={ExamStyles.tableCellTextA}> Ans:- </Text>
                                        </View>
                                        <View style={ExamStyles.tableCellA}>
                                            <TouchableOpacity
                                                onPress={() => handleSelectForTriple(index + 1, question.ID,
                                                    question.Index_No,
                                                    question.Question_Type,
                                                    question.Class_Name,
                                                    question.Subject_Name,
                                                    question.Chapter_Name,
                                                    question.Question,
                                                    question.Option_1,
                                                    question.Option_2,
                                                    question.Option_3,
                                                    question.Option_4,
                                                    question.Option_5,
                                                    question.Option_6,
                                                    "1",
                                                    question.Question_Format,
                                                    question.Date_Time,
                                                    question.IP_Address,
                                                    question.Active)} >
                                                <View style={ExamStyles.radioTextContainer}>

                                                    <View style={[
                                                        ExamStyles.radio1,
                                                        threeSelectedAnswers[question.ID]?.includes("1") &&
                                                        ExamStyles.selectedRadio1,
                                                    ]} />
                                                    <HTML
                                                        source={{ html: question.Option_1 }}
                                                        contentWidth={contentWidth}
                                                        style={ExamStyles.tableCellText}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => handleSelectForTriple(index + 1, question.ID,
                                                    question.Index_No,
                                                    question.Question_Type,
                                                    question.Class_Name,
                                                    question.Subject_Name,
                                                    question.Chapter_Name,
                                                    question.Question,
                                                    question.Option_1,
                                                    question.Option_2,
                                                    question.Option_3,
                                                    question.Option_4,
                                                    question.Option_5,
                                                    question.Option_6,
                                                    "2",
                                                    question.Question_Format,
                                                    question.Date_Time,
                                                    question.IP_Address,
                                                    question.Active)} >
                                                <View style={ExamStyles.radioTextContainer}>
                                                    <View style={[
                                                        ExamStyles.radio1,
                                                        threeSelectedAnswers[question.ID]?.includes("2") &&
                                                        ExamStyles.selectedRadio1,
                                                    ]} />
                                                    <HTML
                                                        source={{ html: question.Option_2 }}
                                                        contentWidth={contentWidth}
                                                        style={ExamStyles.tableCellText}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => handleSelectForTriple(index + 1, question.ID,
                                                    question.Index_No,
                                                    question.Question_Type,
                                                    question.Class_Name,
                                                    question.Subject_Name,
                                                    question.Chapter_Name,
                                                    question.Question,
                                                    question.Option_1,
                                                    question.Option_2,
                                                    question.Option_3,
                                                    question.Option_4,
                                                    question.Option_5,
                                                    question.Option_6,
                                                    "3",
                                                    question.Question_Format,
                                                    question.Date_Time,
                                                    question.IP_Address,
                                                    question.Active)} >
                                                <View style={ExamStyles.radioTextContainer}>
                                                    <View style={[
                                                        ExamStyles.radio1,
                                                        threeSelectedAnswers[question.ID]?.includes("3") &&
                                                        ExamStyles.selectedRadio1,
                                                    ]} />
                                                    <HTML
                                                        source={{ html: question.Option_3 }}
                                                        contentWidth={contentWidth}
                                                        style={ExamStyles.tableCellText}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => handleSelectForTriple(index + 1, question.ID,
                                                    question.Index_No,
                                                    question.Question_Type,
                                                    question.Class_Name,
                                                    question.Subject_Name,
                                                    question.Chapter_Name,
                                                    question.Question,
                                                    question.Option_1,
                                                    question.Option_2,
                                                    question.Option_3,
                                                    question.Option_4,
                                                    question.Option_5,
                                                    question.Option_6,
                                                    "4",
                                                    question.Question_Format,
                                                    question.Date_Time,
                                                    question.IP_Address,
                                                    question.Active)} >
                                                <View style={ExamStyles.radioTextContainer}>
                                                    <View style={[
                                                        ExamStyles.radio1,
                                                        threeSelectedAnswers[question.ID]?.includes("4") &&
                                                        ExamStyles.selectedRadio1,
                                                    ]} />
                                                    <HTML
                                                        source={{ html: question.Option_4 }}
                                                        contentWidth={contentWidth}
                                                        style={ExamStyles.tableCellText}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => handleSelectForTriple(index + 1, question.ID,
                                                    question.Index_No,
                                                    question.Question_Type,
                                                    question.Class_Name,
                                                    question.Subject_Name,
                                                    question.Chapter_Name,
                                                    question.Question,
                                                    question.Option_1,
                                                    question.Option_2,
                                                    question.Option_3,
                                                    question.Option_4,
                                                    question.Option_5,
                                                    question.Option_6,
                                                    "5",
                                                    question.Question_Format,
                                                    question.Date_Time,
                                                    question.IP_Address,
                                                    question.Active)} >
                                                <View style={ExamStyles.radioTextContainer}>
                                                    <View style={[
                                                        ExamStyles.radio1,
                                                        threeSelectedAnswers[question.ID]?.includes("5") &&
                                                        ExamStyles.selectedRadio1,
                                                    ]} />
                                                    <HTML
                                                        source={{ html: question.Option_5 }}
                                                        contentWidth={contentWidth}
                                                        style={ExamStyles.tableCellText}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => handleSelectForTriple(index + 1, question.ID,
                                                    question.Index_No,
                                                    question.Question_Type,
                                                    question.Class_Name,
                                                    question.Subject_Name,
                                                    question.Chapter_Name,
                                                    question.Question,
                                                    question.Option_1,
                                                    question.Option_2,
                                                    question.Option_3,
                                                    question.Option_4,
                                                    question.Option_5,
                                                    question.Option_6,
                                                    "6",
                                                    question.Question_Format,
                                                    question.Date_Time,
                                                    question.IP_Address,
                                                    question.Active)} >
                                                <View style={ExamStyles.radioTextContainer}>
                                                    <View style={[
                                                        ExamStyles.radio1,
                                                        threeSelectedAnswers[question.ID]?.includes("6") &&
                                                        ExamStyles.selectedRadio1,
                                                    ]} />
                                                    <HTML
                                                        source={{ html: question.Option_6 }}
                                                        contentWidth={contentWidth}
                                                        style={ExamStyles.tableCellText}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            </View>
                        ))}
                        {selectedQuestions === questionPaperModel?.Question8 && (
                            <TouchableOpacity style={ExamStyles.submitBtn}
                                onPress={() => {
                                    const dataToSend = matchFollowing;
                                    callAPI(7, question.ID, dataToSend, questionPaperModel.Question8[0]?.Question_Type);
                                }}
                            >
                                <Text style={ExamStyles.submitText}>Submit</Text>
                            </TouchableOpacity>
                        )}

                        {selectedQuestions === questionPaperModel?.Question7 && (
                            <TouchableOpacity style={ExamStyles.submitBtn}
                                onPress={() => {
                                    const dataToSend = longAns;
                                    callAPI(7, question.ID, dataToSend, questionPaperModel.Question7[0]?.Question_Type);
                                }}
                            >
                                <Text style={ExamStyles.submitText}>Submit</Text>
                            </TouchableOpacity>
                        )}
                        {selectedQuestions === questionPaperModel?.Question6 && (
                            <TouchableOpacity style={ExamStyles.submitBtn}
                                onPress={() => {
                                    const dataToSend = shortAns;
                                    callAPI(6, question.ID, dataToSend, questionPaperModel.Question6[0]?.Question_Type);
                                }}
                            >
                                <Text style={ExamStyles.submitText}>Submit</Text>
                            </TouchableOpacity>
                        )}
                        {selectedQuestions === questionPaperModel?.Question5 && (
                            <TouchableOpacity style={ExamStyles.submitBtn}
                                onPress={() => {
                                    const dataToSend = tripleCorrect;
                                    callAPI(5, question.ID, dataToSend, questionPaperModel.Question5[0]?.Question_Type);
                                }}
                            >
                                <Text style={ExamStyles.submitText}>Submit</Text>
                            </TouchableOpacity>
                        )}
                        {selectedQuestions === questionPaperModel?.Question4 && (
                            <TouchableOpacity style={ExamStyles.submitBtn}
                                onPress={() => {
                                    const dataToSend = doubleCorrect;
                                    callAPI(4, question.ID, dataToSend, questionPaperModel.Question4[0]?.Question_Type);
                                }}
                            >
                                <Text style={ExamStyles.submitText}>Submit</Text>
                            </TouchableOpacity>
                        )}
                        {selectedQuestions === questionPaperModel?.Question3 && (
                            <TouchableOpacity style={ExamStyles.submitBtn}
                                onPress={() => {
                                    const dataToSend = singleCorrect;
                                    callAPI(3, question.ID, dataToSend, questionPaperModel.Question3[0]?.Question_Type);
                                }}
                            >
                                <Text style={ExamStyles.submitText}>Submit</Text>
                            </TouchableOpacity>
                        )}
                        {selectedQuestions === questionPaperModel?.Question2 && (
                            <TouchableOpacity style={ExamStyles.submitBtn}
                                onPress={() => {
                                    const dataToSend = trueFalse;
                                    callAPI(question.ID, 2, dataToSend, questionPaperModel.Question2[0]?.Question_Type);
                                }}
                            >
                                <Text style={ExamStyles.submitText}>Submit</Text>
                            </TouchableOpacity>
                        )}
                        {selectedQuestions === questionPaperModel?.Question1 && (
                            <TouchableOpacity style={ExamStyles.submitBtn}
                                onPress={() => {
                                    const dataToSend = modelValue;
                                    callAPI(1, question.ID, dataToSend, questionPaperModel.Question1[0]?.Question_Type);
                                }}
                            >
                                <Text style={ExamStyles.submitText}>Submit</Text>
                            </TouchableOpacity>
                        )}

                    </ScrollView>
                </View>

            </ScrollView>

        </View>
    );
}


export default Exam;