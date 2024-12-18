/* eslint-disable react/prop-types */
import { ExpandMore } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const activeLink = "bg-brand-500 text-white";
const inactiveLink = "bg-white text-neutral-500";
const fontSize = 16;

const MultiMenu = ({ routes, onSideBarClose }) => {
  const [activeMenus, setActiveMenus] = useState([]);
  const navigate = useNavigate();
  let { pathname } = useLocation();



  const handleMenuClick = (data, menuName) => {
    let newActiveMenus = [...activeMenus];

    if (!data?.subMenu || data?.subMenu?.length === 0) {
      let url = `${data.layout}/${data.path}`;
      navigate(url);
      // onSideBarClose();
    } else {
      if (newActiveMenus.includes(menuName)) {
        var index = newActiveMenus.indexOf(menuName);
        if (index > -1) {
          newActiveMenus.splice(index, 1);
        }
      } else {
        newActiveMenus = [menuName];
      }
      setActiveMenus(newActiveMenus);
      // onSideBarClose();
      // const is_open = newActiveMenus?.includes(menuName);
      // setToggle(is_open)
    }
  };

  const ListMenu = ({
    dept,
    data,
    hasSubMenu,
    menuName,
    menuIndex,
    className,
    fontSize,
  }) => {

     const isActive = () => {
       if (!data?.path) return false;
       return pathname.replace('/admin/','').startsWith(data.path);
     };
    return (
      <List sx={{ py: "4px", px: 1 }}>
        <ListItem
          sx={{ padding: "2px 5px", borderRadius: "5px" }}
          onClick={() => handleMenuClick(data, menuName)}
          className={`${isActive() && dept === 1 ? activeLink : inactiveLink}`}
        >
          <ListItemButton sx={{ p: "0px 5px",  }} >
            <ListItemIcon
              className={` ${
                isActive() && dept !== 1
                  ? "text-brand-500"
                  : isActive() && dept === 1
                  ? "text-white"
                  : "text-neutral-500"
              }`}
            >
              {" "}
              {data?.icon}
            </ListItemIcon>
            <ListItemText
              sx={{ ".MuiTypography-root": { fontSize: `${fontSize}px` } }}
              className={` ${
                isActive() && dept !== 1 ? "text-brand-500" : "text-neutral-500"
              }`}
            >
              {data.name}{" "}
            </ListItemText>
          </ListItemButton>

          {hasSubMenu && <ExpandMore />}
        </ListItem>
        {hasSubMenu && (
          <SubMenu
            fontSize={fontSize}
            dept={dept}
            data={data.subMenu}
            toggle={activeMenus?.includes(menuName)}
            menuIndex={menuIndex}
          />
        )}
      </List>
    );
  };

  const SubMenu = ({ dept, data, toggle, menuIndex, fontSize }) => {
    if (!toggle) {
      return null;
    }

    dept = dept + 1;

    return (
      <Box className="px-1">
        {data?.map((menu, index) => {
          const menuName = `${menu.name}-${dept}-${menuIndex}-${index}`;
          return (
            <ListMenu
              fontSize={fontSize - dept}
              dept={dept}
              data={menu}
              hasSubMenu={menu.subMenu && menu.subMenu.length > 0}
              menuName={menuName}
              key={menuName}
              menuIndex={index}
              className="text-darkGrey"
            />
          );
        })}
      </Box>
    );
  };

  return (
    <Box>
      {routes &&
        // eslint-disable-next-line array-callback-return
        routes.map((menu, index) => {
          const dept = 1;
          const menuName = `${menu.name}-${dept}-${index}`;
          if (menu.layout === "/admin" || menu.layout === "/auth") {
            return (
              <ListMenu
                fontSize={fontSize}
                dept={dept}
                data={menu}
                hasSubMenu={menu.subMenu && menu.subMenu.length > 0}
                menuName={menuName}
                key={menuName}
                menuIndex={index}
                className="font-bold"
              />
            );
          }
        })}
    </Box>
  );
};

export default MultiMenu;
