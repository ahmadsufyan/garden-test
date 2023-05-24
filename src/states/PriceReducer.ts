import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PriceTemplateItemReadDto } from "@type/price";

const priceReducer = createSlice({
  name: "price",
  initialState: {
    data: [] as PriceTemplateItemReadDto[],
    selectedData: undefined as PriceTemplateItemReadDto | undefined,
  },
  reducers: {
    setData: (state, action: PayloadAction<PriceTemplateItemReadDto[]>) => {
      state.data = action.payload;
    },
    updateData: (state, action: PayloadAction<PriceTemplateItemReadDto>) => {
      const tmpData = [...state.data];
      const newItem = action.payload;
      const indexToReplace = tmpData.findIndex((d) => d.id === newItem.id);
      tmpData[indexToReplace] = { ...newItem };
      state.data = tmpData;
    },
    setSelectedData: (
      state,
      action: PayloadAction<PriceTemplateItemReadDto | undefined>
    ) => {
      state.selectedData = action.payload;
    },
  },
});

export const PriceReducer = priceReducer.reducer;
export const PriceAction = priceReducer.actions;
