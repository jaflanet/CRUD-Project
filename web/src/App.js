import './App.css';
import EditLogo from './image/edit_logo.svg';
import DeleteLogo from './image/delete_logo.svg';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const [Id, setId] = useState()
  const [Title, setTitle] = useState()
  const [Singer, setSinger] = useState()
  const [Genre, setGenre] = useState()
  const [Time, setTime] = useState()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState()

  useEffect(() => {
    const getAllData = async() => {
      const response = await axios.get("http://localhost:12345/")
      console.log(response.data);
      setData(response.data)
      setLoading(false)
    }
    getAllData();
  }, [])

  const postRequest = async () => {
    await axios.post("http://localhost:12345/insert", 
      {
        title : Title,
        singer : Singer,
        genre : Genre,
        time_length : Time
      }
      ).then(
        //   console.log(res),
          alert('Data berhasil disimpan')
      ).then(
        window.location = "http://localhost:3000/"
      )
  }

  const deletesong = async (id) => {
    await axios.delete(`http://localhost:12345/delete/${id}`
    ).then(
      alert('Data berhasil dihapus')
    ).then(
      window.location = "http://localhost:3000/")
  }

  const updatesong = async (id) => {
    await axios.put(`http://localhost:12345/update/${id}`,
    {
      title : Title,
      singer : Singer,
      genre : Genre,
      time_length : Time
    }
    ).then(
      alert('Data berhasil diupdate')
    ).then(
      window.location = "http://localhost:3000/")
    }


  if(loading === true) return null;
  return (
  <>
  <h1>Song For U</h1>
  <div className="container_add">
  <div className="container_3">
  <h3 classname="input_title">Add A Song</h3>
  </div>
    <div className="container_2">
  <form className="form-inline">
    <label for="title">Title:<br/>
    <input type="text" required onChange={(e) => setTitle(e.target.value)} placeholder="Title" name="title"/></label>
    <label for="singer">Singer:<br/>
    <input type="text" required onChange={(e) => setSinger(e.target.value)} placeholder="Singer" name="singer"/></label>
    <label for="email">Genre:<br/>
    <input type="text" required onChange={(e) => setGenre(e.target.value)} placeholder="Genre" name="genre"/></label>
    <label for="email">Time_length:<br/>
    <input type="text" required onChange={(e) => setTime(e.target.value)} placeholder="hh:mm:ss" name="time"/></label>
    <button type="submit" onClick={() => postRequest()}>Add</button>
  </form>
  </div>
  </div>

    <hr/>
  <div className="container">
  <h3>Song List</h3>
  <ul className="responsive-table">
    <li className="table-header">
      <div className="col col-1">Id</div>
      <div className="col col-2">Title</div>
      <div className="col col-3">Singer</div>
      <div className="col col-4">Genre</div>
      <div className="col col-5">time length</div>
      <div className="col col-6">edit</div>
      <div className="col col-7">delete</div>
    </li>

    {data.map((data) => {
            return(
    <li className="table-row">
      <div className="col col-1" data-label="Id">{data.id}</div>
      <div className="col col-2" data-label="Title">{data.title}</div>
      <div className="col col-3" data-label="Singer">{data.singer}</div>
      <div className="col col-4" data-label="Genre">{data.genre}</div>
      <div className="col col-5" data-label="time length">{data.time_length}</div>
      <div className="col col-6">
      <button  onClick={handleOpen}>
      <img src={EditLogo} alt="edit" className="svg_class"/>
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.transparent}>
          <div className="container_add">
              <div className="container_3">
              <h3 classname="input_title">Edit Song</h3>
              </div>
                <div className="container_4">
                <form className="form-inline">
                {/* <label for="id">Id:<br/>
                  <input type="text" required onChange={(e) => setId(e.target.value)} placeholder="ID" name="ID"/></label> */}
                  <label for="title">Title:<br/>
                  <input type="text" required onChange={(e) => setTitle(e.target.value)} placeholder="Title" name="title"/></label>
                  <label for="singer">Singer:<br/>
                  <input type="text" required onChange={(e) => setSinger(e.target.value)} placeholder="Singer" name="singer"/></label>
                  <label for="email">Genre:<br/>
                  <input type="text" required onChange={(e) => setGenre(e.target.value)} placeholder="Genre" name="genre"/></label>
                  <label for="email">Time_length:<br/>
                  <input type="text" required onChange={(e) => setTime(e.target.value)} placeholder="hh:mm:ss" name="time"/></label>
                  <button type="submit" onClick={() => updatesong(data.id)}>Edit</button>
              </form>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
      </div>
      <div className="col col-7">
      <button onClick={() => deletesong(data.id)}>
      <img src={DeleteLogo} alt="delete" className="svg_class"/>
      </button>
      </div>
    </li>
     )
    })}
  </ul>
</div>
    </>
  );
}

export default App;
