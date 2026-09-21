const students = [
  { id: "6501", name: "สมชาย ใจดี", major: "CPE", score: 85 },
  { id: "6502", name: "สมหญิง รักเรียน", major: "CPE", score: 92 },
  { id: "6503", name: "อนุชา มุ่งมั่น", major: "IT", score: 78 },
  { id: "6504", name: "กานดา สดใส", major: "CS", score: 88 }
];

function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    if (typeof id !== "string" || id.trim() === "") {
      return reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
    }
    setTimeout(() => {
      const student = students.find(s => s.id === id);
      if (!student) {
        return reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
      }
      resolve({ ...student });
    }, 300);
  });
}

// ฟังก์ชันช่วยตัดเกรด
const getGrade = (score) => {
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
};

// --- ส่วนที่ 1: ดึงแบบลำดับ (ทีละคน) ---
async function reportSequential() {
  console.log("--- ส่วนที่ 1: ดึงข้อมูลทีละคน (Sequential) ---");
  const ids = ["6501", "6502", "6503"];
  const start = Date.now();

  for (const id of ids) {
    const student = await fetchStudentByIdAsync(id);
    console.log(`ได้ข้อมูล: ${student.name}`);
  }

  const end = Date.now();
  const timeTaken = end - start;
  console.log(`>> แบบลำดับใช้เวลา: ${timeTaken} ms\n`);
  return timeTaken; // ส่งเวลาไปเทียบในส่วนที่ 2
}

// --- ส่วนที่ 2: ดึงแบบขนาน (พร้อมกัน) ---
async function reportParallel(seqTime) {
  console.log("--- ส่วนที่ 2: ดึงข้อมูลพร้อมกัน (Parallel) ---");
  const ids = ["6501", "6502", "6503"];
  const start = Date.now();

  // สร้าง array ของ Promise ด้วย .map
  const promises = ids.map(id => fetchStudentByIdAsync(id));
  
  // ใช้ Promise.all ดึงพร้อมกันทีเดียว
  const results = await Promise.all(promises);

  for (const student of results) {
    console.log(`ได้ข้อมูล: ${student.name}`);
  }

  const end = Date.now();
  const parTime = end - start;
  const speedUp = (seqTime / parTime).toFixed(2);
  
  console.log(`>> แบบขนานใช้เวลา: ${parTime} ms`);
  console.log(`>> เร็วกว่าแบบลำดับประมาณ ${speedUp} เท่า!\n`);
}

// --- ส่วนที่ 3: ดึงข้อมูลแบบปลอดภัยด้วย try-catch-finally ---
async function safeReport(id) {
  try {
    const student = await fetchStudentByIdAsync(id);
    const grade = getGrade(student.score);
    console.log(`พบข้อมูล: ${student.name} (เกรด ${grade})`);
  } catch (error) {
    console.log(`ตรวจไม่พบ: ${error.message}`);
  } finally {
    console.log(`-- จบการตรวจสอบ ${id} --`);
  }
}

async function main() {
  // รอให้ส่วนที่ 1 เสร็จ ค่อยส่งเวลาไปส่วนที่ 2
  const seqTime = await reportSequential();
  await reportParallel(seqTime);

  console.log("--- ส่วนที่ 3: ทดสอบ safeReport ---");
  await safeReport("6504"); // กรณีเจอ
  await safeReport("9999"); // กรณีไม่เจอ
}

main();





//ข้อ 1: เพราะ await สั่งให้โปรแกรม "หยุดรอ" ตรงนั้นเลย พอมี error จึงโยนเข้า catch ได้ทันที ส่วน callback จะทำงานอยู่เบื้องหลัง พอ error เด้งขึ้นมา ตัว try-catch มันรันผ่านไปตั้งนานแล้ว เลยจับไม่ทัน
//เราจะได้ตัว Promise { <pending> } กลับมาแทนข้อมูลจริง แล้วถ้าเผลอเอาไปวนลูปต่อ โปรแกรมจะพัง (Error) ทันที เพราะจะเอาของที่ยังโหลดไม่เสร็จไปใช้