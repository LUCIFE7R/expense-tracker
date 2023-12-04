import React, { useState, useEffect } from 'react';
import Navbar from '../../component/Navbar/Navbar';
import './Dashboard.css';
import axios from 'axios';

function Dashboard() {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [creditAmt, setCreditAmt] = useState(0);
  const [debitAmt, setDebitAmt] = useState(0);
  const [id, setId] = useState(0);
  const [edit, setEdit] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Added state for sidebar

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const localuser = JSON.parse(localStorage.getItem('expenseuser') || "{}");

  const addTransaction = async () => {
    try {
      const response = await axios.post("/api/transaction", {
        user: localuser._id,
        amount: amount,
        category: category,
        description: note,
        type: type,
      });

      if (response?.data?.success) {
        alert(response?.data?.message);
        loadTransaction();
        setAmount("");
        setNote("");
        setCategory("");
        setType("");
      } else {
        alert(response?.data?.message);
      }
    } catch (error) {
      console.log(error.message)
    }
  };


  const loadTransaction = async () => {

    if (!localuser?._id) {
      return;
    }
    const responce = await axios.get(`/api/gettransactions/user/${localuser._id}`)
    setTransaction(responce?.data?.data)
    const transactionss = responce?.data?.data

    let totalCredit = 0;
    let totalDebit = 0;

    transactionss.forEach((tranasaction) => {
      if (tranasaction.type === "credit") {
        totalCredit += tranasaction.amount;
      } else {
        totalDebit += tranasaction.amount;
      }
    });
    setCreditAmt(totalCredit);
    setDebitAmt(totalDebit);
  }


  useEffect(() => {
    loadTransaction()
  }, [])

  const deleteTransaction = async (id) => {
    try {
      const response = await axios.delete(`/api/transaction/${id}`);
      if (response.data.success) {
        alert(response.data.message);
        loadTransaction();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const editTransation = async (id) => {
    try {
      const response = await axios.get(`/api/gettransaction/${id}`);

      if (response?.data?.success) {
        const transactionToEdit = response?.data?.data;
        setAmount(transactionToEdit.amount);
        setNote(transactionToEdit.description);
        setCategory(transactionToEdit.category);
        setType(transactionToEdit.type);
        setId(transactionToEdit._id)
        setEdit(true)
      } else {
        alert(response?.data?.message);
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  const savedEditTransaction = async () => {
    try {
      const response = await axios.put(`/api/edittransaction/${id}`, {
        amount: amount,
        category: category,
        description: note,
        type: type,
      });

      if (response?.data?.success) {
        alert(response?.data?.message);
        loadTransaction();
        setAmount("");
        setNote("");
        setCategory("");
        setType("");
      } else {
        alert(response?.data?.message);
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <div className={`dashboard-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <div className='home-nav-divs'>
       
        <Navbar />
      </div>
      <div>
        <div className='home-heading-signup'>
          <span className='head-signup'>
            <span className='tog-btn-open' onClick={handleToggleSidebar}>
              🟰
            </span>
            Expence Tracker System
          </span>
        </div>
        <p className='dashbord-heading '>Welcome To Budget Management And Expence Tracker System</p>
        <p className='dashbord-head '>Add Transaction</p>

        <input type='text'
          value={amount}
          placeholder='Amount'
          className='input-add'
          onChange={(e) => {
            setAmount(e.target.value)
          }} />

        <input type='text'
          value={note}
          placeholder='Add Note'
          className='input-add'
          onChange={(e) => {
            setNote(e.target.value)
          }} />

        <select className='input-add'
          value={category}
          onChange={(e) => {
            setCategory(e.target.value)
          }}>
          <option>Select Category</option>
          <option value={"food"}>Food</option>
          <option value={"shopping"}>Shopping</option>
          <option value={"education"}>Education</option>
          <option value={"travell"}>Tavell</option>
          <option value={"entertainment"}>Entertainment</option>
          <option value={"salary"}>Salary</option>
          <option value={"business"}>Business</option>
          <option value={"money interest"}>Money Interest</option>
          <option value={"other"}>Other</option>
        </select>

        <select className='type-add'
          value={type}
          onChange={(e) => {
            setType(e.target.value)
          }}>
          <option>Select Type</option>
          <option value={"credit"}>Credit</option>
          <option value={"debit"}>Debit</option>
        </select>
        {
          edit === true ? <button type='button' onClick={savedEditTransaction} className='add-tranasaction-btn'>Edit Transaction</button> :
            <button type='button' onClick={addTransaction} className='add-tranasaction-btn'>Add Transaction</button>
        }



        <hr />
        <div>
          <div className='total-container'> <p>Total Credit : ₹ {creditAmt}</p> <p>Total Debit : ₹ {debitAmt}</p></div><hr />
          <h2 className='allexpence text-center'>All Expences</h2>
          <div className='transactionss-container'>

            {
              transaction?.map((tranasaction, index) => {
                const { _id, amount, category, type, description, createdAt } = tranasaction;

                const date = new Date(createdAt).toLocaleDateString();
                const time = new Date(createdAt).toLocaleTimeString();
                return (
                  <div className='one-transaction'>
                    <h2 className={` amount ${type === "debit" ? "debit-amt" : "credit-amt"}`}>
                      ₹ {type === "debit" ? "-" : "+"}{amount}</h2>

                    <p className='type'>{type === "credit" ? "Credited" : "Debited"}</p>
                    <p className='category'>{category}</p><hr />
                    <p className='dec'>Note: {description}</p>
                    <p className='edit-btn' onClick={() => {
                      editTransation(_id)
                    }}>🖋️</p>

                    <p className='del-btn' onClick={() => {
                      deleteTransaction(_id)
                    }}>🗑️</p>
                  </div>

                )
              })
            }</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard