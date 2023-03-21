import ApolloClientProvider from "./components/apollo/ApolloClientProvider";
import AuthForms from "./components/auth/AuthForms";
import AppLayout from "./components/layout/AppLayout";
import Todos from "./components/todos/Todos";

function App() {
  return (
    <ApolloClientProvider>
      <AppLayout>
        <AuthForms />
        <Todos />
      </AppLayout>
    </ApolloClientProvider>
  );
}

export default App;
