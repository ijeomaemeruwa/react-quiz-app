import React, {useEffect, useState} from 'react';
import './pagination.css';

const Pagination = 
({  total, 
    questionsPerPage, 
    currentPage, 
    setCurrentPage, 
    handlePagination 
}) => {


const [totalPages, setTotalPages] = useState(0);
const [pageNumberLimit] = useState(3);
const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(2);
const [minPageNumberLimit, setMinPageNumberLimit] = useState(1);

useEffect(() => {
if(total > 0 && questionsPerPage > 0)
    setTotalPages( Math.ceil(total / questionsPerPage));
}, [total, questionsPerPage]);

const pages = [];
for(let i = 1; i <= totalPages; i++) {
  pages.push(i)
}

//handle Next and Previous State
const handlePrev = () => {
setCurrentPage(currentPage - 1);
if((currentPage - 1) % pageNumberLimit === 0){
    setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
}
}
  
const handleNext = () => {
setCurrentPage(currentPage + 1);
if(currentPage + 1 > maxPageNumberLimit){
    setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
    setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
}
}


return (
<>
<div>
  <p 
    onClick={handlePrev} 
    disabled={currentPage === pages[0] ? true : false}
    className="pr-2 prev">
    Prev
   </p>
   <p 
    onClick={handleNext} 
    className="pl-2"
    disabled={currentPage === pages[totalPages - 1] ? true : false}>
    Next
  </p>  
  </div>      
</>
)
}

export default Pagination;
