import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminRegister } from './Components/Admin/AdminRegister';
import { HomePage } from './Components/HomePage/HomePage';
import { AdminLogin } from './Components/Admin/AdminLogin';
import { Admindashboard } from './Components/Admin/AdminDashboard';
import { ViewBookDetails } from './Components/Admin/ViewBookDetails';
import { StudentLogin } from './Components/Students/StudentLogin';
import { StudentRegister } from './Components/Students/StudentRegister';
import { CSEdept } from './Components/Students/Dashboard/CSE/CSEdept';
import { EEEdashboard } from './Components/Students/Dashboard/EEE/EEEdashboard';
import { Firstsem } from './Components/Students/Dashboard/CSE/Firstsem';
import { Secondsem } from './Components/Students/Dashboard/CSE/Secondsem';
import { Thirdsem } from './Components/Students/Dashboard/CSE/Thirdsem';
import { Fourthsem } from './Components/Students/Dashboard/CSE/Fourthsem';
import { Fifthsem } from './Components/Students/Dashboard/CSE/Fifthsem';
import { Sixthsem } from './Components/Students/Dashboard/CSE/Sixthsem';
import { Seventhsem } from './Components/Students/Dashboard/CSE/Seventhsem';
import { Eighthsem } from './Components/Students/Dashboard/CSE/Eighthsem';

import { MECHdashboard } from './Components/Students/Dashboard/MECH/MECHdashboard';
import { Mechfirstsem } from './Components/Students/Dashboard/MECH/Mechfirstsem';
import { Mechsecondsem } from './Components/Students/Dashboard/MECH/Mechsecondsem';
import { Mechthirdsem } from './Components/Students/Dashboard/MECH/Mechthirdsem';
import { Mechfourthsem } from './Components/Students/Dashboard/MECH/Mechfourthsem';
import { Mechfifthsem } from './Components/Students/Dashboard/MECH/Mechfifthsem';
import { Mechsixthsem } from './Components/Students/Dashboard/MECH/Mechsixthsem';
import { Mechseventhsem } from './Components/Students/Dashboard/MECH/Mechseventhsem';
import { Mecheighthsem } from './Components/Students/Dashboard/MECH/Mecheighthsem';

import { ECEdept } from './Components/Students/Dashboard/ECE/ECEdept';
import { ECEfirstsem } from './Components/Students/Dashboard/ECE/ECEfirstsem';
import { ECEsecondsem } from './Components/Students/Dashboard/ECE/ECEsecondsem';
import { ECEthirdsem } from './Components/Students/Dashboard/ECE/ECEthirdsem';
import { ECEfourthsem } from './Components/Students/Dashboard/ECE/ECEfourthsem';
import { ECEfifthsem } from './Components/Students/Dashboard/ECE/ECEfifthsem';
import { ECEsixthsem } from './Components/Students/Dashboard/ECE/ECEsixthsem';
import { ECEseventhsem } from './Components/Students/Dashboard/ECE/ECEseventhsem';
import { ECEeighthsem } from './Components/Students/Dashboard/ECE/ECEeighthsem';

