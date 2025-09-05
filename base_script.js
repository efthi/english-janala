const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then((res) => res.json()) // promise of JSON data
    .then((json) => displayLesson(json.data)); //json.data, এই .data কোত্থেকে এলো? json এর ভিতরে যে data আছে সেটাকে notation করা হলো, যেই নামে থাকবে সেই নামেই notation হবে
};

const displayLesson = (lessons) => {
    // 1. Get the container & empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    // 2. Get into every lessons
    for (let lesson of lessons){
        // 3.create element 
        console.log(lesson);
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <div class="tooltip" data-tip="${lesson.lessonName}">
        <button class="btn btn-outline btn-primary tool-tip">
        <i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no}
        </button>
        </div>
        `;
    // 4. append into container
    levelContainer.append(btnDiv);
    }
};
loadLessons();