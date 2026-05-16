import { useEffect } from "react";
import api from "./services/api";
import AppRoutes from "./routes/AppRoutes";

// function App() {

//   useEffect(() => {
//     api.get("/")
//       .then(res => console.log(res.data))
//       .catch(err => console.log(err));
//   }, []);

//   return (
//     <div className="min-h-screen bg-black text-white flex items-center justify-center">
//       <h1 className="text-5xl font-bold text-blue-500">
//         CogniGate Frontend
//       </h1>
//     </div>
//   );
// }

function App() {

  useEffect(() => {
    api.get("/")
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }, []);

  return <AppRoutes />;
}

export default App;
