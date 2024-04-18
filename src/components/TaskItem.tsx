import { useState } from "react";
import { deleteDocument } from "../utils/db";
import { ITask, IPayload } from "../models/interface";
import { updateDocument } from "../utils/db";
import Button from "./Button";

interface TaskItemProps {
	task: ITask;
}

function TaskItem({ task }: TaskItemProps) {

  //paste here
  const [isDone, setIsDone] = useState(false);
  
  const handleDelete = async (
          currentTaskId: string
      ) => {
          try {
              await deleteDocument(currentTaskId);
          } catch (error) {interface TaskItemProps {
            task: ITask;
          }
              console.error(error);
          }
  };
  
  const handleCheckbox = async (
          currentTask: IPayload,
          id: string,
          checkedVal: boolean
      ) => {
          if (!checkedVal) return;
  
          const payload: IPayload = {
          title: currentTask.title,
          description: currentTask.description,
          due_date: currentTask.due_date,
          priority: currentTask.priority,
          done: checkedVal,
          };
  
          try {
            await updateDocument(payload, id);
          } catch (error) {
            console.error(error);
          }
  };
  return (
    <>
      <div className="m-8 cursor-pointer border border-container rounded-md p-4 hover:shadow-lg transition duration-300 ease-in-out max-h-96">
        <section
          key={task.$id}
          className="flex flex-col justify-between gap-2 my-4 h-full"
        >
          <section className="flex gap-4 items-center justify-between flex-wrap">
            {task.priority && (
              <span>
                <span className="font-medium">Priority: </span>
                <span
                  className={`${
                    task.priority === "low"
                      ? "bg-lowPriority text-iconColor"
                      : task.priority === "medium"
                      ? "bg-mediumPriority text-iconColor"
                      : "bg-highPriority text-iconColor"
                  } py-1 px-2 rounded-md`}
                >
                  {task.priority}
                </span>
              </span>
            )}
            <div className="flex gap-2 py-1 ml-auto">
              <Button
                handleClick={() => handleEdit(task)}
                extraBtnClasses="bg-ok"
              >
                <span className="font-medium">Edit</span>
                <PencilSquareIcon height={25} className="hidden lg:flex" />
              </Button>
              <Button
                handleClick={(e) => handleDelete(e, task.$id)}
                extraBtnClasses="bg-highPriority"
              >
                <span className="font-medium">Delete</span>
                <TrashIcon height={25} className="hidden lg:flex" />
              </Button>
            </div>
          </section>
          <section className="">
            <h2 className="text-xl font-medium py-2 break-words">
              {task.title}
            </h2>
            <p className="py-1 mb-4 min-h-16 break-words">
              {task.description.length > 70
                ? task.description.substring(0, 70) + "..."
                : task.description}
            </p>
            <span className="font-extralight mt-2">
              <span className="font-medium">Due on: </span>
              <span className="underline">
                {`${new Date(task.due_date).toLocaleDateString()}`}
              </span>
            </span>
          </section>
          <section className="flex justify-between">
            {task.done ? (
              <span className="items-center text-ok font-bol ml-auto">
                Completed
              </span>
            ) : (
              <div className="flex items-center ml-auto hover:scale-105 transition duration-300 ease-in-out">
                <label htmlFor="done" className="mr-2 font-light">
                  Mark as complete
                </label>
                <input
                  type="checkbox"
                  checked={isDone}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    setIsDone(e.target.checked);
                    handleCheckbox(task, task.$id, e);
                  }}
                  className="size-5 accent-pink-600 rounded-sm"
                />
              </div>
            )}
          </section>
        </section>
      </div>
    </>
  );
}
export default TaskItem;
