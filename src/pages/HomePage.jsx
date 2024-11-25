import React, { Component, createRef } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { v4 } from "uuid";

import TodoForm from "../components/form/TodoForm";
import TodoHeader from "../components/header/TodoHeader";
import Footer from "../components/footer/Footer";
import TodoCard from "../components/card/TodoCard";
import { ToastContainer, toast } from "react-toastify";

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.searchRef = createRef();
    this.nameRef = createRef();
    this.state = {
      activeTab: "all",
      todos: JSON.parse(localStorage.getItem("todos")) || [
        {
          name: "Playing football",
          date: "2023-09-28",
          importance: "high",
          done: false,
          id: 0,
        },
        {
          name: "Reading book",
          date: "2023-09-27",
          importance: "middle",
          done: false,
          id: 1,
        },
        {
          name: "Doing homework",
          date: "2023-09-29",
          importance: "low",
          done: true,
          id: 2,
        },
      ],
      todo: {
        name: "",
        date: new Date().toISOString().split("T")[0],
        importance: "high",
      },
      selected: null,
      search: "",
      importance: "all",
      validated: false,
    };
  }
  render() {
    const { activeTab, todos, todo, selected, search, importance, validated } =
      this.state;
    const handleSearch = () => {
      this.setState({
        search: this.searchRef.current.value.trim().toLowerCase(),
      });
    };
    const changeTab = (key) => {
      this.setState({ activeTab: key });
    };
    const handleTodo = (e) => {
      // console.log(e.target.id);
      // console.log(e.target.value);
      this.setState({ todo: { ...todo, [e.target.id]: e.target.value } });
    };
    const submit = (e) => {
      e.preventDefault();
      if (e.target.checkValidity()) {
        let newTodos;
        let newTodo = { ...todo, id: v4() };
        if (selected === null) {
          newTodos = [...todos, newTodo];
          toast.success("Added successfully", { autoClose: 1000 });
        } else {
          newTodos = todos.map((todo) => {
            if (todo.id === selected) {
              return newTodo;
            }
            return todo;
          });
          toast.info("Edited successfully");
        }
        localStorage.setItem("todos", JSON.stringify(newTodos));
        this.nameRef.current.focus();
        this.setState({
          todos: newTodos,
          todo: {
            name: "",
            date: new Date().toISOString().split("T")[0],
            importance: "high",
            done: false,
          },
          selected: null,
          validated: false,
        });
      } else {
        this.setState({ validated: true });
      }
    };
    const doneTodo = (id) => {
      let newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.done = true;
        }
        return todo;
      });
      this.setState({ todos: newTodos });
      localStorage.setItem("todos", JSON.stringify(newTodos));
    };
    const deleteTodo = (id) => {
      let newTodos = todos.filter((todo) => todo.id !== id);
      this.setState({ todos: newTodos });
      localStorage.setItem("todos", JSON.stringify(newTodos));
    };
    const editTodo = (id) => {
      const todo = todos.find((todo) => todo.id === id);
      this.setState({ todo, selected: id });
    };
    const handleImportance = (e) => {
      this.setState({ importance: e.target.value });
    };
    let allTodos = todos.filter((todo) =>
      todo.name.toLowerCase().includes(search)
    );
    if (importance !== "all") {
      allTodos = allTodos.filter((todo) => todo.importance === importance);
    }
    const doneTodos = allTodos.filter((todo) => todo.done);
    const undoneTodos = allTodos.filter((todo) => !todo.done);
    return (
      <Container>
        <ToastContainer />
        <TodoForm
          validated={validated}
          nameRef={this.nameRef}
          selected={selected}
          todo={todo}
          handleTodo={handleTodo}
          submit={submit}
        />
        <TodoHeader
          importance={importance}
          handleImportance={handleImportance}
          searchRef={this.searchRef}
          handleSearch={handleSearch}
        />
        <Tabs
          activeKey={activeTab}
          onSelect={changeTab}
          className="mb-3"
          variant="pills"
          fill
        >
          <Tab eventKey="all" title={`All (${allTodos.length})`}>
            {allTodos.map((todo, i) => (
              <TodoCard
                editTodo={editTodo}
                deleteTodo={deleteTodo}
                doneTodo={doneTodo}
                key={i}
                {...todo}
              />
            ))}
          </Tab>
          <Tab eventKey="done" title={`Done (${doneTodos.length})`}>
            {doneTodos.map((todo, i) => (
              <TodoCard
                editTodo={editTodo}
                deleteTodo={deleteTodo}
                key={i}
                {...todo}
              />
            ))}
          </Tab>
          <Tab eventKey="undone" title={`Undone (${undoneTodos.length})`}>
            {undoneTodos.map((todo, i) => (
              <TodoCard
                editTodo={editTodo}
                doneTodo={doneTodo}
                key={i}
                {...todo}
              />
            ))}
          </Tab>
        </Tabs>
        <Footer />
      </Container>
    );
  }
}

export default HomePage;
