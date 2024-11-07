import { doc, getDoc, updateDoc, deleteDoc, getDocs, query, where, collection, addDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { auth, db } from '../config/firebase/firebaseconfig';

const Todo = () => {
    const todo = useRef();
    const [todos, setTodos] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');

    const deleteTodo = async (index) => {
        const itemToDelete = todos[index];

        if (!itemToDelete || !itemToDelete.docid) {
            console.error("Error: itemToDelete or docid is undefined.");
            return;
        }

        try {
            await deleteDoc(doc(db, "users", itemToDelete.docid));
            console.log("Document deleted successfully.");
            setTodos(todos.filter((_, i) => i !== index)); // Remove item from local state
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    const startEditTodo = (index) => {
        setEditIndex(index); 
        setEditText(todos[index].todo); 
    };

    const saveTodo = async (index) => {
        const todoItem = todos[index];

        if (!todoItem || !todoItem.docid) {
            console.error("Error: todoItem or docid is undefined.");
            return;
        }

        try {
            const todoRef = doc(db, "users", todoItem.docid);
            await updateDoc(todoRef, { todo: editText });
            console.log("Todo updated successfully in Firebase.");

            const updatedTodos = [...todos];
            updatedTodos[index].todo = editText;
            setTodos(updatedTodos);
            setEditIndex(null);
            setEditText('');
        } catch (error) {
            console.error("Error updating todo in Firebase: ", error);
        }
    };

    useEffect(() => {
        const getdbFromFirebase = async () => {
            const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
            const querySnapshot = await getDocs(q);

            const fetchedTodos = [];
            querySnapshot.forEach((doc) => {
                fetchedTodos.push({
                    ...doc.data(),
                    docid: doc.id
                });
            });

            setTodos(fetchedTodos);
        };
        getdbFromFirebase();
    }, []);

    const addTodo = async (event) => {
        event.preventDefault();
        const newTodoText = todo.current.value;

        try {
            const docRef = await addDoc(collection(db, "users"), {
                todo: newTodoText,
                uid: auth.currentUser.uid
            });
            console.log("Document written with ID: ", docRef.id);

            setTodos([...todos, { todo: newTodoText, docid: docRef.id }]);
            todo.current.value = '';
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <>
            <div className="container shadow d-flex flex-column align-items-center mt-5 px-3">
                <form className="d-flex gap-3 mb-5 mt-5 w-100" onSubmit={addTodo}>
                    <input
                        type="text"
                        ref={todo}
                        className="form-control border border-black"
                        placeholder="Enter a task"
                        style={{ maxWidth: '500px' }} // Set a max width for input
                    />
                    <button className="btn btn-info border border-white text-white border-2" type="submit" style={{ backgroundColor: "#113065" }}>Add Todo</button>
                </form>
                <ol className="list-group mt-3 mb-5 w-100">
                    {todos.map((item, index) => (
                        <li key={index} className="mt-1 mb-1 list-group-item d-flex justify-content-between align-items-center">
                            {editIndex === index ? (
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="form-control"
                                    style={{ maxWidth: '300px' }} // Set max width for input when editing
                                />
                            ) : (
                                item.todo
                            )}
                            <div>
                                {editIndex === index ? (
                                    <button className="rounded btn btn-sm btn-success me-1" onClick={() => saveTodo(index)}>Save</button>
                                ) : (
                                    <button className="rounded btn btn-sm btn-primary me-1" onClick={() => startEditTodo(index)}>Edit</button>
                                )}
                                <button className="rounded btn btn-sm btn-danger" onClick={() => deleteTodo(index)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </>
    );
};

export default Todo;
