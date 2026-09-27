import syntheticPlaceData from "@pullup/contracts/fixtures/cedar-commons.synthetic.v1.json";

import { publicPlaceSchema } from "./schema";

export const syntheticPlace = publicPlaceSchema.parse(syntheticPlaceData);
export const syntheticPlaces = [syntheticPlace] as const;
