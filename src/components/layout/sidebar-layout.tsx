import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
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

export default function SideBarLayout() {
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
                          <SidebarMenuSubButton className="text-white hover:text-mainColor">
                            <Link to={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
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
      </Sidebar>
    </SidebarProvider>
  );
}
