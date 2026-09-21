const wait = (ms, value, willFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => (willFail ? reject(new Error(`${value} ล้มเหลว`)) : resolve(value)), ms);
  });

// ฟังก์ชันจับเวลา สำหรับใช้ในสถานการณ์ที่ 4
const timeoutPromise = (ms) =>
  new Promise((_, reject) => setTimeout(() => reject(new Error("หมดเวลา")), ms));

async function main() {
  console.log("=== สถานการณ์ที่ 1: หน้าแรก ===");
  try {
    console.log(">> ทดสอบเคสปกติ (รอดหมด):");
    const res1 = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ")
    ]);
    console.log(`เปิดหน้าแรก: ${res1.join(", ")}`);
  } catch (err) {
    console.log(`หน้าแรกเปิดไม่ได้: ${err.message}`);
  }

  try {
    console.log(">> ทดสอบเคสประกาศพัง (willFail=true):");
    const res1Fail = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ", true) // ตั้งให้ประกาศพัง
    ]);
    console.log(`เปิดหน้าแรก: ${res1Fail.join(", ")}`);
  } catch (err) {
    console.log(`หน้าแรกเปิดไม่ได้: ${err.message}`);
  }

  console.log("\n=== สถานการณ์ที่ 2: แจ้งเตือนผลสอบ ===");
  const res2 = await Promise.allSettled([
    wait(300, "อีเมล", false),
    wait(500, "SMS", true), // SMS พัง
    wait(400, "แอป", false)
  ]);
  
  console.log("รายงานสถานะการส่ง:");
  res2.forEach(result => {
    if (result.status === "fulfilled") console.log(`- ส่งสำเร็จ: ${result.value}`);
    else console.log(`- พัง: ${result.reason.message}`);
  });

  console.log("\n=== สถานการณ์ที่ 3: Mirror Server ===");
  try {
    const res3 = await Promise.any([
      wait(300, "mirror-A", true), // A พัง
      wait(600, "mirror-B", false) // B สำเร็จ
    ]);
    console.log(`ได้ข้อมูลตัวแรกที่สำเร็จ -> ใช้ข้อมูลจาก: ${res3}`);
  } catch (err) {
    console.log("พังหมดทุก mirror เลย");
  }

  console.log("\n=== สถานการณ์ที่ 4: ค้นหา Database ===");
  try {
    const res4 = await Promise.race([
      wait(1200, "ฐานข้อมูล", false), // โหลดนาน 1200ms
      timeoutPromise(800)            // จับเวลาแค่ 800ms
    ]);
    console.log(`ได้ข้อมูล: ${res4}`);
  } catch (err) {
    if (err.message === "หมดเวลา") {
      console.log("เกิน 800ms -> เลิกรอ -> ใช้แคชเก่าแทน");
    } else {
      console.log(`Error: ${err.message}`);
    }
  }
}

// เรียกรันฟังก์ชัน
main();