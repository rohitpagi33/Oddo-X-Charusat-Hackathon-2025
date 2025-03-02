import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const navigate = useNavigate();
  const products = [
    { id: 1, name: "Smartphone", price: 20000 },
    { id: 2, name: "Laptop", price: 50000 },
    { id: 3, name: "Washing Machine", price: 30000 },
    { id: 4, name: "TV", price: 40000 },
    { id: 5, name: "Refrigerator", price: 35000 },
  ];

  return (
    <div className="container mt-5">
      <h1>Choose a Product</h1>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ₹{product.price}</p>
                <button
                  className="btn btn-success"
                  onClick={() => navigate("/apply_loan_wia", { state: { price: product.price } })}
                >
                  Buy with MicroFin
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



