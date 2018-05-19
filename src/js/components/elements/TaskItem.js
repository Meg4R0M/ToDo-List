import React from "react";

const Task = (props) => {
    return props.task.complete
        ? <li className="checked">#{props.task.id} - {props.task.description}</li>
        : <li>#{props.task.id} - {props.task.description}</li>;
};

export default Task;