import { AdvxData } from "@/types/advx";

declare global {
  var dataStore: Map<string, AdvxData> | undefined;
}

if (!global.dataStore) {
  global.dataStore = new Map<string, AdvxData>();
}

export const dataStore = global.dataStore;
