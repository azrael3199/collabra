import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import CollabraHomeIcon from "../icons/cypressHomeIcon";
import CollabraSettingsIcon from "../icons/cypressSettingsIcon";
import CollabraTrashIcon from "../icons/cypressTrashIcon";
import Settings from "../settings/settings";
import Trash from "../trash/trash";

interface NativeNavigationProps {
  myWorkspaceId: string;
  className?: string;
}

const NativeNavigation: React.FC<NativeNavigationProps> = ({
  myWorkspaceId,
  className,
}) => {
  return (
    <nav className={twMerge("my-2", className)}>
      <ul className="flex flex-col gap-3">
        <li>
          <Link
            className="group/native flex text-Neutrals/neutrals-7 transition-all gap-2"
            href={`/dashboard/${myWorkspaceId}`}
          >
            <CollabraHomeIcon />
            <span>My Workspace</span>
          </Link>
        </li>
        <Settings>
          <li className="group/native flex text-Neutrals/neutrals-7 transition-all gap-2 cursor-pointer">
            <CollabraSettingsIcon />
            <span>Settings</span>
          </li>
        </Settings>
        <Trash>
          <li className="group/native flex text-Neutrals/neutrals-7 transition-all gap-2 cursor-pointer">
            <CollabraTrashIcon />
            <span>Trash</span>
          </li>
        </Trash>
      </ul>
    </nav>
  );
};

export default NativeNavigation;
