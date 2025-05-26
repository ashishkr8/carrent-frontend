export interface Card {
    carId: string;
    carRating: string;
    images: string[];
    location: string;
    pickupLocationId: string;
    dropOffLocationId: string;
    model: string;
    pricePerDay: string;
    serviceRating: string;
    status: string;
    gearBoxType: string;
    fuelType: string;
    engineCapacity: string;
    fuelConsumption: string;
    passengerCapacity: string;
    climateControl: string;
    category: string;
    mileageIncluded: string;
    additionalFeatures: string[];
    color: string;
    availabilityByDates: {
      pickupDateTime: string;
      dropOffDateTime: string;
    };
    insuranceIncluded: string;
    bookingModificationAllowedUntil: string;
  }
  