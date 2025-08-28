import React, {useCallback, useEffect, useState, memo} from "react";
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

const Form = ({addDirectory}) => {
  const [inputValue, setInputValue] = React.useState("");

  return <form className='form'>
    <input value={inputValue} onChange={e => setInputValue(e.target.value)} className={'input'} placeholder='Введите название' name={'name'}/>
    <button
        className="form_button"
        onClick={e => {
          addDirectory( inputValue)
          e.preventDefault();
          setInputValue('')
        }}
    >
      Создать
    </button>
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


const Dir = memo( ({value, name}) => {
  const isEmpty = Object.keys(value).length === 0
  const [isOpen, setIsOpen] = React.useState(true)

  const handleShowItems =() =>{
    console.log(isOpen)
    setIsOpen(!isOpen)
  }


  return <li key={name}>
    <div className='dirName dir'>
      {!isEmpty ?
          <button onClick={handleShowItems} className='root_button'>
            {isOpen ? <FoldIcon/> : <UnfoldIcon/>}
          </button>
          :
          ''
      }

      {name}
    </div>

    {!isEmpty && isOpen && <FileTree data={value}/>}
  </li>
})


const FileTxt  = (name) => {
 return <li key={name}>

    <div className="dirName file">{name}</div>
  </li>
}

const FileTree = memo(({data}) => {
  useEffect(() => {
  }, [data]);
  const items = Object.entries(data)
  console.log('rerender')
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
})


const App = () => {
  const [items, setItems] = useState(data);

  // const handleAddDirectory = (name) =>{
  //   const newData = structuredClone(data)
  //   data[name] = {};
  //   newData[name] = {}
  //   setItems(newData)
  // }
  const handleAddDirectory = useCallback((name)=>{
    const newData = structuredClone(data)

    if(newData.hasOwnProperty(name)){
      alert('Такая папка уже существует')
      return
    }

    data[name] = {};
    newData[name] = {}
    setItems(newData)
  }, [])


  return <div className='main-container'>

    <Form addDirectory={handleAddDirectory}/>
    <ul className='mainDir'>
      <div className='dirName'>root</div>
      <FileTree data={items}/>
    </ul>


  </div>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App/>);
