const express=require("express");
const fs=require("fs");
const path=require("path");

const app=express();
// app.use(express.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

const filePath = path.join(__dirname, "student.json");

app.get("/students", (req, res) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file" });
        }

        res.json(JSON.parse(data));
    });
});

app.post("/students", (req, res) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file" });
        }

        const students = JSON.parse(data);

        const newId =
            students.length > 0
                ? students[students.length - 1].id + 1
                : 1;

        const newStudent = {
            id: newId,
            name: req.body.name,
            age: req.body.age,
            course: req.body.course
        };

        students.push(newStudent);

        fs.writeFile(filePath, JSON.stringify(students, null, 2), err => {
            if (err) {
                return res.status(500).json({ message: "Error writing file" });
            }

            res.status(201).json(newStudent);
        });
    });
});

app.get("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file" });
        }

        const students = JSON.parse(data);

        const student = students.find(s => s.id === id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);
    });
});

app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file" });
        }

        const students = JSON.parse(data);

        const student = students.find(s => s.id === id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        student.name = req.body.name;
        student.age = req.body.age;
        student.course = req.body.course;

        fs.writeFile(filePath, JSON.stringify(students, null, 2), err => {
            if (err) {
                return res.status(500).json({ message: "Error writing file" });
            }

            res.json(student);
        });
    });
});

app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file" });
        }

        const students = JSON.parse(data);

        const index = students.findIndex(s => s.id === id);

        if (index === -1) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        students.splice(index, 1);

        fs.writeFile(filePath, JSON.stringify(students, null, 2), err => {
            if (err) {
                return res.status(500).json({ message: "Error writing file" });
            }

            res.json({
                message: "Student deleted successfully"
            });
        });
    });
});



const PORT=process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
});