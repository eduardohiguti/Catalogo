import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ProdutosListar from "./pages/produtos-listar";

function App() {
    return (
        <div id="App" className="min-h-screen bg-gray-100 text-gray-900">
            <BrowserRouter>
                <nav className="bg-blue-500 p-4">
                    <ul className="flex space-x-4 max-w-5xl mx-auto">
                        <li>
                            <img src="/src/assets/varv.png" alt="Homem negro" className="max-w-10 h-auto rounded-lg shadow-lg"></img>
                        </li>
                        <li>
                            <Link to="/" className="text-white hover:text-gray-200">Home</Link>
                        </li>
                        <li>
                            <Link to="/produtos" className="text-white hover:text-gray-200">Produtos</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/produtos" element={<ProdutosListar />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

function Home() {
    return <h2 className="max-w-5xl mx-auto text-xl">Página Inicial</h2>;
}

export default App;
