import { Unit } from "./enum";

export interface PriceTemplateItemReadDto {
  id: string;
  enabled: boolean;
  type: string;
  width: number;
  height: number;
  unit: Unit;
  rate: number;
  matchSize: boolean;
  group: string;
  description: string;
  summary: string;
  order: number;
}