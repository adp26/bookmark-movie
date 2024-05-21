
import Header from "./Header";


function AppLayout({ children }) {

  return (
    <div className="grid h-screen overflow grid-rows-[auto_1fr] font-montserrat">
      <Header />
      {children}
    </div>
  );
}

export default AppLayout;
