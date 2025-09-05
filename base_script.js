const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then((res) => res.json()) // promise of JSON data
    .then((json) => displayLesson(json.data)); //json.data, এই .data কোত্থেকে এলো? json এর ভিতরে যে data আছে সেটাকে notation করা হলো, যেই নামে থাকবে সেই নামেই notation হবে
};

const loadLevelWord = (id) => {
    manageSpinner(true);

    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    
    fetch(url)
    .then((res) => res.json())
    .then((index) => {

        removeActiveClass(); //remove active class
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        console.log(clickBtn);
        clickBtn.classList.add('active');
        displayLevelWord(index.data);

    });
};

const displayLevelWord = (allWords) => {
    const wordContainer = document.getElementById("word-container");
     wordContainer.innerHTML ="";

     if(allWords.length == 0){
        wordContainer.innerHTML = `
        <div class="text-center col-span-full rounded-xl py-10 space-y-6">
            <img class="mx-auto" src="./assets/alert-error.png" alt="alert_error">    
            <p class="tiro-bangla-regular-italic text-xl text-gray-500 font-medium">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="noto-serif-bengali-font text-4xl font-bold ">পরবর্তী বা পূর্ববর্তী Lesson এ যান</h2>
        </div>`;
        manageSpinner(false);
        return;
     }

    allWords.forEach( getWord => {
        console.log(getWord);
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="poppins-bold text-xl">${getWord.word ? getWord.word : "Word Not Found!"}</h2>
            <p class="inter-fonts fonts-bold">Meaning / Pronounciation</p>
            <div class="tiro-bangla-regular text-2xl font-medium">"${getWord.meaning ? getWord.meaning : "অর্থ পাওয়া যায়নি"} / ${getWord.pronunciation ? getWord.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"</div>
                <div class="flex justify-between items-center">
                    <button onclick="loadWordDetail(${getWord.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
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
    manageSpinner(false);
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
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary tool-tip lesson-btn">
        <i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no}
        </button>
        </div>
        `;
    // 4. append into container
    levelContainer.append(btnDiv);
    }
};

const removeActiveClass= () => {
    const lessonButtons = document.querySelectorAll('.lesson-btn');
    console.log(lessonButtons);
    lessonButtons.forEach(btn => btn.classList.remove('active'));

}

const loadWordDetail = async (id) => {
    const url =`https://openapi.programming-hero.com/api/word/${id}`;
    console.log(id);
    const res = await fetch(url);
    const details = await res.json();

    displayDetails(details.data);

}

const displayDetails= (SingleWord) => {
    console.log(SingleWord);
    const detailsBox =  document.getElementById("details-container");
    detailsBox.innerHTML=`
            <div>
                <h2 class="text-2xl font-bold">${SingleWord.word} (<i class="fa-solid fa-microphone-lines"></i>${SingleWord.pronunciation} )</h2>
                <div class="">
                    <h2 class="font-bold">Meaning</h2>
                    <p>${SingleWord.meaning}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Example</h2>
                    <p>${SingleWord.sentence}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Synonym</h2>
                    <div class="">${createElements(SingleWord.synonyms)}</div>  
                </div>
            </div>
    `;
    document.getElementById("my_modal_5").showModal();
};

const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlElements.join(" ");
};

const manageSpinner = (status) => {
    if(status==true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else {
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

loadLessons();

document.getElementById("btn-search").addEventListener('click', ()=>{
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
        const allWords = data.data;
       
        const filterWords = allWords.filter((word) =>
            word.word.toLowerCase().includes(searchValue)
    );
    displayLevelWord(filterWords);
        
    });

});
