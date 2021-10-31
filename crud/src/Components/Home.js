import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom'


const Home = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async () => {
        const result = await axios.get(" http://localhost:3004/users");
        setUsers(result.data)
    }

    const deleteUser = async id => {
        await axios.delete(`http://localhost:3004/users/${id}`);
        loadUsers();


    };
    return (
        <div className="container">
            <div className="py-4">
                <h1 className="text-center  py-4">Users</h1>
                <table className="table border shadow">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((users, index) => (
                                <tr>
                                    <th scope="row">{index + 1} </th>
                                    <td>{users.name}</td>
                                    <td>{users.username}</td>
                                    <td>{users.email}</td>
                                    <td>
                                        <Link className="btn btn-primary mr-2" to={`/users/${users.id}`}>View</Link>
                                        <Link className="btn btn-outline-primary mr-2" to={`/users/edit/${users.id}`}> Edit</Link>
                                        <button className="btn btn-danger mr-2" onClick={() => deleteUser(users.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default Home;