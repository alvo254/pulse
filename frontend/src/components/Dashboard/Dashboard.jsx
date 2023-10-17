import React from 'react'
import axios from 'axios';

const Dashboard = () => {


    const [file, setFile] = useState()

    function handleChange(event) {
      setFile(event.target.files[0])
    }

    function handleSubmit(event) {
        event.preventDefault()
        const url = 'http://localhost:3000/uploadFile';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        axios.post(url, formData, config).then((response) => {
          console.log(response.data);
        });
    
      }

  return (
    <div>Dashboard
        <iframe
        src="https://jupyterlite.github.io/demo/repl/index.html?kernel=python&toolbar=1"
        width="100%"
        height="500px"
        >
        </iframe>

        <form onSubmit={handleSubmit}>
          <h1>React File Upload</h1>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>

    </div>
  )
}

export default Dashboard