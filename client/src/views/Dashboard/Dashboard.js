import React, { useState, useEffect } from 'react'
import Navbar from '../../component/Navbar/Navbar'
import "./Dashboard.css"
import axios from 'axios';
function Dashboard() {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [creditAmt, setCreditAmt] = useState(0);
  const [debitAmt, setDebitAmt] = useState(0);


  const localuser = JSON.parse(localStorage.getItem('expenseuser') || "{}");

  const addTransaction = async () => {
    const responce = await axios.post("/api/transaction",
      {
        user: localuser._id,
        amount: amount,
        category: category,
        description: note,
        type: type
      }
    );

    if (responce?.data?.success) {
      alert(responce?.data?.message)
    } else {
      alert(responce?.data?.message)
    }
  }

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


  return (
    <div className='dashboard-container'>
      <div><Navbar /></div>
      <div>
        <div className='home-heading-signup'><span className='head-signup'>💸 Expence Tracker System 💸</span></div>
        <p className='dashbord-heading text-center'>Welcome To Budget Management And Expence Tracker System</p>
        <p className='dashbord-head text-center'>Add Transaction</p>

        <input type='text'
          placeholder='Amount'
          className='input-add'
          onChange={(e) => {
            setAmount(e.target.value)
          }} />

        <input type='text'
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
          onChange={(e) => {
            setType(e.target.value)
          }}>
          <option>Select Type</option>
          <option value={"credit"}>Credit</option>
          <option value={"debit"}>Debit</option>
        </select>

        <button type='button' onClick={addTransaction} className='add-tranasaction-btn'>Add Transaction</button>

        <hr />
        <div>
         <div className='total-container'> <p>Total Credit : {creditAmt}</p> <p>Total Debit : {debitAmt}</p></div><hr/>
         <h2 className='text-center'>All Expences</h2>
         <div className='transactionss-container'>
          
          {
            transaction?.map((tranasaction, index) => {
              const { amount, category, type, description, createdAt } = tranasaction;

              const date = new Date(createdAt).toLocaleDateString();
              const time = new Date(createdAt).toLocaleTimeString();
              return (
                  <div className='one-transaction'>
                    <h2 className={` amount ${type === "debit" ? "debit-amt" : "credit-amt"}`}>
                    ₹ {type === "debit" ? "-" : "+"}{amount}</h2>
                   
                    <p className='type'>{type === "credit" ? "Credited" : "Debited"}</p>
                    <p className='category'>{category}</p><hr/>
                    <p className='dec'>Note: {description}</p>
                    <p className='edit-btn'>🖋️</p>
                    <p className='del-btn'>🗑️</p>
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