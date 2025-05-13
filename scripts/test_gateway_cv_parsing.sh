#!/bin/bash

# Configuration
GATEWAY_ENDPOINT="http://localhost:3000/cv/parse" # Assuming /api/v1 prefix
CV_DIRECTORY="packages/file-parser/test/test_cvs"

echo "Starting JobStash CV Parsing Test..."
echo "Gateway Endpoint: ${GATEWAY_ENDPOINT}"
echo "CV Directory: ${CV_DIRECTORY}"
echo "--------------------------------------------------"

if [ ! -d "${CV_DIRECTORY}" ]; then
    echo "ERROR: CV Directory ${CV_DIRECTORY} not found."
    exit 1
fi

found_cvs=0
for cv_file_path in "${CV_DIRECTORY}"/*; do
    if [ -f "${cv_file_path}" ]; then
        found_cvs=$((found_cvs + 1))
        cv_filename=$(basename "${cv_file_path}")
        echo # Blank line for separation
        echo "Processing CV: ${cv_filename}"

        response_json=$(curl -s -X POST "${GATEWAY_ENDPOINT}" \
                             -F "cv=@${cv_file_path}")

        if [ -z "${response_json}" ]; then
            echo ">>> ERROR: No response from server for ${cv_filename}"
        else
            # Attempt to pretty-print if jq is available, otherwise print raw
            if command -v jq &> /dev/null; then
                echo "${response_json}" | jq .
            else
                echo ">>> Raw Response (jq not found):"
                echo "${response_json}"
            fi
        fi
        echo "--------------------------------------------------"
    fi
done

if [ "${found_cvs}" -eq 0 ]; then
    echo "No CV files found in ${CV_DIRECTORY}"
fi

echo "CV Parsing Test completed." 