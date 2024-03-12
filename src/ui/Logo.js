import userLogo from "../assets/adminlogo.jpg";
<<<<<<< HEAD
<<<<<<< HEAD
import BrandLogo from "../assets/Naresh_IT_Logo.png";
=======
>>>>>>> origin/main
=======
import BrandLogo from "../assets/Naresh_IT_Logo.png";
>>>>>>> origin/master

function Logo() {
  return (
    <ul className="flex justify-between h-10">
<<<<<<< HEAD
<<<<<<< HEAD
      <li className="grid place-content-center mx-2">
        <img alt="Logo" src={BrandLogo} height="30" width="150" />
=======
      <li className="grid place-content-center mx-10">
        <img alt="Logo" />
>>>>>>> origin/main
=======
      <li className="grid place-content-center mx-2">
        <img alt="Logo" src={BrandLogo} height="30" width="150" />
>>>>>>> origin/master
      </li>
      <li className="grid place-content-center mx-10">
        <img src={userLogo} width="30" height="30" alt="userLogo" />
      </li>
    </ul>
  );
}

export default Logo;
