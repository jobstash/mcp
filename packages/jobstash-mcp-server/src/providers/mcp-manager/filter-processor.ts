import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '@nestjs/common'; // For potential logging within the utility

const logger = new Logger('FilterProcessor');

/**
 * Reads a JSON file, filters the entries based on the 'show' property,
 * and extracts relevant keys for configuring the McpManager.
 * @param filePath Absolute or relative path to the filters JSON file.
 * @returns An array of objects, each containing the relevant data for a filter.
 * @throws Throws an error if the file cannot be read or parsed.
 */
export function processFilterDefinitions(filePath: string): any[] {
  const relevantKeys = [
    'name', // Added manually during processing
    'kind',
    'paramKey',
    'options', // Contains nested value/label
    'value', // Contains nested lowest/highest with paramKey
  ];

  logger.log(`Attempting to read filters from: ${filePath}`);
  const filtersJson = fs.readFileSync(filePath, 'utf-8');
  const filtersData = JSON.parse(filtersJson); // Let potential parse errors propagate

  const relevantFilterData = Object.keys(filtersData)
    .filter((key) => filtersData[key]?.show === true)
    .map((key) => {
      const originalFilter = filtersData[key];
      const relevantData = {};
      relevantData['name'] = key;

      relevantKeys.forEach((relevantKey) => {
          if (originalFilter.hasOwnProperty(relevantKey)) {
              if (relevantKey === 'options' && Array.isArray(originalFilter.options)) {
                  relevantData[relevantKey] = originalFilter.options.map(opt => ({ value: opt.value, label: opt.label }));
              } else if (relevantKey === 'value' && typeof originalFilter.value === 'object') {
                  relevantData[relevantKey] = {
                      lowest: originalFilter.value.lowest ? { paramKey: originalFilter.value.lowest.paramKey } : undefined,
                      highest: originalFilter.value.highest ? { paramKey: originalFilter.value.highest.paramKey } : undefined
                  };
                  if (!relevantData[relevantKey].lowest) delete relevantData[relevantKey].lowest;
                  if (!relevantData[relevantKey].highest) delete relevantData[relevantKey].highest;
                  if (Object.keys(relevantData[relevantKey]).length === 0) {
                      delete relevantData[relevantKey];
                  }
              } else if (relevantKey !== 'name') {
                  relevantData[relevantKey] = originalFilter[relevantKey];
              }
          }
      });

      if (!relevantData['paramKey']) {
          relevantData['paramKey'] = key;
      }
      return relevantData;
    });

  logger.log(`Successfully processed ${relevantFilterData.length} relevant filters.`);
  return relevantFilterData;
} 