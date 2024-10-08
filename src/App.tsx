import HomeContent from "./components/organism/homeContent/homeContent";
import { NavbarProvider } from "./context/navbarContext";

function App() {
  return (
    <NavbarProvider>
      <HomeContent />
    </NavbarProvider>
  );
}

export default App;
