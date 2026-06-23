import AddProductForm from "@/components/addProduct/form";
import ProtectedRoute from "@/components/protectedRoute";

export default function AddProduct() {
  return (
    <ProtectedRoute>
      <AddProductForm />
    </ProtectedRoute>
  );
}