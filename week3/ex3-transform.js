// ข้อมูลนักศึกษา
const studentsData = [
    { id: '991', name: 'JOHN', major: 'CE', score: 85, contact: { email: 'JOHN@mail.com', phone: '081-234-5678' } },
    { id: '992', name: 'TOM', major: 'IT', score: 45, contact: { email: 'TOM@mail.com', phone: '089-876-5432' } },
    { id: '993', name: 'SUSAN', major: 'CE', score: 70, contact: { email: 'SUSAN@mail.com', phone: '092-345-6789' } },
    { id: '994', name: 'JACK', major: 'IT', score: 92, contact: { email: 'JACK@mail.com', phone: '061-987-6543' } },
    { id: '995', name: 'DOBBY', major: 'CE', score: 63, contact: { email: 'DOBBY@mail.com', phone: '085-555-1234' } },
    { id: '996', name: 'CAVIN', major: 'IT', score: 78, contact: { email: 'CAVIN@mail.com', phone: '098-111-2222' } }
];

// เกณฑ์ตัดเกรด
const gradeCriteria = [
    { min: 80, grade: 'A' },
    { min: 75, grade: 'B+' },
    { min: 70, grade: 'B' },
    { min: 65, grade: 'C+' },
    { min: 60, grade: 'C' },
    { min: 55, grade: 'D+' },
    { min: 50, grade: 'D' },
    { min: 0, grade: 'F' }
];

// ฟังก์ชันเทียบคะแนนเป็นเกรด
const toGrade = (score) => gradeCriteria.find(rule => score >= rule.min).grade;

// ส่วนที่ 1 — ฟังก์ชันทั้ง 6 (ห้ามแก้ข้อมูลต้นฉบับ)

// 1. ดึงแค่ชื่อ (map = หยิบมาแค่ที่สั่ง)
const getNames = (students) => students.map(s => s.name);

// 2. ดึงคนที่สอบผ่าน 50 คะแนน (filter = คัดกรอง)
const getPassedStudents = (students) => students.filter(s => s.score >= 50);

// 3. รวมคะแนนทั้งหมด (reduce = จับบวกสะสม)
const getTotalScore = (students) => students.reduce((sum, s) => sum + s.score, 0);

// 4. หาคะแนนเฉลี่ย
const getAverageScore = (students) => {
    if (students.length === 0) return 0; // ไม่มีคนให้ตอบ 0 โค้ดจะได้ไม่พัง
    const total = getTotalScore(students);
    return +(total / students.length).toFixed(2); // ปัดเศษ 2 ตำแหน่ง
};

// 5. นับจำนวนคนได้แต่ละเกรด
const countByGrade = (students) => students.reduce((acc, s) => {
    const grade = toGrade(s.score); // ตีเป็นเกรดก่อน
    acc[grade] = (acc[grade] || 0) + 1; // เพิ่งเจอให้นับ 1 ถ้ามีแล้วก็บวกเพิ่ม
    return acc;
}, {});

// 6. หาตัวท็อปคะแนนสูงสุด
const getTopStudent = (students) => students.reduce((top, current) => {
    if (!top) return current; // ให้คนแรกเป็นแชมป์ยืนรอไว้ก่อน
    return current.score > top.score ? current : top; // เทียบทีละคู่ ใครเยอะกว่าชนะ
}, null);

// ส่วนที่ 2 — ต่อท่อข้อมูลรวดเดียวจบ

// หาค่าเฉลี่ยเด็ก CE ที่สอบผ่าน
const cePassedAvg = studentsData
    .filter(s => s.major === 'CE' && s.score >= 50) // คัดเด็ก CE ที่สอบผ่าน
    .map(s => s.score) // หยิบมาแค่คะแนน
    .reduce((sum, score, _, arr) => sum + (score / arr.length), 0); // คำนวณค่าเฉลี่ย

// ส่วนที่ 3 — ลองรันผลลัพธ์ดู

console.log('=== ส่วน 1 ผลปกติ ===');
console.log('ชื่อนักศึกษาทุกคน:', getNames(studentsData));
console.log('นักศึกษาสอบผ่าน:', getPassedStudents(studentsData));
console.log('คะแนนรวม:', getTotalScore(studentsData));
console.log('คะแนนเฉลี่ย:', getAverageScore(studentsData));
console.log('สรุปเกรด:', countByGrade(studentsData));
console.log('คนที่ได้คะแนนสูงสุด:', getTopStudent(studentsData));

console.log('\n=== ส่วน 2 ท่อข้อมูล ===');
console.log('คะแนนเฉลี่ยนักศึกษา CE ที่สอบผ่าน:', cePassedAvg);

console.log('\n=== ส่วน 3 ทดสอบ Array ว่าง โค้ดต้องไม่บึ้ม ===');
const emptyArray = [];
console.log('getNames:', getNames(emptyArray));                   // ได้ []
console.log('getPassedStudents:', getPassedStudents(emptyArray)); // ได้ []
console.log('getTotalScore:', getTotalScore(emptyArray));         // ได้ 0
console.log('getAverageScore:', getAverageScore(emptyArray));     // ได้ 0
console.log('countByGrade:', countByGrade(emptyArray));           // ได้ {}
console.log('getTopStudent:', getTopStudent(emptyArray));         // ได้ null