import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePrev, handleNext }) => {
return (
<>
<footer>
  <div className="d-flex justify-content-around mx-auto align-items-center">
  <div className="pages">
    <p>Page {currentPage} of {totalPages}</p>
  </div>

  <div className="d-flex align-items-center pagination">
    {currentPage > 1 && (
     <p onClick={handlePrev} className="prev pr-2">Prev</p>
    )}
    {currentPage !== totalPages && (
     <p onClick={handleNext} className="next">Next</p>
    )}
  </div>
  </div>
</footer> 
</>
    )
}

export default Pagination
