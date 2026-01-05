/**
 * Transform API product data to component-friendly format
 * @param {Object} apiProduct - Raw product data from API
 * @returns {Object} Transformed product data for UI components
 */
export const transformProductData = (apiProduct) => {
  
  const specs = {};
  
  // Add non-null specifications
  if (apiProduct.material) specs.Material = apiProduct.material;
  if (apiProduct.size) specs.Size = apiProduct.size;
  if (apiProduct.color) specs.Color = apiProduct.color;
  if (apiProduct.density) specs.Density = apiProduct.density;
  if (apiProduct.compressive_strength) specs['Compressive Strength'] = apiProduct.compressive_strength;
  if (apiProduct.height) specs.Height = apiProduct.height;
  if (apiProduct.width) specs.Width = apiProduct.width;
  if (apiProduct.shape) specs.Shape = apiProduct.shape;
  if (apiProduct.feature) specs.Feature = apiProduct.feature;
  if (apiProduct.usage_application) specs['Usage/Application'] = apiProduct.usage_application;
  if (apiProduct.wall_type) specs['Wall Type'] = apiProduct.wall_type;
  if (apiProduct.business_type) specs['Business Type'] = apiProduct.business_type;
  if (apiProduct.grade) specs.Grade = apiProduct.grade;
  if (apiProduct.thermal_conductivity) specs['Thermal Conductivity'] = apiProduct.thermal_conductivity;
  if (apiProduct.water_absorption) specs['Water Absorption'] = apiProduct.water_absorption;
  if (apiProduct.fire_rating) specs['Fire Rating'] = apiProduct.fire_rating;
  if (apiProduct.finishing) specs.Finishing = apiProduct.finishing;
  if (apiProduct.reinforcement) specs.Reinforcement = apiProduct.reinforcement;
  if (apiProduct.wire_slots) specs['Wire Slots'] = apiProduct.wire_slots;
  if (apiProduct.application) specs.Application = apiProduct.application;
  if (apiProduct.tolerance) specs.Tolerance = apiProduct.tolerance;
  if (apiProduct.setting_type) specs['Setting Type'] = apiProduct.setting_type;
  if (apiProduct.surface_finishing) specs['Surface Finishing'] = apiProduct.surface_finishing;
  if (apiProduct.weight) specs.Weight = apiProduct.weight;
  if (apiProduct.built_type) specs['Built Type'] = apiProduct.built_type;
  if (apiProduct.plank_thickness) specs['Plank Thickness'] = apiProduct.plank_thickness;

  return {
    id: apiProduct.id,
    name: apiProduct.product_name,
    price: `₹ ${apiProduct.price}`,
    unit: `/ ${apiProduct.unit}`,
    minOrder: `Min Order: ${apiProduct.min_order_quantity} ${apiProduct.min_order_unit}`,
    image: apiProduct.image_url || '/assets/Product/placeholder.png',
    description: apiProduct.description,
    basicSpecs: Object.fromEntries(Object.entries(specs).slice(0, 4)),
    extendedSpecs: Object.fromEntries(Object.entries(specs).slice(4))
  };
};

// Legacy function for backward compatibility (if needed elsewhere)
export const transformProduct = (apiProduct) => {
  // Filter out null values and create specs objects
  const createSpecs = (product) => {
    const allFields = {
      material: product.material,
      height: product.height,
      width: product.width,
      shape: product.shape,
      businessType: product.business_type,
      grade: product.grade,
      finishing: product.finishing,
      reinforcement: product.reinforcement,
      compressiveStrength: product.compressive_strength,
      wireSlots: product.wire_slots,
      size: product.size,
      color: product.color,
      density: product.density,
      feature: product.feature,
      usageApplication: product.usage_application,
      thermalConductivity: product.thermal_conductivity,
      waterAbsorption: product.water_absorption,
      fireRating: product.fire_rating,
      application: product.application,
      tolerance: product.tolerance,
      settingType: product.setting_type,
      surfaceFinishing: product.surface_finishing,
      weight: product.weight,
      builtType: product.built_type,
      plankThickness: product.plank_thickness
    };

    // Filter out null/undefined values
    const filteredSpecs = Object.fromEntries(
      Object.entries(allFields).filter(([key, value]) => value !== null && value !== undefined && value !== '')
    );

    // Split specs into basic and extended (first 4 for basic, rest for extended)
    const specEntries = Object.entries(filteredSpecs);
    const basicSpecs = Object.fromEntries(specEntries.slice(0, 4));
    const extendedSpecs = Object.fromEntries(specEntries.slice(4));

    return { basicSpecs, extendedSpecs };
  };

  const { basicSpecs, extendedSpecs } = createSpecs(apiProduct);

  return {
    id: apiProduct.id,
    name: apiProduct.product_name,
    price: `₹${apiProduct.price}.00`,
    unit: apiProduct.unit,
    minOrder: `${apiProduct.min_order_quantity} ${apiProduct.min_order_unit} (MOQ)`,
    image: apiProduct.image_url,
    basicSpecs,
    extendedSpecs
  };
};
