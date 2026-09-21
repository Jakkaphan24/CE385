// ส่วนที่ 1 — ข้อมูลตั้งต้น
const initialStudents = [
    { id: '991', name: 'JOHN', major: 'CE', score: 85, contact: { email: 'JOHN@mail.com', phone: '081-234-5678' } },
    { id: '992', name: 'TOM', major: 'IT', score: 45, contact: { email: 'TOM@mail.com', phone: '089-876-5432' } },
    { id: '993', name: 'SUSAN', major: 'CE', score: 70, contact: { email: 'SUSAN@mail.com', phone: '092-345-6789' } },
    { id: '994', name: 'JACK', major: 'IT', score: 92, contact: { email: 'JACK@mail.com', phone: '061-987-6543' } },
    { id: '995', name: 'DOBBY', major: 'CE', score: 63, contact: { email: 'DOBBY@mail.com', phone: '085-555-1234' } },
    { id: '996', name: 'CAVIN', major: 'IT', score: 78, contact: { email: 'CAVIN@mail.com', phone: '098-111-2222' } }
];

// ส่วนที่ 2 — ฟังก์ชันค้นหา (ห้ามแก้ข้อมูลเก่า)

// 1. หาจาก ID
const findById = (students, id) => {
    // find = เจอคนแรกปุ๊บ คืนค่าเลย ถ้าไม่มีจะได้ undefined
    return students.find(student => student.id === id);
};

// 2. หาจากสาขา
const findByMajor = (students, major) => {
    // filter = กวาดเอาเฉพาะคนที่เรียนสาขานี้มารวมเป็นก้อนใหม่
    return students.filter(student => student.major === major);
};

// 3. เช็คคนสอบตก (คะแนน < 50)
const hasFailingStudent = (students) => {
    // some = แค่เจอตกคนเดียว ก็ตอบ true ทันที
    return students.some(student => student.score < 50);
};

// 4. ดึงอีเมลจาก ID (ใช้ ?. และ ??)
const getEmail = (students, id) => {
    // ยืมฟังก์ชันแรกมาหาตัวเด็กก่อน จะได้ไม่ต้องเขียนโค้ดซ้ำ
    const student = findById(students, id);
    // ถ้าหาอีเมลไม่เจอ (null หรือ undefined) ให้ใช้ข้อความสำรองแทน
    return student?.contact?.email ?? 'ไม่พบข้อมูลติดต่อ';
};

// ส่วนที่ 3 — ลองรันเทส (รวมตอนไม่มีข้อมูลด้วย)

// ลองหา ID 9999 (ไอดีมั่ว ไม่มีในระบบ)
const notFoundStudent = findById(initialStudents, '9999');
const notFoundEmail = getEmail(initialStudents, '9999');

// รับเด็กใหม่ 1 คน แต่ไม่มีข้อมูลติดต่อ
const newStudent = { id: '997', name: 'นินิว', major: 'CE', score: 81 }; 

// ใช้ ... เอาเด็กเก่ามาต่อเด็กใหม่เป็นก้อนใหม่ (ไม่ใช้ push เพราะเดี๋ยวข้อมูลเก่าพัง)
const updatedStudents = [...initialStudents, newStudent];

// ลองดึงเมลเด็กใหม่ที่เพิ่งเพิ่ม (เช็คว่าระบบป้องกัน error ทำงานไหม)
const noContactEmail = getEmail(updatedStudents, '997');

// === แสดงผลลัพธ์ ===

console.log('=== ผลการค้นหานักศึกษา ===');
console.log('ข้อมูลของไอดี 994 :', findById(updatedStudents, '994'));
console.log('รายชื่อนักศึกษาสาขา IT :', findByMajor(updatedStudents, 'IT'));
console.log('มีเด็กสอบตกหรือไม่ :', hasFailingStudent(updatedStudents));

console.log('\n=== ทดสอบระบบถ้าหาไม่เจอและข้อมูลไม่ครบ ===');
console.log('ค้นหา ID 999 (ไม่มีในระบบ) :', notFoundStudent); // ต้องขึ้น undefined
console.log('ดึงอีเมล ID 999 :', notFoundEmail); // ต้องขึ้น "ไม่พบข้อมูลติดต่อ"

console.log('\n=== ทดสอบการเพิ่มข้อมูลแบบไม่ใช้ push ===');
console.log('เช็คข้อมูลน้องใหม่ที่เพิ่งเพิ่มเข้ามา :', findById(updatedStudents, '997'));
console.log('ดึงอีเมล ID 997 (คนที่ไม่มี contact) :', noContactEmail); // ต้องขึ้น "ไม่พบข้อมูลติดต่อ"