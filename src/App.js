// import logo from './logo.svg';
// import logo from './assets/p.jpeg';
import './App.scss';
import './routes/other-styles.styles.scss';
import { Badge, Button } from "@material-tailwind/react";
import { Routes, Route } from 'react-router-dom';
import NavigationPage from './routes/navigation.components';
import HomePage from './routes/home/homepg.components';
import { Toaster } from 'sonner';
// import PreOrderPage from './routes/preorder/preorder-page.components';
// import TermsAndConditions from './routes/terms/terms.components';
// import PrivacyPolicy from './routes/terms/privacy.components';
// import InquiryView from './routes/admin/inquiry-view.components';
// import OrdersView from './routes/admin/orders-view.components';
// import AboutPage from './routes/home/about.components';
// import PagesEdit from './routes/admin/pages.components';
// import DocsEdit from './routes/admin/docs.components';
// import SettingsEdit from './routes/admin/settings.components';
// import RequireAuth from './components/RequireAuth';
// import LoginPage from './routes/auth/login.components';
// import Services from './routes/home/services.components';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">

    //     <Badge content="5">
    //       <Button>Notifications</Button>
    //     </Badge>

    //     <img src={logo} className="App-logo" alt="logo" />
    //     {/* <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a> */}
    //   </header>
    // </div>

    <>
    <Routes>
      <Route path='/' element={<NavigationPage />}>
        <Route index element={<HomePage/>} />
        {/* <Route path='/about' element={<AboutPage />} />
        <Route path='/book' element={<PreOrderPage />} />
        <Route path='/terms' element={<TermsAndConditions />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
        <Route path="/services/:serviceId" element={<Services />} />
        <Route element={<RequireAuth allowedRoles='user'/>}>
          <Route path='/manage' element={<InquiryView />} />
          <Route path='/inquiry' element={<InquiryView />} />
          <Route path='/orders' element={<OrdersView />} />
          <Route path='/pages' element={<PagesEdit />} />
          <Route path='/settings' element={<SettingsEdit />} />
        </Route>
        <Route path='login' element={<LoginPage />}/> */}
      </Route>
    </Routes>
    <Toaster richColors/>
    </>

  );
}

export default App;
