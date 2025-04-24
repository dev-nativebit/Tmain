import React from 'react';
import {Drawer} from 'react-native-drawer-layout';
import {SideMenu, TopTabEnum} from '@/component';

export interface DrawerMenuProps {
  isOpen: boolean;
  children: React.ReactNode;
  onGestureStart: () => void;
  onClosePress: () => void;
  onClose: () => void;
  onOptionSelected: (selectedTab: TopTabEnum) => void;
  selectedTab:TopTabEnum
}

export const SideDrawerMenu: React.FC<DrawerMenuProps> = ({
  isOpen,
  children,
  onGestureStart,
  onClosePress,
  onClose,
  onOptionSelected,
  selectedTab
}: DrawerMenuProps) => {
  return (
    <Drawer
      open={isOpen}
      onOpen={() => {}}
      onClose={onClose}
      drawerType={'slide'}
      onGestureStart={onGestureStart}
      renderDrawerContent={() => {
        return (
          <SideMenu
            selectedTab={selectedTab}
            onOptionSelected={(selectedTab) =>{
              onOptionSelected(selectedTab);
            }}
            onClosePress={onClosePress}
          />
        );
      }}>
      {children}
    </Drawer>
  );
};
