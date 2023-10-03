import { writable } from 'svelte/store';
import type IGroup from "../model/IGroup"

const { subscribe, set, update } = writable<IGroup>();

export default {
  subscribe,
  set,
  update
}
