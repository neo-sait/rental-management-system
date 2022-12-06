import './style.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Sidebar } from '../components';
import { AiOutlineReload } from 'react-icons/ai';

const Transactions = () => {
  const [dataArr, setDataArr] = useState([])
  const [order, setOrder] = useState("asc");
  const [searchChosen,setSearchChosen] = useState("None");
  const [searchType, setSearchType] = useState("None");
  const [filterOption, setFilterOption] = useState([]);
  const [filterResults, setFilterResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(50);
  const navigate = useNavigate();

  let auth = localStorage.getItem("auth");

  // add login check
  useEffect(async () => {

    const onLoad = async () => {

      axios.get('http://localhost:5000/api/loadTransactions').then((res) => {
        setDataArr(res.data);
      })

    }

    onLoad();
  }, [])

  function hoverNote(contains) {
    if (contains !== "") {
      return (
        <div className="trans__hovNote">Note<span className="trans__hovNoteText">{contains}</span></div>
      );
    };

  };
  // sorts columns of table
  const sorting = (col) => {


    if (order === "asc") {
      const sorted = [...dataArr].sort(
        (a, b) => typeof a[0][col] == 'number' ? a[0][col] > b[0][col] ? 1 : -1 : a[0][col].toLowerCase() > b[0][col].toLowerCase() ? 1 : -1
      );
      setDataArr(sorted);
      setOrder("desc");
    }
    else if (order === "desc") {
      const sorted = [...dataArr].sort(
        (a, b) => typeof a[0][col] == 'number' ? a[0][col] > b[0][col] ? 1 : -1 : a[0][col].toLowerCase() > b[0][col].toLowerCase() ? 1 : -1
      );
      setDataArr(sorted);
      setOrder("asc");
    }
  };

  const selectSearchType = event => {
    setSearchChosen(event.target.value);

    switch(event.target.value){
      case "None":
        setFilterOption([]);
        setSearchType("None");
        break;
      case "Address":
        axios.get("http://localhost:5000/api/getAddresses").then(res=>{
          setFilterOption(res.data);
          setSearchType("Address");
        })
        break;
      case "Name":
        axios.get("http://localhost:5000/api/getNames").then(res=>{
          setFilterOption(res.data);
          setSearchType("PayerName");
        })
        break;
      case "Method":
        axios.get("http://localhost:5000/api/getMethods").then(res=>{
          setFilterOption(res.data);
          setSearchType("PaymentMethod");
        })
        break; 
      case "Desc":
        axios.get("http://localhost:5000/api/getDescriptions").then(res=>{
          setFilterOption(res.data);
          setSearchType("Desc");
        })
        break;
      case "Type":
        axios.get("http://localhost:5000/api/getTypes").then(res=>{
          setFilterOption(res.data);
          setSearchType("Type");
        })
        break;
    }
  }

  const selectOptionType = event => {
    const option = event.target.value;

    switch(searchType){
      case "None":
        setFilterResults([]);
        break;
      default:
        setFilterResults(dataArr.filter(obj=>
          obj[0][searchType] == option
        ))
    }
  }

  let list = filterResults.length > 0 ? filterResults : dataArr
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumbers = [];

  const paginate = pageNumber => setCurrentPage(pageNumber);

  for (let i = 1; i <= Math.ceil(list.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (


    <div className="App flex">

      <div className="w-72 sidebar
            dark:bg-secondary-dark-bg
            bg-white">
        <Sidebar />
      </div>

      <div id="page" className="dark:bg-main-bg bg-main-bg min-h-screen w-full ">

        <div>
          <h2 className="trans__h2">Transactions History</h2>
          <div className="container">
            <div className="trans__search">

              <table>
                <tbody>
                  <th>
                    <td>Search By</td>
                  </th>

                  <tr>
                    <td>
                      <select className="trans__input" value={searchChosen} onChange={selectSearchType}>
                        <option value="None">Select a type</option>
                        <option value="Address">Address</option>
                        <option value="Name">Name</option>
                        <option value="Method">Method</option>
                        <option value="Desc">Desc</option>
                        <option value="Type">Type</option>
                      </select>
                    </td>
                    <td>
                      <select className="trans__input" onChange={selectOptionType}>
                        <option value="None">None</option>
                        {filterOption.map(obj=>
                          <option value={obj}>{obj}</option>
                        )}
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>
            <table className="trans__table">
              <thead>
                <tr>
                  <th onClick={() => sorting("Number")}>Num</th>
                  <th onClick={() => sorting("Address")}>Address</th>
                  <th onClick={() => sorting("HouseNum")}>House #</th>
                  <th onClick={() => sorting("Date")}>Date</th>
                  <th onClick={() => sorting("DatePaid")}>Date Paid</th>
                  {/*  <th onClick={()=>sorting("Year")}>Year</th>
            <th>Month</th>
            <th onClick={()=>sorting("YearNum")}>Year #</th>*/ }
                  <th onClick={() => sorting("PayerName")}>Name</th>
                  <th onClick={() => sorting("PayerTitle")}>Title</th>
                  <th onClick={() => sorting("Payment")}>Payment</th>
                  <th onClick={() => sorting("PaymentMethod")}>Method</th>
                  <th onClick={() => sorting("Desc")}>Desc</th>
                  <th onClick={() => sorting("Type")}>Type</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((val) => (
                  <tr>
                    <td className="trans__num">{val[0].Number}</td>
                    <td>{val[0].Address}</td>
                    <td className="trans__num">{val[0].HouseNum}</td>
                    <td>{val[0].Date}</td>
                    <td>{val[0].DatePaid}</td>
                    <td>{val[0].PayerName}</td>
                    <td>{val[0].PayerTitle}</td>
                    <td className="trans__num">{val[0].Payment}</td>
                    <td>{val[0].PaymentMethod}</td>
                    <td>{val[0].Desc}</td>
                    <td>{val[0].Type}</td>
                    <td>{hoverNote(val[0].Notes)}</td>
                  </tr>

                ))}
              </tbody>
            </table>
            <nav>
              <ul className="trans__pagination">
                {pageNumbers.map(number => (
                  <div>
                    {currentPage == number ?
                      <li key={number} className="trans__pageselected">
                        <a onClick={() => paginate(number)} className="trans__pageitem">
                          {number}
                        </a>
                      </li>
                      :
                      <li key={number} className="trans__pageitem">
                        <a onClick={() => paginate(number)} className="trans__pageitem">
                          {number}
                        </a>
                      </li>
                    }
                  </div>
                ))}
              </ul>
            </nav>
          </div>


        </div>


      </div>

    </div>

  );

}

export default Transactions