import { CIVILdashboard } from './Components/Students/Dashboard/CIVIL/CIVILdashboard';
import { Civilfirstsem } from './Components/Students/Dashboard/CIVIL/Civilfirstsem';
import { Civilsecondsem } from './Components/Students/Dashboard/CIVIL/Civilsecondsem';
import { Civilthirdsem } from './Components/Students/Dashboard/CIVIL/Civilthirdsem';
import { Civilfourthsem } from './Components/Students/Dashboard/CIVIL/Civilfourthsem';
import { Civilfifthsem } from './Components/Students/Dashboard/CIVIL/Civilfifthsem';
import { Civilsixthsem } from './Components/Students/Dashboard/CIVIL/Civilsixthsem';
import { Civilseventhsem } from './Components/Students/Dashboard/CIVIL/Civilseventhsem';
import { Civileighthsem } from './Components/Students/Dashboard/CIVIL/Civileighthsem';
import { EEEfirstsem } from './Components/Students/Dashboard/EEE/EEEfirstsem';
import { EEEsecondsem } from './Components/Students/Dashboard/EEE/EEEsecondsem';
import { EEEthirdsem } from './Components/Students/Dashboard/EEE/EEEthirdsem';
import { EEEfourthsem } from './Components/Students/Dashboard/EEE/EEEfourthsem';
import { EEEfifthsem } from './Components/Students/Dashboard/EEE/EEEfifthsem';
import { EEEsixthsem } from './Components/Students/Dashboard/EEE/EEEsixthsem';
import { EEEseventhsem } from './Components/Students/Dashboard/EEE/EEEseventhsem';
import { EEEeighthsem } from './Components/Students/Dashboard/EEE/EEEeighthsem';
import { Updatebooks } from './Components/Admin/Updatebook';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={[<HomePage />]} />
          <Route path='/adminlogin' element={[<AdminLogin />]} />
          <Route path='/adminregister' element={[<AdminRegister />]} />
          <Route path='/admindashboard/:id' element={[<Admindashboard />]} />
          <Route path='/viewbookdetails' element={[<ViewBookDetails />]} />
          <Route path='/studentlogin' element={[<StudentLogin />]} />
          <Route path='/studentregister' element={[<StudentRegister />]} />
          <Route path='/update/:book_id' element={[<Updatebooks/>]}/>

          <Route path='/csedashboard/:id' element={[<CSEdept />]} />
          <Route path='/csefirstsem' element={[<Firstsem />]} />
          <Route path='/csesecondsem' element={[<Secondsem />]} />
          <Route path='/csethirdsem' element={[<Thirdsem />]} />
          <Route path='/csefourthsem' element={[<Fourthsem />]} />
          <Route path='/csefifthsem' element={[<Fifthsem />]} />
          <Route path='/csesixthsem' element={[<Sixthsem />]} />
          <Route path='/cseseventhsem' element={[<Seventhsem />]} />
          <Route path='/cseeighthsem' element={[<Eighthsem />]} />

          <Route path='/mechdashboard/:id' element={[<MECHdashboard />]} />
          <Route path='/mechfirstsem' element={[<Mechfirstsem />]} />
          <Route path='/mechsecondsem' element={[<Mechsecondsem />]} />
          <Route path='/mechthirdsem' element={[<Mechthirdsem />]} />
          <Route path='/mechfourthsem' element={[<Mechfourthsem />]} />
          <Route path='/mechfifthsem' element={[<Mechfifthsem />]} />
          <Route path='/mechsixthsem' element={[<Mechsixthsem />]} />
          <Route path='/mechseventhsem' element={[<Mechseventhsem />]} />
          <Route path='/mecheighthsem' element={[<Mecheighthsem />]} />

          <Route path='/ecedashboard/:id' element={[<ECEdept />]} />
          <Route path='/ecefirstsem' element={[<ECEfirstsem />]} />
          <Route path='/ecesecondsem' element={[<ECEsecondsem />]} />
          <Route path='/ecethirdsem' element={[<ECEthirdsem />]} />
          <Route path='/ecefourthsem' element={[<ECEfourthsem />]} />
          <Route path='/ecefifthsem' element={[<ECEfifthsem />]} />
          <Route path='/ecesixthsem' element={[<ECEsixthsem />]} />
          <Route path='/eceseventhsem' element={[<ECEseventhsem />]} />
          <Route path='/eceeighthsem' element={[<ECEeighthsem />]} />

          <Route path='/civildashboard/:id' element={[<CIVILdashboard />]} />
          <Route path='/civilfirstsem' element={[<Civilfirstsem />]} />
          <Route path='/civilsecondsem' element={[<Civilsecondsem />]} />
          <Route path='/civilthirdsem' element={[<Civilthirdsem />]} />
          <Route path='/civilfourthsem' element={[<Civilfourthsem />]} />
          <Route path='/civilfifthsem' element={[<Civilfifthsem />]} />
          <Route path='/civilsixthsem' element={[<Civilsixthsem />]} />
          <Route path='/civilseventhsem' element={[<Civilseventhsem />]} />
          <Route path='/civileighthsem' element={[<Civileighthsem />]} />

          <Route path='/eeedashboard/:id' element={[<EEEdashboard />]} />
          <Route path='/eeefirstsem' element={[<EEEfirstsem />]} />
          <Route path='/eeesecondsem' element={[<EEEsecondsem />]} />
          <Route path='/eeethirdsem' element={[<EEEthirdsem />]} />
          <Route path='/eeefourthsem' element={[<EEEfourthsem />]} />
          <Route path='/eeefifthsem' element={[<EEEfifthsem />]} />
          <Route path='/eeesixthsem' element={[<EEEsixthsem />]} />
          <Route path='/eeeseventhsem' element={[<EEEseventhsem />]} />
          <Route path='/eeeeighthsem' element={[<EEEeighthsem />]} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
