let current = 0;
let score = 0;

const quiz = document.getElementById("quiz");

showQuestion();

function showQuestion(){

const q = questions[current];

quiz.innerHTML = `
<h2>${q.question}</h2>
`;

q.choices.forEach((choice,index)=>{

const btn = document.createElement("button");

btn.className="choice";

btn.textContent=choice;

btn.onclick=()=>checkAnswer(index);

quiz.appendChild(btn);

});

}

function checkAnswer(index){

const q = questions[current];

if(index===q.answer){

alert("正解！\n"+q.explanation);
score++;

}else{

alert("不正解\n"+q.explanation);

}

current++;

if(current>=questions.length){

document.getElementById("result").innerHTML=
`<h2>結果</h2>
<p>${score}/${questions.length}問正解</p>`;

quiz.innerHTML="";

}else{

showQuestion();

}

}