const strinVer = "สวัสดี";
const numberVar = 24;
const booleanVar = true;
let undefinedVar;  
const nullVer = null;
const arrayVer = [1, 2, 3];


console.log(`ค่า: ${strinVer} | ชนิด: ${typeof strinVer}`);
console.log(`ค่า: ${numberVar} | ชนิด: ${typeof numberVar}`);
console.log(`ค่า: ${booleanVar} | ชนิด: ${typeof booleanVar}`);
console.log(`ค่า: ${undefinedVar} | ชนิด: ${typeof undefinedVar}`);
console.log(`ค่า: ${nullVer} | ชนิด: ${typeof null}`);
console.log(`ค่า: ${arrayVer} | ชนิด: ${typeof arrayVer}`);


console.log("typeof null ได้ผลคือ:", typeof null);
console.log("ตัวแปรที่ยังไม่กำหนดค่ามีชนิดเป็น:", typeof arrayVer);

const myNaN = Number("abc");
console.log("typeof NaN ได้ผลคือ:", typeof myNaN);

const inputAge = "20";
const inputScore = "85.5";

console.log("อายุบวก 5:", Number(inputAge) +5); 

console.log("คะแนน:", Number(inputScore).toFixed(1)); //ล็อคทศนิยมให้อยู่ที่ 1 ตำแหน่ง พร้อมปัดเศษหากเกิน

console.log("เช็คแบบไม่แปลง:", inputAge === 20); // ข้อความ "20" กับตัวเลข 20 เป็นคนละชนิดกัน เลยตอบ false

console.log("เช็คแบบแปลงก่อน:", Number(inputAge) === 20); // ตัวเลข 20 กับตัวเลข 20 เป็นชนิดเดียวกัน เลยตอบ true


