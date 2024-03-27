import React from "react";
import { Outlet } from "react-router";
import UserManagementMainNavigation from "../../ui/UserManagement/UserManagementMainNavigation";
import UserManagementFooter from "../../ui/UserManagement/UserManagementFooter";
import Logo from "../../ui/Logo";

function UserManagement() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header>
        <Logo />
        <UserManagementMainNavigation />
      </header>
      <main className="flex-grow mt-8 container mx-auto">
        <Outlet />
      </main>
      <footer className="p-6">
        <UserManagementFooter />
      </footer>
    </div>
  );
}

export default UserManagement;
