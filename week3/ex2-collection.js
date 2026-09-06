// ==========================================
// ส่วนที่ 1 — สร้างข้อมูลตั้งต้น
// ==========================================
const students = [
  { id: "6501", name: "สมชาย", major: "CE", score: 78, contact: { email: "a@dpu.ac.th", phone: "081" } },
  { id: "6502", name: "สมหญิง", major: "IT", score: 91, contact: { email: "b@dpu.ac.th", phone: "082" } },
  { id: "6503", name: "มานี", major: "CE", score: 45, contact: { phone: "083" } }, 
  { id: "6504", name: "ปิติ", major: "IT", score: 66, contact: { email: "piti@dpu.ac.th", phone: "084" } }, 
  { id: "6505", name: "ชูใจ", major: "CE", score: 85, contact: { email: "e@dpu.ac.th" } },
  { id: "6506", name: "วีระ", major: "IT", score: 40, contact: { phone: "086" } }
];

// ==========================================
// ส่วนที่ 2 — เขียนฟังก์ชันค้นหา (ห้ามแก้ array ต้นฉบับ)
// ==========================================

// คืนนักศึกษาคนนั้น หรือ undefined ถ้าไม่พบ
const findById = (students, id) => students.find(s => s.id === id);

// คืน array ของนักศึกษาในสาขานั้น
const findByMajor = (students, major) => students.filter(s => s.major === major);

// คืน true ถ้ามีอย่างน้อย 1 คนที่คะแนนต่ำกว่า 50
const hasFailingStudent = (students) => students.some(s => s.score < 50);

// คืนอีเมล หรือข้อความ "ไม่พบข้อมูลติดต่อ" ถ้าไม่มี
const getEmail = (students, id) => {
  const student = findById(students, id);
  // ใช้ ?. (Optional Chaining) และ ?? (Nullish Coalescing) ตามเงื่อนไข
  return student?.contact?.email ?? "ไม่พบข้อมูลติดต่อ";
};

// ==========================================
// ส่วนที่ 3 — ทดสอบกรณีที่หาไม่เจอ และการเพิ่มข้อมูล
// ==========================================

console.log("--- ทดสอบกรณีหาไม่เจอ ---");
console.log("ค้นหา 9999:", findById(students, "9999")); // ได้ undefined (โปรแกรมไม่พัง)
console.log("ดึงอีเมล 9999:", getEmail(students, "9999")); // ได้ "ไม่พบข้อมูลติดต่อ"

// เงื่อนไข: เพิ่มนักศึกษา 1 คนที่ *ไม่มี* contact (ห้ามใช้ push ให้ใช้ spread สร้าง array ใหม่)
const newStudentsList = [
  ...students, 
  { id: "6507", name: "สายฟ้า", major: "CE", score: 80 } // คนนี้ไม่มี object contact เลย
];

console.log("\n--- ทดสอบนักศึกษาที่เพิ่มเข้ามาใหม่ ---");
console.log("ดึงอีเมล 6507:", getEmail(newStudentsList, "6507")); // ได้ "ไม่พบข้อมูลติดต่อ" 