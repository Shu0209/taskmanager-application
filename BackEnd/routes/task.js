const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const { authenticateToken } = require("./auth");

//Creation of task

router.post("/create-task", authenticateToken, async (req, res) => {
    try {
        const { title, desc } = req.body;
        const { id } = req.headers;
        const newTask = new Task({ title: title, desc: desc });
        const saveTask = await newTask.save();
        const taskid = saveTask._id;
        await User.findByIdAndUpdate(id, { $push: { task: taskid._id } });
        res.status(200).json({ message: "Task Created" })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error" });
    }
});

//Featching tasks

router.get("/get-all-tasks", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: 'task', options: {
                sort: { createdAt: -1 }
            },
        });
        res.status(200).json({ data: userData });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Inernal Server Error" })
    }
})
//Delete Task

router.delete("/delete-task/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params; // Task ID
        const userId = req.headers.id; // Get user ID from the authenticated user

        // Find and delete the task
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Remove the task ID from the user's tasks array


        await User.findByIdAndUpdate(userId, { $pull: { task: id } });


        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


//Update Tasks


router.put("/update-task/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, desc } = req.body;
        await Task.findByIdAndUpdate(id, { title: title, desc: desc });
        res.status(200).json({ messsage: "Task updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error" });
    }
});


//Update Important-Task


router.put("/update-imp-task/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const TaskData = await Task.findById(id);
        const ImpTask = TaskData.important;
        await Task.findByIdAndUpdate(id, { important: !ImpTask });
        res.status(200).json({ message: "Task Update Successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(200).json({ message: "internal Server Error" });
    }
});


//Update Complete Task

router.put("/update-complete-task/:id", authenticateToken, async (req, res) => {
    try {
        const {id}=req.params;
        const TaskData = await Task.findById(id);
        const CompleteTask = TaskData.complete;
        await Task.findByIdAndUpdate(id, { complete: !CompleteTask });
        res.status(200).json({ message: "Task Update Successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "internal Server Error" });
    }
});


//Get Important Tasks


router.get("/get-imp-tasks", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({
            path: 'task', match:{important:true} ,options: {
                sort: { createdAt: -1 }
            },
        });
        const ImpTaskData=Data.task;
        res.status(200).json({ data: ImpTaskData });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Inernal Server Error" })
    }
})


//Get Complete Task

router.get("/get-complete-tasks", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({
            path: 'task', match:{complete:true} ,options: {
                sort: { createdAt: -1 }
            },
        });
        const CompleteTaskData=Data.task;
        res.status(200).json({ data: CompleteTaskData });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Inernal Server Error" })
    }
})


//Get InComplete Task

router.get("/get-incomplete-tasks", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({
            path: 'task', match:{complete:false} ,options: {
                sort: { createdAt: -1 }
            },
        });
        const InCompleteTaskData=Data.task;
        res.status(200).json({ data: InCompleteTaskData });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Inernal Server Error" })
    }
})


module.exports = router