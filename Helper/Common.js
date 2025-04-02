import { Alert, PermissionsAndroid, Platform } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

// Open the SQLite database
const db = SQLite.openDatabase(
  { name: 'examInformation.db', location: 'default' },
  () => Alert.alert("Database opened successfully"),
  error => console.error("Database open error: ", error)
);

class Common {

  // Method to create table
  static createTable() {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS Student_Table (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          Type VARCHAR(20),
          Response VARCHAR(20),
          Exam_Id INTEGER,
          Sync_Status INTEGER
        )`,
        [],
        () => console.log("Table created successfully"),
        error => console.error("Failed to create table: ", error.message)
      );
    });
  }

  //  Method to insert user data into table
  static insertUser(type, response, examId, Sync_Status) {
    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO Student_Table (Type, Response, Exam_Id, Sync_Status) VALUES (?, ?, ?, ?)`,
        [type, response, examId, Sync_Status],
        (tx, res) => console.log("Data inserted successfully!"),
        error => console.error("Failed to insert data: ", error.message)
      );
    });
  }

  //  Fetch all data from the table and show in alert
  static getAllUsers() {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM Student_Table",
        [],
        (tx, res) => {
          const rows = [];
          for (let i = 0; i < res.rows.length; i++) {
            rows.push(res.rows.item(i));
          }

          // Convert the rows to a readable string format for the alert
          const dataString = rows.map(row =>
            `ID: ${row.Id}, Type: ${row.Type}, Response: ${row.Response}, Sync Status: ${row.Sync_Status}`).join("\n");

          // Show the data in an alert
          Alert.alert("Student Data", dataString || "No data found");
        },
        (error) => {
          console.error("Failed to fetch data: ", error.message);
          Alert.alert("Error", "Failed to fetch data: " + error.message); // Display the error in an alert
        }
      );
    });
  }


  static handleSubmit = async(url,method,model) =>{
    try{
        const response = await fetch(url,{
            method: method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: model,
        }

        )

    }catch(error){
        Alert.alert("Error", error.message)
    }
}
}




// Function to request storage permissions (used when needed)
export async function requestPermissions() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to save data.',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
        // Alert.alert('Storage permission granted')
        // Now, you can safely access the file system or SQLite database
      } else {
        console.log('Storage permission denied');
        Alert.alert('Permission Denied', 'Storage permission is required for saving data.');
      }
    } catch (err) {
      console.warn(err);
    }
  }
}

export default Common;
