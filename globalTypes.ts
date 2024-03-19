export interface GlobalParameter {
  "ask_for_confirmation_before_quitting"?: boolean,
  "check_for_updates_on_startup"?: boolean,
  "show_in_menu_bar"?: boolean,
  "show_profile_name_in_menu_bar"?: boolean,
  "unsafe_ui"?: boolean
}

export type GlobalComplexRulesParameter = {
  "basic.simultaneous_threshold_milliseconds"?: number,
  "basic.to_delayed_action_delay_milliseconds"?: number,
  "basic.to_if_alone_timeout_milliseconds"?: number,
  "basic.to_if_held_down_threshold_milliseconds"?: number,
  "mouse_motion_to_scroll.speed"?: number
}
