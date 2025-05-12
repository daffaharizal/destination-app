import { useState } from "react";
import { LogOut, Text, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogDelete,
  AlertDialogAdd,
} from "@/components/ui/alert-dialog";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("login");
  };

  const handleCickDropdownMobile = () => {
    
  }

  return (
    <nav className="bg-white fixed top-0 w-full shadow-md px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">Travel Platform</h1>

        {/* Navigation - Center */}
        <div className="hidden md:flex items-center bg-blue-50 rounded-full p-1.5">
          <Button
            variant={
              pathname === "/dashboard" || pathname == "/" ? "tabToggleActive" : "tabToggleBase"
            }
            onClick={() => navigate("/dashboard")}
          >
            Article
          </Button>
          <Button
            variant={
              pathname === "/category" ? "tabToggleActive" : "tabToggleBase"
            }
            onClick={() => navigate("/category")}
          >
            Category
          </Button>
          <Button
            variant={
              pathname === "/comment" ? "tabToggleActive" : "tabToggleBase"
            }
            onClick={() => navigate("/comment")}
          >
            Comment
          </Button>
        </div>

        {/* Logout Button with Confirmation Modal */}
        <div className="hidden md:block group">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"danger"} className="text-red-500">
                Logout
                <LogOut className="transition-all duration-200 transform group-hover:translate-x-0.5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to log out?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You will be redirected to the login page and your session will
                  be cleared.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogDelete
                  onClick={handleLogout}
                >
                  Yes, Logout
                </AlertDialogDelete>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-blue-500 hover:border-1 hover:border-white bg-transparent"
          >
            {menuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Text className="w-7 h-7 rotate-180" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-2">
          <Button
            variant={
              pathname === "/dashboard" || pathname == "/" ? "tabToggleActive" : "tabToggleBase"
            }
            onClick={() => {
              navigate("/dashboard")
              setMenuOpen(!menuOpen);
            }}
          >
            Article
          </Button>
          <Button
            variant={
              pathname === "/category" ? "tabToggleActive" : "tabToggleBase"
            }
            onClick={() => {
              navigate("/category")
              setMenuOpen(!menuOpen);
            }}
          >
            Category
          </Button>
          <Button
            variant={
              pathname === "/comment" ? "tabToggleActive" : "tabToggleBase"
            }
            onClick={() => {
              navigate("/comment")
              setMenuOpen(!menuOpen);
            }}
          >
            Comment
          </Button>

          {/* Mobile Logout with Modal */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"danger"} className="text-red-500 mt-2 group">
                Logout
                <LogOut className="transition-all duration-200 transform group-hover:translate-x-0.5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to log out?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You will be redirected to the login page and your session will
                  be cleared.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogDelete onClick={handleLogout}>
                  Yes, Logout
                </AlertDialogDelete>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </nav>
  );
}
