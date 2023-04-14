import React from "react";
import axios from "axios";
import "./App.css";

function App() {
  const paymentHandler = (response) => {
    console.log(response);
    alert(response.razorpay_payment_id);
    alert(response.razorpay_order_id);
    alert(response.razorpay_signature);
  };

  const razorpayPayment = async (amount) => {
    const { data } = await axios.post("/createOrder", {
      amount: amount,
      notes: {
        user: "Anand Shirbhaiyye",
        item: "Men-Tshirt",
      },
    });

    const orderId = data.order.id;

    const options = {
      key: "rzp_test_Hx1u2oka1Tudh0",
      amount: amount * 100,
      currency: "INR",
      name: "Anand_Ujwal",
      description: "xyz",
      image: "",
      order_id: orderId,
      handler: paymentHandler,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#0dcaf0",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    rzp.on("payment.failed", function (response) {
      alert("Payment Failed");
      console.log(response);
    });
  };
  return (
    <>
      <h1 className="text-center mt-3">Payment Integration</h1>

      <div className="container">
        <div class="card payment-integration-card mt-5 shadow p-3 mb-5 rounded">
          <img
            src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1678715534_2775447.jpg?format=webp&w=360&dpr=1.5"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title text-center">Men T-Shirts</h5>
            <p class="card-text">
              Material & Care: Premium Heavy Gauge Fabric 80% Cotton 20%
              Polyester Machine Wash
            </p>
            <p class="card-text">₹ 1000.00</p>
            <div className="text-center">
              <button
                class="btn btn-warning mt-2 p-2"
                onClick={() => {
                  razorpayPayment(1000);
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
