import "../styles/styles.css";

function CategorySelect({ category, setCategory }) {
  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="category-select"
    >
      <option value="Food">Food</option>
      <option value="Transport">Transport</option>
      <option value="Shopping">Shopping</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Bills">Bills</option>
      <option value="Other">Other</option>
    </select>
  );
}

export default CategorySelect;
