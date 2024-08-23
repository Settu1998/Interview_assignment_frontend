import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useTheme } from "./context/ThemeContext";
import useTodos from "./hooks/useTodos";
import SearchBar from "./components/SearchBar";
import { categories, filter } from "./Content/data";
import { FcFilledFilter } from "react-icons/fc";
import CategoryFilter from "./components/CategoryFilter";
import TodoItem from "./components/TodoItem";
import AddTodoForm from "./components/AddTodoForm";
import moon from "./assets/images/moon.png";
import profile from "./assets/images/profile.png";
import sun from "./assets/images/contrast.png";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";
import { IoIosArrowDown } from "react-icons/io";
import Footer from "./components/Footer";
import axios from "axios";

const Main = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { todos, addTodo, deleteTodo, completeTodo } = useTodos();
  const { user, logout } = useAuth();

  const [isSelectShow, setIsSelectShow] = useState(false);
  const [isFilterShow, setIsFilterShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [activeFilter, setActiveFilter] = useState(filter[0].value);
  const [search, setSearch] = useState("");
  const [FiterValue, setFiterValue] = useState("");
  const [editopen,seteditopen] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [Leaddata,setLeaddata] = useState([]);

  const handleedit = (id) => {
    setOpen(true);
    const fiterdata = Leaddata.filter((data) => data.id == id);
    setFiterValue(fiterdata[0]);
  
    
  }

  const handleDelete = async(id) => {
    const res = await axios.post('https://interview-assignment-backend-zzx0.onrender.com/api/deleteLead',{id: id});
    console.log(res.data);
    
    if(res.data.code == 200){
   const dleteafter = Leaddata.filter((data) => data.id !== id);
   setLeaddata(dleteafter);
    }else{
    console.log(res.data.message);
    
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiterValue((prevState) => ({
      ...prevState,
      [name]: value,
      id:FiterValue.id
    }));
  };

  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredLeaddata = Leaddata.filter((lead) =>
    (lead.name.toLowerCase().includes(search.toLowerCase()) || 
     lead.email.toLowerCase().includes(search.toLowerCase())) &&
    (selectedFilter === "All" ? true : lead.product === selectedFilter)
  );
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setIsSelectShow(false);
  }, []);

  const handleFilterToggle = useCallback(() => {
    setIsFilterShow((prev) => !prev);
  }, []);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const handleSearchClose = useCallback(() => {
    setSearch("");
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const activeElement = document.activeElement;
      const isInputOrTextarea =
        activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA";

      if (event.key === "d" && !isInputOrTextarea) {
        toggleTheme();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleTheme]);

  const filteredResults = useMemo(() => {
    return todos.filter((todo) => {
      const isCategoryMatch =
        selectedCategory.value === "A" ||
        selectedCategory.value === todo.product;
      const isStatusMatch =
        activeFilter === "A" || todo.status === activeFilter;

      return (
        isCategoryMatch &&
        isStatusMatch &&
        todo.name.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [todos, selectedCategory, activeFilter, search]);

  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu((prev) => !prev);
  };

  return (
    <div className={`App ${isDarkMode ? "dark-theme" : ""}`}>
      <Toaster />
      <div className="container">
        <div className="todo">
          <div className="todo_top">
            <h2 className="text-gradient">Lead application</h2>
            <div className="todo_top_left" onClick={handleMenu}>
              
            </div>
          </div>
          <SearchBar
            search={search}
            setSearch={setSearch}
            handleSearchClose={handleSearchClose}
          />
          <div className="filter_box">
            
            <div className="filter_container">
              
              <div className="filter_menu">
                <div className="filter_icon">
                  <button className="filter_btn" onClick={handleFilterToggle}>
                    <FcFilledFilter />
                  </button>
                </div>
                {
                  isFilterShow && (

                <div className="filter_card">
      <ul className="filter_list">
        <li onClick={() => {handleFilterClick("All");setIsFilterShow(false)}}>All</li>
        <li onClick={() => {handleFilterClick("A");setIsFilterShow(false)}}>A</li>
        <li onClick={() => {handleFilterClick("B");setIsFilterShow(false)}}>B</li>
        <li onClick={() => {handleFilterClick("C");setIsFilterShow(false)}}>C</li>
      </ul>
    </div>
                  )
                }
              </div>
            </div>
          </div>
          <TodoItem
  todos={filteredResults}
  completeTodo={completeTodo}
  deleteTodo={deleteTodo}
  Leaddata={Leaddata}
  setLeaddata={setLeaddata}
  editopen={editopen}
  seteditopen={seteditopen}
  setFiterValue={setFiterValue}
  FiterValue={FiterValue}  // Pass the actual state value
  handleedit={handleedit}
  handleChange={handleChange}
  handleDelete={handleDelete}
  filteredLeaddata ={filteredLeaddata}
  open={open}
  setOpen={setOpen}
/>

          <AddTodoForm handleAddTodo={addTodo} toast={toast} setLeaddata={setLeaddata} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Main;
