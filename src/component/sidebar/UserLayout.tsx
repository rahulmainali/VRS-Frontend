
import Sidebar from "./AnimatedSidebar";
import SecondNavbar from "../dashboard/SecondNavbar";

function UserLayout({ children }: any) {
  return (
    <div className="flex ">
      <Sidebar />
      <main className="App-dashboard relative overflow-y-auto flex-1 mx-auto ">
        <><SecondNavbar/></>
      <div className= 'w-full absolute bg-none ' style={{top: '110px'}}>{children}</div></main>
    </div>
  );
}

export default UserLayout;
