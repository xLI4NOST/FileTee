import React, {useCallback, useEffect, useState, memo, Component, useRef} from "react";
import './style.css'
import ReactDOM from "react-dom/client";
import {DeleteIcon, UnfoldIcon, FoldIcon, SearchIcon} from "./icons";
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

const Form = memo(({addDirectory, onSearch}) => {
    const [inputValue, setInputValue] = React.useState("");

    const [searchValue, setSearchValue] = React.useState("");


    const handleChange = (e) => {
        setSearchValue(e.target.value)

        onSearch(data, e.target.value);
    }

    return <form className='form'>
        <input value={inputValue} onChange={e => setInputValue(e.target.value)} className={'input'}
               placeholder='Введите название' name={'name'}/>
        <button
            className="form_button"
            onClick={e => {
                addDirectory(inputValue)
                e.preventDefault();
                setInputValue('')
            }}
        >
            Создать
        </button>
        <div className='search_input_container'>
            <SearchIcon className="search-icon"/>
            <input onChange={handleChange} className={'input search_input'} placeholder={'Поиск'} name={'search'}/>
        </div>
    </form>
})

const RootDir = () => {
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
    const [isOpen, setIsOpen] = React.useState(true)

    const handleShowItems = () => {
        console.log(isOpen)
        setIsOpen(prevState => !prevState)
    }
    const handleAddSubdir = (e) => {
        e.stopPropagation()
    }


    return <li onClick={e => handleAddSubdir(e)} key={name}>
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
}


const FileTxt = ({name}) => {

    return <li key={name}>

        <div className="dirName file">{name}</div>
    </li>
}


const FileTree = memo(({data}) => {

    const items = Object.entries(data)

    return <li>
        {items.map(([name, value]) => {
            if (typeof value === 'boolean') {
                return <FileTxt key={Math.random()} name={name}/>
            } else {
                return <Dir key={Math.random()} name={name} value={value}/>
            }
        })}

    </li>
})


const App = () => {
    const [items, setItems] = useState(data);
    const handleAddDirectory = useCallback((name) => {
        const newData = structuredClone(data)

        if (newData.hasOwnProperty(name)) {
            alert('Такая папка уже существует')
            return
        }

        data[name] = {};
        newData[name] = {}
        setItems(newData)
    }, [])

    const searchFunc = useCallback ((data, searchElem, level = 0) =>{
        const entries = Object.entries(data)
        if(typeof entries !== 'object' || entries === null) {
            return null;
        }
        for (let [key, value] of entries) {

            if(key === searchElem || value === searchElem) {
                const object = {}
                object[key] = value
                console.log(object)
                setItems(object)

                return [key, value];

            }
            if(typeof value === 'object') {
                const res = searchFunc(value, searchElem, level + 1);
                if (res !== null) {
                    return res;
                }
            }
           setItems(data)
        }


        return null
    }, [])



    return <div className='main-container'>

        <Form onSearch={searchFunc} addDirectory={handleAddDirectory}/>

        <ul className='mainDir'>
            <div className='dirName'>root</div>

            <FileTree data={items}/>
        </ul>


    </div>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App/>);
