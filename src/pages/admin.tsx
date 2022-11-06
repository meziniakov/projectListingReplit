import * as xlsx from 'xlsx/xlsx.mjs'
import * as fs from 'fs'
import { useEffect, useState } from 'react';

// export async function getStaticProps() {


//   const readUploadFile = (e) => {
//     e.preventDefault();
//     if (e.target.files) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const data = e.target.result;
//         const workbook = xlsx.read(data, { type: "array" });
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];
//         const jsonData = xlsx.utils.sheet_to_json(worksheet);
//         console.log(jsonData);
//         setJson(jsonData)
//       };
//       reader?.readAsArrayBuffer(e.target.files[0]);
//     }
//   }
//   return {
//     props: {
//       posts: json
//     }
//   }
// }

const Admin = ({ posts }) => {
  const [uploadFile, setUploadFile] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file)
      setUploadFile(file);
      setCreateObjectURL(URL.createObjectURL(file));
    }
  };

  const uploadToServer = async (event) => {
    event.preventDefault()
    const body = new FormData();
    console.log("file", uploadFile)
    body.append("file", uploadFile);
    const response = await fetch("/api/upload", {
      method: "POST",
      body
    });
    console.log(await response.json())
  };

  const readUploadFile = async (e) => {
    e.preventDefault();
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = e.target.result;
            const workbook = xlsx.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(worksheet);

            const response = await fetch("/api/upload", {
              method: "POST",
              body: JSON.stringify(json)
            });
            console.log(await response.json())
        }
        reader.readAsArrayBuffer(e.target.files[0]);
    }
  }
  
  useEffect(() => {
    // fs.writeFile('filename.json', json, 'utf8', callback)
  }, [])

  return (
    <>
      <h1 className="text-2xl font-bold">
        Каталог проектов
      </h1>
      <form>
        <label htmlFor="upload">Upload File</label>
        <input
          type="file"
          accept=".xls, .xlsx"
          name="file"
          id="upload"
          // onChange={uploadToClient}
          onChange={readUploadFile}
        />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={uploadToServer}
        >
          Загрузить
        </button>
      </form>
    </>
  );
};

export default Admin;