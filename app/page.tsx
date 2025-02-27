import DynamicForm from "../components/DynamicForm";
import { exampleSchema } from "../data/formSchema";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5", // Light blue gradient
      }}
    >
      <DynamicForm schema={exampleSchema} />
    </div>
  );
}