const students = [
  { id: "6501", name: "สมชาย ใจดี", major: "CPE", score: 85 },
  { id: "6502", name: "สมหญิง รักเรียน", major: "CPE", score: 92 },
  { id: "6503", name: "อนุชา มุ่งมั่น", major: "IT", score: 78 },
  { id: "6504", name: "กานดา สดใส", major: "CS", score: 88 }
];

// --- ส่วนที่ 1 ---
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

// --- ส่วนที่ 2 ---
// ก) id ที่มีจริง
fetchStudentByIdAsync("6501")
  .then(res => {
    console.log("กรณี ก พบข้อมูล:", res);
    return res;
  })
  .catch(err => console.log("กรณี ก Error:", err.message))
  .finally(() => console.log("--- จบกรณี ก ---"));

// ข) id ที่ไม่มี
fetchStudentByIdAsync("9999")
  .then(res => {
    console.log("กรณี ข พบข้อมูล:", res);
    return res;
  })
  .catch(err => console.log("กรณี ข Error:", err.message))
  .finally(() => console.log("--- จบกรณี ข ---"));

// ค) id ผิดรูปแบบ
fetchStudentByIdAsync(42)
  .then(res => {
    console.log("กรณี ค พบข้อมูล:", res);
    return res;
  })
  .catch(err => console.log("กรณี ค Error:", err.message))
  .finally(() => console.log("--- จบกรณี ค ---"));


// --- ส่วนที่ 3 ---
fetchStudentByIdAsync("6502")
  .then(student => {
    // ขั้น 1: ตัดเกรด
    let grade = 'F';
    if(student.score >= 80) grade = 'A';
    else if(student.score >= 70) grade = 'B';
    else if(student.score >= 60) grade = 'C';
    else if(student.score >= 50) grade = 'D';

    // ต้อง return ส่งต่อ
    return { name: student.name, grade: grade };
  })
  .then(data => {
    // ขั้น 2: แปลงเป็นข้อความ
    let text = `นักศึกษา: ${data.name} ได้เกรด: ${data.grade}`;
    return text;
  })
  .then(msg => {
    // ขั้น 3: ปริ้นออก console
    console.log("ผลลัพธ์:", msg);
    return msg; 
  })
  .catch(err => {
    console.log("Error ส่วนที่ 3:", err.message);
  });


// --- ส่วนที่ 4 (โบนัส) ---
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  };
}

function checkWeather(city, callback) {
  setTimeout(() => {
    if (city === "Bangkok") {
      callback(null, "แดดร้อนมาก");
    } else {
      callback(new Error("ไม่รู้จักเมืองนี้"));
    }
  }, 500);
}

const checkWeatherAsync = promisify(checkWeather);

checkWeatherAsync("Bangkok")
  .then(result => {
    console.log("โบนัส:", result);
    return result; 
  })
  .catch(err => {
    console.log("โบนัส Error:", err.message);
  });