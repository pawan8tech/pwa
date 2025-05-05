import React, { useState, useEffect } from "react";
import ExpenseList from "../components/ExpenseList";
import BudgetTracker from "../components/BudgetTracker";
import MonthlySummary from "../components/MonthlySummary";
import "../styles/ExpenseTracker.css";

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [recurringExpenses, setRecurringExpenses] = useState([]);
  const [budget, setBudget] = useState(localStorage.getItem("budget") || "");
  const [categories, setCategories] = useState([
    "Food",
    "Transport",
    "Entertainment",
    "Bills",
    "Shopping",
    "Other",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(savedExpenses);

    const savedRecurring =
      JSON.parse(localStorage.getItem("recurringExpenses")) || [];
    setRecurringExpenses(savedRecurring);
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredExpenses = expenses
    ?.filter((expense) => {
      return (
        (selectedCategory === "All" || expense.category === selectedCategory) &&
        (searchQuery === "" ||
          expense.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (expense.description &&
            expense.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))) &&
        (!startDate || new Date(expense.date) >= new Date(startDate)) &&
        (!endDate || new Date(expense.date) <= new Date(endDate)) &&
        (!minAmount || expense.amount >= parseFloat(minAmount)) &&
        (!maxAmount || expense.amount <= parseFloat(maxAmount))
      );
    })
    ?.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === "amount") {
        return b.amount - a.amount;
      } else {
        return a.category.localeCompare(b.category);
      }
    });

  return (
    <div className="expense-tracker-container">
      <h1 className="text-center">Expense Tracker PWA</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search expenses..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
        />
        <input
          type="number"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
          placeholder="Min Amount"
        />
        <input
          type="number"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
          placeholder="Max Amount"
        />
        <select value={sortBy} onChange={handleSortChange}>
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
          <option value="category">Sort by Category</option>
        </select>
      </div>
      <ExpenseList expenses={filteredExpenses} />
      <BudgetTracker
        expenses={expenses}
        recurringExpenses={recurringExpenses}
      />

      <MonthlySummary
        expenses={expenses}
        budget={budget}
        recurringExpenses={recurringExpenses}
      />
    </div>
  );
}

export default ExpenseTracker;

// import React, { useState, useEffect } from "react";
// import ExpenseForm from "../components/ExpenseForm";
// import ExpenseList from "../components/ExpenseList";
// import BudgetTracker from "../components/BudgetTracker";
// import RecurringExpenses from "../components/RecurringExpenses";
// import MonthlySummary from "../components/MonthlySummary";
// import "../styles/ExpenseTracker.css";
// import { db } from "../firebase";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   onSnapshot,
//   doc,
//   deleteDoc,
//   query,
//   where,
// } from "firebase/firestore";

// function ExpenseTracker() {
//   const [expenses, setExpenses] = useState([]);
//   const [recurringExpenses, setRecurringExpenses] = useState([]);
//   const [budget, setBudget] = useState(0);
//   const [categories] = useState([
//     "Food",
//     "Transport",
//     "Entertainment",
//     "Bills",
//     "Shopping",
//     "Other",
//   ]);
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   useEffect(() => {
//     const unsubscribeExpenses = onSnapshot(
//       collection(db, "expenses"),
//       (snapshot) => {
//         setExpenses(
//           snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
//         );
//       }
//     );

//     const unsubscribeRecurring = onSnapshot(
//       collection(db, "recurringExpenses"),
//       (snapshot) => {
//         setRecurringExpenses(
//           snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
//         );
//       }
//     );

//     const fetchBudget = async () => {
//       const budgetSnapshot = await getDocs(collection(db, "budget"));
//       if (!budgetSnapshot.empty) {
//         setBudget(budgetSnapshot.docs[0].data().amount);
//       }
//     };
//     fetchBudget();
//     return () => {
//       unsubscribeExpenses();
//       unsubscribeRecurring();
//     };
//   }, []);

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   const filteredExpenses =
//     selectedCategory === "All"
//       ? expenses
//       : expenses.filter((expense) => expense.category === selectedCategory);

//   const addExpense = async (expense) => {
//     try {
//       await addDoc(collection(db, "expenses"), expense);
//       console.log("Expense deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting expense:", error);
//     }
//   };

//   const deleteExpense = async (customId) => {
//     try {
//       const q = query(collection(db, "expenses"), where("id", "==", customId));
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         querySnapshot.forEach(async (docSnap) => {
//           await deleteDoc(doc(db, "expenses", docSnap.id)); // Delete using Firestore ID
//         });
//         console.log("Expense deleted successfully!");
//       } else {
//         console.log("Expense not found.");
//       }
//     } catch (error) {
//       console.error("Error deleting expense:", error);
//     }
//   };

//   const handleClearExpenses = () => {
//     setExpenses([]);
//     localStorage.removeItem("expenses");
//   };

//   const addRecurringExpense = async (expense) => {
//     await addDoc(collection(db, "recurringExpenses"), expense);
//   };

//   return (
//     <div className="expense-tracker-container">
//       <div className="headerContainer">
//         <h1 className="">Expense Tracker PWA</h1>
//         <div className="category-filter">
//           <label>Filter by Category:</label>
//           <select value={selectedCategory} onChange={handleCategoryChange}>
//             <option value="All">All</option>
//             {categories.map((category) => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* <ExpenseList expenses={filteredExpenses} viewMode={viewMode} /> */}

//       <BudgetTracker
//         expenses={expenses}
//         recurringExpenses={recurringExpenses}
//       />
//       <div className="expense-list-container">
//         <ExpenseList
//           expenses={filteredExpenses}
//           onDeleteExpense={deleteExpense}
//         />
//       </div>
//       <button className="clear-btn" onClick={handleClearExpenses}>
//         Clear All Expenses
//       </button>
//       <ExpenseForm onAddExpense={addExpense} />
//       <RecurringExpenses onAddRecurringExpense={addRecurringExpense} />
//       <MonthlySummary
//         expenses={expenses}
//         budget={budget}
//         recurringExpenses={recurringExpenses}
//       />
//     </div>
//   );
// }

// export default ExpenseTracker;
