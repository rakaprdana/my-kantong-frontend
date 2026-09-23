import { Link } from "react-router-dom";
import { Button } from "../../../@/components/ui/button";
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
    isActive: true,
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
    <SidebarProvider className="border-2 border-green-500 w-1/4">
      <Sidebar>
        <SidebarHeader>
          <h1 className="p-4 text-mainColor font-bold text-2xl">My Kantong</h1>
        </SidebarHeader>
        <SidebarContent>
          <Link to={"/dashboard"}>
            <Button className={"w-3/4 mx-4 bg-mainColor text-white"}>
              Dashboard
            </Button>
          </Link>
          <SidebarGroup>
            <SidebarMenu>
              <Collapsible
                key={menuItem.title}
                defaultOpen={menuItem.isActive}
                className="group/collapsible w-3/4 mx-4 bg-mainColor text-white"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={<SidebarMenuButton tooltip={menuItem.title} />}
                  >
                    <span>{menuItem.title}</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {menuItem.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            render={
                              <Link to={subItem.url}>
                                <span className="text-white">
                                  {subItem.title}
                                </span>
                              </Link>
                            }
                          />
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
