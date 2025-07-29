import { NavLink as RouterLink, Outlet, useLocation } from "react-router-dom";
import {
  MessageSquare,
  Heart,
  User,
  LifeBuoy,
  LogOut,
  Bell,
  Search,
  Award,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "../hooks/useAuth";

const NavLink = ({
  icon,
  label,
  to,
}: {
  icon: React.ReactNode;
  label: string;
  to: string;
}) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);

  return (
    <RouterLink
      to={to}
      className={`flex items-center p-3 rounded-lg transition-colors duration-200 text-base font-medium ${
        isActive
          ? "bg-primary/10 text-primary font-bold"
          : "text-text-light hover:bg-subtle"
      }`}
    >
      {icon}
      <span className="ml-4">{label}</span>
    </RouterLink>
  );
};

export const DashboardLayout = () => {
  const { user, logout } = useAuth();

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-background font-sans text-text">
        <aside className="w-72 bg-surface border-r border-border p-6 flex-col hidden lg:flex">
          <h1 className="text-3xl font-extrabold text-primary mb-12">
            MHFAider
          </h1>
          <nav className="flex flex-col space-y-2">
            <NavLink
              icon={<MessageSquare size={22} />}
              label="Community Feed"
              to="/dashboard/community-feed"
            />
            <NavLink
              icon={<LifeBuoy size={22} />}
              label="AI Support"
              to="/dashboard/ai-support"
            />
            <NavLink
              icon={<Heart size={22} />}
              label="My Subscription"
              to="/dashboard/subscriptions"
            />
            <NavLink
              icon={<Award size={22} />}
              label="My Achievements"
              to="/dashboard/achievements"
            />
            <NavLink
              icon={<User size={22} />}
              label="My Profile"
              to="/dashboard/profile"
            />
          </nav>
          <div className="mt-auto">
            <button
              onClick={logout}
              className="flex items-center p-3 w-full rounded-lg transition-colors duration-200 text-base font-medium text-destructive/80 hover:bg-destructive/10"
            >
              <LogOut size={22} />
              <span className="ml-4">Log Out</span>
            </button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="flex-shrink-0 bg-surface/80 backdrop-blur-sm border-b border-border h-20 flex items-center justify-between px-8">
            <div className="relative w-full max-w-sm">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light"
                size={20}
              />
              <Input
                placeholder="Search resources, posts, or members..."
                className="pl-10 h-11 bg-subtle"
              />
            </div>
            <div className="flex items-center space-x-5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="p-2 rounded-full text-text-light hover:text-primary hover:bg-subtle transition-colors">
                    <Bell size={24} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/thumbs/svg?seed=alex"
                    alt={user?.fullName}
                  />
                  <AvatarFallback>{user?.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-bold text-text">{user?.fullName}</p>
                  <p className="text-text-light">MHFAider Member</p>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};
