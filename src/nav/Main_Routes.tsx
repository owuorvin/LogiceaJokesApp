/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter ,Routes, Route, Link } from "react-router-dom";
import DefaultLayout from "../Components/DefaultLayout";
 import Login from "../Sections/Login/LoginForm";
 import JokesForm from "../Sections/CreateEditJokesForm";
import MainDashboard from "../Sections/Home";
import ROTES, { RouteType } from "./routeInfo";
import { ProtectedRoute } from "../Sections/Login/ProtectedRoute";

const Rotes = () => (
  <BrowserRouter>

    <Routes>
    <Route path="/" element={
          <Login />
        }>
      </Route>
      <Route path="/dashboard" element={
         <DefaultLayout>
          <MainDashboard />
          </DefaultLayout>
        }>
      </Route>
        <>
     
      <Route path="/dashboard" element={ 
          <DefaultLayout>
                <ProtectedRoute>
                <MainDashboard />
                </ProtectedRoute>       
        </DefaultLayout>
       
          }>
      </Route>      
      <Route path="/jokesform/:id" element={ <DefaultLayout>
        <ProtectedRoute>
          <JokesForm 
          setEdit={(value: boolean) => {}}
          isEdit={true}
          />
          </ProtectedRoute>
        </DefaultLayout>}>
      </Route>
      <Route path="/jokesform" element={ <DefaultLayout>
        <ProtectedRoute>
          <JokesForm 
          setEdit={(value: boolean) => {}}
          isEdit={false}
          />
          </ProtectedRoute>
        </DefaultLayout>}>
      </Route>
      </>

    </Routes>
  </BrowserRouter>
);

type RouteProps = Omit<RouteType, "showOnNav" | "icon">;
export const RouteItem  = ({
  path,
  component: Component,
  layout: Layout,
}: RouteProps) => {

  return (
    <Route
      path={path}
      element={ <Layout>
               <Component />
              </Layout>}
    />
  );
};

export default Rotes;
