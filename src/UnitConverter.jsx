// src/components/UnitConverter.js
import React, { useState } from "react";

// Conversion functions for weight
const convertWeight = (value, fromUnit, toUnit) => {
  if (isNaN(value)) {
    return NaN; // Return NaN if value is invalid
  }

  const weightConversions = {
    kilograms: 1,    // Base unit: Kilograms
    grams: 1000,     // 1 kilogram = 1000 grams
    pounds: 2.20462, // 1 kilogram = 2.20462 pounds
    ounces: 35.274,  // 1 kilogram = 35.274 ounces
  };

  // Convert value to kilograms first (base unit)
  const valueInKg = value / weightConversions[fromUnit];

  // Then convert from kilograms to the target unit
  return valueInKg * weightConversions[toUnit];
};

// Conversion functions for length
const convertLength = (value, fromUnit, toUnit) => {
  if (isNaN(value)) {
    return NaN; // Return NaN if value is invalid
  }

  const lengthConversions = {
    meters: 1,       // Base unit: Meters
    kilometers: 0.001, // 1 meter = 0.001 kilometers
    miles: 0.000621371, // 1 meter = 0.000621371 miles
    feet: 3.28084,   // 1 meter = 3.28084 feet
    inches: 39.3701, // 1 meter = 39.3701 inches
  };

  // Convert value to meters first (base unit)
  const valueInMeters = value / lengthConversions[fromUnit];

  // Then convert from meters to the target unit
  return valueInMeters * lengthConversions[toUnit];
};

// Conversion functions for temperature
const convertTemperature = (value, fromUnit, toUnit) => {
  if (isNaN(value)) {
    return NaN; // Return NaN if value is invalid
  }

  let result;
  if (fromUnit === "celsius" && toUnit === "fahrenheit") {
    result = (value * 9) / 5 + 32; // Celsius to Fahrenheit
  } else if (fromUnit === "celsius" && toUnit === "kelvin") {
    result = value + 273.15; // Celsius to Kelvin
  } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
    result = (value - 32) * 5 / 9; // Fahrenheit to Celsius
  } else if (fromUnit === "fahrenheit" && toUnit === "kelvin") {
    result = ((value - 32) * 5) / 9 + 273.15; // Fahrenheit to Kelvin
  } else if (fromUnit === "kelvin" && toUnit === "celsius") {
    result = value - 273.15; // Kelvin to Celsius
  } else if (fromUnit === "kelvin" && toUnit === "fahrenheit") {
    result = ((value - 273.15) * 9) / 5 + 32; // Kelvin to Fahrenheit
  } else {
    result = value; // Same unit case
  }

  return result;
};

const UnitConverter = () => {
  const [value, setValue] = useState(""); // input value
  const [fromUnit, setFromUnit] = useState("kilograms"); // default unit
  const [toUnit, setToUnit] = useState("grams"); // default unit
  const [category, setCategory] = useState("weight"); // default category is weight
  const [result, setResult] = useState(null); // store conversion result

  // Handle conversion button click
  const handleConversion = () => {
    let convertedValue;

    if (category === "weight") {
      convertedValue = convertWeight(parseFloat(value), fromUnit, toUnit);
    } else if (category === "length") {
      convertedValue = convertLength(parseFloat(value), fromUnit, toUnit);
    } else if (category === "temperature") {
      convertedValue = convertTemperature(parseFloat(value), fromUnit, toUnit);
    }

    // Set the conversion result
    setResult(convertedValue);
  };

  // Define unit options based on category
  const getUnitsForCategory = (category) => {
    if (category === "weight") {
      return ["kilograms", "grams", "pounds", "ounces"];
    } else if (category === "length") {
      return ["meters", "kilometers", "miles", "feet", "inches"];
    } else if (category === "temperature") {
      return ["celsius", "fahrenheit", "kelvin"];
    }
    return [];
  };

  return (
    <div className="converter-container">
      <h1>Unit Converter</h1>

      {/* Category Selection */}
      <div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="weight">Weight</option>
          <option value="length">Length</option>
          <option value="temperature">Temperature</option>
        </select>
      </div>

      {/* Input Value */}
      <div>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />
      </div>

      {/* From Unit Selection */}
      <div>
        <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
          {getUnitsForCategory(category).map((unit) => (
            <option key={unit} value={unit}>
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* To Unit Selection */}
      <div>
        <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
          {getUnitsForCategory(category).map((unit) => (
            <option key={unit} value={unit}>
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Convert Button */}
      <div>
        <button onClick={handleConversion}>Convert</button>
      </div>

      {/* Display Result */}
      {result !== null && (
        <div>
          <h2>Result: {isNaN(result) ? "Invalid input" : result}</h2>
        </div>
      )}
    </div>
  );
};

export default UnitConverter;
