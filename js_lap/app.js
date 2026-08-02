// 1
// const input = prompt("คะแนนสอบ");

// const num = Number(input);
// if(num >= 0 && num <= 100) { 
//     if (num >= 50) { 
//         console.log("สอบผ่าน");
//     }else
//         console.log("สอบไม่ผ่าน");
    
// }else
//     console.log("ข้อมูลไม่ถูกต้อง")


//2
let score = [45,78,82,35,90];
let i = 0 ; 
console.log("While loop");
while (i < score.length) { 
    console.log(score[i]);
    i+= 1 ;
}
console.log("For loop")
for (i = 0 ; i < score.length ; i ++) {  
    console.log(score[i]);
}

console.log("Push Number")
score.push(65); 
score.push(48);
for (i = 0 ; i < score.length ; i ++) {  
    console.log(score[i]);
}
console.log("Pop Number"); 
score.pop();
for (i = 0 ; i < score.length ; i ++) {  
    console.log(score[i]);
}
console.log("Check number of 82");
console.log(score.includes(82));
console.log(score.includes(!82));

score.sort ;
console.log("After Sort") 
for (i = 0 ; i < score.length ; i ++) {  
    console.log(score[i]);
}

let students = [
    { id: 1, name: "Somchai", score: 48 },
    { id: 2, name: "Somsri", score: 75 },
    { id: 3, name: "Sompong", score: 32 },
    { id: 4, name: "Somnak", score: 85 }
];
console.log("ForEach")
students.forEach(student => {
    console.log("ชื่อนักศึกษา : ",student.name ," | ", "ได้คะแนน :" , student.score);
});

console.log("Map") ;
const newarray = students.map(student => {
    return { 
        ...student, 
        score: student.score * 2
    }
});
console.log(newarray);

console.log("Filter");
const Pass_Students = students.filter(student => {
  return student.score >= 50; 
});
console.log(Pass_Students);


console.log("Find") ; 
const findStudent = students.find(student => {
  return student.name === "Somsri"; 
});
console.log(findStudent);


function calculateGrade(score) {
  if (score >= 80) {
    return "A";
  } else if (score >= 60) {
    return "B";
  } else {
    return "F";
  }
}

console.log(calculateGrade(85)); 
console.log(calculateGrade(70)); 
console.log(calculateGrade(55)); 



let input = prompt("ทายเลขลูกเต๋า (ใส่เลข 1 - 6):");

let guess = Number(input);
let roll = Math.floor(Math.random() * 6) + 1;
if (guess === roll) {
    console.log("ยินดีด้วย! คุณทายถูกต้อง เลขที่ออกคือ " + roll);
} else {
    console.log("เสียใจด้วย! คุณทายผิด บอททอยลูกเต๋าได้เลข " + roll);
}