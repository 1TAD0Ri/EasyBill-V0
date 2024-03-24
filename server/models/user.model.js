const mongoose = require('mongoose');

// this for the password validation
const validatePw = function (value){
    let ok=true;
    let upper=0;
    let min = 0;
    let special = 0;
    let num=0;
    for(let i=0;i<value.length;i++){
        if("A"<=value.charAt(i)&& value.charAt(i)<="Z"){
            upper++;
        }else if ("a"<= value.charAt(i) && value.charAt(i)<="z"){
            min++;
        }else if(0<= value.charAt(i) && value.charAt(i)<=9){
            num++;
        }else{
            special++;
        }
    }
    if(upper==0||min==0||special==0|| num==0){
        return false;
    }else{
        return true;
    }

};

// this for the email validation
const validateEmail = function (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


const User = mongoose.Schema({
    name:{
        type:String,
        required:[true,"{PATH} Must be Non Vide"],
        minlength:[3,"{PATH} Must Be At least 3 character long"]
    },
    pw:{
        type:String,
        required:true,
        minlength:[3,"{PATH} must be at least 3 String long"],
        validate: {
            validator: validatePw,
            message: "{PATH} must meet custom password criteria"
        }
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator:validateEmail,
            message:"{PATH} must meet the custom password"
        }
    },
    adresse: {
        type:String,
        required:true
        
    },
    companyname:{type:String}
},{timestamps:true});

const Users = mongoose.model('User',User);

module.exports = Users;