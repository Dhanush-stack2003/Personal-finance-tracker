import { memo } from 'react';
import './filterDate.css'

const FilterDate = memo(({onfilter})=>{
  function filterHandler(e){
    const value = e.target.value
    onfilter(value)
  }

  return (
    <div>
      <select
        id="datefilter"
        defaultValue="one_month"
        onChange={(e)=>filterHandler(e)}
      >
        <option id="1_day" value="one_day">
          Last 1 day
        </option>
        <option id="1_week" value="one_week">
          Last 1 week
        </option>
        <option id="1_month" value="one_month">
          Last 1 month
        </option>
        <option id="6_month" value="six_month">
          Last 6 month
        </option>
        <option id="1_year" value="one_year">
          Last 1 year
        </option>
      </select>
    </div>
  );
})

export default FilterDate