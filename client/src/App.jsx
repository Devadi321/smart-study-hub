import { useState, useEffect } from 'react';
import axios from 'axios';

// I've put the URL in a variable to avoid typos!
const API_URL = 'http://localhost:3000/api/subjects';

function App() {
  const [subjects, setSubjects] = useState([]);
  const [newSubjectName, setNewSubjectName] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(API_URL); // <-- FIXED URL
        setSubjects(response.data);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, { name: newSubjectName }); // <-- FIXED URL
      setSubjects([...subjects, response.data]);
            console.log('Data received from API:', response.data);
      setNewSubjectName('');
    } catch (error) {
      console.error("Failed to create subject:", error);
    }
  };

  const handleDelete = async (idToDelete) => {
    try {
      await axios.delete(`${API_URL}/${idToDelete}`); // <-- FIXED URL
      setSubjects(subjects.filter(subject => subject._id !== idToDelete));
    } catch (error) {
      console.error("Failed to delete subject:", error);
    }
  };

  return (
    <div>
      <h1>Smart Study Hub</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a new subject"
          value={newSubjectName}
          onChange={(e) => setNewSubjectName(e.target.value)}
        />
        <button type="submit">Add Subject</button>
      </form>

      <h2>My Subjects</h2>
      <ul>
        {subjects.map(subject => (
          <li key={subject._id}>
            {subject.name}
            <button onClick={() => handleDelete(subject._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;