import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

import useParts from '../../hooks/useParts/useParts';
import Tip from './Tip';

const SalesOverview = () => {
    const [parts,queryLoading,queryError,queryRefetch]=useParts()
    const [orders,setOrders]=useState([])
    const [showTooltip, setShowTooltip] = useState(false);
    useEffect(()=>{
        fetch('http://localhost:5000/allorderspublic')
              .then(res=>res.json())
              .then(data=>setOrders(data))

    },[])
    const totalAvaiableQuantity=parts?.reduce((prev,curr)=>prev+parseInt(curr.availableQuantity),0)
    const totalOrders= orders?.reduce((prev,curr)=>prev+parseInt(curr.purchaseQuantity),0)
    let shippedCount=0
    let pendingCount=0
    orders.forEach(order=>{
         if(order.status==="shipped"){
             shippedCount+=1

         }else if(order.status==="shipped"){
             pendingCount+=1

         }
    })
    const chartData=[
       { 
           name:"Total Available Quantity",
           value:totalAvaiableQuantity
       },
       { 
        name:"Total Order Quantity",
        value:totalOrders
        },
        { 
            name:"Pending",
            value:pendingCount
        },
        { 
            name:"Shipped",
            value:shippedCount
        }

    ]


    console.log(chartData)
    return (
        <div className='my-5'>
            <div className='text-center my-3'>
                <h3 className='text-3xl font-bold text-[#605C3C]'>Sales Overview</h3>
                <div className='h-[2px] w-full my-2 bg-[#605C3C] '></div>
            </div>
            <div className='flex justify-center'>
                <ResponsiveContainer width={"94%"} height={400}>
                    <PieChart width={500} height={400}  onMouseLeave={() => setShowTooltip(false)}>
                        <Pie
                        onMouseEnter={() => setShowTooltip(true)}
                        isAnimationActive={false}
                        data={chartData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={100}
                        fill="#8884d8"
                        label
                        />
                        {showTooltip && (
                            <Tooltip
                            // Anymation is a bit weird when the tooltip shows up after hidding
                            isAnimationActive={false}
                            // Send props down to get the payload
                            content={<Tip setShowTooltip={setShowTooltip} />}
                            // We need this to manage visibility ourselves
                            wrapperStyle={{ visibility: "visible", pointerEvents: "auto" }}
                            />
                        )}
                    </PieChart>
                    
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesOverview;