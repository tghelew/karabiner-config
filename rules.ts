import {writeFileSync } from "fs";
import { KarabinerRules, Modifier } from "./rulesTypes";
import { GlobalParameter, GlobalComplexRulesParameter } from "./globalTypes";
import { Devices } from "./devicesTypes";
import { createSubLayers, app, open } from "./utils";

const globals: GlobalParameter  = {
  ask_for_confirmation_before_quitting: false,
  check_for_updates_on_startup: false,
  show_in_menu_bar: false,
  show_profile_name_in_menu_bar: false,
  unsafe_ui: false
};

const hyperKey: Modifier[] = [ "command", "control", "shift", "option" ];
const mehKey: Modifier[] = [ "control", "shift", "option" ];

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
    description: "Meh Key (⌃⌥⇧)",
    manipulators: [
      {
        description: "Globe (fn) -> Meh Key",
        from: {
          key_code: "fn",
        },
        to: [
          {
            key_code: "left_shift",
            modifiers: [ "left_control", "left_option"],
          },
        ],
        type: "basic",
      },
    ]
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
  ...createSubLayers(hyperKey, {
    // o = "Open" applications
    o: {
      b: app("Safari"),
      c: app("Calendar"),
      t: app("kitty"),
      e: open("raycast://script-commands/memacs"),
      f: app("Finder"),
      //s: app("Slack"),
      m: app("Mail"),
    },
    // e = "system Emoji"
    e: {
      description: "Show the system emoji picker",
      to: [
        {
          // Emoji picker
          key_code: "spacebar",
          modifiers: ["right_control", "right_command"],
        },
      ],
    },
    h: {
      description: "Switch Application",
      to: [
        {
          // switch applications
          key_code: "s",
          modifiers: ["right_control", "right_command"],
        },
      ],
    },
    j: {
      description: "Previous space",
      to: [
        {
          // Previous window
          key_code: "left_arrow",
          modifiers: ["right_control"],
        },
      ],
    },
    k: {
      description: "Next space",
      to: [
        {
          // Previous window
          key_code: "right_arrow",
          modifiers: ["right_control"],
        },
      ],
    },
    l: {
      description: "Next active window",
      to: [
        {
          // Next active window
          key_code: "f4",
          modifiers: ["right_control"],
        },
      ],
    },

    // r = "Raycast"
    r: {
      p: open("raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"),
      h: open("raycast://extensions/raycast/clipboard-history/clipboard-history"),
    },
  }),
  ...createSubLayers(mehKey, {
    // raycast keybindings
    // (edit) windows movewment
    e: {
      n: {
        description: "move window to the next desktop",
        to: [
          {

            key_code: "right_arrow",
            modifiers: ["left_command", "left_option"],

          },
        ],
      },
      p: {
        description: "move window to the previous desktop",
        to: [
          {

            key_code: "left_arrow",
            modifiers: ["left_command", "left_option"],

          },
        ],
      },
      h: {
        description: "move window left",
        to: [
          {

            key_code: "left_arrow",
            modifiers: ["left_command", "left_control", "left_option"],

          },
        ],
      },
      j: {
        description: "move window down",
        to: [
          {

            key_code: "down_arrow",
            modifiers: ["left_command", "left_control", "left_option"],

          },
        ],
      },
      k: {
        description: "move window up",
        to: [
          {

            key_code: "up_arrow",
            modifiers: ["left_command", "left_control", "left_option"],

          },
        ],
      },
      l: {
        description: "move window right",
        to: [
          {

            key_code: "right_arrow",
            modifiers: ["left_command", "left_control", "left_option"],

          },
        ],
      },
    },
    // move window to the left half
    h: {
      description: "move window to the left half",
      to: [
        {

          key_code: "left_arrow",
          modifiers: ["left_command", "left_control"],

        },
      ],
    },
    // move window to the bottom half
    j: {
      description: "move window to the bottom half",
      to: [
        {

          key_code: "down_arrow",
          modifiers: ["left_command", "left_control"],

        },
      ],
    },
    // move window to the top half
    k: {
      description: "move window to the top half",
      to: [
        {

          key_code: "up_arrow",
          modifiers: ["left_command", "left_control"],

        },
      ],
    },
    // move window to the right half
    l: {
      description: "move window to the right half",
      to: [
        {

          key_code: "right_arrow",
          modifiers: ["left_command", "left_control"],

        },
      ],
    },
    // move window to the top left quarter
    y: {
      description: "move window to the top left quarter",
      to: [
        {

          key_code: "y",
          modifiers: ["left_command", "left_control"],

        },
      ],
    },
    // move window to the top right quarter
    o: {
      description: "move window to the top right quarter",
      to: [
        {

          key_code: "o",
          modifiers: ["left_command", "left_control"],

        },
      ],
    },
    // move window to the bottom left quarter
    n: {
      description: "move window to the bottom left quarter",
      to: [
        {

          key_code: "n",
          modifiers: ["left_command", "left_control"],

        },
      ],
    },
    // move window to the bottom right quarter
    period: {
      description: "move window to the bottom right quarter",
      to: [
        {

          key_code: "period",
          modifiers: ["left_command", "left_control"],

        },
      ],
    },
    // center the window
    c: {
      description: "center the  window",
      to: [
        {

          key_code: "c",
          modifiers: ["left_command", "left_control"],

        },
      ],
    },
    // restore window layout
    r: {
      description: "restore window layout",
      to: [
        {

          key_code: "r",
          modifiers: ["left_command", "left_control"],

        },
      ],
    },
    // toggle fullscreen
    f: {
      description: "toggle fullscreen",
      to: [
        {

          key_code: "f",
          modifiers: ["left_command", "left_control"],

        },
      ],
    },
    // hide window
    m: {
      description: "hide window",
      to: [
        {

          key_code: "h",
          modifiers: ["left_command"],

        },
      ],
    },
    // make window larger
    equal_sign: {
      description: "make window larger",
      to: [
        {
          key_code: "period",
          modifiers: [ "left_command", "left_control", "left_shift" ],
        }
      ],

    },
    // make window smaller
    hyphen: {
      description: "make window smaller",
      to: [
        {
          key_code: "comma",
          modifiers: [ "left_command", "left_control", "left_shift" ],
        }
      ],

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
