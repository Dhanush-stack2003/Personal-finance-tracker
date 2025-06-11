import './paginate.css';
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
function Paginate({postPerPage, totalPosts, paginate}) {

    const pageNumbers = [];
    for(let i=1;i<=Math.ceil(totalPosts / postPerPage); i++){
        pageNumbers.push(i);
    }

    const moveToPreviousPage = () => {
        if(pageNumbers.length > 0) {
            paginate(pageNumbers[pageNumbers.length - 1] - 1);
        }
    }

    const moveToNextPage = () => {
        if(pageNumbers.length > 0) {
            paginate(pageNumbers[0] + 1);
        }
    }

    return (
    <div className="pagination">
        <div onClick={()=>moveToPreviousPage()} className="previous_page">
            <span className='previous_arrow'><FaArrowLeft/></span><span className='previous_btn'>Previous</span>
        </div>
        <ul>
            {pageNumbers.map((number)=>{
                return <li key={number}>
                    <a onClick={()=>paginate(number)} className="currentPage">{number}</a>
                </li>
            })}
        </ul>
        <div onClick={()=>moveToNextPage()} className="next_page"><span className='next_btn'>Next</span><span className='next_arrow'><FaArrowRight/></span></div>
    </div>
  )
}

export default Paginate