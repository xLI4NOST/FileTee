import React, { useState } from "react";
import './style.css'
import ReactDOM from "react-dom/client";
import { DeleteIcon, UnfoldIcon, FoldIcon, SearchIcon } from "./icons";
import {MinusButton} from "./assets/MinusButton";

const data = {
  "file.txt": true,
  dir1: {
    subdir1: {
      "file0.txt": true,
    },
    subdir2: {
      "file1.txt": true,
    },
  },
  dir2: {
    "file2.txt": true,
    "file3.txt": true,
    subdir3: {},
  },
  dir3: {},
};

const Form = () => {
  return <form className='form'>
    <input className={'input'} placeholder='Введите название' name={'name'}/>
    <button onClick={e=> e.preventDefault()} className="form_button">Создать</button>
    <div className='search_input_container'>
      <SearchIcon className="search-icon"/>
      <input className={'input search_input'} placeholder={'Поиск'} name={'search'}/>
    </div>
  </form>
}

const RootDir =() => {
  return <div className='root_container'>
    <button className='root_button'>
      <FoldIcon/>
    </button>
    <div className="root">
      root
    </div>
    <div className="root_child">

    </div>
  </div>
}


const Dir = ({value, name}) => {
  const isEmpty = Object.keys(value).length === 0
  return <li key={name}>
    <div className='dirName dir'>
      <button className='root_button'>
        <FoldIcon/>
      </button>
      {name}</div>

    {!isEmpty && <FileTree data={value}/>}
  </li>
}

const FileTree = ({data}) => {
  console.log(data)
  const items = Object.entries(data)
  console.log(items)
  return <li>
    {
      items.map(([name, value]) => {
        if (value === true && value) {
          return (
              <li key={name}>

                <div className="dirName file">{name}</div>
              </li>
          )
        } else if (typeof value === "object" && value !== null && value !== undefined) {
          return (
              <Dir value={value} name={name} key={name}/>

          )
        }
        return null
      })

    }
  </li>
}

const App = () => {


  return <div className='main-container'>

    <Form/>
    <ul className='mainDir'>
      <div className='dirName'>root</div>
      <FileTree data={data}/>
    </ul>


  </div>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App/>);






{/*<li>*/}
{/*  <div className='dirName file'>file.txt</div>*/}
{/*</li>*/}
{/*  <div className="dirName">dir 1</div>*/}


{/*<li>*/}
{/*  <div className='dirName dir'>dir1</div>*/}

{/*  <li>*/}
{/*    <div className='dirName dir'>subdir1</div>*/}
{/*  </li>*/}

{/*  <li>*/}
{/*    <div className='dirName dir'>subdir2</div>*/}
{/*    <li>*/}
{/*      <div className='dirName file'>file.txt</div>*/}
{/*    </li>*/}

{/*  </li>*/}
{/*</li>*/}
{/*<li>*/}
{/*  <div className='dirName dir'>dir2</div>*/}
{/*  <li>*/}
{/*    <div className='dirName file'>file2.txt</div>*/}
{/*    <div className='dirName file'>file3.txt</div>*/}
{/*  </li>*/}

{/*</li>*/}

{/*<li>*/}
{/*<div className='dirName dir'>dir3</div>*/}

{/*</li>*/}