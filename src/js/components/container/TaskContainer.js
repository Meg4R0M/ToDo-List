import React, { Component } from "react";
import ReactDOM from "react-dom";
import TaskList from "../elements/TaskList";
import ROUTES from "../router/Router";
import Menu from "../elements/Menu"

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
            case ROUTES.home: return <TaskList tasks={this.allTasks()} title="All tasks" />;
            case ROUTES.completeTasks: return <TaskList tasks={this.completeTasks()} title="Complete tasks" />;
            case ROUTES.incompleteTasks: return <TaskList tasks={this.incompleteTasks()} title="Incomplete tasks" />;
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
            <div className="Container">
                <div className="header">
                    <Menu title="My To Do List"/>
                    <form onSubmit={this.addTask} ref={ input => this.addTaskForm = input }>
                        <input type="text"
                               defaultValue="Enter a new task"
                               ref={ input => this.newTaskDescription = input }
                               required
                               placeholder="Enter a description"/>
                        <input type="submit" className="addBtn" value="Add Task" />
                    </form>
                </div>
                {this.renderRoute()}
            </div>
        )
    }
}

const NotFound = () => <h1>Page not found</h1>;

const wrapper = document.getElementById("tasklist");
wrapper ? ReactDOM.render(<TaskContainer />, wrapper) : false;

export default TaskContainer;