import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setTotalData } from './paginationSlice';
import ChevronLeft from '../../ui/icon/ChevronLeft';
import ChevronRight from '../../ui/icon/ChevronRight';

const Pagination = ({ totalData }) => {
    const { itemsPerPage, maxVisiblePages } = useSelector((state) => state.pagination);
    const currentPage = useSelector((state) => state.pagination.currentPage);
    const dispatch = useDispatch();

    useEffect(() => {
        // Update total data ketika prop berubah

        dispatch(setTotalData(totalData));
    }, [totalData, dispatch]);

    const generatePagination = () => {
        const totalPages = Math.ceil(totalData / itemsPerPage);
        const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);

        let visiblePages = [];

        if (totalPages <= maxVisiblePages) {
            visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);
        } else if (currentPage <= halfMaxVisiblePages) {
            visiblePages = Array.from({ length: maxVisiblePages }, (_, i) => i + 1);
        } else if (currentPage >= totalPages - halfMaxVisiblePages) {
            visiblePages = Array.from({ length: maxVisiblePages }, (_, i) => totalPages - maxVisiblePages + i + 1);
        } else {
            const startPage = currentPage - halfMaxVisiblePages;
            const endPage = currentPage + halfMaxVisiblePages;
            visiblePages = Array.from({ length: maxVisiblePages }, (_, i) => startPage + i);
        }

        return visiblePages;
    };

    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page));
    };

    const visiblePages = generatePagination();

    return (
        <div className='flex gap-3 items-center'>
            {/* Tampilkan halaman pagination */}
            <ChevronLeft />
            {visiblePages.map((page) => (
                <button key={page} onClick={() => handlePageChange(page)}>
                    {page}
                </button>
            ))}
            <ChevronRight />
        </div>
    );
};

export default Pagination;