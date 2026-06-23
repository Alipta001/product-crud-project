import EditForm from "@/components/editProduct/form";
import ProtectedRoute from "@/components/protectedRoute";

export default function EditProducts(){
    return(

        <ProtectedRoute >
            <EditForm /> 
        </ProtectedRoute>
    );
}