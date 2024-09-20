const Task = require('../models/Task');

// إضافة مهمة جديدة
const addTask = async (req, res) => {
    const { name, description } = req.body; // احصل على الحالة من الطلب

    const task = new Task({ 
        name, 
        description,
        user: req.user.id // إضافة معرف المستخدم
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (err) {
        res.status(400).send(err);
    }
};


// الحصول على جميع المهام
const getTasks = async (req, res) => {
    try {
        const userId = req.user.id; // استخدم معرف المستخدم من req.user
        const tasks = await Task.find({ user: userId }); // ابحث عن المهام التي تخص المستخدم
        res.send(tasks);
    } catch (err) {
        res.status(500).send(err);
    }
};



// حذف مهمة
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err);
    }
};
// تحديث حالة المهمة
const updateStatus = async (req, res) => {
    const { id } = req.params; // الحصول على معرف المهمة من الرابط
    const { status } = req.body; // الحصول على الحالة الجديدة من الجسم

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { status },
            { new: true } // إرجاع المهمة المحدثة
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: 'Error updating status' });
    }
};

// الحصول على المهام حسب الحالة
const getTasksByStatus = async (req, res) => {
    const { status } = req.params; // الحصول على الحالة من الرابط
    const userId = req.user.id; // الحصول على معرف المستخدم من req.user

    try {
        const tasks = await Task.find({ status, user: userId }); // البحث عن المهام حسب الحالة والمستخدم
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};


module.exports = {
    addTask,
    getTasks,
    deleteTask,
    updateStatus,
    getTasksByStatus // إضافة الوظيفة الجديدة هنا
};
