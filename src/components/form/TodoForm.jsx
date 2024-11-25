import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

export class TodoForm extends Component {
  render() {
    const { todo, handleTodo, submit, selected, nameRef, validated } =
      this.props;
    // const submit = (e) => {
    //   e.preventDefault();
    //   console.log(e.target);
    //   console.log(e.target.name);
    //   console.log(e.target.date.value);
    //   console.log(e.target.importance);
    // };
    return (
      <Form
        validated={validated}
        noValidate
        onSubmit={submit}
        className="w-50 m-auto"
      >
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Todo name</Form.Label>
          <Form.Control
            ref={nameRef}
            onChange={handleTodo}
            value={todo.name}
            required
            type="text"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please fill !
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Todo date</Form.Label>
          <Form.Control
            onChange={handleTodo}
            value={todo.date}
            required
            type="date"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="importance">
          <Form.Label>Importance</Form.Label>
          <Form.Select onChange={handleTodo} value={todo.importance}>
            <option value="high">High</option>
            <option value="middle">Middle</option>
            <option value="low">Low</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit" className="w-100">
          {selected === null ? "Add" : "Save"} todo
        </Button>
      </Form>
    );
  }
}

export default TodoForm;
