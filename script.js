let subjects =
    JSON.parse(
        localStorage.getItem("subjects")
    ) || [];

displaySubjects();
loadUserName();

function addSubject(){

    let subject =
        document.getElementById("subject").value;

    let examDate =
        document.getElementById("examDate").value;

    if(subject === "" || examDate === ""){

        alert("Please enter all details");
        return;
    }

    subjects.push({
        subject: subject,
        examDate: examDate,
        completed: false
    });

    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );

    displaySubjects();

    document.getElementById("subject").value = "";
    document.getElementById("examDate").value = "";
}

function displaySubjects(){

    let list =
        document.getElementById("subjectList");

    list.innerHTML = "";

    subjects.forEach((item,index)=>{

        let card =
            document.createElement("div");

        card.className =
            "subject-card";

        let today =
            new Date();

        let exam =
            new Date(item.examDate);

        let diff =
            Math.ceil(
                (exam - today)
                /
                (1000 * 60 * 60 * 24)
            );

        if(diff < 0){
            diff = 0;
        }

        card.innerHTML = `
            <h3>📚 ${item.subject}</h3>

            <p>📅 Exam Date: ${item.examDate}</p>

            <p>⏳ ${diff} Days Left</p>

            <p>
                Status:
                ${item.completed
                    ? "Completed ✅"
                    : "Pending ⏳"}
            </p>

            <button onclick="markComplete(${index})">
                Complete
            </button>

            <button onclick="deleteSubject(${index})">
                Delete
            </button>
        `;

        list.appendChild(card);
    });

    document.getElementById(
        "totalSubjects"
    ).innerText =
        subjects.length;

    document.getElementById(
        "upcomingExams"
    ).innerText =
        subjects.length;

    let completedCount =
        subjects.filter(
            subject => subject.completed
        ).length;

    let progress =
        subjects.length === 0
        ? 0
        : (completedCount / subjects.length) * 100;

    document.getElementById(
        "progressBar"
    ).style.width =
        progress + "%";

    document.getElementById(
        "progressText"
    ).innerText =
        Math.round(progress) +
        "% Completed";
}

function deleteSubject(index){

    subjects.splice(index,1);

    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );

    displaySubjects();
}

function markComplete(index){

    subjects[index].completed = true;

    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );

    displaySubjects();
}

function generateTimetable(){

    let timetable =
        document.getElementById("timetable");

    timetable.innerHTML = "";

    if(subjects.length === 0){

        timetable.innerHTML =
            "<p>No subjects available.</p>";

        return;
    }

    subjects.forEach(subject => {

        let item =
            document.createElement("div");

        item.className =
            "study-item";

        item.innerHTML =
            "📚 " +
            subject.subject +
            " - Study 2 Hours Today";

        timetable.appendChild(item);
    });
}

function toggleDarkMode(){

    document.body.classList.toggle(
        "dark-mode"
    );
}

function saveUserName(){

    let name =
        document.getElementById(
            "userName"
        ).value;

    if(name === ""){
        return;
    }

    localStorage.setItem(
        "userName",
        name
    );

    loadUserName();
}

function loadUserName(){

    let name =
        localStorage.getItem(
            "userName"
        );

    if(name){

        document.getElementById(
            "welcomeText"
        ).innerText =
            "Welcome, " +
            name +
            " 👋";
    }
}