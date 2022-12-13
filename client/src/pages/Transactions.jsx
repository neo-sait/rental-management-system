import './style.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Sidebar, EditTransaction } from '../components';
import LoginCheck from '../modules/LoginCheck';
import { MdMode } from 'react-icons/md';
import { BsFillTrashFill } from 'react-icons/bs'
import { ipAddress } from '../App';
const Transactions = () => {
  const [dataArr, setDataArr] = useState([])
  const [order, setOrder] = useState("asc");
  const [searchChosen, setSearchChosen] = useState("None");
  const [searchType, setSearchType] = useState("None");
  const [filterOption, setFilterOption] = useState([]);
  const [filterResults, setFilterResults] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [data, setData] = useState([]);
  const [id,setId] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(50);

  const [addressData, setAddressData] = useState([]);
  const [nameData, setNameData] = useState([]);
  const [methodData, setMethodData] = useState([]);
  const [descData, setDescData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [houseData, setHouseData] = useState([]);


  const navigate = useNavigate();

  LoginCheck(navigate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {

    const onLoad = async () => {

      axios.get('http://' + ipAddress + ':5000/api/loadTransactions').then((res) => {
        //res.data.pop();
        setDataArr(res.data);
      })

      axios.get("http://" + ipAddress + ":5000/api/getAddresses").then(res => {
        setAddressData(res.data);
      })

      axios.get("http://" + ipAddress + ":5000/api/getNames").then(res => {
        setNameData(res.data);
      })

      axios.get("http://" + ipAddress + ":5000/api/getMethods").then(res => {
        setMethodData(res.data);
      })

      axios.get("http://" + ipAddress + ":5000/api/getDescriptions").then(res => {
        setDescData(res.data);
      })

      axios.get("http://" + ipAddress + ":5000/api/getTypes").then(res => {
        setTypeData(res.data);
      })

      axios.get("http://" + ipAddress + ":5000/api/getHouseNumber").then(res => {
        setHouseData(res.data);
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

  // state changers
  const saveData = (id, json) => {
    dataArr.forEach(obj => {
      if (obj[1] == id) {
        obj[0] = json;
        axios.post("http://" + ipAddress + ":5000/api/setTransaction",{id: id,data:json});
        localStorage.setItem("reloadFlag",'True');
        setPopUp(false);
      }
    })
  }

  const deleteData = (id) => {
    setDataArr(dataArr.filter(obj => obj[1] != id));

    var alertText = 'Are you sure you want to delete this transaction?'
    
    if (window.confirm(alertText) === true) {
      axios.post("http://" + ipAddress + ":5000/api/deleteTransaction",{id: id});
      localStorage.setItem("reloadFlag",'True');
    } else {
      alert('Transaction not deleted.');
    }

  }

  const selectSearchType = event => {
    setSearchChosen(event.target.value);

    switch (event.target.value) {
      case "None":
        setFilterOption([]);
        setSearchType("None");
        setFilterResults([]);
        break;
      case "Address":
          setFilterOption(addressData);
          setSearchType("Address");
        break;
      case "Name":
          setFilterOption(nameData);
          setSearchType("PayerName");
        break;
      case "Method":
          setFilterOption(methodData);
          setSearchType("PaymentMethod");
        break;
      case "Desc":
          setFilterOption(descData);
          setSearchType("Desc");
        break;
      case "Type":
          setFilterOption(typeData);
          setSearchType("Type");
        break;
    }
  }

  const selectOptionType = event => {
    const option = event.target.value;

    switch (searchType) {
      case "None":
        setFilterResults(dataArr);
        break;
      default:
        setFilterResults(dataArr.filter(obj =>
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

  

  const edit = (data) => {
    setData(data[0]);
    setId(data[1]);
    setPopUp(true);
    
  }

  return (


    <div className="App flex">

      <div className="w-72 sidebar
            dark:bg-secondary-dark-bg
            bg-white">
        <Sidebar />
      </div>

      <EditTransaction trigger={popUp} setTrigger={setPopUp} data={data} options={ 
        {
          address: addressData,
          name: nameData,
          method: methodData,
          desc: descData,
          type: typeData,
          house: houseData
      } } saveData={saveData} id={id} />

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
                        {filterOption.map(obj =>
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
                  <th >Num</th>
                  <th >Address</th>
                  <th >House #</th>
                  <th >Date</th>
                  <th >Date Paid</th>
                  <th >Name</th>
                  <th >Title</th>
                  <th >Payment</th>
                  <th >Method</th>
                  <th >Desc</th>
                  <th >Type</th>
                  <th>Notes</th>
                  <th></th>
                  <th></th>
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
                    <td className="trans__btn"><button onClick={() => { edit(val) }}><MdMode /></button></td>
                    <td className="trans__btn"><button onClick={() => { deleteData(val[1]) }}><BsFillTrashFill /></button></td>
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