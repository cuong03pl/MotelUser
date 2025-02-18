import Tippy from "@tippyjs/react/headless";
import React from "react";
import Menu from "./Menu";

// Giao diện dropdown khi ấn vào user
export default function DropdownUser({ user }) {
  return (
    <Tippy
      placement="bottom-end"
      trigger="click"
      interactive
      render={(attrs) => <Menu />}
    >
      <div class="flex items-center space-x-1 cursor-pointer">
        <img
          alt="User avatar"
          class="h-6 w-6 rounded-full"
          height="30"
          src={user?.avatar}
          width="30"
        />
        <span className="text-[14px]">{user?.fullName}</span>
        <i class="fas fa-chevron-down"></i>
      </div>
    </Tippy>
  );
}
