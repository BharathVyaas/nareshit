import userLogo from "../assets/adminlogo.jpg";

function Logo() {
  return (
    <ul className="flex justify-between h-10">
      <li className="grid place-content-center mx-10">
        <img alt="Logo" />
      </li>
      <li className="grid place-content-center mx-10">
        <img src={userLogo} width="30" height="30" alt="userLogo" />
      </li>
    </ul>
  );
}

export default Logo;
