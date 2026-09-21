// ==========================================
// ส่วนที่ 1 — เขียนฟังก์ชันเหล่านี้
// ==========================================

// 1. เช็คว่าคะแนนที่รับมาเป็นตัวเลขและอยู่ระหว่าง 0-100 ไหม
const isValidScore = (score) => typeof score === 'number' && score >= 0 && score <= 100;

// สร้างเกณฑ์คะแนนไว้เพื่อหลีกเลี่ยงการเขียน if-else ซ้อนกัน (ตัวเลขเกณฑ์เป็น const สื่อความหมาย)
const GRADE_RULES = [
  { min: 80, grade: 'A' }, { min: 75, grade: 'B+' },
  { min: 70, grade: 'B' }, { min: 65, grade: 'C+' },
  { min: 60, grade: 'C' }, { min: 55, grade: 'D+' },
  { min: 50, grade: 'D' }, { min: 0, grade: 'F' }
];

// 2. ฟังก์ชันแปลงคะแนนเป็นเกรด (เรียก isValidScore ตรวจก่อนตัดเกรดเสมอ)
const toGrade = (score) => {
  if (!isValidScore(score)) return 'คะแนนไม่ถูกต้อง';
  return GRADE_RULES.find(r => score >= r.min).grade;
};

// 3. แปลงคะแนนดิบ โดยมีค่าเริ่มต้น (raw / full) * weight
const calculateWorkshopScore = (raw, full = 60, weight = 20) => (raw / full) * weight;

// 4. จับคะแนน 5 ก้อนมารวมกัน
const calculateTotal = (workshop, attendance, project, midterm, final) => 
  workshop + attendance + project + midterm + final;


// ==========================================
// ส่วนที่ 2 — ทดสอบ (สร้างนักศึกษา 3 คน คํานวณ และแสดงเป็นตาราง)
// ==========================================

const students = [
  { name: "BOBBY", rawWorkshop: 48, attendance: 10, project: 15, midterm: 20, final: 25 },
  { name: "TOMMY", rawWorkshop: 60, attendance: 10, project: 20, midterm: 30, final: 20 },
  { name: "JACKY", rawWorkshop: 30, attendance: 5, project: 10, midterm: 15, final: 10 }
];

// ใช้ map เพื่อคำนวณคะแนนและดึงข้อมูลออกมาเตรียมแสดงผล
const report = students.map(student => {
  const wsScore = calculateWorkshopScore(student.rawWorkshop);
  const totalScore = calculateTotal(wsScore, student.attendance, student.project, student.midterm, student.final);
  const grade = toGrade(totalScore);

  return {
    "ชื่อ": student.name,
    "คะแนน Workshop": wsScore,
    "คะแนนรวม": totalScore,
    "เกรด": grade
  };
});

console.log("--- ตารางสรุปผลการเรียน (ส่วนที่ 2) ---");
console.table(report); // แสดงผลเป็นตาราง


// ==========================================
// ส่วนที่ 3 — พิสูจน์ว่าค่าเริ่มต้นทำงาน
// ==========================================

console.log("\n--- พิสูจน์ค่าเริ่มต้น (ส่วนที่ 3) ---");

const test1 = calculateWorkshopScore(48);
const test2 = calculateWorkshopScore(48, 60, 20);
console.log(`calculateWorkshopScore(48) ได้: ${test1}`); 
console.log(`calculateWorkshopScore(48, 60, 20) ได้: ${test2}`);
console.log("-> แสดงว่าได้ผลเท่ากันครับ");

const test3 = calculateWorkshopScore(48, undefined, 25);
console.log(`calculateWorkshopScore(48, undefined, 25) ได้: ${test3}`);
// อธิบายผล:
// การส่ง undefined ไปในพารามิเตอร์ full ทำให้โปรแกรมดึงค่าเริ่มต้น (full = 60) มาใช้งานตามปกติ
// ส่วนเลข 25 ที่ส่งไป จะไปเขียนทับค่าเริ่มต้นของ weight (จาก 20 กลายเป็น 25) 
// สมการจึงถูกคำนวณเป็น (48 / 60) * 25 ซึ่งเท่ากับ 20 ครับ