import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  cn,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@heroui/react";
import { LucideLogOut, LucideSidebar } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useMedia } from "react-use";

import ToggleTheme from "@/components/ToggleTheme";

// Context
type SidebarContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextType>({
  isOpen: false,
  setIsOpen: () => {},
  toggleSidebar: () => {},
});

// Types
interface SidebarItemProps {
  icon?: React.ReactNode;
  title: string;
  url: string;
}

interface SidebarGroupProps {
  items: SidebarItemProps[];
  title: string;
}

interface AppSidebarProps {
  children: React.ReactNode;
}

// Components
const SidebarToggler = (props: { className?: string }) => {
  const { toggleSidebar } = React.useContext(SidebarContext);

  return (
    <Button
      className={props.className}
      isIconOnly
      onPress={toggleSidebar}
      variant="light"
    >
      <LucideSidebar className="transition-all" />
    </Button>
  );
};

const SidebarItem = (props: SidebarItemProps) => {
  return (
    <Button
      as={Link}
      className="justify-start font-semibold"
      href={props.url}
      size="sm"
      startContent={props.icon}
      variant="light"
    >
      {props.title}
    </Button>
  );
};

const SidebarGroup = (props: SidebarGroupProps) => {
  return (
    <div className="grid gap-3">
      <h4 className={cn("text-sm font-semibold")}>{props.title}</h4>
      <div className="grid gap-1">
        {props.items.map((item, index) => (
          <SidebarItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

const Sidebar = () => {
  const { isOpen } = React.useContext(SidebarContext);

  const Header = () => {
    return (
      <CardHeader className="justify-between">
        <div className="flex items-center gap-2">
          <img alt="HeroUI" className="h-10" src="/vite.svg" />
          <h1 className="text-lg font-bold">Sidebar</h1>
        </div>
        <SidebarToggler className="md:hidden" />
      </CardHeader>
    );
  };

  const Body = () => {
    return (
      <CardBody className="flex flex-col gap-6">
        <SidebarGroup
          items={[
            { title: "Home", url: "/" },
            { title: "About", url: "/about" },
          ]}
          title="Dashboard"
        />
        <SidebarGroup
          items={[
            { title: "Profile", url: "/profile" },
            { title: "Account", url: "/account" },
          ]}
          title="Settings"
        />
      </CardBody>
    );
  };

  const Footer = () => {
    const handleLogout = () => {
      localStorage.removeItem("token");
      location.reload();
    };

    return (
      <CardFooter className="justify-between">
        <Dropdown>
          <DropdownTrigger>
            <button className="flex flex-1 justify-start">
              <User description="Web Developer" name="John Doe" />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              key="logout"
              onPress={handleLogout}
              startContent={<LucideLogOut />}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <ToggleTheme />
      </CardFooter>
    );
  };

  return (
    <Card
      as={"aside"}
      className={cn("col-span-12 md:col-span-3 lg:col-span-2 h-dvh", {
        hidden: !isOpen,
      })}
      radius="none"
    >
      <Header />
      <Body />
      <Divider />
      <Footer />
    </Card>
  );
};

const Header = () => {
  return (
    <Card radius="none">
      <CardHeader className="gap-3">
        <SidebarToggler />
        <Divider className="h-4" orientation="vertical" />
      </CardHeader>
    </Card>
  );
};

export default function AppSidebar(props: AppSidebarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useMedia("(max-width: 768px)");
  const location = useLocation();

  const toggleSidebar = () => setIsOpen((open) => !open);

  React.useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  React.useEffect(() => {
    localStorage.setItem("isSidebarOpen", JSON.stringify(!isOpen));
  }, [isOpen]);

  React.useEffect(() => {
    const isSidebarOpen = JSON.parse(
      localStorage.getItem("isSidebarOpen") || "false"
    );

    if (isMobile) return setIsOpen(false);
    setIsOpen(isSidebarOpen);
  }, [isMobile, location]);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, toggleSidebar }}>
      <div className="grid grid-cols-12">
        <Sidebar />
        <div
          className={cn("col-span-12", {
            "md:col-span-9 lg:col-span-10": isOpen,
          })}
        >
          <div className="flex flex-col h-dvh">
            <Header />
            <div className="flex-1 overflow-y-auto">
              <main className="container my-10">{props.children}</main>
            </div>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
