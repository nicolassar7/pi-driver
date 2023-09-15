import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './pagination.css'

function Pagination({ handlePage, page, perpage }) {
    const pages = useSelector((state) => {
        return state.drivers.length;
    });

    const [count, setCount] = useState(0);
    const [paginate, setPaginate] = useState([]);

    useEffect(() => {
        setCount(Math.ceil(pages / perpage));
    }, [perpage, pages]);

    useEffect(() => {
        const arrayPage = [];
        for (let i = 0; i < count; i++) {
            arrayPage.push(i);
        }
        setPaginate(arrayPage);
    }, [count]);

    const visiblePages = 3; // Cantidad de botones de paginación visibles
    const halfVisible = Math.floor(visiblePages / 2);
    let start = Math.max(0, page - halfVisible);
    let end = Math.min(count - 1, start + visiblePages - 1);
    start = Math.max(0, end - visiblePages + 1);

    return (
        <div className="pag">
            {page > 0 && (
                <button onClick={() => handlePage(page - 1)}>&#9664;</button>
            )}
            {paginate.map((p) => (
                // Solo muestra botones de paginación dentro del rango deseado
                p >= start && p <= end && (
                    <button
                        key={p}
                        onClick={() => handlePage(p)}
                        className={p === page ? 'active' : ''}
                    >
                        {p + 1}
                    </button>
                )
            ))}
            {page < count - 1 && (
                <button onClick={() => handlePage(page + 1)}>&#9654;</button>
            )}
        </div>
    );
}

export default Pagination;
