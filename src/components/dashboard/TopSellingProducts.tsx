import { topSellingProducts } from "./constants";

export const TopSellingProducts = () => {
  return (
    <div className="rounded-3xl bg-card py-6 px-3">
      <h3 className="px-6 text-lg font-semibold text-foreground">Top Selling Products</h3>

      <div className="overflow-hidden">
        <table className="w-full table-fixed border-collapse text-sm">
          <thead className="border-b border-border text-left text-sm font-thin text-muted-foreground">
            <tr>
              <th className="px-6 py-4 text-sm font-normal">Name</th>
              <th className="px-6 py-4 text-sm font-normal">Price</th>
              <th className="px-6 py-4 text-sm font-normal">Quantity</th>
              <th className="px-6 py-4 text-sm font-normal">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm text-foreground">
            {topSellingProducts.map((product) => (
              <tr key={product.name} className="border-b border-border/60 last:border-0">
                <td className="px-6 py-3 text-sm font-normal text-foreground">{product.name}</td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">
                  {product.price}
                </td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">
                  {product.quantity}
                </td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">
                  {product.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

