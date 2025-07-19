const courses = [
    { code: "WDD130", name: "Web Fundamentals", credits: 1, category: "WDD", completed: true },
    { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 1, category: "WDD", completed: false },
    { code: "CSE121b", name: "JavaScript Language", credits: 3, category: "CSE", completed: true },
    { code: "WDD231", name: "Frontend Development I", credits: 1, category: "WDD", completed: false }
];

const coursesContainer = document.getElementById("courses");
const totalCredits = document.getElementById("totalCredits");

function displayCourses(filter) {
    const filtered = filter === "All" ? courses : courses.filter(c => c.category === filter);
    coursesContainer.innerHTML = "";
    let total = 0;

    filtered.forEach(course => {
        const div = document.createElement("div");
        div.classList.add("course-card");
        if (course.completed) div.classList.add("completed");

        div.innerHTML = `<h3>${course.code}</h3><p>${course.name}</p><p>${course.credits} credit(s)</p>`;
        coursesContainer.appendChild(div);
        total += course.credits;
    });

    totalCredits.textContent = `Total credits: ${total}`;
}

document.getElementById("all").addEventListener("click", () => displayCourses("All"));
document.getElementById("cse").addEventListener("click", () => displayCourses("CSE"));
document.getElementById("wdd").addEventListener("click", () => displayCourses("WDD"));

// Initial load
displayCourses("All");
