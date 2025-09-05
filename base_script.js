const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then((res) => res.json()) // promise of JSON data
    .then((json) => displayLesson(json.data)); //json.data, এই .data কোত্থেকে এলো? json এর ভিতরে যে data আছে সেটাকে notation করা হলো, যেই নামে থাকবে সেই নামেই notation হবে
};

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((index) => displayLevelWord(index.data));
    
};

const displayLevelWord = (allWords) => {
    const wordContainer = document.getElementById("word-container");
     wordContainer.innerHTML ="";

    allWords.forEach( getWord => {
        console.log(getWord);
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="poppins-bold text-xl">${getWord.word}</h2>
            <p class="inter-fonts fonts-semibold">Meaning / Pronounciation</p>
            <div class="tiro-bangla-regular text-2xl font-medium">"${getWord.meaning} / ${getWord.pronunciation}"</div>
                <div class="flex justify-between itemes-center">
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                        <i class="fa-solid fa-circle-info"></i>
                    </button>
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
            </div>
        `;
        wordContainer.append(card);
    });
      
};

const displayLesson = (lessons) => {
    // 1. Get the container & empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    // 2. Get into every lessons
    for (let lesson of lessons){
        // 3.create element 
        // console.log(lesson);
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <div class="tooltip" data-tip="${lesson.lessonName}">
        <button onclick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary tool-tip">
        <i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no}
        </button>
        </div>
        `;
    // 4. append into container
    levelContainer.append(btnDiv);
    }
};


loadLessons();

