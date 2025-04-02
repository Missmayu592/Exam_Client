import { Alert } from "react-native";

function CallApi(){

    const handleSubmit = async() =>{
        try{
            const response = await fetch('xyz',{

            }

            )

        }catch(error){
            Alert.alert("Error", error.message)
        }
    }

}


export default CallApi;