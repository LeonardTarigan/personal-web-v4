<script setup lang="ts">
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionRoot,
} from "@headlessui/vue";
import { navMenus } from "../../../lib/static/nav-menus";

const { currentPath } = defineProps<{
  currentPath: string;
}>();
</script>

<template>
  <Menu as="div" class="relative block sm:hidden">
    <MenuButton
      class="block px-3 py-4 transition-colors duration-300 hover:bg-neutral-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </MenuButton>

    <TransitionRoot
      enter="transition duration-200 ease-out"
      enter-from="transform scale-95 opacity-0"
      enter-to="transform scale-100 opacity-100"
      leave="transition duration-100 ease-in"
      leave-from="transform scale-100 opacity-100"
      leave-to="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-[3px] mt-2 w-48 origin-top-right border border-neutral-800 bg-white focus:outline-none"
      >
        <MenuItem v-for="item in navMenus" :key="item.href" v-slot="{ active }">
          <a
            :href="item.href"
            :class="[
              'block px-4 py-2 font-medium transition-colors duration-300',
              currentPath === item.href
                ? 'bg-neutral-800 text-white'
                : active
                  ? 'bg-white'
                  : '',
            ]"
          >
            {{ item.label }}
          </a>
        </MenuItem>
      </MenuItems>
    </TransitionRoot>
  </Menu>
</template>
