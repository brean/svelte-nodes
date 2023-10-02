import { writable } from 'svelte/store';
import type Group from "../model/Group"

const { subscribe, set, update } = writable<Group>();

export default {
  subscribe,
  set,
  update
}
