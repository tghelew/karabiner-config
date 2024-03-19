import {writeFileSync } from "fs";
import { KarabinerRules } from "./rulesTypes";
import { GlobalParameter, GlobalComplexRulesParameter } from "./globalTypes";
import { Devices } from "./devicesTypes";
import { createHyperSubLayers, app, open } from "./utils";

const globals: GlobalParameter  = {
  ask_for_confirmation_before_quitting: false,
  check_for_updates_on_startup: false,
  show_in_menu_bar: false,
  show_profile_name_in_menu_bar: false,
  unsafe_ui: false
};

const parameters: GlobalComplexRulesParameter = {
  "basic.simultaneous_threshold_milliseconds": 50,
  "basic.to_delayed_action_delay_milliseconds": 500,
  "basic.to_if_alone_timeout_milliseconds": 1000,
  "basic.to_if_held_down_threshold_milliseconds": 500,
  "mouse_motion_to_scroll.speed": 100
};

const devices: Devices[] = [
// internal keyboard
  {
    disable_built_in_keyboard_if_exists: false,
    identifiers: {
      is_keyboard: true,
      is_pointing_device: false,
      product_id: 0,
      vendor_id: 0
    },
    ignore: false,
    manipulate_caps_lock_led: true,
    treat_as_built_in_keyboard: true
  },
// Joes corne
  {
    disable_built_in_keyboard_if_exists: true,
    identifiers: {
      is_keyboard: true,
      is_pointing_device: true,
      product_id: 24926,
      vendor_id: 7504
    },
    ignore: false,
    manipulate_caps_lock_led: false,
    treat_as_built_in_keyboard: false
  },

];

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
        },
        to: [
          {
            key_code: "left_shift",
            modifiers: ["left_command", "left_control", "left_option"],
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
    ],
  },
  {
    description: "Left Arrow (←)",
    manipulators: [
      {
        description: "(Hyper Key ↑) -> (←)",
        from: {
          key_code: "up_arrow",
          modifiers: {
            mandatory: ["shift","control","option","command"]
          }
        },
        to: [
          {
            key_code: "left_arrow",
          },
        ],
        type: "basic",
      },
    ],
  },
  {
    description: "Right Arrow (→)",
    manipulators: [
      {
        description: "(Hyper Key ↓) -> (→)",
        from: {
          key_code: "down_arrow",
          modifiers: {
            mandatory: ["shift","control","option","command"]
          }
        },
        to: [
          {
            key_code: "right_arrow",
          },
        ],
        type: "basic",
      },
    ],
  },
  ...createHyperSubLayers({
    // o = "Open" applications
    o: {
      b: app("Safari"),
      c: app("Calendar"),
      t: app("kitty"),
      e: open("raycast://script-commands/memacs"),
      f: app("Finder"),
      s: app("Slack"),
      m: app("Messages"),
    },
    // s = "System"
    s: {
      p: {
        to: [
          {
            // Emoji picker
            key_code: "spacebar",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },

    },

    // r = "Raycast"
    r: {
      p: open("raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"),
      h: open("raycast://extensions/raycast/clipboard-history/clipboard-history"),
    },
  }),
];

writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: globals,
      profiles: [
        {
          name: "Default",
          selected: true,
          complex_modifications: {
            parameters,
            rules,
          },
          devices,
        },
      ],
    },
    null,
    2
  )
);
