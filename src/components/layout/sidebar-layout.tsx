import { Link, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "../../../@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../@/components/ui/collapsible";
import { Button } from "../../../@/components/ui/button";

export default function SideBarLayout() {
  const navigate = useNavigate();
  const menuItem = {
    title: "History",
    url: "#",
    isActive: false,
    items: [
      {
        title: "Income History",
        url: "/income",
      },
      {
        title: "Outcome history",
        url: "/outcome",
      },
    ],
  };
  function handleClickLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <SidebarProvider className="w-1/4">
      <Sidebar>
        <SidebarHeader>
          <h1 className="p-4 text-mainColor font-bold text-2xl">My Kantong</h1>
        </SidebarHeader>
        <SidebarContent>
          <Link to={"/dashboard"}>
            <SidebarMenuButton
              className={
                "w-[94%] text-left ml-2 bg-mainColor text-white hover:bg-primary/90 hover:text-white"
              }
            >
              Dashboard
            </SidebarMenuButton>
          </Link>
          <SidebarGroup>
            <SidebarMenu>
              <Collapsible
                key={menuItem.title}
                defaultOpen={menuItem.isActive}
                className="group/collapsible bg-mainColor text-white text-center"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuButton
                        className="hover:bg-primary/90 hover:text-white"
                        tooltip={menuItem.title}
                      />
                    }
                  >
                    <span>{menuItem.title}</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {menuItem.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            href={subItem.url}
                            className="text-white hover:text-mainColor"
                          >
                            {subItem.title}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Button variant={"destructive"} onClick={handleClickLogout}>
            Logout
          </Button>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
