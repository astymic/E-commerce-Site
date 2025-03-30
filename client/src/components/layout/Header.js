// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import CartPreview from './CartPreview';

// function Header() {
//     const [ isCartVisible, setIsCartVisible] = useState(false);

//     const toggleCartPreview = () => {
//         setIsCartVisible(!isCartVisible)
//     };

//     return (
//         <header className="main-header">
//             <nav>
//                 <Link to="/">Home</Link>
//             </nav>
//         <div className="header-actions">
//             {/* Placeholder for User Account Icon */}
//             <button className="icon-button">User</button>

//             {/* Cart Icon and Preview */}
//             <div className="cart-icon-container">
//                 <button className="icon-button" onClick={toggleCartPreview}>
//                     Cart {/* Replace with Cart icon later */}
//                     {/* Optionaly display item count badge here */}
//                 </button>
//                 {isCartVisible && <CartPreview />}
//             </div>
//         </div>
//         </header>
//     );
// }

// export default Header;