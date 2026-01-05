-- Sunshine Enterprises Database Schema
-- Create database
CREATE DATABASE IF NOT EXISTS sunshine_enterprises;
USE sunshine_enterprises;

-- Create single product specifications table (contains all product and specification data)
CREATE TABLE product_specifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    -- Product basic information
    product_name VARCHAR(255) NOT NULL,
    product_slug VARCHAR(255) NOT NULL UNIQUE,
    category_name VARCHAR(100) NOT NULL,
    category_slug VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    min_order_quantity INT NOT NULL,
    min_order_unit VARCHAR(50) NOT NULL,
    image_url VARCHAR(255),
    description TEXT,
    -- Basic specifications
    material VARCHAR(255),
    size VARCHAR(100),
    color VARCHAR(100),
    density VARCHAR(100),
    compressive_strength VARCHAR(100),
    height VARCHAR(100),
    width VARCHAR(100),
    shape VARCHAR(100),
    feature VARCHAR(500),
    usage_application VARCHAR(255),
    wall_type VARCHAR(100),
    -- Extended specifications
    business_type VARCHAR(255),
    grade VARCHAR(100),
    thermal_conductivity VARCHAR(100),
    water_absorption VARCHAR(100),
    fire_rating VARCHAR(100),
    finishing VARCHAR(255),
    reinforcement VARCHAR(255),
    wire_slots VARCHAR(255),
    application VARCHAR(255),
    tolerance VARCHAR(100),
    setting_type VARCHAR(100),
    surface_finishing VARCHAR(255),
    weight VARCHAR(100),
    built_type VARCHAR(100),
    plank_thickness VARCHAR(100),
    -- Meta fields
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- Indexes
    INDEX idx_category_slug (category_slug),
    INDEX idx_product_slug (product_slug),
    INDEX idx_is_active (is_active),
    INDEX idx_price (price)
);

-- Insert specifications for Concrete Blocks
INSERT INTO product_specifications (
    product_name, product_slug, category_name, category_slug, price, unit, min_order_quantity, min_order_unit, 
    image_url, description, material, size, density, compressive_strength, business_type, grade, thermal_conductivity, shape
) VALUES
('Concrete Blocks - Standard', 'concrete-blocks-standard', 'Concrete Blocks', 'concrete-blocks', 28.00, 'Piece', 100, 'Pieces', 
 '/assets/Product/CconBlocks/CconBlocks1.png', 'High-quality standard concrete blocks for construction',
 'Concrete', '400 x 200 x 150 mm', '1800-2000 kg/m³', '4-7 MPa', 'Manufacturer, Supplier', 'AAC Grade', '0.24 W/mK', 'Rectangular'),

('AAC Concrete Blocks', 'aac-concrete-blocks', 'Concrete Blocks', 'concrete-blocks', 32.00, 'Piece', 100, 'Pieces',
 '/assets/Product/CconBlocks/CconBlocks2.png', 'Premium autoclaved aerated concrete blocks',
 'Autoclaved Aerated Concrete', '600 x 200 x 200 mm', '550-650 kg/m³', '3.5-4.5 MPa', 'Manufacturer, Supplier', 'Premium AAC', NULL, NULL);

-- Insert specifications for Fencing Poles
INSERT INTO product_specifications (
    product_name, product_slug, category_name, category_slug, price, unit, min_order_quantity, min_order_unit,
    image_url, description, material, height, width, shape, business_type, finishing, grade, reinforcement
) VALUES
('RCC Fencing Poles', 'rcc-fencing-poles', 'Fencing Poles', 'fencing-poles', 180.00, 'Piece', 25, 'Pieces',
 '/assets/Product/FencingPoles/FencingPoles1.png', 'Strong reinforced concrete fencing poles',
 'Reinforced Concrete', '8 Feet', '4 Inch', 'Rectangular', 'Manufacturer, Supplier', 'Smooth', 'M20', 'Steel TMT Bars'),

('Precast Concrete Fencing Poles', 'precast-concrete-fencing-poles', 'Fencing Poles', 'fencing-poles', 220.00, 'Piece', 25, 'Pieces',
 '/assets/Product/FencingPoles/FencingPoles2.png', 'Durable precast concrete fencing poles',
 'Precast Concrete', '10 Feet', '5 Inch', 'Square', 'Manufacturer, Supplier', 'Textured', NULL, 'Pre-formed Slots');

-- Insert specifications for Fly Ash Bricks
INSERT INTO product_specifications (
    product_name, product_slug, category_name, category_slug, price, unit, min_order_quantity, min_order_unit,
    image_url, description, material, size, color, compressive_strength, business_type, water_absorption, grade, shape, thermal_conductivity
) VALUES
('Fly Ash Building Bricks', 'fly-ash-building-bricks', 'Fly Ash Bricks', 'fly-ash-bricks', 4.50, 'Piece', 1000, 'Pieces',
 '/assets/Product/FlyAshBricks/FlyAshBrick1.png', 'Eco-friendly fly ash building bricks',
 'Fly Ash & Cement', '230 x 110 x 75 mm', 'Grey', '7.5 MPa', 'Manufacturer, Supplier', '10-15 %', 'Class A', 'Rectangular', NULL),

