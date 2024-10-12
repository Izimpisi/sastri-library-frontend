'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function Profile() {
  const [booksData, setBooksData] = useState([]);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7109/api/Books'); // Use HTTP for development
        setBooksData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleSubmit = async () => {
    const response = await axios.post("https://localhost:7109/api/Books/add", { title, description, author });
    console.log(response.data)
    setBooksData(booksData => [...booksData, response.data])
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex" style={{width: '80vw', justifyContent: "space-between", flexWrap: 'wrap'}}>

        {booksData.map(d => {
          return (
            <div >
             <h3> Title: {d.title}</h3>
             <h3> description: {d.description}</h3>
             <h3> Author: {d.author}</h3>
            </div>


          )
        })}
      </div>
      <label for="title">
        title
      </label>
      <input onChange={e => setTitle(e.target.value)} id="title" name="title" />
      <label for="description">
        description
      </label>
      <input onChange={e => setDescription(e.target.value)} id="description" name="description" />
      <label for="author">
        author
      </label>
      <input onChange={e => setAuthor(e.target.value)} name="author" id="author" />

      <button onClick={handleSubmit}>add book</button>
      <Link href="/">
        <button>Go to Home Page</button>
      </Link>
    </main>
  );
}
