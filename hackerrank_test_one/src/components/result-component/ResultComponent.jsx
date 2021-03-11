import React, { useEffect, useState } from "react";

const ResultComponent = ({
    totalPrice,
    discount
}) => {
    const [name, setName] = useState('Total');

    // Constructor
    useEffect(()=> { }, []);

    return (
        <>
            <span>{name}</span>
            <span data-testid="cart-total">${totalPrice > 0 ? totalPrice : 0}</span>
        </>
    )
}

export default ResultComponent;
