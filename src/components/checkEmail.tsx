import { EMAIL_LENGTH, STUDENT_ID_LENGTH } from "../utilites/EmailLength";
import isNumber from "../utilites/isNumber";

const checkEmail = (email: string) => {

    for(let i = 0; i < STUDENT_ID_LENGTH; i++)
    {
      if(!isNumber(email[i]))
        return false;
    }
  
    if (email.slice(STUDENT_ID_LENGTH, EMAIL_LENGTH).localeCompare("@stu.yasar.edu.tr") !== 0 )
      return false
    
    return true;
  }

  export default checkEmail;