
import React, { useState } from "react";


const convertWeight = (value, fromUnit, toUnit) => {
  if (isNaN(value)) {
    return NaN; 
  }

  const weightConversions = {
    kilograms: 1,   
    grams: 1000,     
    pounds: 2.20462, 
    ounces: 35.274,  
  };

  
  const valueInKg = value / weightConversions[fromUnit];


  return valueInKg * weightConversions[toUnit];
};

const convertLength = (value, fromUnit, toUnit) => {
  if (isNaN(value)) {
    return NaN; 
  }

  const lengthConversions = {
    meters: 1,     
    kilometers: 0.001,
    miles: 0.000621371, 
    feet: 3.28084,  
    inches: 39.3701, 
  };

 
  const valueInMeters = value / lengthConversions[fromUnit];

  
  return valueInMeters * lengthConversions[toUnit];
};

const convertTemperature = (value, fromUnit, toUnit) => {
  if (isNaN(value)) {
    return NaN; 
  }

  let result;
  if (fromUnit === "celsius" && toUnit === "fahrenheit") {
    result = (value * 9) / 5 + 32; 
  } else if (fromUnit === "celsius" && toUnit === "kelvin") {
    result = value + 273.15; 
  } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
    result = (value - 32) * 5 / 9; 
  } else if (fromUnit === "fahrenheit" && toUnit === "kelvin") {
    result = ((value - 32) * 5) / 9 + 273.15; 
  } else if (fromUnit === "kelvin" && toUnit === "celsius") {
    result = value - 273.15; 
  } else if (fromUnit === "kelvin" && toUnit === "fahrenheit") {
    result = ((value - 273.15) * 9) / 5 + 32; 
  } else {
    result = value; 
  }

  return result;
};

const UnitConverter = () => {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("kilograms"); 
  const [toUnit, setToUnit] = useState("grams"); 
  const [category, setCategory] = useState("weight"); 
  const [result, setResult] = useState(null); 
  
  const handleConversion = () => {
    let convertedValue;

    if (category === "weight") {
      convertedValue = convertWeight(parseFloat(value), fromUnit, toUnit);
    } else if (category === "length") {
      convertedValue = convertLength(parseFloat(value), fromUnit, toUnit);
    } else if (category === "temperature") {
      convertedValue = convertTemperature(parseFloat(value), fromUnit, toUnit);
    }

  
    setResult(convertedValue);
  };


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

      {}
      <div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="weight">Weight</option>
          <option value="length">Length</option>
          <option value="temperature">Temperature</option>
        </select>
      </div>

      {}
      <div>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />
      </div>

      {}
      <div>
        <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
          {getUnitsForCategory(category).map((unit) => (
            <option key={unit} value={unit}>
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {}
      <div>
        <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
          {getUnitsForCategory(category).map((unit) => (
            <option key={unit} value={unit}>
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {}
      <div>
        <button onClick={handleConversion}>Convert</button>
      </div>

      {}
      {result !== null && (
        <div>
          <h2>Result: {isNaN(result) ? "Invalid input" : result}</h2>
        </div>
      )}
    </div>
  );
};

export default UnitConverter;
