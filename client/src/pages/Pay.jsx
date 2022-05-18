import React, { useEffect, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

function Pay() {

    const KEY = "pk_test_51JhERSGkYc9g1BvdAdto0rO94IZQ6BAqLaShXV1pie6mHqnY0dTObrEPGgBsZRffjvKBvB2SBviBv1FIPQ1Mlpit00Yw4DxR4C"

    const [stripeToken,setStripeToken] = useState(null);

    const onToken = (token) => {
        setStripeToken(token)
    }    

    useEffect(()=>{

        stripeToken && (
        axios.post('http://localhost:5000/api/checkout/payment', {
            tokenId: stripeToken.id,
            amount: 2000,
        },{

        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODM2ZDVmYmU4ODk3NjUwYTVmNzYyMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Mjc4MDQzNSwiZXhwIjoxNjUzMDM5NjM1fQ.UlNIUUc2kfeVtCFNVW2bIYTLijpTzYz5-u1-PeSfpUY"
        })
        .then(payment=>{
            console.log(payment)
        })
        .catch(err=>{
            console.log(err.response)
        })

        )
    }, [stripeToken])


  return (
    <div 
        style={{
            display:"flex",
            alignItems:"center", 
            justifyContent:"center", 
            margin: "auto",
            height: "100vh"
    }}>
        <StripeCheckout 
            name='MUNEEB SHOP' 
            image='https://avatars.githubusercontent.com/u/50763652?v=4'
            billingAddress
            shippingAddress
            description='Your total is $20'
            amount={2000}
            token={onToken}
            stripeKey={KEY}
            >
            <button>PAY NOW</button>
        </StripeCheckout>
    </div>
  )
}

export default Pay