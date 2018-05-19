import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "../elements/App";

const ROUTES = {
    home: '#all',
    completeTasks: '#complete-tasks',
    incompleteTasks: '#incomplete-tasks',
}

class TaskContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentRoute: ROUTES.home,
            tasks: [
                {
                    id: 1,
                    description: 'Go to bed',
                    complete: true
                },
                {
                    id: 2,
                    description: 'Record a tutorial',
                    complete: false
                },
                {
                    id: 3,
                    description: 'Watch a movie',
                    complete: false
                },
            ]
        };

        this.addTask = this.addTask.bind(this);
    }

    componentDidMount() {
        window.onhashchange = (e) => {
            this.setState({ currentRoute: window.location.hash })
        }
    }

    allTasks() {
        return this.state.tasks;
    }

    completeTasks() {
        return this.state.tasks.filter(task => task.complete);
    }

    incompleteTasks() {
        return this.state.tasks.filter(task => !task.complete);
    }

    renderRoute() {
        switch(this.state.currentRoute) {
            case ROUTES.home: return <App tasks={this.allTasks()} title="All tasks" />;
            case ROUTES.completeTasks: return <App tasks={this.completeTasks()} title="Complete tasks" />;
            case ROUTES.incompleteTasks: return <App tasks={this.incompleteTasks()} title="Incomplete tasks" />;
            default: return <NotFound />;
        }
    }

    addTask(e) {
        e.preventDefault();

        this.setState((prevState) => {
            const newTask = {
                id: prevState.tasks.length + 1,
                description: this.newTaskDescription.value,
                complete: false
            }

            this.addTaskForm.reset();

            return {
                tasks: [...prevState.tasks, newTask]
            }
        })
    }

    render() {
        return (
            <div>
                <ul>
                    <li><a href={ROUTES.home}>All tasks</a></li>
                    <li><a href={ROUTES.completeTasks}>Complete tasks</a></li>
                    <li><a href={ROUTES.incompleteTasks}>Incomplete tasks</a></li>
                </ul>

                <form onSubmit={this.addTask} ref={ input => this.addTaskForm = input }>
                    <input type="text"
                           defaultValue="Enter a new task"
                           ref={ input => this.newTaskDescription = input }
                           required
                           placeholder="Enter a description"/>
                    <button type="submit">Add Task</button>
                </form>

                {this.renderRoute()}
            </div>
        )
    }
}

const NotFound = () => <h1>Page not found</h1>;

const wrapper = document.getElementById("tasklist");
wrapper ? ReactDOM.render(<TaskContainer />, wrapper) : false;
export default TaskContainer;