import { filterConfigurations } from '../config/filter-config';

/**
 * A simple script to print all filter descriptions
 * This helps to review the output of all description generation functions
 */

console.log('='.repeat(80));
console.log('JobStash MCP Filter Descriptions');
console.log('='.repeat(80));
console.log();

// Get all filter keys
const filterNames = Object.keys(filterConfigurations);

// Print each filter's description
filterNames.forEach((filterName, index) => {
    const filter = filterConfigurations[filterName];

    console.log(`[${index + 1}/${filterNames.length}] ${filterName}`);
    console.log('-'.repeat(80));
    console.log(filter.llmDescription);
    console.log('\n');
});

console.log('All filter descriptions printed successfully.'); 