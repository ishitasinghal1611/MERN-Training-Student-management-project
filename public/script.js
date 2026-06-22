
async function addStudent() {

    const response = await fetch("/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            age: Number(document.getElementById("age").value),
            course: document.getElementById("course").value
        })
    });

    const data = await response.json();
    alert("Student added");
    console.log(data);
}

async function getStudents() {

    const response = await fetch("/students");
    const data = await response.json();

    document.getElementById("students").innerText =
        JSON.stringify(data, null, 2);
}

async function updateStudent() {

    const id = document.getElementById("uid").value;

    const response = await fetch(`/students/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: document.getElementById("uname").value,
            age: Number(document.getElementById("uage").value),
            course: document.getElementById("ucourse").value
        })
    });

    const data = await response.json();
    alert("Student updated");
    console.log(data);
}

async function deleteStudent() {

    const id = document.getElementById("did").value;

    const response = await fetch(`/students/${id}`, {
        method: "DELETE"
    });

    const data = await response.json();
    alert(data.message);
}
