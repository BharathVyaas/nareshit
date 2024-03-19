import { Button } from "@mui/material";
import Naresh_IT_Logo from "../../assets/Naresh_IT_Logo.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

function EnrollStudentNavigation() {
  return (
    <header className="py-3 bg-[gray]">
      <nav className="container mx-auto flex justify-between items-center">
        <div>
          <img
            src={Naresh_IT_Logo}
            alt="Naresh IT Logo"
            height="30"
            width="150"
          />
        </div>
        <ul className="flex space-x-4">
          {/*<li>
                <a className="font-medium rounded text-white">
                  <Button sx={{ color: "white" }} variant="text">
                    Test Creation
                  </Button>
                </a>
              </li>
              <li>
                <a className="font-medium rounded text-white">
                  <Button sx={{ color: "white" }} variant="text">
                    QuestionDB
                  </Button>
                </a>
              </li>
              <li>
                <a className="font-medium rounded text-white">
                  <Button sx={{ color: "white" }} variant="text">
                    User Management
                  </Button>
                </a>
              </li>*/}
          <li>
            <a className="bg-gray-500 font-medium rounded text-white">
              <Button
                sx={{ color: "white" }}
                variant="contained"
                color="secondary"
              >
                Enroll Student
              </Button>
            </a>
          </li>
          <li className="">
            <AccountCircleOutlinedIcon fontSize="large" />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default EnrollStudentNavigation;
