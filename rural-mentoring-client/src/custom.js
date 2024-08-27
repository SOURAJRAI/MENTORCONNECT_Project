import Axios from 'axios';

const API = "b586fea0-52e6-11ef-8b60-0200cd936042";

export const sendOtp =(phone,otp)=>{
    Axios.get("https://2factor.in/API/V1/" + API + "/SMS/+91" + phone + "/" + otp)
    .then((response) => {
        console.log(response);
    });
}