import { useState, useEffect } from "react";
import { getTasks } from "../utils/shared";
import TaskItem from "../components/TaskItem";
import { ITask } from "../models/interface";

const Task = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [tasksError, setTasksError] = useState("");

  useEffect(() => {
    getTasks()
      .then((res) => {
        setTasks(res.reverse());
      })
      .catch((err) => {
        console.error(err);
        setTasksError("Error fetching tasks, please try again");
      });
  }, []);
  return (
    <main className="container mx-auto">
      <section className="max-w-5xl mx-auto m-12 p-16">
        <h1 className="text-4xl md:text-7xl font-bold text-center py-3 mb-16">
          Your Tasks
        </h1>
        {tasksError ? (
          <span className="m-8 text-error">{tasksError}</span>
        ) : (
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex-1">
              <h3 className="text-2xl font-bold m-8">Pending Tasks</h3>
              <div>
                {tasks
                  .filter((task) => !task.done)
                  .map((task) => (
                    <TaskItem key={task.$id} task={task} />
                  ))}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold m-8">Completed Tasks</h3>
              <div>
                {tasks
                  .filter((task) => task.done)
                  .map((task) => (
                    <TaskItem key={task.$id} task={task} />
                  ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Task;
