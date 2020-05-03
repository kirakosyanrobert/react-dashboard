import React from 'react';
import { Pagination as BasePagination } from 'react-bootstrap'

export function Pagination ({
    total,
    currentPage,
    perPage,
    onPrev,
    onNext,
}) {

    function handleOnPrev() {
        onPrev(currentPage - 1)
    }
    
    function handleOnNext() {
        onNext(currentPage + 1)
    }


    return (
        <div className="d-flex align-items-center px-3">
            <div className="px-2">
                {`Items ${((currentPage - 1) * perPage) + 1}-${(currentPage * perPage) >= total ? total : (currentPage * perPage)} from ${total}`}
            </div>
            <BasePagination>
                {/* <BasePagination.First /> */}
                <BasePagination.Prev
                    disabled={currentPage === 1}
                    onClick={handleOnPrev}
                />
            
                {/* <BasePagination.Item>{1}</BasePagination.Item>
                <BasePagination.Item active>{2}</BasePagination.Item>
                <BasePagination.Item>{3}</BasePagination.Item> */}
            
                <BasePagination.Next    
                    disabled={currentPage * perPage >= total}
                    onClick={handleOnNext}
                />
                {/* <BasePagination.Last /> */}
            </BasePagination>
        </div>
    )
}