('High Strength Fly Ash Bricks', 'high-strength-fly-ash-bricks', 'Fly Ash Bricks', 'fly-ash-bricks', 5.20, 'Piece', 1000, 'Pieces',
 '/assets/Product/FlyAshBricks/FlyAshBrick2.png', 'High strength fly ash bricks with thermal insulation',
 'Fly Ash, Cement & Sand', '230 x 110 x 100 mm', 'Grey', '10 MPa', 'Manufacturer, Supplier', '8-12 %', 'Class B', NULL, '0.7-1.28 W/mK');

-- Insert specifications for Kerb Stones
INSERT INTO product_specifications (
    product_name, product_slug, category_name, category_slug, price, unit, min_order_quantity, min_order_unit,
    image_url, description, material, shape, color, size, business_type, finishing, application, compressive_strength, water_absorption, tolerance
) VALUES
('Concrete Kerb Stone', 'concrete-kerb-stone', 'Kerb Stones', 'kerb-stones', 85.00, 'Piece', 50, 'Pieces',
 '/assets/Product/KerbStone/KerbStone1.png', 'Durable concrete kerb stones for road construction',
 'Concrete', 'Straight', 'Grey', '500 x 150 x 100 mm', 'Manufacturer, Supplier', 'Smooth', 'Road Construction', '25-30 MPa', NULL, NULL),

('Precast Kerb Stone', 'precast-kerb-stone', 'Kerb Stones', 'kerb-stones', 90.00, 'Piece', 50, 'Pieces',
 '/assets/Product/KerbStone/KerbStone2.png', 'High-quality precast kerb stones',
 'Precast Concrete', 'Curved & Straight', 'Grey', '600 x 150 x 125 mm', 'Manufacturer, Supplier', 'Textured', 'Road Construction', NULL, '5-8 %', '±2 mm');

-- Insert specifications for Paver Blocks
INSERT INTO product_specifications (
    product_name, product_slug, category_name, category_slug, price, unit, min_order_quantity, min_order_unit,
    image_url, description, material, color, feature, usage_application, business_type, setting_type, surface_finishing, weight
) VALUES
('Concrete Interlocking Paver Blocks', 'concrete-interlocking-paver-blocks', 'Paver Blocks', 'paver-blocks', 14.00, 'Piece', 100, 'Pieces',
 '/assets/Product/PaverBlocks/PaverBlocks1.png', 'Crack-resistant concrete interlocking paver blocks',
 'Concrete', 'Red', 'Crack Resistance', 'Pavement', 'Manufacturer, Supplier', 'Solid', 'Polished', NULL),

('Trihex Interlocking Paver Blocks', 'trihex-interlocking-paver-blocks', 'Paver Blocks', 'paver-blocks', 14.00, 'Piece', 100, 'Pieces',
 '/assets/Product/PaverBlocks/PaverBlocks2.png', 'Fine finished trihex interlocking paver blocks',
 'Concrete', 'Black, Grey, Red', 'Fine Finished', 'Pavement', 'Manufacturer, Supplier', 'Plain', 'Optimum Strength, Stain Resistance', '1.4 Kg');

-- Insert specifications for Boundary Walls
INSERT INTO product_specifications (
    product_name, product_slug, category_name, category_slug, price, unit, min_order_quantity, min_order_unit,
    image_url, description, material, color, feature, height, business_type, finishing, water_absorption, built_type, plank_thickness, wall_type
) VALUES
('Cement Compound Wall', 'cement-compound-wall', 'Boundary Walls', 'boundary-walls', 115.00, 'Square Feet', 100, 'Square Feet',
 '/assets/Product/PreCastBoundaryWall/PreCast1.png', 'Durable cement compound wall solutions',
 'Cement', 'Grey', 'Durable, High Strength', '7.5 Feet', 'Manufacturer, Supplier', 'Polished', '10.12 %', 'Readymade', NULL, NULL),

('Concrete Compound Wall', 'concrete-compound-wall', 'Boundary Walls', 'boundary-walls', 115.00, 'Square Feet', 100, 'Square Feet',
 '/assets/Product/PreCastBoundaryWall/PreCast2.png', 'High-strength concrete compound walls',
 'Concrete', 'Grey', 'Durable, High Strength, Termite Proof', NULL, 'Manufacturer, Supplier', 'Prefab', NULL, 'Prefab', '10 - 20 mm', 'Boundary Wall');
