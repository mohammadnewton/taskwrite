import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "./Select";
import Button from "./Button";
import { IPayload } from "../models/interface";
import { createDocument } from "../utils/db";

const AddTask = () => {
  const [titleVal, setTitleVal] = useState("");
  const [textAreaVal, setTextAreaVal] = useState("");
  const [dueDate, setDueDate] = useState(new Date());

  const priorityArray = ["low", "medium", "high"];

  const [priority, setPriority] = useState(priorityArray[0]);

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titleValidationError, setTitleValidationError] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleVal(e.target.value);

    if (e.target.value.trim() !== "") {
      setTitleValidationError("");
    }
  };

  const handleSubmitTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!titleVal) {
        setTitleValidationError("Please provide at least a title for the task");
        setTimeout(() => setTitleValidationError(""), 2000);
        setIsSubmitting(false);
        return;
      }

      if (titleVal.length > 49) {
        setTitleValidationError(
          "Title too long. It can only be 49 characters long"
        );
        setTimeout(() => setTitleValidationError(""), 2000);
        setIsSubmitting(false);
        return;
      }

      const payload: IPayload = {
        title: titleVal,
        description: textAreaVal,
        due_date: dueDate,
        priority: priority,
      };

      await createDocument(payload);

      // reset form
      setTitleVal("");
      setTextAreaVal("");
      setDueDate(new Date());
      setPriority(priorityArray[0]);
      setTitleValidationError("");
      setIsSubmitting(false);
      navigate("/tasks");
    } catch (error) {
      console.error("Error in handleSubmitTask:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <form id="form" onSubmit={handleSubmitTask} className="m-8">
      <div className="flex flex-col mb-6">
        <label htmlFor="title">Task Title</label>
        <input
          type="text"
          id="title"
          placeholder="Title of your task"
          value={titleVal}
          onChange={handleTitleChange}
          className={`bg-inherit border rounded-sm p-2 focus:outline-none 						focus:ring-1 ${
            titleValidationError
              ? "border-error focus:ring-red-500 invalid:focus:ring-red-						 600"
              : "border-input focus:ring-slate-900"
          }`}
        />
        {titleValidationError && (
          <span className="text-error mt-1">{titleValidationError}</span>
        )}
      </div>
      <div className="flex flex-col mb-6">
        <label htmlFor="description" className="mb-1">
          Task Description
        </label>
        <textarea
          id="description"
          placeholder="Describe your task"
          maxLength={200}
          value={textAreaVal}
          onChange={(e) => setTextAreaVal(e.target.value)}
          className={`bg-inherit border rounded-sm p-2 h-32 resize-none 							focus:outline-none focus:ring-1 ${
            textAreaVal.length > 197
              ? "border-error focus:ring-red-500 invalid:focus:ring-							 red-600"
              : "border-input focus:ring-slate-900"
          }`}
        />
        {textAreaVal.length > 197 && (
          <span className="text-error mt-1">
            Warning description getting too long. Can only be 200 characters
          </span>
        )}
      </div>
      <div className="flex flex-col mb-6">
        <label htmlFor="description" className="mb-1">
          Task Priority
        </label>
        <Select
          defaultSelectValue={priority}
          selectOptions={priorityArray}
          handleSelectChange={(e) => setPriority(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-6">
        <label htmlFor="description" className="mb-1">
          Task Due Date
        </label>
        <input
          type="date"
          id="date"
          value={dueDate!.toISOString().split("T")[0]}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDueDate(new Date(e.target.value))}
          className="bg-inherit border rounded-sm border-input p-2 	   							  focus:outline-none focus:ring-1 focus:ring-slate-							   900 invalid:focus:ring-red-600"
        />
      </div>
      <Button
        type="submit"
        disable={isSubmitting}
        extraBtnClasses="bg-primary justify-center text-white font-semibold px-4 py-2 outline-1 hover:bg-primaryHover focus:ring-1 focus:ring-pink-800 w-full"
      >
        <span>Add Task</span>
      </Button>
    </form>
  );
};

export default AddTask;
