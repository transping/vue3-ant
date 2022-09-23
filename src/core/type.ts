type WidgetCode = string
type GizmoCode = string
type ProductCode = WidgetCode | GizmoCode

type UnitQuantity = number
type KilogramQuantity = number
type OrderQuantity = UnitQuantity | KilogramQuantity

type OrderId = undefined
type OrderLineId = undefined
type CustomerId = undefined

type CustomerInfo = undefined
type ShippingAddress = undefined
type BillingAddress = undefined
type Price = undefined
type BillingAmount = undefined

interface OrderLine {
  id: OrderLineId
  order_id: OrderId
  product_code: ProductCode
  order_quantity: OrderQuantity
  price: Price
}

interface Order {
  id: OrderId
  customer_id: CustomerId
  shipping_address: ShippingAddress
  billing_address: BillingAddress
  order_lines: OrderLine[]
  amount_to_bill: BillingAmount
}


type N = number & string

function UnitQuantityNew(value: number): UnitQuantity {
  if (value < 0) throw new Error('value error')
  return value
}


export { }
