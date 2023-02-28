import "./App.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      task: "",
      taskList: [
        {
          name: "Membuat Aplikasi TODO",
        },
        {
          name: "Membuat Aplikasi CRUD",
        },
        {
          name: "Membuat Aplikasi SIAKAD",
        },
      ],
      inputNull: "d-none",
    };

    this.hanldeChange = this.hanldeChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.delete = this.delete.bind(this);
  }

  hanldeChange(e) {
    this.setState({
      task: e.target.value,
    });
  }

  addTask() {
    const tasks = {
      name: this.state.task,
    };

    if (tasks.name !== "") {
      const data = [...this.state.taskList, tasks];

      this.setState({
        task: "",
        taskList: data,
        inputNull: "d-none",
      });
    } else {
      this.setState({
        inputNull: "d-inline text-danger",
      });
    }
  }

  delete(tl) {
    const newTask = this.state.taskList.filter(
      (taskL) => taskL.name !== tl.name
    );

    this.setState({
      taskList: newTask,
    });
  }

  render() {
    return (
      <div className="container my-4">
        <div className="text-center">
          <h1 className="fw-bold">TODO APP</h1>
        </div>
        <div className="d-flex justify-content-center">
          <Card style={{ width: "30rem" }}>
            <Card.Body>
              <Form.Text className={this.state.inputNull}>
                Task must be filled!
              </Form.Text>
              <InputGroup className="mb-3">
                <Form.Control
                  name="task"
                  value={this.state.task}
                  onChange={this.hanldeChange}
                  placeholder="Enter your Task"
                />
                <Button variant="btn btn-primary" onClick={this.addTask}>
                  <i className="bi bi-plus-circle"></i>
                </Button>
              </InputGroup>
              {this.state.taskList.length == 0 && <Alert />}
              {this.state.taskList.map((tl, index) => {
                return (
                  <ListGroup key={index} className="list-group-flush">
                    <ListGroup.Item className="d-flex p-0 mb-1">
                      <div className="d-flex align-items-center flex-grow-1">
                        <Card.Text>{tl.name}</Card.Text>
                      </div>
                      <Button
                        variant="btn btn-danger"
                        onClick={this.delete.bind(this, tl)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                );
              })}
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

class Alert extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        <p className="text-danger">Task not found!</p>
      </>
    );
  }
}

export default App;
