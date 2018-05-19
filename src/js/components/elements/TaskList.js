import React from "react";
import TaskItem from "./TaskItem"

const TaskList = (props) => (
    <div>
        <ul>
            { props.tasks.map(task => <TaskItem key={task.id} task={task} />) }
        </ul>
    </div>
);

export default TaskList;