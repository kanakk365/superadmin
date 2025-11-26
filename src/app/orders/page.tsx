import DashboardLayout from "../../components/main/DashboardLayout";
import { OrdersTable } from "../../components/orders/OrdersTable";

const OrdersPage = () => {
  return (
    <DashboardLayout pageLabel="Orders">
      <OrdersTable />
    </DashboardLayout>
  );
};

export default OrdersPage;
