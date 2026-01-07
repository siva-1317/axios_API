import axios from "axios";
import React, { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setPosts(res.data.slice(0, 20));
    });
  }, []);

    const addPost = () => {
        if(!title || !body)
        {
            alert("please fill the all fields");
            // <div className="alert alert-danger">please fill the all fields</div>
            return;
        }

        axios.post(API_URL,{
            title,
            body, 
            userId:1})
            .then(res => {
                setPosts([...posts, res.data]);
                setTitle("");
                setBody("");
                 alert("updated successfully");
            });
          setTitle("");
          setBody("");
    };

    const undo = () => {
        setPosts(posts.slice(0,-1));
    };



    const StartEdit = (post)=>{
      setEditId(post.id);
      setTitle(post.title);
      setBody(post.body);
    };

    const updatePost = () => {
      axios.patch(`${API_URL}/${editId}`,{
        title,
        body,
        userId:1
      })
      .then(() => {
        setPosts(
          posts.map(p =>
            p.id === editId ? { ...p, title, body } : p
          ));
      });
      setEditId(null);
      setTitle("");
      setBody(""

      );
    };


  return (
    <div>
      <h3>Post List</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td>
                <button className="btn btn-danger px-4" onClick={() => StartEdit(post)}>Edit</button>
                {/* <button className="btn btn-primary px-3 mt-2" onClick={() => deletePost(post.id)}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <input
                className="form-control"
                type="text"
                placeholder="enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </td>
            <td>
              <input
                className="form-control"
                type="text"
                placeholder="enter the description"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </td>
            <td>
            {editId ? (
              <>
              <button className="btn btn-success px-4" onClick={updatePost} >UPDATE</button>{" "}
              {/* <button className="btn btn-warning px-3 mt-2" onClick={deletePost}>CANCEL</button> */}
              </>

            ):(
              <>
              <button className="btn btn-danger px-4" onClick={addPost}>ADD</button>
              <button className="btn btn-primary px-3 mt-2" onClick={undo}>UNDO</button>
              </>
            )}
              
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Posts;
