// ส่วนที่ 1: ประกาศตัวแปร students ไว้ด้านบนสุดของไฟล์
const students = [
  { id: "6501", name: "สมชาย ใจดี", major: "CPE", score: 85 },
  { id: "6502", name: "สมหญิง รักเรียน", major: "CPE", score: 92 },
  { id: "6503", name: "อนุชา มุ่งมั่น", major: "IT", score: 78 },
  { id: "6504", name: "กานดา สดใส", major: "CS", score: 88 }
];

// ส่วนที่ 2: ฟังก์ชันค้นหาข้อมูล
function fetchStudentById(id, callback) {
  if (typeof id !== "string" || id.trim() === "") {
    return callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
  }

  setTimeout(() => {
    const student = students.find((s) => s.id === id);

    if (!student) {
      return callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
    }

    callback(null, { ...student });
  }, 300);
}

// ฟังก์ชันแสดงผลลัพธ์
function handleResult(err, student) {
  if (err) {
    console.error("Error:", err.message);
    return;
  }
  console.log("Found student:", student);
}

// ส่วนที่ 3: เรียกใช้งาน 3 กรณี
fetchStudentById("6501", handleResult);
fetchStudentById("9999", handleResult);
fetchStudentById(42, handleResult);





//1. โปรแกรมจะพัง (Crash) ทันที เพราะไปอ่านค่าจากของที่ไม่มีอยู่จริง (undefined) ส่วนคนที่เห็น error ก็คือตัวเราเอง (Dev) บนหน้าจอ Terminal
//2. เพื่อตัดจบให้ฟังก์ชันหยุดทำงานตรงนั้นเลย ถ้าไม่ใส่ return โค้ดด้านล่างมันจะแอบไหลไปรันต่อ แล้วเผลอเรียก callback ซ้ำอีกรอบจนระบบมั่ว

