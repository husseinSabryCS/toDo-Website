const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    completed: { type: Boolean, default: false },
    status: { 
        type: String, 
        enum: ['pending', 'in progress', 'completed'], // تحديد القيم الممكنة
        default: 'pending' // القيمة الافتراضية
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, // نوع الـ ObjectId للإشارة إلى المستخدم
        ref: 'User', // اسم نموذج المستخدم
        required: true // التأكد من أن الحقل موجود
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
