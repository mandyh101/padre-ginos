import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import getPastOrders from '../api/getPastOrders'
import getPastOrder from '../api/getPastOrder'
import Modal from '../Modal'
import {priceConverter} from '../useCurrency'

export const Route = createLazyFileRoute('/past')({
  component: PastOrdersRoute,
})

function PastOrdersRoute() {
  const [page, setPage] = useState(1)
  const [focusedOrder, setFocusedOrder] = useState(null);
  const {isLoading, data} = useQuery({
    queryKey: ['past-orders', page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000,
  })

  // note in this tanstack query we are renaming isLoading and data because we are using these named attributes already in anothe rquesry in the same file
  const [isLoading: isLoadingPastOrder, data: pastOrderData] = useQuery({
    queryKey: ['past-order', focusedOrder],
    queryFn: () => getPastOrder(focusedOrder),
    stale: 86400000, //one day in ms
    enabled: !!focusedOrder //this query attribute allows us to only run the query if the focusedOrder is truthy
  })

  if (isLoading){
    return (
      <div className="past-orderd">
        <h2>Loading...</h2>
      </div>
    )
  }

  return(
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Date</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <=1} onClick={() => setPage(page - 1)}>Previous</button>
        {/* TODO improve pagination user experience */}
        <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  )
}
