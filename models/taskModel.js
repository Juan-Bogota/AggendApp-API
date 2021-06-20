import mongoose from "mongoose";
const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    title: String,
    description: String,
    due_date: Date,
    status: { type: Number, default: 1 },
    responsible: { type: Schema.Types.ObjectId, ref: "users" },
    collaborators: [{ type: Schema.Types.ObjectId, ref: "users" }],
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("tasks", TaskSchema);

export default Task;
