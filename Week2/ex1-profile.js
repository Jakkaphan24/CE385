//const คือการประกาศตัวแปร เพื่อฟริคค่าให้ไม่สามารถเปลี่ยนได้
const Nickname = "BOBBY";
const StudentID = "68110923";
const Age = "22";
const Majer = "Computer Engineering";
const RegisteredCourses = 5;
const YearsLeft = 2;// เหลืออีกกี่ปีก่อนจบ

//คำนวนปีที่จบ
const Gradyear = 2569 + YearsLeft;


console.log(`=== บัตรแนะนำตัว ===
ชื่อเล่น         : ${Nickname}
รหัสนักศึกษา    : ${StudentID}
อายุ           : ${Age} ปี
สาขาวิชา       : ${Majer}
ลงทะเบียน      : ${RegisteredCourses} วิชา
ปีที่จบ         : ${Gradyear}    
     `);
