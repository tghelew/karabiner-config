import { Identifiers, SimpleModifications } from "./rulesTypes";

export interface Devices {
    disable_built_in_keyboard_if_exists?: boolean,
    fn_function_keys?: SimpleModifications[],
    identifiers?: Identifiers,
    ignore?: boolean,
    manipulate_caps_lock_led?: boolean,
    simple_modifications?: SimpleModifications[],
    treat_as_built_in_keyboard?: boolean
}
